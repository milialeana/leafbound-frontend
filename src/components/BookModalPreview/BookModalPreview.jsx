import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./BookModalPreview.css";
import noCover from "../../assets/no-cover.png";

function BookModalPreview({ book, isDarkMode, isLoggedIn, onClose, onSave }) {
  if (!book) return null;

  return (
    <ModalWithForm
      onClose={onClose}
      contentClassName="modal__content--preview-green"
      isPreview
      isDarkMode={isDarkMode}
    >
      <div className="modal-preview">
        <img
          src={book.coverImage || noCover}
          alt={book.title}
          className="modal-preview__image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noCover;
          }}
        />
        <div className="modal-preview__info">
          <h2 className="modal-preview__title">{book.title}</h2>
          <h4 className="modal-preview__author">by {book.author}</h4>
          <p className="modal-preview__description">{book.description}</p>
        </div>

        {isLoggedIn && (
          <button
            className="modal-preview__save-button"
            onClick={() => onSave(book)}
          >
            Save to Library
          </button>
        )}
      </div>
    </ModalWithForm>
  );
}

export default BookModalPreview;
