import { useEffect } from "react";
import "./ModalWithForm.css";
import leafXIcon from "../../assets/leaf-x.png";
import "../BookModalPreview/BookModalPreview.css";

function ModalWithForm({
  onClose,
  children,
  contentClassName = "",
  isPreview = false,
  isDarkMode = false,
}) {
  function handleBackdropClick(e) {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  }

  return (
    <div
      className={`modal ${isDarkMode ? "dark" : ""}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`modal__content ${contentClassName} ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <button
          className={`modal__close ${isPreview ? "modal__close--large" : ""}`}
          onClick={onClose}
        >
          <img src={leafXIcon} alt="Close" className="modal__close-icon" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;
