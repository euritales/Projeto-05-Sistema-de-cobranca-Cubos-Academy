import "./styles.css";
import "../../styles/form.css";
import { Link, useHistory } from "react-router-dom";
import logoCubos from "../../assets/logoCubosBlack.svg";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { useContext, useEffect, useState } from "react";
import ErrorMessage from "../../components/ToastifyPopups/errorMessage";
import { AuthContext } from "../../context/auth";

function Login() {
  const { register, handleSubmit, watch } = useForm();

  const { login, token } = useContext(AuthContext);
  const history = useHistory();

  let emailWatch = watch("email");
  let passwordWatch = watch("senha");
  const [statusButton, setStatusButton] = useState("btn btn-opaque");

  useEffect(() => {
    if (token) {
      history.push("/home");
    }
    return;
  }, []);

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

  async function onSubmit(data) {
    return login(data);
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
