import "./globals.css";

import App from "./App";
import { AuthProvider } from "./contexts/auth.context";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";

document.getElementsByTagName("html")[0].setAttribute("class", "dark");

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <Toaster theme="dark" />
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
}
