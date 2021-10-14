import "./styles.css";
import "./styles.css";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { ChargeContext } from "../../context/charge";
import { ClientContext } from "../../context/client";

function CreateCharges() {
  const { register, handleSubmit } = useForm();
  const { token } = useContext(AuthContext);
  const { createCharges } = useContext(ChargeContext);
  const { getClients, clients } = useContext(ClientContext);

  const history = useHistory();

  useEffect(() => {
    async function callGetClient() {
      return getClients(token);
    }
    callGetClient();
  }, []);

  async function onSubmit(data) {
    console.log(data);
    return createCharges({ data, token });
  }

  return (
    <div className="container-form-create-charges ">
      <p>{"//"} CRIAR COBRANÇA</p>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-unic-input ">
            <label htmlFor="cliente_id">Cliente</label>

            <select
              {...register("cliente_id", { require: true })}
              id="cliente_id"
              className="select-client"
            >
              <option value="" disabled selected hidden>
                Selecione um cliente
              </option>
              {clients.map(({ id, nome }) => (
                <option key={id} value={id}>
                  {nome}
                </option>
              ))}
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
              <option value="" disabled selected hidden>
                Selecione um estado
              </option>
              <option value="pago">PAGO</option>
              <option value="pendente">PENDENTE</option>
            </select>
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
                <label htmlFor="data_vencimento">Vencimento</label>
                <input
                  className="data-vencimento"
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
