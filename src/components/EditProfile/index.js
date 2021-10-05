import "./style.css";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../routes";
import { useState, useEffect, useContext } from "react";
import SucessMessage from "../ToastifyPopups/sucessMessage";
import ErrorMessage from "../ToastifyPopups/errorMessage";
import CloseIcon from "../../assets/close-icon.svg";

function EditProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const [statusButton, setStatusButton] = useState("btn btn-opaque");
  const history = useHistory();
  const { token, dadosUsuario, handleEditProfile, editProfileStatus } =
    useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    async function loadUser() {
      setValue("nome", dadosUsuario.nome);
      setValue("email", dadosUsuario.email);
      setValue("telefone", dadosUsuario.telefone);
      setValue("cpf", dadosUsuario.cpf);
    }
    loadUser();
  }, []);

  async function onSubmit(data) {
    console.log({ data });
    const body = {
      nome: data.nome,
      email: data.email,
      cpf: data.cpf,
      senha: data.senha,
      telefone: data.telefone,
    };
    console.log(body);
    const response = await fetch(
      "https://cubosacademy-projeto-5.herokuapp.com/users",
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const dados = await response.json();
    history.push("/customers");

    if (response.ok) {
      return SucessMessage(dados);
    }
    return ErrorMessage(dados);
  }

  return (
    <div className="container-edit">
      <form onSubmit={handleSubmit(onSubmit)} className="form edit-profile">
        <div className="head-edit">
          <NavLink
            to={location.pathname}
            exact
            className="close-button-edit"
            onClick={() => handleEditProfile(!editProfileStatus)}
          >
            <img src={CloseIcon} alt="" />
          </NavLink>
          <h3>{"//"} EDITAR USUÁRIO</h3>
        </div>

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
            placeholder="xxx.xxx.xxx-xx"
            {...register("cpf")}
          />
        </div>
        <button className={statusButton}>Editar conta</button>
      </form>
    </div>
  );
}

export default EditProfile;
