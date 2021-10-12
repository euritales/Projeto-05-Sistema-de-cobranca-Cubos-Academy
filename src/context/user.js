import { useState } from "react";
import { createContext } from "react";
import ErrorMessage from "../components/ToastifyPopups/errorMessage";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    id: "",
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cpf: "",
  });

  async function getUser(token) {
    try {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/users",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dados = await response.json();
      console.log({ dados });
      if (response.ok) {
        return setUser(dados[0]);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function editUser({ token, data }) {
    const body = {
      nome: data.nome,
      email: data.email,
      cpf: data.cpf,
      senha: data.senha,
      telefone: data.telefone,
    };
    const response = await fetch(
      "https://cubosacademy-projeto-5.herokuapp.com/users",
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const dados = await response.json();

    if (response.ok) {
      return SucessMessage(dados);
    }
    return ErrorMessage(dados);
  }

  async function createUser({ data }) {
    try {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/users",
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
        history.push("/");
        return SucessMessage(dados);
      }
    } catch (error) {
      console.log(error);
      return ErrorMessage(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        editUser,
        getUser,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
