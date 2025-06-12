import React from "react";
import "./QuoteBar.css";
import leafCrown from "../../assets/leaf-crown.png";

function QuoteBar() {
  return (
    <div className="quote-bar">
      <p>
        <img src={leafCrown} alt="leaf" className="quote-leaf" />
        <span className="quote-mark">“</span>But such was his state of mind that
        two bottles were not enough to extinguish his thoughts; so he remained,
        too drunk to fetch any more wine, not drunk enough to forget, seated in
        front of his two empty bottles, with his elbows on a rickety table,
        watching all the specters that Hoffman scattered across manuscripts
        moist with punch, dancing like a cloud of fantastic black dust in the
        shadows thrown by his long-wicked candle.
        <span className="quote-mark">”</span> -{" "}
        <em>The Count of Monte Cristo</em>
        <img src={leafCrown} alt="leaf" className="quote-leaf" />
      </p>
    </div>
  );
}

export default QuoteBar;
