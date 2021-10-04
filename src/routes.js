import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Main from "./pages/Main";
import Charges from "./pages/Charges";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
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
              {/* <Route path="/home" exact component={Home} /> */}
              <Route path="/charge" exact component={Charges} />
              <Route path="/profile" exact component={Profile} />
            </Main>
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routes;
