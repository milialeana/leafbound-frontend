import { useState, useEffect } from "react";
import { searchBooks } from "../../utils/GoogleBooksApi";
import { formatBook } from "../../utils/bookHelpers";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import BookCard from "../BookCard/BookCard";
import Preloader from "../Preloader/Preloader";
import leafCrown from "../../assets/leaf-crown.png";
import quoteleaf from "../../assets/quote-mark-leaf.png";
import quotes from "../../utils/quotes";
import "./Main.css";
import "../ModalPreview/ModalPreview.css";

function Main({
  onSignUpClick,
  selectedBook,
  setSelectedBook,
  randomBooks,
  isLoggedIn,
  isDarkMode,
}) {
  const [query, setQuery] = useState("");
  const [allBooks, setAllBooks] = useState(randomBooks || []);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);
  const [quote, setQuote] = useState(() => getRandomQuote(null));

  // Load random books from props
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
    setVisibleCount(3);

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
        setError(
          "Sorry, something went wrong during the request. Please try again later."
        );
      })
      .finally(() => setIsLoading(false));
  }

  function handlePreview(book) {
    setSelectedBook(book);
  }

  function handleCloseModal() {
    setSelectedBook(null);
  }

  function handleShowMore() {
    setVisibleCount((prev) => prev + 3);
  }

  function getRandomQuote(excludeId) {
    const filtered = quotes.filter((q) => q.id !== excludeId);
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  function renderPreviewModal() {
    if (!selectedBook) return null;

    return (
      <ModalWithForm
        onClose={handleCloseModal}
        contentClassName="modal__content--preview-green"
        isPreview={true}
        isDarkMode={isDarkMode}
      >
        <div className="modal-preview">
          <img
            src={selectedBook.coverImage}
            alt={selectedBook.title}
            className="modal-preview__image"
          />
          <div className="modal-preview__info">
            <h2 className="modal-preview__title">{selectedBook.title}</h2>
            <h4 className="modal-preview__author">by {selectedBook.author}</h4>
            <p className="modal-preview__description">
              {selectedBook.description}
            </p>
          </div>
        </div>
      </ModalWithForm>
    );
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

        <div className="main__quote-toggle">
          {isQuoteVisible ? (
            <blockquote
              className="main__quote-box"
              onClick={() => setIsQuoteVisible(false)}
              aria-label="Hide quote"
            >
              “{quote.quote}”
              <br />
              <cite>
                – {quote.author}, <em>{quote.book}</em>
              </cite>
            </blockquote>
          ) : (
            <button
              className="main__quote-button"
              onClick={() => {
                setQuote(getRandomQuote(quote.id));
                setIsQuoteVisible(true);
              }}
              aria-label="Show quote"
            >
              <img
                src={quoteleaf}
                alt="Toggle quote"
                className="main__quote-icon"
              />
            </button>
          )}
        </div>

        <div className="main__actions">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, or category"
            className="main__input"
          />
          <button
            className="main__button main__button--search"
            onClick={handleSearch}
          >
            Search
          </button>
          {!isLoggedIn && (
            <button
              className="main__button main__button--signup"
              onClick={onSignUpClick}
            >
              Sign Up to Save Books
            </button>
          )}
        </div>

        {isLoading && <Preloader />}
        {error && <p className="main__error">{error}</p>}

        <div className="main__grid">
          {allBooks.slice(0, visibleCount).map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPreview={handlePreview}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {!isLoading && !error && visibleCount < allBooks.length && (
          <div style={{ textAlign: "center", margin: "20px" }}>
            <button
              className="main__button main__button--search"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}
      </main>
      {renderPreviewModal()}
    </>
  );
}

export default Main;
