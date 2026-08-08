import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { AssessmentProvider } from "./context/AssessmentContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />

      <AuthProvider>
        <AssessmentProvider>
        <App />
        </AssessmentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);