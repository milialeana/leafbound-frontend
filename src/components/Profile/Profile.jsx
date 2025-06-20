import React, { useEffect, useState } from "react";
import { savedBooks } from "../../utils/savedBooks";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import BookCard from "../BookCard/BookCard";
import Preloader from "../Preloader/Preloader";

import lightBackgroundImage from "../../assets/light-mode.jpg";
import darkBackgroundImage from "../../assets/dark-mode.jpg";
import profilePic from "../../assets/default-avatar.png";
import leafLightIcon from "../../assets/leaf-light.png";
import leafDarkIcon from "../../assets/leaf-dark.png";
import "./Profile.css";
import "../Pagination/Pagination.css";
import "../ModalPreview/ModalPreview.css";

function Profile({
  isDarkMode,
  toggleTheme,
  isLoggedIn,
  currentUser,
  onEditProfileClick,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 15;

  const backgroundImage = isDarkMode
    ? darkBackgroundImage
    : lightBackgroundImage;

  const mainStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    fontFamily: '"Averia Serif Libre", serif',
    paddingTop: "130px",
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBooks(savedBooks);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handlePreview = (book) => setSelectedBook(book);
  const handleCloseModal = () => setSelectedBook(null);

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

  function renderPagination() {
    if (totalPages <= 1) return null;

    return (
      <div className="pagination">
        <button
          className="pagination__button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ‹ Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`pagination__button ${
              currentPage === i + 1 ? "pagination__button--active" : ""
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
    );
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
          <h2 className="modal-preview__title">{selectedBook.title}</h2>
          <h4 className="modal-preview__author">by {selectedBook.author}</h4>
          <p className="modal-preview__description">
            {selectedBook.description}
          </p>
        </div>
      </ModalWithForm>
    );
  }

  return (
    <>
      <main
        className={`profile ${isDarkMode ? "dark" : "light"}`}
        style={mainStyle}
      >
        <div className="profile__top-bar">
          <div
            className="profile__image-wrapper"
            onClick={onEditProfileClick}
            title="Edit profile"
          >
            <img
              src={currentUser.avatar || profilePic}
              alt={currentUser.name}
              className="profile__image"
            />
            <span className="profile__edit-icon">✏️</span>
          </div>

          <h2 className="profile__name">Welcome, {currentUser.name}!</h2>
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
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
            {renderPagination()}
          </>
        )}
      </main>
      <button
        className="profile__theme-fab"
        onClick={toggleTheme}
        title="Toggle Theme"
      >
        <img
          src={isDarkMode ? leafLightIcon : leafDarkIcon}
          alt="Toggle Theme"
          className="profile__theme-icon"
        />
      </button>

      {renderPreviewModal()}
    </>
  );
}

export default Profile;
