import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/fonts.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./UseAuth";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
