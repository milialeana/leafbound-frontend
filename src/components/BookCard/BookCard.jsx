import React from "react";
import "./BookCard.css";
import "../BookModalPreview/BookModalPreview.css";
import plusIcon from "../../assets/add-book.svg";
import noCover from "../../assets/no-cover.png";

function BookCard({
  book,
  onPreview,
  onSaveClick,
  isDarkMode,
  isLoggedIn,
  onEdit,
  onRemove,
}) {
  return (
    <div className={`book-card ${isDarkMode ? "dark" : ""}`}>
      {isLoggedIn && (
        <button
          className="book-card__save-button"
          title="Add to Library"
          onClick={() => onSaveClick(book)}
        >
          <img src={plusIcon} alt="Add" />
        </button>
      )}

      {book.isFavorite && (
        <span className="book-card__favorite-star" title="Favorite Book">
          ⭐
        </span>
      )}

      <img
        src={book.coverImage || noCover}
        alt={book.title}
        className="book-card__image"
        onClick={() => onPreview(book)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = noCover;
        }}
      />
      {book.notes && (
        <div className="book-card__hover-notes">
          <strong>Note:</strong> {book.notes}
        </div>
      )}

      <div className="book-card__content">
        <div className="book-card__genre-badge">{book.genre}</div>
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">by {book.author}</p>
        <p className="book-card__description">{book.description}</p>

        {(book.status ||
          book.genre ||
          book.progress ||
          book.isFavorite ||
          book.dateFinished) && (
          <div className="book-card__meta">
            {book.status && <div>Status: {book.status}</div>}
            {book.genre && (
              <div
                className={`book-card__genre-dot genre-${book.genre
                  .toLowerCase()
                  .replace(/\\s+/g, "-")}`}
                title={book.genre}
                aria-label={`Genre: ${book.genre}`}
              ></div>
            )}
            {book.progress && (
              <div className="book-card__progress">
                <strong>Progress:</strong> {book.progress}
              </div>
            )}
            {book.dateFinished && <div>Finished: {book.dateFinished}</div>}
          </div>
        )}

        {(onEdit || onRemove) && (
          <div className="book-card__buttons">
            {onEdit && <button onClick={onEdit}>Edit</button>}
            {onRemove && <button onClick={onRemove}>Remove</button>}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;
