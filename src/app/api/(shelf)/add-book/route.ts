import { NextResponse } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { book } = await req.json();
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Извлекаем ключи всех авторов
    const rawAuthors = book.authors || [];

    const authorsData = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rawAuthors.map(async (item: any) => {
        const rawKey = item.author?.key; // "/authors/OL1775990A"
        if (!rawKey) return null;

        const cleanKey = rawKey.replace("/authors/", ""); // "OL1775990A"

        try {
          const res = await fetch(`https://openlibrary.org${rawKey}.json`);
          if (!res.ok) {
            return { name: "Unknown Author", key: cleanKey, photo_url: null };
          }

          const data = await res.json();

          // Достаем первое фото автора из массива photos
          const photoId = data.photos?.[0];
          const photoUrl = photoId
            ? `https://covers.openlibrary.org/a/id/${photoId}-M.jpg`
            : null;

          return {
            name: data.name || "Unknown Author",
            key: cleanKey,
            photo_url: photoUrl,
          };
        } catch {
          return { name: "Unknown Author", key: cleanKey, photo_url: null };
        }
      }),
    );

    // Фильтруем null
    const formattedAuthors = authorsData.filter(Boolean);

    // 3. Форматируем обложку книги и описание
    const coverId = book.covers?.[0];
    const coverUrl = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : null;

    const descriptionText =
      typeof book.description === "object"
        ? book.description.value
        : book.description || null;

    // 4. Сохраняем в Supabase (author сохраняет массив с именами, ключами и аватарками)
    const { data: bookData, error: bookError } = await supabase
      .from("books")
      .upsert(
        {
          openlibrary_work_id: book.key,
          title: book.title,
          author: formattedAuthors,
          // Результат в jsonb: [{ "name": "Roald Dahl", "key": "OL34184A", "photo_url": "https://..." }]
          cover_url: coverUrl,
          description: descriptionText,
        },
        { onConflict: "openlibrary_work_id" },
      )
      .select("id")
      .single();

    if (bookError) {
      return NextResponse.json({ error: bookError.message }, { status: 500 });
    }

    return NextResponse.json(bookData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
