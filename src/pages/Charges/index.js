import "./styles.css";
import { useForm } from "react-hook-form";
import SideBar from "../../components/SideBar";
import { useEffect } from "react";
import { getAddressByCep } from "../../services/viaCep";

function Charges() {
  const { register, handleSubmit, watch, setValue } = useForm();

  let cepWatch = watch("cep");

  const onSubmit = (data) => {
    console.log(data);
  };

  async function loadAddressByCep() {
    const addressByCep = await getAddressByCep(cepWatch);

    setValue("localidade", addressByCep.localidade);
    setValue("bairro", addressByCep.bairro);
    setValue("logradouro", addressByCep.logradouro);
    setValue("complemento", addressByCep.complemento);
  }

  useEffect(() => {
    if (cepWatch) {
      const positionifen = cepWatch.indexOf("-");
      console.log(positionifen);
      if (positionifen === 5 && cepWatch.length === 9) {
        loadAddressByCep();
        return;
      }
      if (cepWatch.length <= 9) {
        setValue("localidade", "");
        setValue("bairro", "");
        setValue("logradouro", "");
        setValue("complemento", "");
      }

      if (cepWatch.length === 8) {
        loadAddressByCep();
      }
    }
  }, [cepWatch]);

  return (
    <div className="container-charges">
      <SideBar />
      <div className="container-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            {...register("nome", { require: true })}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", { require: true })}
          />
          <div>
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              {...register("cpf", { require: true })}
            />
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              {...register("telefone", { require: true })}
            />
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              {...register("cep", { maxLength: 9 })}
            />
            <label htmlFor="logradouro">Logradouro</label>
            <input type="text" id="logradouro" {...register("logradouro")} />
            <label htmlFor="bairro">Bairro</label>
            <input type="text" id="bairro" {...register("bairro")} />
            <label htmlFor="localidade">Cidade</label>
            <input type="text" id="localidade" {...register("localidade")} />
            <label htmlFor="complemento">Complemento</label>
            <input type="text" id="complemento" {...register("complemento")} />
            <label htmlFor="referencia">Ponto de Referencia</label>
            <input type="text" id="referencia" {...register("referencia")} />
          </div>
          <button type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default Charges;
