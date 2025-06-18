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
import { searchBooks } from "../../utils/GoogleBooksApi";

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [randomBooks, setRandomBooks] = useState([]);

  const openLoginModal = () => {
    setActiveModal("login");
    setSelectedBook(null);
  };

  const openRegisterModal = () => {
    setActiveModal("register");
    setSelectedBook(null);
  };

  const closeModal = () => setActiveModal(null);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Escape key closes both modals and preview
  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        closeModal();
        setSelectedBook(null);
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  // Load 3 random books on app start
  useEffect(() => {
    searchBooks("fiction", 20)
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const shuffled = data.items.sort(() => 0.5 - Math.random());
          const randomThree = shuffled.slice(0, 3).map((item) => {
            const info = item.volumeInfo || {};
            return {
              id: item.id,
              title: info.title || "Untitled",
              author: (info.authors || ["Unknown"]).join(", "),
              description: info.description || "No description available.",
              coverImage: info.imageLinks?.thumbnail || "/default-book.png",
            };
          });
          setRandomBooks(randomThree);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch random books", err);
      });
  }, []);

  return (
    <Router>
      <div className={`page ${isLoggedIn && isDarkMode ? "dark" : ""}`}>
        <div className="fixed-top-bar">
          <QuoteBar />
          <Header
            onSignInClick={openLoginModal}
            onSignUpClick={openRegisterModal}
          />
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <Main
                onSignUpClick={openRegisterModal}
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
                randomBooks={randomBooks}
              />
            }
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
            onLogin={({ email, password }) => {
              console.log("Logging in with:", email, password);
              setIsLoggedIn(true);
              closeModal();
            }}
          />
        )}

        {activeModal === "register" && (
          <RegisterModal
            onClose={closeModal}
            onSignInClick={openLoginModal}
            onRegister={(userData) => {
              console.log("Registering:", userData);
              // TODO: send to backend
              setIsLoggedIn(true);
              closeModal();
            }}
            contentClassName="modal__content--form"
          />
        )}
      </div>
    </Router>
  );
}

export default App;
