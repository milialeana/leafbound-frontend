import React from "react";
import "./Footer.css";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  return (
    <footer className="footer">
      {location.pathname !== "/about" && (
        <ul className="footer__links">
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      )}
      <p>&copy; 2025 Leafbound. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
