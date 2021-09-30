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

  const onSubmit = (data) => {
    console.log(data);
  };

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
