import "./styles.css";
import Charge from "../../assets/charge-icon.svg";
import Customers from "../../assets/customers-icon.svg";
import Home from "../../assets/home-icon.svg";
import LogoCubos from "../../assets/logoCubosWhite.svg";
import { NavLink } from "react-router-dom";

function HomeBar() {
  return (
    <div className="container-homeBar">
      <div className="container-button">
        <img src={LogoCubos} alt="CubosAcademy" />
        <NavLink
          to="/"
          exact
          className="menu-button"
          activeClassName="menu-button-hover"
        >
          <img src={Home} alt="" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/charge"
          className="menu-button"
          activeClassName="menu-button-hover"
        >
          <img src={Charge} alt="" />
          <span>Cobranças</span>
        </NavLink>

        <NavLink
          to="/customers"
          className="menu-button"
          activeClassName="menu-button-hover"
        >
          <img src={Customers} alt="" />
          <span>Clientes</span>
        </NavLink>
      </div>
      <div className="charge-button">
        <button className="btn btn-pink">Criar cobrança</button>
      </div>
    </div>
  );
}

export default HomeBar;
