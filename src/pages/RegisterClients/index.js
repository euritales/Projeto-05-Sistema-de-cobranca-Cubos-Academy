import "./styles.css";
import { useForm } from "react-hook-form";
import { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import getAddressByCep from "../../services/viaCep";
import ErrorMessage from "../../components/ToastifyPopups/errorMessage";
import { AuthContext } from "../../context/auth";
import { ClientContext } from "../../context/client";
import { MaskedInput } from "../../hooks/MaskedInput";

function RegisterClients() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const { token } = useContext(AuthContext);
  const { createClient } = useContext(ClientContext);
  const history = useHistory();

  let nomeWatch = watch("nome");
  let emailWatch = watch("email");
  let cpfWatch = watch("cpf");
  let telefoneWatch = watch("telefone");
  let cepWatch = watch("cep");
  const [statusButton, setStatusButton] = useState("btn btn-opaque");

  async function onSubmit(data) {
    return createClient({ data, token });
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

    setValue("cidade", addressByCep.localidade);
    setValue("bairro", addressByCep.bairro);
    setValue("logradouro", addressByCep.logradouro);
    setValue("complemento", addressByCep.complemento);
    setValue("estado", addressByCep.uf);
  }

  useEffect(() => {
    if (cepWatch) {
      const positionifen = cepWatch.indexOf("-");
      const verifyIfen = cepWatch.includes("-");

      if (positionifen === 5 && cepWatch.length === 9) {
        loadAddressByCep();
      }
      if (positionifen === 5 && cepWatch.length <= 8) {
        setValue("cidade", "");
        setValue("bairro", "");
        setValue("logradouro", "");
        setValue("complemento", "");
        setValue("estado", "");
      }

      if (!verifyIfen && cepWatch.length >= 8) {
        if (cepWatch.length === 9) {
          setValue("cidade", "");
          setValue("bairro", "");
          setValue("logradouro", "");
          setValue("complemento", "");
          setValue("estado", "");
        }
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
      <p>{"//"} ADCIONAR CLIENTE</p>
      <div className="container-register-clients">
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

            <MaskedInput
              mask="999.999.999-99"
              type="text"
              id="cpf"
              {...register("cpf", { require: true })}
            />
          </div>
          <div>
            <div className="container-double-form">
              <div>
                <label htmlFor="telefone">Telefone</label>

                <MaskedInput
                  mask="(99)9 9999-9999"
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
                  maxLength="9"
                  {...register("cep")}
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
                <label htmlFor="estado">Estado</label>
                <input type="text" id="estado" {...register("estado")} />
              </div>
              <div>
                <label htmlFor="cidade">Cidade</label>
                <input type="text" id="cidade" {...register("cidade")} />
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
                <label htmlFor="ponto_referencia">Ponto de Referencia</label>
                <input
                  type="text"
                  id="ponto_referencia"
                  {...register("ponto_referencia")}
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
            {statusButton === "btn btn-pink" ? (
              <button
                onClick={() => handleNotifications()}
                className={statusButton}
                type="submit"
              >
                Adicionar cliente
              </button>
            ) : (
              <button
                onClick={() => handleNotifications()}
                disabled
                className={statusButton}
                type="submit"
              >
                Adicionar cliente
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterClients;
