import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Main from "./pages/Main";
import Charges from "./pages/Collection";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { createContext, useContext, useState } from "react";
import Home from "./pages/Home";
import CreateClients from "./pages/CreateClients";
import Collection from "./pages/Collection";

export const AuthContext = createContext();

function RotasProtegidas(props) {
  const { token } = useContext(AuthContext);

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function Routes() {
  const [token, setToken] = useState("");

  function logar(newToken) {
    setToken(newToken);
  }

  function deslogar() {
    setToken("");
  }

  return (
    <AuthContext.Provider value={{ token, logar, deslogar }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <RotasProtegidas>
            <Main>
              <Route path="/home" exact component={Home} />
              <Route path="/collections" exact component={Collection} />
              <Route path="/customers" exact component={Profile} />
              <Route path="/sign-up-client" exact component={CreateClients} />
            </Main>
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routes;
