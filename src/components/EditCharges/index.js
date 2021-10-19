import "./styles.css";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import TrashIcon from "../../assets/trash-icon.svg";
import { useLocation, NavLink } from "react-router-dom";
import CloseIcon from "../../assets/close-icon.svg";
import { ChargeContext } from "../../context/charge";
import { ClientContext } from "../../context/client";

function EditChargesModal({ setOpenEditCharges, id }) {
  const { register, handleSubmit, setValue } = useForm();
  const [openDelete, setOpenDelete] = useState(false);
  const location = useLocation();
  const { getClients, clients } = useContext(ClientContext);
  const { getCharges } = useContext(ChargeContext);
  const { getCharge, charge, editCharges, deleteCharge } =
    useContext(ChargeContext);

  async function onSubmit(data) {
    console.log(data);

    return editCharges({
      data,
      id,
      setOpenEditCharges,
    });
  }

  useEffect(() => {
    getCharge(id);
  }, []);

  useEffect(() => {
    async function loadUser() {
      setValue("cliente_id", charge[0]?.cliente_id);
      setValue("descricao", charge[0]?.descricao);
      setValue("status", charge[0]?.status);
      setValue("valor", charge[0]?.valor);
      setValue("data_vencimento", charge[0]?.data_vencimento);
      console.log(charge);
    }
    loadUser();
  }, [getCharge]);

  function handleDelete() {
    return deleteCharge(id, setOpenEditCharges);
  }

  return (
    <div className="container-form-create-charges ">
      <div>
        <NavLink
          to={location.pathname}
          exact
          className="close-button-edit"
          onClick={() => setOpenEditCharges(false)}
        >
          <img src={CloseIcon} alt="" />
        </NavLink>
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
              placeholder="Referente ao pagamento da compra online."
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
            <button type="button" onClick={() => setOpenDelete(!openDelete)}>
              <img src={TrashIcon} alt="" />
              <span>Excluir Cobrança</span>
            </button>
            {openDelete && (
              <div className="confirm-delete">
                <span>Apagar item?</span>
                <div className="box-confirm">
                  <button type="button" onClick={() => handleDelete()}>
                    Sim
                  </button>
                  <button type="button" onClick={() => setOpenDelete(false)}>
                    Não
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="container-buttonsClient">
            <button
              onClick={() => setOpenEditCharges(false)}
              className="btn btn-white"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-pink">
              Editar cobranças
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditChargesModal;
