import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProviderWrapper } from "./Context/Auth.Context.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router  className="noise">
      <AuthProviderWrapper className="noise h-full">
        <NextUIProvider  className="noise h-full">
        <main className="text-foreground bg-background h-full">
          <App />
          </main>
        </NextUIProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
