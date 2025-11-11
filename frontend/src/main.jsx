import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const basename =
  import.meta.env.VITE_APP_BASENAME ||
  (import.meta.env.MODE === "development" ? "/" : "/multichannel-sprint0");

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter basename={basename}>
    <App />
  </HashRouter>
);
