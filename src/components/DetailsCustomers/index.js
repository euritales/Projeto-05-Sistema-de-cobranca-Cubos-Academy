import "./styles.css";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ClientContext } from "../../context/client";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import EmailIcon from "../../assets/email-icon.svg";
import PhoneIcon from "../../assets/phone-icon.svg";
import Line from "../../assets/line.svg";
import CloseIcon from "../../assets/close-icon.svg";
import { formatToBRL, formatToDate } from "brazilian-values";

function DetailsCustomers({ setDetailsClient, clientId }) {
  const { token } = useContext(AuthContext);
  const { getClient, client } = useContext(ClientContext);
  const location = useLocation();

  useEffect(() => {
    console.log(clientId);
    return getClient({ token, id: clientId });
  }, []);

  return (
    <div className="position-absolute">
      <NavLink
        to={location.pathname}
        exact
        className="close-button-details"
        onClick={() => setDetailsClient(false)}
      >
        <img src={CloseIcon} alt="" />
      </NavLink>
      <div className="container-details-customers">
        <div className="container-info-clients">
          <div className="title-customer">
            <h1>{client.nome}</h1>
            <span>
              <NumberFormat
                value={client.cpf}
                displayType="321.123.123-45"
                format="###.###.###-##"
              />
            </span>
          </div>
          <div className="flex-row info-clients-first">
            <div className="flex-row over-text">
              <img src={EmailIcon} alt="" />
              <span className="span-lg">{client.email}</span>
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
              />
            </div>
            <div>
              <p>Bairro</p>
              <span>{client.bairro ? client.bairro : "Sem Bairro"}</span>
            </div>
            <div>
              <p>Cidade</p>
              <span>{client.cidade ? client.cidade : "Sem Cidade"}</span>
            </div>
          </div>
          <div className="logradouro">
            <p>Logradouro</p>
            <span>
              {client.logradouro ? client.logradouro : "Sem Logradouro"}
            </span>
          </div>
          <div className="flex-row complemento">
            <div>
              <p>Complemento</p>
              <span>
                {!client.complemento ? "Sem Complemento" : client.complemento}
              </span>
            </div>
            <div>
              <p>Ponto de Referência</p>
              <span>
                {client.ponto_referencia
                  ? client.ponto_referencia
                  : "Sem Ponto de Referência"}
              </span>
            </div>
          </div>
        </div>
        <img src={Line} alt="" />
        <div className="container-info-charges">
          {!client.cobrancas?.length ? (
            <div className="box-info-charges">
              <p>sem faturas pendentes</p>
            </div>
          ) : (
            client.cobrancas.map(
              ({ id, descricao, valor, status, data_vencimento }) => (
                <div key={id} className="box-info-charges">
                  <div className="info-charge-one">
                    <div>
                      <p>#{id}</p>
                      <span className="span-md">{descricao}</span>
                    </div>
                    <div>
                      <span>{formatToDate(new Date(data_vencimento))}</span>
                    </div>
                  </div>

                  <div className="info-charge-two">
                    <div>
                      <p>{formatToBRL(valor)}</p>
                    </div>
                    <div>
                      <span
                        className={`status-costumers ${
                          status ? status.toLowerCase() : "as"
                        }`}
                      >
                        {status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsCustomers;
