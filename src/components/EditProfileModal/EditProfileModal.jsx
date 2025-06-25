import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ onClose, onSave, isDarkMode, currentUser }) {
  const [name, setName] = useState(currentUser.name || "");
  const [avatar, setAvatar] = useState(currentUser.avatar || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, avatar });
  };

  return (
    <ModalWithForm
      onClose={onClose}
      isDarkMode={isDarkMode}
      contentClassName="modal__content--form"
    >
      <h2 className="edit-profile-form__title">Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit} noValidate>
        <label className="edit-profile-form__label">
          Profile Picture URL
          <input
            type="url"
            className="edit-profile-form__input"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
        </label>

        <label className="edit-profile-form__label">
          Display Name
          <input
            type="text"
            className="edit-profile-form__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="edit-profile-form__button">
          Save Changes
        </button>
      </form>
    </ModalWithForm>
  );
}

export default EditProfileModal;
