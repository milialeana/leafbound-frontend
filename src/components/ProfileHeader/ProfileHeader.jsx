import "./ProfileHeader.css";

function ProfileHeader({ currentUser, onEditProfileClick, onLogout }) {
  return (
    <div className="profile__top-bar">
      <div className="profile__image-wrapper">
        <img
          src={currentUser.avatar}
          alt="User Avatar"
          className="profile__image"
        />
        <button
          className="profile__edit-icon"
          onClick={onEditProfileClick}
          aria-label="Edit Profile"
        >
          ✏️
        </button>
      </div>

      <div className="profile__info">
        <h2 className="profile__name">{currentUser.name}</h2>
        <button
          className="profile__logout-button"
          onClick={onLogout}
          aria-label="Log Out"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
