const BASE_URL = "https://your-backend.com/api";

export async function fetchSavedBooks(token) {
  const res = await fetch(`${BASE_URL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function saveBook(book, token) {
  const res = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Failed to save book");
  return res.json();
}

export async function deleteBook(bookId, token) {
  const res = await fetch(`${BASE_URL}/books/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete book");
  return res.json();
}