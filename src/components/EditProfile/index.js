import "./style.css";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../routes";
import { useState } from "react";

function EditProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const [statusButton, setStatusButton] = useState("btn btn-opaque");

  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function loadUser() {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/users",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-type": "application/json",
            " Authorization": `Bearer ${token}`,
          },
        }
      );

      const dados = await response.json();

      setValue("nome", dados.nome);
      setValue("email", dados.email);
      setValue("telefone", dados.telefone);
      setValue("cpf", dados.cpf);
    }

    loadUser();
  }, []);

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className="container-edit">
      <form onSubmit={handleSubmit(onSubmit)} className="form edit">
        <h3>// EDITAR usuário</h3>

        <div className="flex-column input">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Novo Usuário"
            {...register("nome")}
          />
        </div>
        <div className="flex-column input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="exemplo@gmail.com"
            {...register("email")}
          />
        </div>
        <InputPassword
          placeholder="Deixar Vazio para não aceitar"
          {...register("senha")}
        />
        <div className="flex-column input">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            id="telefone"
            placeholder="(xx) x xxxx-xxxx"
            {...register("telefone")}
          />
        </div>
        <div className="flex-column input">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            placeholder="(xx) x xxxx-xxxx"
            {...register("cpf")}
          />
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
