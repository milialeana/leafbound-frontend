import "./QuoteToggle.css";
import quoteleaf from "../../assets/quote-mark-leaf.png";

function QuoteToggle({ quote, isVisible, onToggle, onNewQuote }) {
  return (
    <div className="main__quote-toggle">
      {isVisible ? (
        <blockquote
          className="main__quote-box"
          onClick={onToggle}
          aria-label="Hide quote"
        >
          “{quote.quote}”
          <cite>
            – {quote.author}, <em>{quote.book}</em>
          </cite>
        </blockquote>
      ) : (
        <button
          className="main__quote-button"
          onClick={onNewQuote}
          aria-label="Show quote"
        >
          <img
            src={quoteleaf}
            alt="Toggle quote"
            className="main__quote-icon"
          />
        </button>
      )}
    </div>
  );
}

export default QuoteToggle;
