import "./styles.css";
import "../../styles/form.css";
import logoCubos from "../../assets/logoCubosBlack.svg";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";

function Signup() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="container-form flex-column">
      <form className="form form-sign-in" onSubmit={handleSubmit(onSubmit)}>
        <img src={logoCubos} alt="CubosAcademy" />

        <div className="flex-column input">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Novo Usuário"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <span style={{ color: "red" }}>Campo nome é obrigatório</span>
          )}
        </div>
        <div className="flex-column input">
          <label htmlFor="name">Email</label>
          <input
            type="text"
            id="email"
            placeholder="exemplo@gmail.com"
            {...register("email", { required: true })}
          />
          {errors.name?.type === "required" && (
            <span style={{ color: "red" }}>Campo email é obrigatório</span>
          )}
        </div>
        <InputPassword />

        <button type="submit" className="btn btn-opaque">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Signup;
