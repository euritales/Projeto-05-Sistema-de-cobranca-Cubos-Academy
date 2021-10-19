import "./styles.css";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { ChargeContext } from "../../context/charge";
import { ClientContext } from "../../context/client";

function EditChargesModal({ setOpenEditCharges, chargeId }) {
  const { register, handleSubmit } = useForm();
  const { getClients, clients } = useContext(ClientContext);
  const { token } = useContext(AuthContext);
  const { charges, editCharges } = useContext(ChargeContext);

  async function onSubmit(data) {
    console.log(data);

    return editCharges({
      data,
      token,
      client_id: chargeId,
      setOpenEditCharges,
    });
  }

  return (
    <div className="container-form-create-charges ">
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
          <div className="container-delete-button">
            <button>
              <span>Excluir Cobrança</span>
              <img src="" alt="" />
            </button>
          </div>
          <div className="container-buttonsClient">
            <button
              onClick={() => setOpenEditCharges(false)}
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

export default EditChargesModal;
