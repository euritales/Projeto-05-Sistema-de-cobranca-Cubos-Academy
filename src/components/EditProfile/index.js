import "./style.css";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import CloseIcon from "../../assets/close-icon.svg";
import { UserContext } from "../../context/user";
import { AuthContext } from "../../context/auth";

function EditProfile({ setEditProfileStatus }) {
  const { register, handleSubmit, setValue } = useForm();
  const { token } = useContext(AuthContext);
  const { getUser, user, editUser } = useContext(UserContext);
  const location = useLocation();
  const [statusButton, setStatusButton] = useState("btn btn-opaque");

  useEffect(() => {
    async function callGetUser() {
      return getUser(token);
    }
    callGetUser();
  }, []);

  useEffect(() => {
    async function loadUser() {
      setValue("nome", user.nome);
      setValue("email", user.email);
      setValue("telefone", user.telefone);
      setValue("cpf", user.cpf);
    }
    loadUser();
  }, [user]);

  async function onSubmit(data) {
    return editUser({ data, token });
  }

  return (
    <div className="container-edit">
      <form onSubmit={handleSubmit(onSubmit)} className="form edit-profile">
        <div className="head-edit">
          <NavLink
            to={location.pathname}
            exact
            className="close-button-edit"
            onClick={() => setEditProfileStatus(false)}
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
        {statusButton === "btn btn-pink" ? (
          <button className={statusButton}>Editar conta</button>
        ) : (
          <button disabled className={statusButton}>
            Editar conta
          </button>
        )}
      </form>
    </div>
  );
}

export default EditProfile;
