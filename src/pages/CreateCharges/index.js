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
  const history = useHistory();

  async function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="container-form-create-charges ">
      <p>// CRIAR COBRANÇA</p>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-unic-input">
            <label htmlFor="cliente">Cliente</label>

            <select {...register("cliente", { require: true })} id="cliente">
              <option value="" disabled selected hidden>
                Selecione um cliente
              </option>
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
            <span>A descrição informada será impressa no boleto.</span>
          </div>
          <div className="container-unic-input">
            <label htmlFor="status">Status</label>
            <select {...register("status", { require: true })} id="status">
              <option
                value=""
                disabled
                selected
                hidden
                style={{ color: "#868686" }}
              >
                Selecione um estado
              </option>
              <option value="pago">PAGO</option>
              <option value="pendente">PENDENTE</option>
              <option value="vencido">VENCIDO</option>
            </select>
          </div>
          <div>
            <div className="container-double-form">
              <div>
                <label htmlFor="valor">Valor</label>
                <input
                  type="text"
                  id="valor"
                  defaultValue="R$"
                  placeholder="0,00"
                  {...register("valor", { require: true })}
                />
              </div>

              <div>
                <label htmlFor="data_vencimento">Vencimento</label>
                <input
                  type="date"
                  id="data_vencimento"
                  {...register("data_vencimento", { require: true })}
                />
              </div>
            </div>
          </div>
          <div className="container-buttonsClient">
            <button
              onClick={() => history.push("/charges")}
              className="btn btn-white"
            >
              Cancelar
            </button>
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
