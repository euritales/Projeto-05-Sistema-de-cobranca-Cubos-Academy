import { useState } from "react";
import { createContext } from "react";
import ErrorMessage from "../components/ToastifyPopups/errorMessage";
import SucessMessage from "../components/ToastifyPopups/sucessMessage";
import { useHistory } from "react-router-dom";

export const ChargeContext = createContext();

export const ChargeContextProvider = ({ children }) => {
  const history = useHistory();
  const [charges, setCharges] = useState([]);

  async function getCharges(token) {
    try {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/charges",
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dados = await response.json();
      console.log(dados);

      if (response.ok) {
        return setCharges(dados);
      }
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  async function editCharges({ token, data }) {
    const body = {
      cliente: data.cliente,
      data_vencimento: data.data_vencimento,
      descricao: data.descricao,
      status: data.status,
      valor: data.valor,
    };
    const response = await fetch(
      "https://cubosacademy-projeto-5.herokuapp.com/charges",
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

  async function createCharges({ data, token }) {
    try {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/charges",
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
        history.push("/charges");
        return SucessMessage(dados);
      }
      return ErrorMessage(dados);
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  return (
    <ChargeContext.Provider //checkList integração:
      value={{
        charges,
        setCharges,
        createCharges,
        editCharges,
        getCharges,
      }}
    >
      {children}
    </ChargeContext.Provider>
  );
};
