export function formatBook(item) {
  const info = item.volumeInfo || {};
  return {
    id: item.id,
    title: info.title || "Untitled",
    author: (info.authors || ["Unknown"]).join(", "),
    description: info.description || "No description available.",
    coverImage:
      secureThumbnail(info.imageLinks?.thumbnail) || "/default-book.png",
  };
}

export function secureThumbnail(url) {
  return url?.startsWith("http://") ? url.replace("http://", "https://") : url;
}
