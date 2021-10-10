import "./styles.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react/cjs/react.development";
import { AuthContext } from "../../context/auth";
import { ClientContext } from "../../context/client";

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
      <button onClick={() => history.push("/clients/register")}>
        Adicionar cliente
      </button>
      <div>
        <div className="container-charge">
          <div className="container-description-charge">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                </tr>
                <tr>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Vencimento</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(
                  ({
                    id,
                    nome,
                    email,
                    telefonne,
                    so_pago,
                    valor_cobrado,
                    statusCliente,
                  }) => (
                    <tr className="container-details-charge">
                      {/* //text align left */}
                      <td>{id}</td>
                      <td>{nome}</td>
                      <td>{email}</td>
                      <td>{telefonne}</td>
                      <td>{so_pago}</td>
                      <td>{valor_cobrado}</td>
                      <td>{statusCliente}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
