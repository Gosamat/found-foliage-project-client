import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProviderWrapper } from "./Context/Auth.Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <NextUIProvider>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </NextUIProvider>
    </Router>
  </React.StrictMode>
);
