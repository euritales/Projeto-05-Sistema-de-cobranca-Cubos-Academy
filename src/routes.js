import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { createContext, useContext, useState } from "react";
import Home from "./pages/Home";
import RegisterClients from "./pages/RegisterClients";
import Charges from "./pages/Charges";
import Customers from "./pages/Customers";
import CreateCharges from "./pages/CreateCharges";

export const AuthContext = createContext();

function RotasProtegidas(props) {
  const { token } = useContext(AuthContext);

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function Routes() {
  const [token, setToken] = useState("");
  const [editProfileStatus, setEditProfileStatus] = useState(false);
  const [dadosUsuario, setDadoUsuario] = useState({
    id: "",
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
  });

  function logar(newToken) {
    setToken(newToken);
  }

  function deslogar() {
    setToken("");
  }

  function handleDadosUsuario(dados) {
    return setDadoUsuario(dados);
  }

  function handleEditProfile(dados) {
    setEditProfileStatus(dados);
    console.log(dados);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        logar,
        deslogar,
        handleDadosUsuario,
        setDadoUsuario,
        dadosUsuario,
        handleEditProfile,
        editProfileStatus,
      }}
    >
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <RotasProtegidas>
            <Main>
              <Route path="/home" exact component={Home} />
              <Route path="/charges" exact component={Charges} />
              <Route path="/charges/register" exact component={CreateCharges} />

              <Route path="/clients" exact component={Customers} />
              <Route
                path="/clients/register"
                exact
                component={RegisterClients}
              />
            </Main>
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routes;
