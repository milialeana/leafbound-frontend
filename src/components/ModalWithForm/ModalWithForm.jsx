import React from "react";
import "./ModalWithForm.css";
import leafXIcon from "../../assets/leaf-x.png";
import "../ModalPreview/ModalPreview.css";

function ModalWithForm({
  onClose,
  children,
  contentClassName = "",
  isPreview = false,
}) {
  function handleBackdropClick(e) {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  }

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className={`modal__content ${contentClassName}`}>
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
