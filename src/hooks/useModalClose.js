import { useEffect } from "react";

export default function useModalClose(ref, onClose) {
  useEffect(() => {
    function handleClose(e) {
      if (e.key === "Escape") onClose();
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }

    document.addEventListener("keydown", handleClose);
    document.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
      document.removeEventListener("mousedown", handleClose);
    };
  }, [ref, onClose]);
}