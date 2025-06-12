import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import "./RegisterModal.css";

function RegisterModal({ onClose, onSignInClick }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setErrors,
    setIsValid,
    resetForm,
  } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = { ...errors };
    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      setErrors(newErrors);
      setIsValid(false);
      return;
    }

    console.log("Register form submitted:", values);

    resetForm();
    onClose();
  };

  return (
    <ModalWithForm onClose={onClose} contentClassName="modal__content--form">
      <h2 className="modal-form__title">Join Leafbound</h2>
      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        <label className="modal-form__label">
          Username
          <input
            type="text"
            name="username"
            className="modal-form__input"
            minLength="5"
            required
            value={values.username || ""}
            onChange={handleChange}
          />
          {errors.username && (
            <span className="modal-form__error">{errors.username}</span>
          )}
        </label>

        <label className="modal-form__label">
          Profile Picture URL
          <input
            type="url"
            name="profileImage"
            className="modal-form__input"
            placeholder="https://example.com/image.jpg"
            value={values.profileImage || ""}
            onChange={handleChange}
          />
          {errors.profileImage && (
            <span className="modal-form__error">{errors.profileImage}</span>
          )}
        </label>

        <label className="modal-form__label">
          Email
          <input
            type="email"
            name="email"
            className="modal-form__input"
            required
            value={values.email || ""}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="modal-form__error">{errors.email}</span>
          )}
        </label>

        <label className="modal-form__label">
          Password
          <input
            type="password"
            name="password"
            className="modal-form__input"
            required
            value={values.password || ""}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="modal-form__error">{errors.password}</span>
          )}
        </label>

        <label className="modal-form__label">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            className="modal-form__input"
            required
            value={values.confirmPassword || ""}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="modal-form__error">{errors.confirmPassword}</span>
          )}
        </label>

        <button
          type="submit"
          className="modal-form__button"
          disabled={!isValid}
        >
          Sign Up
        </button>

        <p className="modal-form__footer">
          Already have an account?{" "}
          <span className="modal-form__link" onClick={onSignInClick}>
            Log In
          </span>
        </p>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
