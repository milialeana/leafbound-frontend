import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import "./EditProfileModal.css";

function EditProfileModal({ onClose, onSave, isDarkMode, currentUser }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setErrors,
    setIsValid,
    resetForm,
  } = useFormAndValidation();

  useEffect(() => {
    resetForm({
      name: currentUser.name || "",
      avatar: currentUser.avatar || "",
    });
  }, [currentUser, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const avatarUrl = values.avatar.trim();

    const imagePattern = /\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?(#.*)?$/i;

    if (avatarUrl && !imagePattern.test(avatarUrl)) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Please enter a valid image URL (jpg, png, gif, etc.)",
      }));
      setIsValid(false);
      return;
    }

    onSave({
      name: values.name.trim(),
      avatar: values.avatar.trim(),
    });
  };

  return (
    <ModalWithForm
      onClose={onClose}
      isDarkMode={isDarkMode}
      contentClassName="modal__content--form"
    >
      <h2 className="modal-form__title">Edit Profile</h2>
      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        <label className="modal-form__label" htmlFor="avatar-input">
          Profile Picture URL
          <input
            id="avatar-input"
            name="avatar"
            type="url"
            autoComplete="off"
            className="modal-form__input"
            value={values.avatar || ""}
            onChange={handleChange}
            placeholder="https://example.com/avatar.png"
          />
          {errors.avatar && (
            <span className="modal-form__error">{errors.avatar}</span>
          )}
        </label>

        <label className="modal-form__label" htmlFor="name-input">
          Display Name
          <input
            id="name-input"
            name="name"
            type="text"
            autoComplete="name"
            className="modal-form__input"
            required
            value={values.name || ""}
            onChange={handleChange}
            placeholder="Your Display Name"
          />
          {errors.name && (
            <span className="modal-form__error">{errors.name}</span>
          )}
        </label>

        <button
          type="submit"
          className="modal-form__button"
          disabled={!isValid}
        >
          Save Changes
        </button>
      </form>
    </ModalWithForm>
  );
}

export default EditProfileModal;
