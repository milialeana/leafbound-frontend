import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import defaultAvatar from "../../assets/default-avatar.png";
import "./RegisterModal.css";

function RegisterModal({ onClose, onSignInClick, onRegister }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    setErrors,
    setIsValid,
    resetForm,
  } = useFormAndValidation();

  const [apiError, setApiError] = useState("");

  useEffect(() => {
    resetForm();
    setApiError("");
  }, []);

  const validatePasswords = () => {
    if (values.password !== values.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      setIsValid(false);
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    const mockUser = {
      name: values.name || "User",
      email: values.email,
      avatar: defaultAvatar,
      savedBooks: [],
    };

    onRegister(mockUser);
  };

  return (
    <ModalWithForm onClose={onClose} contentClassName="modal__content--form">
      <h2 className="modal-form__title">Create Account</h2>
      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        <label className="modal-form__label">
          Name
          <input
            id="name-input"
            type="text"
            name="name"
            className="modal-form__input"
            required
            autoComplete="name"
            value={values.name || ""}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && (
            <span className="modal-form__error">{errors.name}</span>
          )}
        </label>

        <label className="modal-form__label">
          Email
          <input
            id="email-input"
            type="email"
            name="email"
            className="modal-form__input"
            required
            autoComplete="email"
            value={values.email || ""}
            onChange={handleChange}
            placeholder="Enter your email"
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
            placeholder="Create a password"
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
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <span className="modal-form__error">{errors.confirmPassword}</span>
          )}
        </label>

        {apiError && <p className="modal-form__error">{apiError}</p>}

        <button
          type="submit"
          className="modal-form__button"
          disabled={!isValid}
        >
          Register
        </button>

        <p className="modal-form__footer">
          Already have an account?{" "}
          <span className="modal-form__link" onClick={onSignInClick}>
            Sign In
          </span>
        </p>
      </form>
    </ModalWithForm>
  );
}

export default RegisterModal;
