import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Charges from "./pages/Charges";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/home" exact component={Main} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/charge" exact component={Charges} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </Router>
  );
}

export default Routes;
