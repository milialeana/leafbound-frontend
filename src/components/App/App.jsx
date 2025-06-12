import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import About from "../About/About";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import QuoteBar from "../QuoteBar/QuoteBar";
import Profile from "../Profile/Profile";

function App() {
  const [activeModal, setActiveModal] = useState(null); // 'login' | 'register' | null
  const [isLoggedIn, setIsLoggedIn] = useState(true); // mock login state
  const [isDarkMode, setIsDarkMode] = useState(false);

  const openLoginModal = () => setActiveModal("login");
  const openRegisterModal = () => setActiveModal("register");
  const closeModal = () => setActiveModal(null);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  useEffect(() => {
    const updateQuoteHeight = () => {
      const quoteBar = document.querySelector(".quote-bar");
      if (quoteBar) {
        document.documentElement.style.setProperty(
          "--quote-bar-height",
          `${quoteBar.offsetHeight}px`
        );
      }
    };
    updateQuoteHeight();
    window.addEventListener("resize", updateQuoteHeight);
    return () => window.removeEventListener("resize", updateQuoteHeight);
  }, []);

  return (
    <Router>
      <div className={`page ${isLoggedIn && isDarkMode ? "dark" : ""}`}>
        <QuoteBar />
        <Header
          onSignInClick={openLoginModal}
          onSignUpClick={openRegisterModal}
        />

        <Routes>
          <Route
            path="/"
            element={<Main onSignUpClick={openRegisterModal} />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={
              <Profile
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>

        <Footer />

        {activeModal === "login" && (
          <LoginModal
            onClose={closeModal}
            onSignUpClick={openRegisterModal}
            contentClassName="modal__content--form"
          />
        )}

        {activeModal === "register" && (
          <RegisterModal
            onClose={closeModal}
            onSignInClick={openLoginModal}
            contentClassName="modal__content--form"
          />
        )}
      </div>
    </Router>
  );
}

export default App;
