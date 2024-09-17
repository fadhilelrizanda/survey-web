import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Only one CSS import needed
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap icons
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Includes Popper.js, no need for separate imports

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
