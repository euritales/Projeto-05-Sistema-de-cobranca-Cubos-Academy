import "./styles.css";
import "./styles.css";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ChargeContext } from "../../context/charge";
import SearchIcon from "../../assets/search-icon.svg";
import { formatToBRL, formatToDate } from "brazilian-values";

function Charges() {
  const { token } = useContext(AuthContext);
  const { getCharges, charges } = useContext(ChargeContext);

  useEffect(() => {
    async function callGetClient() {
      return getCharges(token);
    }
    callGetClient();
  }, []);
  return (
    <div className="container-charge">
      <div className="input-busca">
        <input placeholder="Procurar por Nome, E-mail ou CPF" />
        <button>
          <img src={SearchIcon} alt="" />
        </button>
      </div>
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
                {/* <span className="span-md margin-md">R$ {valor}</span> */}

                <span className="span-md margin-md">
                  {formatToBRL(!valor ? "0" : valor / 100)}
                </span>
                <span className={`status-charge ${status}`}>
                  {status.toUpperCase()}
                </span>
                <span className="span-md">
                  {formatToDate(new Date(data_vencimento))}
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
