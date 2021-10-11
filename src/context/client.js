import { useState } from "react";
import { createContext } from "react";
import ErrorMessage from "../components/ToastifyPopups/errorMessage";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";
import { useHistory } from "react-router-dom";

export const ClientContext = createContext();

export const ClientContextProvider = ({ children }) => {
  const history = useHistory();
  const [clients, setClients] = useState([]);

  async function getClient(token) {
    try {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/clients",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dados = await response.json();

      if (response.ok) {
        return setClients(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function editClient({ token, data }) {
    const body = {
      nome: data.nome,
      email: data.email,
      cpf: data.cpf,
      telefone: data.telefone,
      cep: data.cep,
      logradouro: data.logradouro,
      bairro: data.bairro,
      estado: data.estado,
      cidade: data.cidade,
      complemento: data.complemento,
      referencia: data.referencia,
    };
    const response = await fetch(
      `https://cubosacademy-projeto-5.herokuapp.com/clients/${data.id}`,
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

  async function createClient({ data, token }) {
    try {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/clients",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const dados = await response.json();

      if (response.ok) {
        history.push("/clients");
        return SucessMessage(dados);
      }
      return ErrorMessage(dados);
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  return (
    <ClientContext.Provider //checkList integração: clientes, createCLiente,
      value={{
        clients,
        createClient,
        editClient,
        getClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
