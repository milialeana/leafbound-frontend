import React from "react";
import "./BookCard.css";

function BookCard({ book, onPreview }) {
  return (
    <div className="book-card">
      <img
        src={book.coverImage}
        alt={book.title}
        className="book-card__image"
        onClick={() => onPreview(book)}
      />
      <div className="book-card__content">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-description">{book.description}</p>
      </div>
    </div>
  );
}

export default BookCard;
