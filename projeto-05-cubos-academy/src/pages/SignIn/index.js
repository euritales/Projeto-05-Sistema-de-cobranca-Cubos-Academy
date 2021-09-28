import "./styles.css";
import "../../styles/form.css";
import { Link } from "react-router-dom";
import logoCubos from "../../assets/logoCubos.svg";

function SignIn() {
  return (
    <div className="container-form flex-column">
      <form className="form form-sign-in">
        <img src={logoCubos} alt="CubosAcademy" />
        <div>
          <div className="flex-column input">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="exemplo@gmail.com"
            />
          </div>
          <div className="flex-column input">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="minhasenha"
            />
          </div>
        </div>
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
