import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import SaveBookModal from "../SaveBookModal/SaveBookModal";
import ProfileSearchBar from "../ProfileSearchBar/ProfileSearchBar";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import Pagination from "../Pagination/Pagination";
import BookModalPreview from "../BookModalPreview/BookModalPreview";
import Preloader from "../Preloader/Preloader";

import lightBackgroundImage from "../../assets/light-mode.jpg";
import darkBackgroundImage from "../../assets/dark-mode.jpg";
import leafLightIcon from "../../assets/leaf-light.png";
import leafDarkIcon from "../../assets/leaf-dark.png";

import "./Profile.css";

function Profile({
  isDarkMode,
  toggleTheme,
  isLoggedIn,
  currentUser,
  onEditProfileClick,
  setCurrentUser,
  showToast,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
    genre: "",
    progress: "",
    isFavorite: false,
  });

  const booksPerPage = 15;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBooks(currentUser.savedBooks || []);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [currentUser.savedBooks]);

  const handlePreview = (book) => setSelectedBook(book);
  const handleEdit = (book) => setBookToEdit(book);

  const handleRemove = (id) => {
    setBooks((prev) => prev.filter((b) => (b._id || b.id) !== id));
    setCurrentUser((prev) => ({
      ...prev,
      savedBooks: prev.savedBooks.filter((b) => (b._id || b.id) !== id),
    }));
    showToast("Book removed from your library");
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };

  const filteredBooks = books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.genre?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((book) => (filters.status ? book.status === filters.status : true))
    .filter((book) => (filters.genre ? book.genre === filters.genre : true))
    .filter((book) =>
      filters.progress ? book.progress === filters.progress : true
    )
    .filter((book) => !filters.isFavorite || book.isFavorite);

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (b.isFavorite && !a.isFavorite) return 1;
    if (a.isFavorite && !b.isFavorite) return -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = sortedBooks.slice(startIndex, startIndex + booksPerPage);

  return (
    <>
      <main
        className={`profile ${isDarkMode ? "dark" : "light"}`}
        style={{
          backgroundImage: `url(${
            isDarkMode ? darkBackgroundImage : lightBackgroundImage
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          paddingTop: "130px",
          fontFamily: '"Averia Serif Libre", serif',
        }}
      >
        <ProfileHeader
          currentUser={currentUser}
          onEditProfileClick={onEditProfileClick}
          onLogout={() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("leafbound-currentUser");
            localStorage.setItem("leafbound-isLoggedIn", "false");
            window.location.href = "/";
          }}
        />

        <ProfileSearchBar
          search={search}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <div className="profile__book-grid">
              {currentBooks.map((book) => (
                <BookCard
                  key={book._id || book.id}
                  book={book}
                  onPreview={handlePreview}
                  isDarkMode={isDarkMode}
                  onEdit={() => handleEdit(book)}
                  onRemove={() => handleRemove(book._id || book.id)}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      <button
        className="profile__theme-fab"
        onClick={toggleTheme}
        title="Toggle Theme"
      >
        <img
          src={isDarkMode ? leafLightIcon : leafDarkIcon}
          alt="Toggle Theme"
          className="profile__theme-icon"
        />
      </button>

      {bookToEdit && (
        <SaveBookModal
          book={bookToEdit}
          onClose={() => setBookToEdit(null)}
          isDarkMode={isDarkMode}
          onSave={(updatedBook) => {
            setBooks((prev) =>
              prev.map((b) =>
                (b._id || b.id) === updatedBook._id ? updatedBook : b
              )
            );
            setCurrentUser((u) => ({
              ...u,
              savedBooks: u.savedBooks.map((b) =>
                (b._id || b.id) === updatedBook._id ? updatedBook : b
              ),
            }));
            showToast("Book updated successfully!");
            setBookToEdit(null);
          }}
        />
      )}

      <BookModalPreview
        book={selectedBook}
        isDarkMode={isDarkMode}
        onClose={() => setSelectedBook(null)}
      />
    </>
  );
}

export default Profile;
