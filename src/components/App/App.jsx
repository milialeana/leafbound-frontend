import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { secureThumbnail } from "../../utils/bookHelpers";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import About from "../About/About";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import QuoteBar from "../QuoteBar/QuoteBar";
import Profile from "../Profile/Profile";
import SaveBookModal from "../SaveBookModal/SaveBookModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { searchBooks } from "../../utils/GoogleBooksApi";
import Toast from "../Toast/Toast";
import defaultAvatar from "../../assets/default-avatar.png";

const LOCAL_STORAGE_USER_KEY = "leafbound-currentUser";
const LOCAL_STORAGE_LOGIN_KEY = "leafbound-isLoggedIn";
const LOCAL_STORAGE_THEME_KEY = "leafbound-theme";

function AppInner() {
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [bookToSave, setBookToSave] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [randomBooks, setRandomBooks] = useState([]);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return savedUser
      ? JSON.parse(savedUser)
      : { name: "", avatar: "", email: "", savedBooks: [] };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY) === "true"
  );

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === "true"
  );

  const handleFakeLogin = (userData = {}) => {
    const mockUser = {
      name: userData.name || "Demo User",
      email: userData.email || "demo@example.com",
      avatar: userData.avatar || defaultAvatar,
      savedBooks: [],
      ...userData,
    };
    setCurrentUser(mockUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(mockUser));
    setIsLoggedIn(true);
    localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, "true");
    setActiveModal(null);
  };

  const handleFakeRegister = handleFakeLogin;

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, isDarkMode);
  }, [isDarkMode]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  useEffect(() => {
    searchBooks("fiction", 20)
      .then((data) => {
        if (data.items?.length) {
          const shuffled = data.items.sort(() => 0.5 - Math.random());
          const randomFour = shuffled.slice(0, 4).map((item) => {
            const info = item.volumeInfo || {};
            return {
              id: item.id,
              title: info.title || "Untitled",
              author: (info.authors || ["Unknown"]).join(", "),
              description: info.description || "No description available.",
              coverImage:
                secureThumbnail(info.imageLinks?.thumbnail) ||
                "/default-book.png",
            };
          });
          setRandomBooks(randomFour);
        }
      })
      .catch(console.error);
  }, []);

  const handleSaveBook = (book) => {
    const alreadySaved = currentUser.savedBooks.some(
      (b) => b.id === book.id || b._id === book._id
    );

    if (alreadySaved) {
      showToast("You've already saved this book.");
      return;
    }

    const newBook = {
      ...book,
      _id: Date.now().toString(),
      status: "",
      genre: "",
      progress: "",
      notes: "",
      isFavorite: false,
      tags: [],
    };

    const updatedUser = {
      ...currentUser,
      savedBooks: [...currentUser.savedBooks, newBook],
    };

    setCurrentUser(updatedUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedUser));
    showToast("Book saved to your library!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser((u) => ({ ...u, savedBooks: [] }));
    localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, "false");
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const openEditProfile = () => setIsEditModalOpen(true);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        if (activeModal) setActiveModal(null);
        if (bookToSave) setBookToSave(null);
        if (isEditModalOpen) setIsEditModalOpen(false);
        if (selectedBook) setSelectedBook(null);
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, bookToSave, isEditModalOpen, selectedBook]);

  return (
    <div className={`page ${isLoggedIn && isDarkMode ? "dark" : ""}`}>
      <div className="fixed-top-bar">
        <QuoteBar />
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          currentUser={currentUser}
          isDarkMode={isDarkMode}
          onSignInClick={() => setActiveModal("login")}
          onSignUpClick={() => setActiveModal("register")}
        />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Main
              onSignUpClick={() => setActiveModal("register")}
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
              randomBooks={randomBooks}
              isLoggedIn={isLoggedIn}
              isDarkMode={isDarkMode}
              onSaveBookClick={handleSaveBook}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLogout={handleLogout}
              setCurrentUser={setCurrentUser}
              onEditProfileClick={openEditProfile}
              onSaveBookClick={handleSaveBook}
              showToast={showToast}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />

      {activeModal === "login" && (
        <LoginModal
          onClose={() => setActiveModal(null)}
          onSignUpClick={() => setActiveModal("register")}
          onLogin={handleFakeLogin}
          contentClassName="modal__content--form"
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          onClose={() => setActiveModal(null)}
          onSignInClick={() => setActiveModal("login")}
          onRegister={handleFakeRegister}
          contentClassName="modal__content--form"
        />
      )}

      {bookToSave && (
        <SaveBookModal
          onClose={() => setBookToSave(null)}
          book={bookToSave}
          isDarkMode={isDarkMode}
          onSave={(savedBook) => {
            handleSaveBook(savedBook);
            setBookToSave(null);
          }}
        />
      )}

      {isEditModalOpen && (
        <EditProfileModal
          onClose={() => setIsEditModalOpen(false)}
          currentUser={currentUser}
          isDarkMode={isDarkMode}
          onSave={(data) => {
            setCurrentUser((u) => ({ ...u, ...data }));
            showToast("Profile updated!");
            setIsEditModalOpen(false);
          }}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router basename="/leafbound-frontend">
      <AppInner />
    </Router>
  );
}

export default App;
