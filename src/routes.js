import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Charges from "./pages/Charges";
import Login from "./pages/Login";
import { createContext, useContext, useState } from "react";

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
    console.log("Loguei!");
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
            <Route path="/home" exact component={Main} />
            <Route path="/charge" exact component={Charges} />
            <Route path="/profile" exact component={Profile} />
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routes;
