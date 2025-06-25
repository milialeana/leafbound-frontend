import "./ProfileSearchBar.css";
import {
  STATUS_OPTIONS,
  GENRE_OPTIONS,
  PROGRESS_OPTIONS,
} from "../../utils/constants";
import { FaSearch, FaRedo } from "react-icons/fa";

function ProfileSearchBar({ search, onSearchChange, filters, onFilterChange }) {
  const handleReset = () => {
    onSearchChange("");
    onFilterChange("status", "");
    onFilterChange("genre", "");
    onFilterChange("progress", "");
    onFilterChange("isFavorite", false);
  };

  return (
    <div className="profile-search-bar">
      <div className="profile-search-bar__input-wrapper">
        <FaSearch className="profile-search-bar__icon" />
        <input
          type="text"
          placeholder="Search your library..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="profile-search-bar__input"
        />
        <button
          className="profile-search-bar__reset"
          onClick={handleReset}
          title="Clear all filters"
        >
          <FaRedo />
        </button>
      </div>

      <div className="profile-search-bar__filters">
        <select
          className="profile-search-bar__select"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          className="profile-search-bar__select"
          value={filters.genre}
          onChange={(e) => onFilterChange("genre", e.target.value)}
        >
          <option value="">All Genres</option>
          {GENRE_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          className="profile-search-bar__select"
          value={filters.progress}
          onChange={(e) => onFilterChange("progress", e.target.value)}
        >
          <option value="">All Progress</option>
          {PROGRESS_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <label className="profile-search-bar__checkbox">
          <input
            type="checkbox"
            checked={filters.isFavorite}
            onChange={(e) => onFilterChange("isFavorite", e.target.checked)}
          />
          Favorites
        </label>
      </div>
    </div>
  );
}

export default ProfileSearchBar;
