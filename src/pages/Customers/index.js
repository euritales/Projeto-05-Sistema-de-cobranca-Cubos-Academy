import "./styles.css";
import { useHistory } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ClientContext } from "../../context/client";
import EmailIcon from "../../assets/email-icon.svg";
import PhoneIcon from "../../assets/phone-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";

function Customers() {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { getClients, clients } = useContext(ClientContext);

  useEffect(() => {
    async function callGetClient() {
      return getClients(token);
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
              cpf,
              email,
              cep,
              telefone,
              so_pago,
              valor_cobrado,
              statusCliente,
            }) => (
              <div className="container-details-costumers" key={id}>
                <div className="client-details">
                  <div
                    onClick={() =>
                      history.push(`/clients/details/${id}`, {
                        id,
                      })
                    }
                    className="name-costumers"
                  >
                    <button>
                      <span>{nome}</span>
                    </button>
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
                <span className="span-lg  ">R$ {so_pago}</span>
                <span className="span-lg margin-lg">
                  R$ {!valor_cobrado ? "0" : valor_cobrado}
                </span>
                <span
                  className={`status-costumers ${statusCliente.toLowerCase()}`}
                >
                  {statusCliente.toUpperCase()}
                </span>
                <div className="edit-clients-button">
                  <button
                    onClick={() =>
                      history.push(`/clients/${id}/edit`, {
                        id,
                        nome,
                        cpf,
                        cep,
                        email,
                        telefone,
                      })
                    }
                  >
                    <img src={EditIcon} alt="Editar Cliente" />
                  </button>
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
