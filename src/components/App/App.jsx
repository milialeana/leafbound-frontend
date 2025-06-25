import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { searchBooks } from "../../utils/GoogleBooksApi";
import { verifyToken } from "../../utils/auth";
import Toast from "../Toast/Toast";

const LOCAL_STORAGE_USER_KEY = "leafbound-currentUser";
const LOCAL_STORAGE_LOGIN_KEY = "leafbound-isLoggedIn";
const LOCAL_STORAGE_THEME_KEY = "leafbound-theme";

function App() {
  const [toastData, setToastData] = useState({ message: "", type: "success" });
  const [activeModal, setActiveModal] = useState(null);
  const [bookToSave, setBookToSave] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [randomBooks, setRandomBooks] = useState([]);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return savedUser
      ? JSON.parse(savedUser)
      : {
          name: "Kate",
          avatar: "https://i.pravatar.cc/150?u=fakeuser",
          email: "kate@example.com",
          savedBooks: [],
        };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY) === "true"
  );

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_THEME_KEY) === "true"
  );

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_LOGIN_KEY, isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, isDarkMode);
  }, [isDarkMode]);

  const showToast = (message, type = "success") => {
    setToastData({ message, type });
    setTimeout(() => setToastData({ message: "", type: "success" }), 3000);
  };

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      verifyToken(token)
        .then((userData) => {
          setCurrentUser((prev) => ({ ...prev, ...userData }));
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token invalid:", err);
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    searchBooks("fiction", 20)
      .then((data) => {
        if (data.items?.length) {
          const shuffled = data.items.sort(() => 0.5 - Math.random());
          const randomThree = shuffled.slice(0, 4).map((item) => {
            const info = item.volumeInfo || {};
            return {
              id: item.id,
              title: info.title || "Untitled",
              author: (info.authors || ["Unknown"]).join(", "),
              description: info.description || "No description available.",
              coverImage: info.imageLinks?.thumbnail || "/default-book.png",
              googleId: item.id,
            };
          });
          setRandomBooks(randomThree);
        }
      })
      .catch(console.error);
  }, []);

  const handleSaveBook = (book) => {
    const alreadySaved = currentUser.savedBooks.some(
      (saved) => saved.googleId === book.googleId
    );

    if (alreadySaved) {
      showToast("You've already saved this book to your library!", "warning");
      return;
    }

    showToast("Book saved to your library!", "success");
    setCurrentUser((u) => ({
      ...u,
      savedBooks: [...u.savedBooks, book],
    }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser((u) => ({ ...u, savedBooks: [] }));
  };

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const openEditProfile = () => setIsEditModalOpen(true);

  return (
    <Router basename="/leafbound">
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
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  isDarkMode={isDarkMode}
                  toggleTheme={toggleTheme}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onEditProfileClick={openEditProfile}
                  onSaveBookClick={handleSaveBook}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />

        {activeModal === "login" && (
          <LoginModal
            onClose={() => setActiveModal(null)}
            onSignUpClick={() => setActiveModal("register")}
            onLogin={() => {
              setIsLoggedIn(true);
              setActiveModal(null);
            }}
            contentClassName="modal__content--form"
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            onClose={() => setActiveModal(null)}
            onSignInClick={() => setActiveModal("login")}
            onRegister={() => {
              setIsLoggedIn(true);
              setActiveModal(null);
            }}
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
      </div>

      {toastData.message && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setToastData({ message: "", type: "success" })}
        />
      )}
    </Router>
  );
}

export default App;
