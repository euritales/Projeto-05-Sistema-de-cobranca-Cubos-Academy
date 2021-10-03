import "./styles.css";
import "../../styles/form.css";
import { Link, useHistory } from "react-router-dom";
import logoCubos from "../../assets/logoCubosBlack.svg";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import ErrorMessage from "../../components/ToastifyPopups/errorMessage";
import SucessMessage from "../../components/ToastifyPopups/sucessMessage";
import { AuthContext } from "../../routes";

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const { logar, token } = useContext(AuthContext);
  const history = useHistory();

  let emailWatch = watch("email");
  let passwordWatch = watch("senha");
  const [statusButton, setStatusButton] = useState("btn btn-opaque");
  const [statusSubmit, setStatusSubmit] = useState(" ");

  async function onSubmit(data) {
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
    setStatusSubmit(dados);
    logar(dados.token);

    history.push("/home");

    console.log(dados);
    console.log(response.ok);
    // console.log(response);
    // console.log(emailWatch);
    // console.log(passwordWatch);
  }

  useEffect(() => {
    if (passwordWatch?.length > 0 && emailWatch?.length > 0) {
      setStatusButton("btn btn-pink");
      return;
    }
    setStatusButton("btn btn-opaque");
  }, [emailWatch, passwordWatch]);

  return (
    <div className="container-form flex-column">
      <form onSubmit={handleSubmit(onSubmit)} className="form form-sign-in">
        <h1>{token}</h1>
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
        <InputPassword {...register("senha", { required: true })} />
        <button
          type="submit"
          to="/home"
          // className={errors.email ? "btn btn-pink" : "btn btn-opaque"}
          className={statusButton}
        >
          Entrar
        </button>
      </form>
      <div>
        <span>Não tem uma conta? </span>
        <Link to="/sign-up">Cadastre-se!</Link>
      </div>

      {errors?.email || errors?.senha ? (
        <ErrorMessage message={"Campos email e senha são obrigatorios"} />
      ) : (
        <SucessMessage message={statusSubmit} />
      )}
    </div>
  );
}

export default Login;
