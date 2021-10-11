import "./styles.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../../context/auth";
import { ClientContext } from "../../context/client";
import EmailIcon from "../../assets/email-icon.svg";
import PhoneIcon from "../../assets/phone-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import { NavLink } from "react-router-dom";

function Customers() {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { getClient, clients } = useContext(ClientContext);

  useEffect(() => {
    async function callGetClient() {
      return getClient(token);
    }
    callGetClient();
  }, []);
  return (
    <div className="container-costumers">
      <button
        className="btn btn-white"
        onClick={() => history.push("/clients/register")}
      >
        Adicionar cliente
      </button>
      <div className="container-description-costumers">
        <span className="span-lg">Cliente</span>
        <span className="span-lg">Cobranças Feitas</span>
        <span className="span-lg">Cobranças Recebidas</span>
        <span>Status</span>
      </div>
      <div className="box-container-details">
        {!clients ? (
          <div className="no-register">
            <h3>Sem registros no momento!</h3>
          </div>
        ) : (
          clients.map(
            ({
              id,
              nome,
              email,
              telefone,
              so_pago,
              valor_cobrado,
              statusCliente,
            }) => (
              <div className="container-details-costumers" key={id}>
                <div className="client-details">
                  <div className="name-costumers">
                    <span>{nome}</span>
                  </div>
                  <div className="span-client-email">
                    <img src={EmailIcon} alt="email" />
                    <span>{email}</span>
                  </div>
                  <div>
                    <img src={PhoneIcon} alt="telefone" />
                    <span className="">{telefone}</span>
                  </div>
                </div>
                <span className="span-lg">R$ {so_pago}</span>
                <span className="span-lg">R$ {valor_cobrado}</span>
                <span
                  className={`status-costumers ${statusCliente
                    .toLowerCase()
                    .trim()}`}
                >
                  {statusCliente.toUpperCase()}
                </span>
                <div cla>
                  <NavLink
                    to={`/clients/${id}/edit`}
                    className="Edit-clients-button"
                  >
                    <img src={EditIcon} alt="Editar Cliente" />
                  </NavLink>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default Customers;
