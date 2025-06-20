import React from "react";
import "./BookCard.css";
import "../ModalPreview/ModalPreview.css";

function BookCard({ book, onPreview, isDarkMode }) {
  return (
    <div className={`book-card ${isDarkMode ? "dark" : ""}`}>
      <img
        src={book.coverImage}
        alt={book.title}
        className="book-card__image"
        onClick={() => onPreview(book)}
      />
      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">by {book.author}</p>
        <p className="book-card__description">{book.description}</p>
      </div>
    </div>
  );
}

export default BookCard;
