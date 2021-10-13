import "./styles.css";
import { useHistory, NavLink } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ClientContext } from "../../context/client";
import EmailIcon from "../../assets/email-icon.svg";
import PhoneIcon from "../../assets/phone-icon.svg";
import Line from "../../assets/line.svg";
import { useState } from "react/cjs/react.development";
import NumberFormat from "react-number-format";
import { format } from "date-fns";

function DetailsCustomers() {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { getClient, client } = useContext(ClientContext);
  const [chargeClient, setChargeClient] = useState([]);
  const { id } = history.location.state ?? {};
  let formatDate = "";

  useEffect(() => {
    async function callGetUser() {
      return getClient({ token, id });
    }
    callGetUser();
  }, []);
  useEffect(() => {
    function callSetCharge() {
      setChargeClient(client.cobrancas);
    }
    callSetCharge();
  }, []);

  return (
    <div className="container-details-customers">
      <div className="container-info-clients">
        <h1>{client.nome}</h1>
        <NumberFormat
          value={client.cpf}
          displayType={"text"}
          format="###.###.###-##"
        />
        <div className="flex-row info-clients-first">
          <div className="flex-row">
            <img src={EmailIcon} alt="" />
            <span>{client.email}</span>
          </div>
          <div className="flex-row">
            <img src={PhoneIcon} alt="" />
            <NumberFormat
              value={client.telefone}
              displayType={"text"}
              format="(##) # ####-####"
            />
          </div>
        </div>
        <div className="flex-row info-clients-second">
          <div>
            <p>CEP</p>
            <NumberFormat
              value={client.cep}
              displayType={"text"}
              format="#####-###"
            />{" "}
          </div>
          <div>
            <p>Bairro</p>
            <span>{client.bairro}</span>
          </div>
          <div>
            <p>Cidade</p>
            <span>{client.cidade}</span>
          </div>
        </div>
        <div>
          <p>Logradouro</p>
          <span>{client.logradouro}</span>
        </div>
        <div>
          <div>
            <p>Complemento</p>
            <span>{client.complemento}</span>
          </div>
          <div>
            <p>Ponto de Referência</p>
            <span>{client.ponto_referencia}</span>
          </div>
        </div>
      </div>
      <img src={Line} alt="" />
      <div className="container-info-charges">
        {!chargeClient ? (
          <div>
            <p>sem faturas pendentes</p>
          </div>
        ) : (
          chargeClient.map(
            ({ id, descricao, valor, status, data_vencimento }) => (
              <div key={id} className="box-info-charges">
                <div>
                  <div>
                    <p>{id}</p>
                    {descricao}
                  </div>
                  <span className="span-md"></span>
                </div>
                <div>
                  <NumberFormat
                    className="span-md margin-md"
                    value={!valor ? "0" : valor}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"R$"}
                  />
                </div>
                <div>
                  {" "}
                  <span className={`status-costumers ${status.toLowerCase()}`}>
                    {status.toUpperCase()}
                  </span>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default DetailsCustomers;
