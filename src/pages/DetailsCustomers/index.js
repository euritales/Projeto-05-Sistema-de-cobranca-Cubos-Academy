import "./styles.css";
import { useHistory } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ClientContext } from "../../context/client";
import EmailIcon from "../../assets/email-icon.svg";
import PhoneIcon from "../../assets/phone-icon.svg";
import { useState } from "react/cjs/react.development";

function DetailsCustomers() {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { getClient, client } = useContext(ClientContext);
  const [chargeClient, setChargeClient] = useState([]);

  const { id } = history.location.state ?? {};

  useEffect(() => {
    async function callGetUser() {
      return getClient(token, id);
    }
    callGetUser();
  }, []);
  useEffect(() => {
    function callSetCharge() {
      setChargeClient(client.cobrancas);
    }
    callSetCharge();
  }, [getClient()]);

  return (
    <div className="container-details-customers">
      <div className="container-info-clients">
        <h1>{client.nome}</h1>
        <span>{client.cpf}</span>
        <div>
          <div>
            <img src={EmailIcon} alt="" />
            <span>{client.email}</span>
          </div>
          <div>
            <img src={PhoneIcon} alt="" />
            <span>{client.telefone}</span>
          </div>
        </div>
        <div>
          <div>
            <p>CEP</p>
            <span>{client.cep}</span>
          </div>
          <div>
            <p>Bairro</p>
            <span>{client.bairro}</span>
          </div>
          <div>
            <p>Cidade</p>
            {/* <span>{client.cidade}</span> */}
          </div>
        </div>
        <div>
          <p>Logradouro</p>
          <span>{client.logradouro}</span>
        </div>
        <div>
          <div>
            <p>Logradouro</p>
            <span>{client.complemento}</span>
          </div>
          <div>
            <p>Logradouro</p>
            <span>{client.ponto_referencia}</span>
          </div>
        </div>
      </div>
      <div className="container-info-charges">
        {!chargeClient ? (
          <div>
            <p>sem faturas pendentes</p>
          </div>
        ) : (
          chargeClient.map(
            ({ id, descricao, valor, status, data_vencimento }) => (
              <div className="box-info-charges">
                <div>
                  <div>
                    {id}
                    {descricao}
                  </div>
                  {data_vencimento}
                </div>
                <div>{valor}</div>
                <div>{status}</div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default DetailsCustomers;
