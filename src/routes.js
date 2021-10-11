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
import { AuthContext } from "./context/auth";
import { UserContextProvider } from "./context/user";
import { ClientContextProvider } from "./context/client";
import { ChargeContextProvider } from "./context/charge";

function Routes() {
  const { token } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <UserContextProvider>
          <ClientContextProvider>
            <ChargeContextProvider>
              {!token ? (
                <>
                  <Route path="/" exact component={Login} />
                  <Route path="/signup" exact component={SignUp} />
                </>
              ) : (
                <Main>
                  <Route path="/home" exact component={Home} />
                  <Route path="/charges" exact component={Charges} />
                  <Route
                    path="/charges/register"
                    exact
                    component={CreateCharges}
                  />
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
                  <Route path="/" render={() => <Redirect to="/home" />} />
                </Main>
              )}
            </ChargeContextProvider>
          </ClientContextProvider>
        </UserContextProvider>
      </Switch>
    </Router>
  );
}

export default Routes;
