import { useState, createContext } from "react";
import ErrorMessage from "../components/ToastifyPopups/errorMessage";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const hasToken = localStorage.getItem("user");
  const history = useHistory();
  const [token, setToken] = useState(hasToken ? hasToken : "");

  async function login(data) {
    try {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/login",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dados = await response.json();

      if (response.ok) {
        setToken(dados.token);
        localStorage.setItem("user", dados.token);
        history.push("/home");
        return SucessMessage(dados);
      }
      return ErrorMessage(dados);
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  function logout() {
    setToken("");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
