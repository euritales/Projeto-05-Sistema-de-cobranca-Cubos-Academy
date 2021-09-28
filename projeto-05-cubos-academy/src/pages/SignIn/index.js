import "./styles.css";
import "../../styles/form.css";
import { Link } from "react-router-dom";
import logoCubos from "../../assets/logoCubos.svg";
import InputForm from "../../components/InputForm";

function SignIn() {
  return (
    <div className="container-form flex-column">
      <form className="form form-sign-in">
        <img src={logoCubos} alt="CubosAcademy" />
        <InputForm />
        <button className="btn btn-opaque">Entrar</button>
      </form>
      <div>
        <span>Não tem uma conta? </span>
        <Link to="/sign-up">Cadastre-se!</Link>
      </div>
    </div>
  );
}

export default SignIn;
