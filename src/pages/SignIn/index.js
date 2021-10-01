import "./styles.css";
import "../../styles/form.css";
import { Link } from "react-router-dom";
import logoCubos from "../../assets/logoCubosBlack.svg";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import { toast } from "react-toastify";

function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // function onSubmit(data) {
  //   console.log(data);
  // }
  async function onSubmit(data) {
    // try {

    // } catch (error) {
    //   response.ok
    // }
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

    console.log(dados);
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
          {errors.email?.type === "required" &&
            toast.error("Campo email é obrigatório", {
              position: "top-right",
              autoClose: 3000,
            })}
        </div>
        <InputPassword {...register("senha", { required: true })} />
        <button type="submit" className="btn btn-opaque">
          Entrar
        </button>
      </form>
      <div>
        <span>Não tem uma conta? </span>
        <Link to="/sign-up">Cadastre-se!</Link>
      </div>
    </div>
  );
}

export default SignIn;
