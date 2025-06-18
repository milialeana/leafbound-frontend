import React, { useEffect, useState, useRef } from "react";
import "./QuoteBar.css";
import leafCrown from "../../assets/leaf-crown.png";
import quotes from "../../utils/quotes";

function QuoteBar({ onHeightChange }) {
  const [quote, setQuote] = useState(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  });
  const [fade, setFade] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const quoteRef = useRef();

  const getNewQuote = (excludeQuote) => {
    const filtered = quotes.filter((q) => q.id !== excludeQuote?.id);
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  const handleRefresh = () => {
    setFade(true);
    setTimeout(() => {
      setQuote((prev) => getNewQuote(prev));
      setFade(false);
    }, 400);
  };

  const formatQuote = (quote) => (
    <>
      {quote.quote}
      <span className="quote-bar__mark">”</span> — <em>{quote.book}</em> by{" "}
      {quote.author}
    </>
  );

  useEffect(() => {
    setQuote(getNewQuote(null));
  }, []);

  useEffect(() => {
    if (!quoteRef.current || !onHeightChange) return;

    const observer = new ResizeObserver(([entry]) => {
      onHeightChange(Math.ceil(entry.contentRect.height));
    });

    observer.observe(quoteRef.current);
    return () => observer.disconnect();
  }, [onHeightChange]);

  return (
    <div className="quote-bar" id="quote-bar" ref={quoteRef}>
      <button className="quote-bar__refresh" onClick={handleRefresh}>
        ↻
      </button>
      <p
        className={`quote-bar__text ${fade ? "fade" : ""} ${
          expanded ? "quote-bar__text--expanded" : "quote-bar__text--truncated"
        }`}
      >
        <img src={leafCrown} alt="leaf" className="quote-bar__leaf" />
        <span className="quote-bar__mark">“</span>
        {quote ? formatQuote(quote) : <em>Loading quote...</em>}
        <img src={leafCrown} alt="leaf" className="quote-bar__leaf" />
      </p>
    </div>
  );
}

export default QuoteBar;
