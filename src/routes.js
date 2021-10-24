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
import { AuthContext } from "./context/auth";
import { UserContextProvider } from "./context/user";
import { ClientContextProvider } from "./context/client";
import { ChargeContextProvider } from "./context/charge";
import ReportsClients from "./pages/ReportsClients";
import ReportsCharges from "./pages/ReportsCharges";
import ReportsChargesVencida from "./pages/ReportsChargesVencida";
import ReportsChargesPago from "./pages/ReportsChargesPago";
import ReportsClientsInad from "./pages/ReportsClientsInadimplente";

function RotasProtegidas(props) {
  const { token } = useContext(AuthContext);

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function Routes() {
  return (
    <Router>
      <Switch>
        <UserContextProvider>
          <ClientContextProvider>
            <ChargeContextProvider>
              <Route path="/" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <RotasProtegidas>
                <Main>
                  <Route path="/home" exact component={Home} />
                  {/* <Route
                    path="/reports/clients/:statusCliente"
                    exact
                    component={ReportsClients}
                  /> */}
                  <Route
                    path="/reports/clients/em_dia"
                    exact
                    component={ReportsClients}
                  />
                  <Route
                    path="/reports/clients/inadimplente"
                    exact
                    component={ReportsClientsInad}
                  />
                  <Route
                    path="/reports/charges/:statusCobranca"
                    exact
                    component={ReportsCharges}
                  />
                  {/* <Route
                    path="/reports/charges/pendente"
                    exact
                    component={ReportsCharges}
                  />
                  <Route
                    path="/reports/charges/vencido"
                    exact
                    component={ReportsChargesVencida}
                  />
                  <Route
                    path="/reports/charges/pago"
                    exact
                    component={ReportsChargesPago}
                  /> */}
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
                    path="/"
                    exact
                    render={() => <Redirect to="/home" />}
                  />
                </Main>
              </RotasProtegidas>
            </ChargeContextProvider>
          </ClientContextProvider>
        </UserContextProvider>
      </Switch>
    </Router>
  );
}

export default Routes;
