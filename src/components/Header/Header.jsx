import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import leafCrown from "../../assets/leaf-crown.png";

function Header({
  onSignInClick,
  onSignUpClick,
  isDarkMode,
  isLoggedIn,
  currentUser,
  onLogout,
}) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef();

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`header ${isDarkMode ? "header--dark" : ""}`}>
      <nav className="header__container">
        <div className="header__brand-row">
          <Link to="/" className="header__logo">
            <img src={leafCrown} alt="leaf" className="header__logo-icon" />
            Leafbound
          </Link>

          <div className="header__auth-buttons" ref={buttonRef}>
            {!isLoggedIn ? (
              <>
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
              </>
            ) : (
              <>
                <div className="header__user-row">
                  <Link
                    to="/profile"
                    className="header__user-info"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="header__avatar"
                    />
                    <span className="header__username">
                      Hi, {currentUser.name}
                    </span>
                  </Link>

                  <button
                    className={`header__menu-toggle ${
                      isMenuOpen ? "header__menu-toggle--open" : ""
                    }`}
                    onClick={handleToggleMenu}
                  >
                    ⋯
                  </button>
                </div>

                {isMenuOpen && (
                  <div className="header__dropdown">
                    <button
                      className="header__dropdown-button"
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
