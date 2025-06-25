import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { v4 as uuidv4 } from "uuid";
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
    const savedBook = {
      ...book,
      _id: book?._id || uuidv4(),
      status,
      genre,
      notes,
      isFavorite,
      progress,
      dateSaved: book?.dateSaved || new Date().toISOString(),
    };
    onSave(savedBook);
  };

  return (
    <ModalWithForm
      onClose={onClose}
      isDarkMode={isDarkMode}
      contentClassName="modal__content--form"
    >
      <h2 className="save-book__title">{book ? "Edit Book" : "Save Book"}</h2>
      <form className="save-book__form" onSubmit={handleSubmit} noValidate>
        <label className="save-book__label">
          Status
          <select
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

        <label className="save-book__label">
          Genre
          <select
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

        <label className="save-book__label">
          Progress
          <select
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

        <label className="save-book__label save-book__label--full">
          Notes
          <textarea
            className="save-book__input"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any thoughts or reminders..."
          />
        </label>

        <label className="save-book__favorite">
          <input
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
