import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useContext } from "react";
import Home from "./pages/Home";
import RegisterClients from "./pages/RegisterClients";
import Charges from "./pages/Charges";
import Customers from "./pages/Customers";
import CreateCharges from "./pages/CreateCharges";
import EditCostumers from "./pages/EditCostumers";
import { AuthContext, AuthContextProvider } from "./services/auth";

function RotasProtegidas(props) {
  const { token } = useContext(AuthContext);
  console.log(token);

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function Routes() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
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
              <Route
                path="/clients/:id/register"
                exact
                component={EditCostumers}
              />
            </Main>
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default Routes;
