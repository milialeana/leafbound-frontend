import { useState, useEffect } from "react";
import { searchBooks } from "../../utils/GoogleBooksApi";
import { formatBook } from "../../utils/bookHelpers";
import { getRandomQuote } from "../../utils/quoteHelpers";
import QuoteToggle from "../QuoteToggle/QuoteToggle";
import BookModalPreview from "../BookModalPreview/BookModalPreview";
import BookCard from "../BookCard/BookCard";
import Preloader from "../Preloader/Preloader";
import leafCrown from "../../assets/leaf-crown.png";

import "./Main.css";

function Main({
  onSignUpClick,
  selectedBook,
  setSelectedBook,
  randomBooks,
  isLoggedIn,
  isDarkMode,
  onSaveBookClick,
}) {
  const [query, setQuery] = useState("");
  const [allBooks, setAllBooks] = useState(randomBooks || []);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);
  const [quote, setQuote] = useState(() => getRandomQuote(null));

  useEffect(() => {
    if (randomBooks?.length) {
      setAllBooks(randomBooks);
    }
  }, [randomBooks]);

  function handleSearch() {
    if (!query.trim()) return;
    setIsLoading(true);
    setError("");
    setAllBooks([]);
    setVisibleCount(4);

    searchBooks(query)
      .then((data) => {
        if (!data.items || data.items.length === 0) {
          setError("Nothing found");
        } else {
          const books = data.items.map(formatBook);
          setAllBooks(books);
        }
      })
      .catch(() => {
        setError("Sorry, something went wrong. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
        setQuery("");
      });
  }

  function handlePreview(book) {
    setSelectedBook(book);
  }

  function handleCloseModal() {
    setSelectedBook(null);
  }

  function handleShowMore() {
    setVisibleCount((prev) => prev + 4);
  }

  return (
    <>
      <main className={`main main--background ${isDarkMode ? "dark" : ""}`}>
        <h2 className="main__tagline">
          <img src={leafCrown} alt="Leaf" className="main__tagline-leaf" />
          Grow your library,
          <br />
          Leaf by Leaf
        </h2>

        <QuoteToggle
          quote={quote}
          isVisible={isQuoteVisible}
          onToggle={() => setIsQuoteVisible(false)}
          onNewQuote={() => {
            setQuote(getRandomQuote(quote.id));
            setIsQuoteVisible(true);
          }}
        />

        <form
          className="main__actions"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            id="book-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or category"
            className="main__input"
          />
          <button type="submit" className="main__button main__button--search">
            Search
          </button>
          {!isLoggedIn && (
            <button
              type="button"
              className="main__button main__button--signup"
              onClick={onSignUpClick}
            >
              Sign Up to Save Books
            </button>
          )}
        </form>

        {isLoading && <Preloader />}
        {error && <p className="main__error">{error}</p>}

        <div className="main__grid">
          {allBooks.slice(0, visibleCount).map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPreview={handlePreview}
              onSaveClick={onSaveBookClick}
              isLoggedIn={isLoggedIn}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {!isLoading && !error && visibleCount < allBooks.length && (
          <div className="main__show-more">
            <button
              className="main__button main__button--search"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}
      </main>

      <BookModalPreview
        book={selectedBook}
        isDarkMode={isDarkMode}
        onClose={handleCloseModal}
        onSave={onSaveBookClick}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}

export default Main;
