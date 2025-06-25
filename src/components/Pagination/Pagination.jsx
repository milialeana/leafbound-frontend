import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        ‹ Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`pagination__button ${
            currentPage === i + 1 ? "pagination__button--active" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="pagination__button"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>
    </div>
  );
}

export default Pagination;
