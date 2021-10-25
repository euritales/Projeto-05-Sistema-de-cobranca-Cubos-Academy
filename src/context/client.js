import { useState } from "react";
import { createContext } from "react";
import ErrorMessage from "../components/ToastifyPopups/errorMessage";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";
import { useHistory } from "react-router-dom";

export const ClientContext = createContext();

export const ClientContextProvider = ({ children }) => {
  const history = useHistory();
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState([]);
  const [statusEmdia, setStatusEmdia] = useState([]);
  const [statusInad, setStatusInad] = useState([]);
  const [statusClient, setStatusClient] = useState([]);

  async function getClients(token) {
    try {
      const response = await fetch(
        `https://cubosacademy-projeto-5.herokuapp.com/clients`,
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

  async function getClientStatus(token, status) {
    try {
      const response = await fetch(
        `https://cubosacademy-projeto-5.herokuapp.com/reports/clients/${status}`,
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
        return setStatusClient(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function getClientStatusEmdia(token) {
    try {
      const response = await fetch(
        `https://cubosacademy-projeto-5.herokuapp.com/reports/clients/em_dia`,
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
        return setStatusEmdia(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function getClientStatusInad(token) {
    try {
      const response = await fetch(
        `https://cubosacademy-projeto-5.herokuapp.com/reports/clients/inadimplente`,
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
        return setStatusInad(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function getClient({ token, id }) {
    try {
      const response = await fetch(
        `https://cubosacademy-projeto-5.herokuapp.com/clients/${id}`,
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
        return setClient(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function editClient({ data, token, id, setEditClients }) {
    const body = {
      nome: data.nome,
      cpf: data.cpf.replace(/[^0-9]/g, ""),
      email: data.email,
      telefone: data.telefone,
      cep: data.cep,
      bairro: data.bairro,
      cidade: data.cidade,
      logradouro: data.logradouro,
      complemento: data.complemento,
      // estado: data.estado,
      referencia: data.ponto_referencia,
    };
    const response = await fetch(
      `https://cubosacademy-projeto-5.herokuapp.com/clients/${id}`,
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
      setEditClients(false);
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
    <ClientContext.Provider
      value={{
        getClients,
        clients,
        getClientStatusEmdia,
        getClientStatusInad,
        statusInad,
        statusEmdia,
        getClient,
        client,
        createClient,
        editClient,
        getClientStatus,
        statusClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
