import "./styles.css";
import { useForm } from "react-hook-form";
import { useEffect, useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import getAddressByCep from "../../services/viaCep";
import { AuthContext } from "../../context/auth";
import { ClientContext } from "../../context/client";
import CloseIcon from "../../assets/close-icon.svg";
import { formatToCPF, formatToPhone } from "brazilian-values";

function EditCustomers({ setEditClients, clientId }) {
  const { register, handleSubmit, watch, setValue } = useForm();
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const { editClient, getClient, client } = useContext(ClientContext);
  const [statusButton, setStatusButton] = useState("btn btn-opaque");

  useEffect(() => {
    return getClient({ token, id: clientId });
  }, []);

  useEffect(() => {
    async function loadUser() {
      setValue("nome", client.nome);
      setValue("email", client.email);
      setValue("cep", client.cep);
      setValue("cpf", client.cpf);
      setValue("telefone", client.telefone);
      setValue("bairro", client.bairro);
      setValue("logradouro", client.logradouro);
      setValue("complemento", client.complemento);
      setValue("referencia", client.ponto_referencia);
    }

    loadUser();
  }, [client]);

  let nomeWatch = watch("nome");
  let emailWatch = watch("email");
  let cpfWatch = watch("cpf");
  let telefoneWatch = watch("telefone");
  let cepWatch = watch("cep");

  async function onSubmit(data) {
    return editClient({ data, token, id: clientId, setEditClients });
  }

  useEffect(() => {
    if (
      nomeWatch?.length > 0 &&
      cpfWatch?.length > 0 &&
      emailWatch?.length > 0 &&
      telefoneWatch?.length > 0
    ) {
      setStatusButton("btn btn-pink");
      return;
    }
    return setStatusButton("btn btn-opaque");
  }, [emailWatch, nomeWatch, cpfWatch, telefoneWatch]);

  async function loadAddressByCep() {
    const addressByCep = await getAddressByCep(cepWatch);

    setValue("localidade", addressByCep.localidade);
    setValue("bairro", addressByCep.bairro);
    setValue("logradouro", addressByCep.logradouro);
    setValue("complemento", addressByCep.complemento);
    setValue("uf", addressByCep.uf);
  }

  useEffect(() => {
    if (cepWatch) {
      const positionifen = cepWatch.indexOf("-");
      const verifyIfen = cepWatch.includes("-");

      if (positionifen === 5 && cepWatch.length === 9) {
        loadAddressByCep();
      }
      if (positionifen === 5 && cepWatch.length <= 8) {
        setValue("localidade", "");
        setValue("bairro", "");
        setValue("logradouro", "");
        setValue("complemento", "");
        setValue("uf", "");
      }

      if (!verifyIfen && cepWatch.length >= 8) {
        if (cepWatch.length === 9) {
          setValue("localidade", "");
          setValue("bairro", "");
          setValue("logradouro", "");
          setValue("complemento", "");
          setValue("uf", "");
        }
        loadAddressByCep();
      }
    }
  }, [cepWatch]);

  return (
    <div className="edit-customers">
      <div className="container-form-editclients">
        <NavLink
          to={location.pathname}
          exact
          className="close-button-edit"
          onClick={() => setEditClients(false)}
        >
          <img src={CloseIcon} alt="" />
        </NavLink>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-unic-input">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              {...register("nome", { require: true })}
            />
          </div>
          <div className="container-unic-input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              {...register("email", { require: true })}
            />
          </div>
          <div className="container-unic-input">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              {...register("cpf", { require: true })}
            />
          </div>
          <div>
            <div className="container-double-form">
              <div>
                <label htmlFor="telefone">Telefone</label>
                <input type="text" id="telefone" {...register("telefone")} />
              </div>
              <div>
                <label htmlFor="cep">CEP</label>
                <input type="text" id="cep" {...register("cep")} />
              </div>
            </div>
            <div className="container-double-form">
              <div>
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  type="text"
                  id="logradouro"
                  {...register("logradouro")}
                />
              </div>
              <div>
                <label htmlFor="bairro">Bairro</label>
                <input type="text" id="bairro" {...register("bairro")} />
              </div>
            </div>
            <div className="container-double-form">
              <div>
                <label htmlFor="uf">Estado</label>
                <input type="text" id="uf" {...register("uf")} />
              </div>
              <div>
                <label htmlFor="localidade">Cidade</label>
                <input
                  type="text"
                  id="localidade"
                  {...register("localidade")}
                />
              </div>
            </div>
            <div className="container-double-form">
              <div>
                <label htmlFor="complemento">Complemento</label>
                <input
                  type="text"
                  id="complemento"
                  {...register("complemento")}
                />
              </div>
              <div>
                <label htmlFor="referencia">Ponto de Referencia</label>
                <input
                  type="text"
                  id="referencia"
                  {...register("referencia")}
                />
              </div>
            </div>
          </div>
          <div className="container-buttonsClient">
            <button
              onClick={() => setEditClients(false)}
              className="btn btn-white"
              type="submit"
            >
              Cancelar
            </button>
            <button className={statusButton}>Editar Cliente</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomers;
