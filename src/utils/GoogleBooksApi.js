const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

/**
 * Search for books via Google Books API.
 * @param {string} query - Search keyword(s): title, author, category, etc.
 * @param {number} maxResults - Optional max results (default: 30)
 * @returns {Promise<Object>} - Resolves with parsed JSON response
 */
export const searchBooks = (query, maxResults = 30) => {
  const url = `${BASE_URL}?q=${encodeURIComponent(
    query
  )}&maxResults=${maxResults}&key=${API_KEY}`;

  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    return res.json();
  });
};
