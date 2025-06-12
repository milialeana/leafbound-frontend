import { useEffect, useState } from "react";
import { mockBooks } from "../../utils/bookData";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import BookCard from "../BookCard/BookCard";
import Preloader from "../Preloader/Preloader";
import "./Main.css";
import backgroundImage from "../../assets/main-background.jpg";
import leafCrown from "../../assets/leaf-crown.png";

function Main({ onSignUpClick }) {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBooks(mockBooks);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  function handlePreview(book) {
    setSelectedBook(book);
  }

  function handleCloseModal() {
    setSelectedBook(null);
  }

  function handleSearchClick() {
    console.log("Search clicked");
  }

  const mainStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    fontFamily: '"Averia Serif Libre", Arial, Helvetica, sans-serif',
    fontSize: "20px",
    lineHeight: "100%",
    paddingTop: "130px",
  };

  return (
    <main className="main" style={mainStyle}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h2 className="main__tagline">
            <img src={leafCrown} alt="Leaf" className="main__tagline-leaf" />
            Grow your library,
            <br />
            Leaf by Leaf
          </h2>

          <div className="main__actions">
            <button
              className="main__button main__button--signup"
              onClick={onSignUpClick}
            >
              To save books to your library, sign up
            </button>
            <button
              className="main__button main__button--search"
              onClick={handleSearchClick}
            >
              Search for books
            </button>
          </div>

          <div className="main__book-grid">
            {books.slice(0, 3).map((book) => (
              <BookCard key={book._id} book={book} onPreview={handlePreview} />
            ))}
          </div>
        </>
      )}

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
    </main>
  );
}

export default Main;
