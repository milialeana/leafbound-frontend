import "./ProfileHeader.css";

function ProfileHeader({ currentUser, onEditProfileClick, onLogout }) {
  return (
    <div className="profile-header">
      <div className="profile-header__info">
        <img
          src={currentUser?.avatar || "/default-avatar.png"}
          alt={currentUser?.name || "User"}
          className="profile-header__avatar"
        />
        <h2 className="profile-header__name">
          {currentUser?.name || "Unnamed User"}
        </h2>
        <p className="profile-header__email">{currentUser?.email || ""}</p>
      </div>
      <div className="profile-header__actions">
        <button className="profile-header__button" onClick={onEditProfileClick}>
          Edit Profile
        </button>
        <button
          className="profile-header__button profile-header__button--logout"
          onClick={onLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
