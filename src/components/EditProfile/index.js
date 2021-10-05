import "./style.css";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../routes";
import { useState } from "react";
import SucessMessage from "../ToastifyPopups/sucessMessage";
import ErrorMessage from "../ToastifyPopups/errorMessage";

function EditProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const [statusButton, setStatusButton] = useState("btn btn-opaque");
  const history = useHistory();
  const { token } = useContext(AuthContext);
  // const { dadosUsuario } = useContext(DadosUsuario);

  // useEffect(() => {
  //   async function loadUser() {
  //     console.log();

  //     setValue("nome", dadosUsuario.nome);
  //     setValue("email", dadosUsuario.email);
  //     setValue("telefone", dadosUsuario.telefone);
  //     setValue("cpf", dadosUsuario.cpf);
  //   }

  //   loadUser();
  // }, [dadosUsuario, setValue]);

  async function onSubmit(data) {
    const response = await fetch(
      "https://cubosacademy-projeto-5.herokuapp.com/users",
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const dados = await response.json();

    history.push("/customers");

    // setToken(dados.token);

    if (response.ok) {
      return SucessMessage(dados);
    }
    return ErrorMessage(dados);
  }

  function handleNotifications() {
    SucessMessage("Usuario atualizado com sucesso!");
    history.push("/home");

    return;
  }
  return (
    <div className="container-edit">
      <form onSubmit={handleSubmit(onSubmit)} className="form edit">
        <h3>// EDITAR usuário</h3>

        <div className="flex-column input">
          <label htmlFor="nome">Nome</label>
          <input type="text" placeholder="Novo Usuário" {...register("nome")} />
        </div>
        <div className="flex-column input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
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
            placeholder="(xx) x xxxx-xxxx"
            {...register("telefone")}
          />
        </div>
        <div className="flex-column input">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            placeholder="(xx) x xxxx-xxxx"
            {...register("cpf")}
          />
        </div>
        <button
          type="submit"
          onClick={() => handleNotifications()}
          to="/home"
          className={statusButton}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
