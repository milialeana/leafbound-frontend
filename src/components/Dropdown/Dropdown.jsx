import React from "react";
import { createPortal } from "react-dom";

function Dropdown({ children }) {
  const container = document.getElementById("dropdown-root");
  return createPortal(children, container);
}

export default Dropdown;
