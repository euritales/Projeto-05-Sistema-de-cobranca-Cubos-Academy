import "./styles.css";
import "../../styles/form.css";
import logoCubos from "../../assets/logoCubosBlack.svg";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import SucessMessage from "../../components/ToastifyPopups/sucessMessage";
import ErrorMessage from "../../components/ToastifyPopups/errorMessage";

function Signup() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const history = useHistory();
  let emailWatch = watch("email");
  let nameWhatch = watch("nome");
  let passwordWatch = watch("senha");
  const [statusButton, setStatusButton] = useState("btn btn-opaque");
  const [statusSubmit, setStatusSubmit] = useState(" ");

  async function onSubmit(data) {
    const response = await fetch(
      "https://cubosacademy-projeto-5.herokuapp.com/users",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const dados = await response.json();

    history.push("/");

    if (response.ok) {
      return SucessMessage(dados);
    }
    return ErrorMessage(dados);
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
            onFocus={() => handleNotifications()}
            placeholder="Novo Usuário"
            {...register("nome", { required: true })}
          />
        </div>
        <div className="flex-column input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            onFocus={() => handleNotifications()}
            placeholder="exemplo@gmail.com"
            {...register("email", { required: true })}
          />
        </div>
        <InputPassword {...register("senha", { required: true })} />

        <button type="submit" className={statusButton}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Signup;
