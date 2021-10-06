import "./style.css";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../routes";
import { useState, useEffect, useContext } from "react";
import SucessMessage from "../ToastifyPopups/sucessMessage";
import ErrorMessage from "../ToastifyPopups/errorMessage";
import CloseIcon from "../../assets/close-icon.svg";

function EditProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const { token, dadosUsuario, handleEditProfile } = useContext(AuthContext);
  const location = useLocation();
  const [statusButton, setStatusButton] = useState("btn btn-opaque");

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

    if (response.ok) {
      handleEditProfile(false);
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
            onClick={() => handleEditProfile(false)}
          >
            <img src={CloseIcon} alt="" />
          </NavLink>
          <h3>{"//"} EDITAR USUÁRIO</h3>
        </div>

        <div className="flex-column input">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            onFocus={() => setStatusButton("btn btn-pink")}
            placeholder="Novo Usuário"
            {...register("nome")}
          />
        </div>
        <div className="flex-column input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onFocus={() => setStatusButton("btn btn-pink")}
            placeholder="exemplo@gmail.com"
            {...register("email")}
          />
        </div>
        <InputPassword
          placeholder="Deixar vazio para não editar"
          onFocus={() => setStatusButton("btn btn-pink")}
          {...register("senha")}
        />
        <div className="flex-column input">
          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            onFocus={() => setStatusButton("btn btn-pink")}
            placeholder="(xx) x xxxx-xxxx"
            {...register("telefone")}
          />
        </div>
        <div className="flex-column input">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            onFocus={() => setStatusButton("btn btn-pink")}
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
