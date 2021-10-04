import "./styles.css";
import Charge from "../../assets/charge-icon.svg";
import Customers from "../../assets/customers-icon.svg";
import Home from "../../assets/home-icon.svg";
import LogoCubos from "../../assets/logoCubosWhite.svg";
import { NavLink } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="container-sideBar">
      <div className="container-button">
        <img src={LogoCubos} alt="CubosAcademy" />
        <NavLink
          to="/home"
          exact
          className="menu-button"
          activeClassName="menu-button-hover"
        >
          <img src={Home} alt="" />
          <span>HOME</span>
        </NavLink>
        <NavLink
          to="/collections"
          className="menu-button"
          activeClassName="menu-button-hover"
        >
          <img src={Charge} alt="" />
          <span>COBRANÇAS</span>
        </NavLink>

        <NavLink
          to="/customers"
          className="menu-button"
          activeClassName="menu-button-hover"
        >
          <img src={Customers} alt="" />
          <span>CLIENTES</span>
        </NavLink>
      </div>
      <div className="charge-button">
        <button
          onClick={() => history.push("/sign-up-client")}
          className="btn btn-pink"
        >
          Criar cliente
        </button>
      </div>
    </div>
  );
}

export default SideBar;
