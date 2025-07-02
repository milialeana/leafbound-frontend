import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SaveBookModal.css";

import {
  STATUS_OPTIONS,
  GENRE_OPTIONS,
  PROGRESS_OPTIONS,
} from "../../utils/constants";

function SaveBookModal({ onClose, onSave, book, isDarkMode }) {
  const [status, setStatus] = useState(book?.status || "Want to Read");
  const [genre, setGenre] = useState(book?.genre || "Fantasy");
  const [notes, setNotes] = useState(book?.notes || "");
  const [isFavorite, setIsFavorite] = useState(book?.isFavorite || false);
  const [progress, setProgress] = useState(book?.progress || "Not Started");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBook = {
      ...book,
      status,
      genre,
      notes,
      isFavorite,
      progress,
      dateSaved: book?.dateSaved || new Date().toISOString(),
    };

    onSave(updatedBook);
    onClose();
  };

  return (
    <ModalWithForm
      onClose={onClose}
      isDarkMode={isDarkMode}
      contentClassName="modal__content--form"
    >
      <h2 className="save-book__title">{book ? "Edit Book" : "Save Book"}</h2>
      <form className="save-book__form" onSubmit={handleSubmit} noValidate>
        <label className="save-book__label" htmlFor="status-select">
          Status
          <select
            id="status-select"
            name="status"
            className="save-book__input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label className="save-book__label" htmlFor="genre-select">
          Genre
          <select
            id="genre-select"
            name="genre"
            className="save-book__input"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {GENRE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label className="save-book__label" htmlFor="progress-select">
          Progress
          <select
            id="progress-select"
            name="progress"
            className="save-book__input"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          >
            {PROGRESS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label
          className="save-book__label save-book__label--full"
          htmlFor="book-notes"
        >
          Notes
          <textarea
            id="book-notes"
            name="notes"
            className="save-book__input"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any thoughts or reminders..."
          />
        </label>
        <label className="save-book__favorite" htmlFor="book-favorite">
          <input
            id="book-favorite"
            name="isFavorite"
            type="checkbox"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
          Mark as Favorite
        </label>
        <button type="submit" className="save-book__button">
          {book ? "Update Book" : "Save Book"}
        </button>
      </form>
    </ModalWithForm>
  );
}

export default SaveBookModal;
