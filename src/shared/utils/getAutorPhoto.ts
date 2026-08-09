export async function fetchAuthorWithPhoto(rawKey: string, timeoutMs = 4000) {
  if (!rawKey) return null;

  const cleanKey = rawKey.replace("/authors/", "");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(
      `https://openlibrary.org/authors/${cleanKey}.json`,
      {
        signal: controller.signal,
        next: { revalidate: 86400 },
      },
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      return { name: "Unknown Author", key: cleanKey, photo_url: null };
    }

    const data = await res.json();

    // Берем первое фото автора, если оно есть
    const photoId = data.photos?.[0];
    const photoUrl = photoId
      ? `https://covers.openlibrary.org/a/id/${photoId}-M.jpg`
      : null;

    return {
      name: data.name || "Unknown Author",
      key: cleanKey,
      photo_url: photoUrl,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    clearTimeout(timeoutId);
    return { name: "Unknown Author", key: cleanKey, photo_url: null };
  }
}
