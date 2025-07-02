import { useEffect } from "react";
import "./Toast.css";

function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast">
      <p className="toast__message">{message}</p>
    </div>
  );
}

export default Toast;
