import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import leafCrown from "../../assets/leaf-crown.png";

function Header({ onSignInClick, onSignUpClick }) {
  const location = useLocation();

  {
    location.pathname !== "/profile" && (
      <>
        <button onClick={onSignInClick}>Sign In</button>
        <button onClick={onSignUpClick}>Sign Up</button>
      </>
    );
  }
  return (
    <header className="header">
      <nav className="header__container">
        <div className="header__brand">
          <Link to="/" className="header__logo">
            <img src={leafCrown} alt="leaf" className="brand-leaf" />
            Leafbound
          </Link>

          <ul className="header__links">
            <li>
              <Link to="/">Home</Link>
            </li>
            {location.pathname !== "/about" && (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="header__auth-buttons">
          <button className="header__button" onClick={onSignInClick}>
            Sign In
          </button>
          <button
            className="header__button header__button--signup"
            onClick={onSignUpClick}
          >
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
