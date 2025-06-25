import "./BookCard.css";
import plusIcon from "../../assets/add-book.svg";

function BookCard({
  book,
  onPreview,
  onSaveClick,
  onEdit,
  onRemove,
  isDarkMode,
  isLoggedIn,
}) {
  return (
    <div className={`book-card ${isDarkMode ? "dark" : ""}`}>
      {isLoggedIn && onSaveClick && (
        <button
          className="book-card__save-button"
          title="Add to Library"
          onClick={() => onSaveClick(book)}
        >
          <img src={plusIcon} alt="Add" />
        </button>
      )}

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

        {(onEdit || onRemove) && (
          <div className="book-card__buttons">
            {onEdit && <button onClick={onEdit}>Edit</button>}
            {onRemove && (
              <button
                className="book-card__button--remove"
                onClick={() => onRemove(book._id || book.id)}
              >
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;
