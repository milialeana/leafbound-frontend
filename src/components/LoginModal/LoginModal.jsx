import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";
import defaultAvatar from "../../assets/default-avatar.png";

function LoginModal({ onClose, onSignUpClick, contentClassName, onLogin }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    resetForm();
    setApiError("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate successful login, to delete after
    const mockUser = {
      name: "Demo User",
      email: values.email || "demo@example.com",
      avatar: defaultAvatar,
      savedBooks: [],
    };

    onLogin(mockUser);
  };

  return (
    <ModalWithForm onClose={onClose} contentClassName={contentClassName}>
      <h2 className="modal-form__title">Welcome Back</h2>
      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        <label className="modal-form__label" htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            className="modal-form__input"
            required
            value={values.email || ""}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && (
            <span className="modal-form__error">{errors.email}</span>
          )}
        </label>

        <label className="modal-form__label" htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            className="modal-form__input"
            required
            value={values.password || ""}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="modal-form__error">{errors.password}</span>
          )}
        </label>

        {apiError && <p className="modal-form__error">{apiError}</p>}

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
