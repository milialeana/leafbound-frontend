import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import leafCrown from "../../assets/leaf-crown.png";

function Header({ onSignInClick, onSignUpClick }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef();

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <nav className="header__container">
        <div className="header__brand-row">
          <Link to="/" className="header__logo">
            <img src={leafCrown} alt="leaf" className="header__logo-icon" />
            Leafbound
          </Link>

          <div className="header__auth-buttons" ref={buttonRef}>
            <button className="header__button" onClick={onSignInClick}>
              Sign In
            </button>
            <button
              className="header__button header__button--signup"
              onClick={onSignUpClick}
            >
              Sign Up
            </button>
            <button
              className={`header__menu-toggle ${
                isMenuOpen ? "header__menu-toggle--open" : ""
              }`}
              onClick={handleToggleMenu}
            >
              ⋯
            </button>

            {isMenuOpen && (
              <div className="header__dropdown">
                <button
                  className="header__dropdown-button"
                  onClick={() => {
                    onSignInClick();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
                <button
                  className="header__dropdown-button"
                  onClick={() => {
                    onSignUpClick();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
