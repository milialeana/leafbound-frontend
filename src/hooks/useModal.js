import { useState } from "react";

export default function useModal() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (name) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);

  return { activeModal, openModal, closeModal };
}