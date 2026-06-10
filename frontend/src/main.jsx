import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./App.css";

import { BrowserRouter } from "react-router-dom";

import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <BrowserRouter>

    <AuthProvider>

      <CarritoProvider>

        <App />

      </CarritoProvider>

    </AuthProvider>

  </BrowserRouter>

);