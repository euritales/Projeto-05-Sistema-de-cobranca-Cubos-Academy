import "./styles.css";
import "./styles.css";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ChargeContext } from "../../context/charge";
import { format } from "date-fns";

function Charges() {
  const { token } = useContext(AuthContext);
  const { getCharges, charges } = useContext(ChargeContext);
  let formatDate = "";

  useEffect(() => {
    async function callGetClient() {
      return getCharges(token);
    }
    callGetClient();
  }, []);
  return (
    <div className="container-charge">
      <div className="container-description-charge">
        <span className="span-sm">ID</span>
        <span className="span-lg">Cliente</span>
        <span className="span-lg">Descrição</span>
        <span className="span-md">Valor</span>
        <span>Status</span>
        <span className="span-md">Vencimento</span>
      </div>
      <div className="box-container-details">
        {!charges ? (
          <div className="no-register">
            <h3>Sem registros no momento!</h3>
          </div>
        ) : (
          charges.map(
            ({ id, nome, descricao, valor, status, data_vencimento }) => (
              <div className="container-details-charge" key={id}>
                <span className="span-sm">#{id}</span>
                <span className="span-lg margin-lg">{nome}</span>
                <span className="span-lg margin-lg">{descricao}</span>
                <span className="span-md margin-md">R$ {valor}</span>
                <span className={`status-charge ${status}`}>
                  {status.toUpperCase()}
                </span>
                <span className="span-md">
                  {" "}
                  {
                    (formatDate = format(
                      new Date(data_vencimento),
                      "dd/MM/yyyy"
                    ))
                  }
                </span>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default Charges;
