import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/auth";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
