import "./Footer.css";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {location.pathname !== "/about" && (
        <ul className="footer__links">
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      )}
      <p>&copy; {currentYear} Leafbound. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
