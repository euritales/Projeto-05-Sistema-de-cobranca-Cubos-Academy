import Customers from "../Customers";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

function ReportsClients() {
  //   const history = useHistory();
  //   const [statusGet, setStatusGet] = useState("em_dia");
  //   const [openType, setOpenType] = useState("false");
  //   const [openStatus, setOpenStatus] = useState("false");
  //   const [statusClients, setStatusClient] = useState("EM DIA");

  //   useEffect(() => {
  //     function handleChandesName(em_dia) {
  //       statusGet(em_dia);
  //       if (statusGet !== "em_dia") {
  //         setStatusClient("INADIMPLENTES");
  //       }
  //       return;
  //     }
  //     handleChandesName();
  //   }, [statusGet]);

  return (
    <>
      {/* <div className="nav-reports">
        <div>
          <button onClick={() => setOpenType(!openType)}>
            <h1>CLIENTES</h1>
          </button>
          <h2>{">"}</h2> <h1>{statusClients}</h1>
        </div>
        {openType && (
          <div className="container-reports-type">
            <NavLink
              to="/reports/clientes/em_dia"
              exact
              className="menu-button"
              activeClassName="menu-button-hover"
            >
              <span>Clientes</span>
            </NavLink>
            <NavLink
              to="/reports/charges/pago"
              exact
              className="menu-button"
              activeClassName="menu-button-hover"
            >
              <span>Cobranças</span>
            </NavLink>
          </div>
        )}
        {openStatus && (
          <div className="container-reports-status">
            <NavLink
              to="/reports/clientes/em_dia"
              exact
              onClick={() => setStatusGet("em_dia")}
              className="menu-button"
              activeClassName="menu-button-hover"
            >
              <span>Em dia</span>
            </NavLink>
            <NavLink
              to="/reports/clientes/inadimplente"
              exact
              onClick={setStatusGet("inadimplente")}
              className="menu-button"
              activeClassName="menu-button-hover"
            >
              <span>Inadimplente</span>
            </NavLink>
          </div>
        )}
      </div> */}
      <Customers
      //   statusGet={statusGet}
      />
    </>
  );
}

export default ReportsClients;
