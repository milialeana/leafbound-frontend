import React, { useEffect, useState } from "react";
import { savedBooks } from "../../utils/savedBooks";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import BookCard from "../BookCard/BookCard";
import Preloader from "../Preloader/Preloader";
import lightBackgroundImage from "../../assets/light-mode.jpg";
import darkBackgroundImage from "../../assets/dark-mode.jpg";
import profilePic from "../../assets/default-avatar.png";
import "./Profile.css";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [theme, setTheme] = useState("light");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 15;

  const backgroundImage =
    theme === "dark" ? darkBackgroundImage : lightBackgroundImage;

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function handlePreview(book) {
    setSelectedBook(book);
  }

  function handleCloseModal() {
    setSelectedBook(null);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBooks(savedBooks);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  const mainStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    fontFamily: '"Averia Serif Libre", serif',
    paddingTop: "130px",
  };

  return (
    <>
      <main className={`profile ${theme}`} style={mainStyle}>
        <div className="profile__top-bar">
          <img src={profilePic} alt="Profile" className="profile__image" />
          <div className="profile__controls">
            <button onClick={toggleTheme} className="profile__button">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            <button className="profile__button">Edit Profile</button>
            <button className="profile__button">Log Out</button>
          </div>
        </div>

        <div className="profile__search">
          <input
            type="text"
            placeholder="Search by title, author, or genre..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <div className="profile__book-grid">
              {currentBooks.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onPreview={handlePreview}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination__button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  ‹ Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`pagination__button ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="pagination__button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next ›
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {selectedBook && (
        <ModalWithForm
          onClose={handleCloseModal}
          contentClassName="modal__content--green"
          isPreview={true}
        >
          <div className="modal-preview">
            <img
              src={selectedBook.coverImage}
              alt={selectedBook.title}
              className="modal-preview__image"
            />
            <h2 className="modal-preview__title">{selectedBook.title}</h2>
            <h4 className="modal-preview__author">by {selectedBook.author}</h4>
            <p className="modal-preview__description">
              {selectedBook.description}
            </p>
          </div>
        </ModalWithForm>
      )}
    </>
  );
}

export default Profile;
