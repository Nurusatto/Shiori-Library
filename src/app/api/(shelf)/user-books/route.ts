import { NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { book, shelf = "want_to_read" } = await req.json();
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Проверяем авторизацию пользователя
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Обрабатываем авторов (как мы делали с photo_url и key)
    const rawAuthors = book.authors || [];
    const authorsData = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rawAuthors.map(async (item: any) => {
        const rawKey = item.author?.key;
        if (!rawKey) return null;
        const cleanKey = rawKey.replace("/authors/", "");

        try {
          const res = await fetch(`https://openlibrary.org${rawKey}.json`);
          if (!res.ok)
            return { name: "Unknown Author", key: cleanKey, photo_url: null };
          const data = await res.json();
          const photoId = data.photos?.[0];

          return {
            name: data.name || "Unknown Author",
            key: cleanKey,
            photo_url: photoId
              ? `https://covers.openlibrary.org/a/id/${photoId}-M.jpg`
              : null,
          };
        } catch {
          return { name: "Unknown Author", key: cleanKey, photo_url: null };
        }
      }),
    );

    const formattedAuthors = authorsData.filter(Boolean);
    const coverId = book.covers?.[0];
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : null;
    const descriptionText =
      typeof book.description === "object"
        ? book.description.value
        : book.description || null;

    // 3. ШАГ 1: Сохраняем/обновляем саму книгу в общей таблице `books`
    const { data: savedBook, error: bookError } = await supabase
      .from("books")
      .upsert(
        {
          openlibrary_work_id: book.key,
          title: book.title,
          author: formattedAuthors,
          cover_url: coverUrl,
          description: descriptionText,
        },
        { onConflict: "openlibrary_work_id" },
      )
      .select("id")
      .single();

    if (bookError || !savedBook) {
      return NextResponse.json({ error: bookError.message }, { status: 500 });
    }

    // 4. ШАГ 2: Связываем пользователя и книгу в `user_books`
    // Благодаря unique(user_id, book_id) upsert обновит полку (shelf), если книга уже была
    const { data: userBook, error: userBookError } = await supabase
      .from("user_books")
      .upsert(
        {
          user_id: user.id,
          book_id: savedBook.id,
          shelf: shelf, // например 'want_to_read', 'reading', 'read'
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id, book_id" }, // Указываем составной уникальный ключ
      )
      .select()
      .single();

    if (userBookError) {
      return NextResponse.json(
        { error: userBookError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Book added to shelf successfully",
      userBook,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
