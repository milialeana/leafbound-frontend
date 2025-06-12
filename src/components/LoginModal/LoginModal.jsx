import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import "./LoginModal.css";

function LoginModal({ onClose, onSignUpClick, contentClassName }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example validation or API call
    console.log("Login submitted:", values);

    resetForm();
    onClose();
  };

  return (
    <ModalWithForm onClose={onClose} contentClassName={contentClassName}>
      <h2 className="modal-form__title">Welcome Back</h2>
      <form className="modal-form" onSubmit={handleSubmit} noValidate>
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

        <button
          type="submit"
          className="modal-form__button"
          disabled={!isValid}
        >
          Sign In
        </button>

        <p className="modal-form__footer">
          Don't have an account?{" "}
          <span className="modal-form__link" onClick={onSignUpClick}>
            Sign Up
          </span>
        </p>
      </form>
    </ModalWithForm>
  );
}

export default LoginModal;
