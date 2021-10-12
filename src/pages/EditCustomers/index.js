import "./styles.css";
import { useForm } from "react-hook-form";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import getAddressByCep from "../../services/viaCep";
import ErrorMessage from "../../components/ToastifyPopups/errorMessage";
import { AuthContext } from "../../context/auth";
import { ClientContext } from "../../context/client";

function EditCustomers() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const { editClient } = useContext(ClientContext);
  const [statusButton, setStatusButton] = useState("btn btn-opaque");
  const { id, nome, cpf, cep, email, telefone } = history.location.state ?? {};

  useEffect(() => {
    async function loadUser() {
      setValue("nome", nome);
      setValue("email", email);
      setValue("telefone", telefone);
      setValue("cpf", cpf);
      setValue("cep", cep);
    }
    loadUser();
  }, []);

  let nomeWatch = watch("nome");
  let emailWatch = watch("email");
  let cpfWatch = watch("cpf");
  let telefoneWatch = watch("telefone");
  let cepWatch = watch("cep");

  async function onSubmit(data) {
    console.log(data);
    return editClient(data, token, id);
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
      if (positionifen === 5 && cepWatch.length === 9) {
        loadAddressByCep();
        return;
      }
      if (cepWatch.length <= 9) {
        setValue("localidade", "");
        setValue("bairro", "");
        setValue("logradouro", "");
        setValue("complemento", "");
        setValue("uf", "");
      }

      if (cepWatch.length === 8) {
        loadAddressByCep();
      }
    }
  }, [cepWatch]);

  function handleNotifications() {
    if (
      emailWatch?.length === 0 ||
      nomeWatch?.length === 0 ||
      cpfWatch?.length === 0 ||
      telefoneWatch?.length === 0
    ) {
      return ErrorMessage(
        "Campos 'Nome', 'Email', 'CPF' e 'Telefone' são obrigatórios"
      );
    }
  }

  return (
    <div className="container-form-clients">
      <p>{"//"} EDITAR CLIENTE</p>
      <div>
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
                <input
                  type="text"
                  id="telefone"
                  {...register("telefone", { require: true })}
                />
              </div>
              <div>
                <label htmlFor="cep">CEP</label>
                <input
                  type="text"
                  id="cep"
                  {...register("cep", { maxLength: 9 })}
                />
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
              onClick={() => history.push("/clients")}
              className="btn btn-white"
              type="submit"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleNotifications()}
              className={statusButton}
              type="submit"
            >
              Editar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomers;
