import { createContext } from "react";
import ErrorMessage from "../components/ToastifyPopups/errorMessage";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";

export const UserContext = createContext();

export const UserContextProvider = () => {
  async function editUser({ data, token }) {
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
      // handleEditProfile(false);
      return SucessMessage(dados);
    }
    return ErrorMessage(dados);
  }

  return (
    <UserContext.Provider
      value={{
        editUser,
      }}
    ></UserContext.Provider>
  );
};
