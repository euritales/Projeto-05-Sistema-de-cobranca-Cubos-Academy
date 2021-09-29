import "./styles.css";
import "../../styles/form.css";
import { Link } from "react-router-dom";
import logoCubos from "../../assets/logoCubosBlack.svg";
import InputForm from "../../components/InputForm";

function Signup() {
  return (
    <div className="container-form flex-column">
      <form className="form form-sign-in">
        <img src={logoCubos} alt="CubosAcademy" />
        <div className="flex-column input">
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" id="name" placeholder="Novo Usuário" />
        </div>
        <InputForm />

        <button className="btn btn-opaque">Entrar</button>
      </form>
    </div>
  );
}

export default Signup;
