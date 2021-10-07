import "./styles.css";
import "../../styles/form.css";
import { Link, useHistory } from "react-router-dom";
import logoCubos from "../../assets/logoCubosBlack.svg";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { useContext, useEffect, useState } from "react";
import ErrorMessage from "../../components/ToastifyPopups/errorMessage";
import SucessMessage from "../../components/ToastifyPopups/sucessMessage";
import { AuthContext } from "../../routes";

function Login() {
  const { register, handleSubmit, watch } = useForm();

  const { logar, handleDadosUsuario, dadosUsuario, setToken } =
    useContext(AuthContext);

  const history = useHistory();

  let emailWatch = watch("email");
  let passwordWatch = watch("senha");
  const [statusButton, setStatusButton] = useState("btn btn-opaque");

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (userToken) {
      setToken(userToken);
      history.push("/home");
    }
  }, []);

  async function onSubmit(data) {
    try {
      const response = await fetch(
        "https://cubosacademy-projeto-5.herokuapp.com/login",
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

      handleDadosUsuario(dados.usuario);

      console.log(dados.usuario);
      console.log(data);
      console.log(dadosUsuario);

      if (response.ok) {
        logar(dados.token);
        localStorage.setItem("user", dados.token);
        history.push("/home");
        return SucessMessage(dados);
      }
      return ErrorMessage(dados);
    } catch (error) {
      return ErrorMessage(error.message);
    }
  }

  useEffect(() => {
    if (passwordWatch?.length > 0 && emailWatch?.length > 0) {
      setStatusButton("btn btn-pink");
      return;
    }
    setStatusButton("btn btn-opaque");
  }, [emailWatch, passwordWatch]);

  function handleNotifications() {
    if (emailWatch?.length === 0 || passwordWatch?.length === 0) {
      return ErrorMessage("Campos 'email' e 'senha' são obrigatórios");
    }
  }

  return (
    <div className="container-form flex-column">
      <form onSubmit={handleSubmit(onSubmit)} className="form form-sign-in">
        <img src={logoCubos} alt="CubosAcademy" />

        <div className="flex-column input">
          <label htmlFor="email">email</label>
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
        <button
          type="submit"
          onClick={() => handleNotifications()}
          to="/home"
          className={statusButton}
        >
          Entrar
        </button>
      </form>
      <div>
        <span>Não tem uma conta? </span>
        <Link to="/signup">Cadastre-se!</Link>
      </div>
    </div>
  );
}

export default Login;
