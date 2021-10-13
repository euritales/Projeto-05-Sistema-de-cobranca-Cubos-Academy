import "./styles.css";
import "../../styles/form.css";
import logoCubos from "../../assets/logoCubosBlack.svg";
import { useEffect, useContext, useState } from "react";
import InputPassword from "../../components/InputPassword";
import ErrorMessage from "../../components/ToastifyPopups/errorMessage";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/user";

function Signup() {
  const { register, handleSubmit, watch } = useForm();
  const { createUser } = useContext(UserContext);
  let emailWatch = watch("email");
  let nameWhatch = watch("nome");
  let passwordWatch = watch("senha");
  const [statusButton, setStatusButton] = useState("btn btn-opaque");

  async function onSubmit(data) {
    return createUser({ data });
  }

  useEffect(() => {
    if (
      passwordWatch?.length > 0 &&
      emailWatch?.length > 0 &&
      nameWhatch?.length
    ) {
      setStatusButton("btn btn-pink");
      return;
    }
    setStatusButton("btn btn-opaque");
  }, [emailWatch, passwordWatch, nameWhatch]);

  function handleNotifications() {
    if (emailWatch?.length === 0 || passwordWatch?.length === 0) {
      return ErrorMessage("Todos os campos são obrigatórios");
    }
  }

  return (
    <div className="container-form flex-column">
      <form onSubmit={handleSubmit(onSubmit)} className="form form-sign-in">
        <img src={logoCubos} alt="CubosAcademy" />

        <div className="flex-column input">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Novo Usuário"
            {...register("nome", { required: true })}
          />
        </div>
        <div className="flex-column input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="exemplo@gmail.com"
            {...register("email", { required: true })}
          />
        </div>
        <InputPassword
          id="senha"
          placeholder="minhasenha"
          {...register("senha", { required: true })}
        />

        <button onClick={() => handleNotifications()} className={statusButton}>
          Criar conta
        </button>
      </form>
      <div>
        <span>Já possui uma conta? </span>
        <Link to="/">Acesse agora!</Link>
      </div>
    </div>
  );
}

export default Signup;
