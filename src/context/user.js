import { useState } from "react";
import { createContext } from "react";
import ErrorMessage from "../components/ToastifyPopups/errorMessage";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
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

  return (
    <UserContext.Provider
      value={{
        user,
        editUser,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
