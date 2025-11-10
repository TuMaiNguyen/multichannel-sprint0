import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const BASENAME = import.meta.env.VITE_APP_BASENAME || "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter basename={BASENAME}>
      <App />
    </HashRouter>
  </React.StrictMode>
);
