import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./popup";
/**
 * @description create a root element
 */
const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
