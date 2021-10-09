import "./styles.css";
import "./styles.css";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import SucessMessage from "../../components/ToastifyPopups/sucessMessage";
import ErrorMessage from "../../components/ToastifyPopups/errorMessage";
import { AuthContext } from "../../context/auth";

function CreateCharges() {
  const { register, handleSubmit } = useForm();

  const { login } = useContext(AuthContext);
  const history = useHistory();

  async function onSubmit(data) {
    console.log(data);
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
        login(dados.token);
        localStorage.setItem("user", dados.token);
        history.push("/home");
        return SucessMessage(dados);
      }
      return ErrorMessage(dados);
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  return (
    <div className="container-form-create-charges ">
      <p>// CRIAR COBRANÇA</p>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-unic-input">
            <select {...register("cliente", { require: true })} id="">
              <option value="1">Carlin</option>
              <option value="2">Carlin</option>
              <option value="3">Carlin</option>
              <option value="4">Carlin</option>
              <option value="5">Carlin</option>
            </select>
          </div>
          <div className="container-unic-input">
            <label htmlFor="descricao">Descriçao</label>
            <input
              type="text"
              id="descricao"
              placeholder="A descrição informada será impressa no boleto."
              {...register("descricao", { require: true })}
            />
          </div>
          <div className="container-unic-input">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              placeholder="Selecione um status"
              {...register("status", { require: true })}
            />
          </div>
          <div>
            <div className="container-double-form">
              <div>
                <label htmlFor="valor">Valor</label>
                <input
                  type="text"
                  id="valor"
                  placeholder="0,00"
                  {...register("valor", { require: true })}
                />
              </div>

              <div>
                <label htmlFor="vencimento">Vencimento</label>
                <input
                  type="date"
                  id="vencimento"
                  {...register("vencimento", { require: true })}
                />
              </div>
            </div>
          </div>
          <div className="container-buttonsClient">
            <button className="btn btn-white">Cancelar</button>
            <button type="submit" className="btn btn-pink">
              Criar cobranças
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCharges;
