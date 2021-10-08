import { useState, createContext } from "react";
import ErrorMessage from "../components/ToastifyPopups/errorMessage";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const hasToken = localStorage.getItem("user");

  const [token, setToken] = useState(hasToken ? hasToken : "");
  const [user, setUser] = useState({
    id: "",
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cpf: "",
  });
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

      setUser(dados.usuario);
      console.log(response);
      if (response.ok) {
        setToken(dados.token);
        localStorage.setItem("user", dados.token);
        console.log("1");
        SucessMessage(dados);
        return !!dados.token;
      }
      return ErrorMessage(dados);
    } catch (error) {
      console.log("2");
      return ErrorMessage(error.message);
    }
  }

  function logout() {
    setToken("");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
