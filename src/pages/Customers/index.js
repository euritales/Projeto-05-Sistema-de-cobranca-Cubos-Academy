import "./styles.css";
import { useHistory } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { ClientContext } from "../../context/client";
import EmailIcon from "../../assets/email-icon.svg";
import PhoneIcon from "../../assets/phone-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import NumberFormat from "react-number-format";
import SearchIcon from "../../assets/search-icon.svg";
import EditCustomers from "../../components/EditCustomers";
import DetailsCustomers from "../../components/DetailsCustomers";
import { formatToBRL } from "brazilian-values";

function Customers() {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { getClients, clients } = useContext(ClientContext);
  const [editClients, setEditClients] = useState(false);
  const [detailsClient, setDetailsClient] = useState(false);
  const [clientId, setClientId] = useState();
  const [busca, setBusca] = useState("");
  const [listagem, setListagem] = useState([]);

  useEffect(() => {
    async function callGetClient() {
      return getClients(token);
    }
    callGetClient();
  }, [editClients]);

  useEffect(() => {
    // console.log(charges);
    setListagem(clients);
  }, [clients]);

  function handleEditClient(id) {
    setClientId(id);
    setEditClients(true);
  }

  function handleDetailsClient(id) {
    setClientId(id);
    setDetailsClient(true);
  }
  function handleChange(value) {
    console.log(value);
    if (value === "") {
      setListagem(clients);
      return;
    }
    const filterClient = clients.filter(
      (charge) => charge.nome.toLowerCase().includes(value)
      // || charge.id.includes(value) ||
      // charge.email.includes(value)
    );
    setListagem(filterClient);
  }

  return (
    <>
      {detailsClient && (
        <DetailsCustomers
          setDetailsClient={setDetailsClient}
          clientId={clientId}
        />
      )}{" "}
      <div className="container-costumers">
        {editClients && (
          <EditCustomers setEditClients={setEditClients} clientId={clientId} />
        )}
        <>
          <div className="input-busca-botao">
            <button
              className="btn btn-white"
              onClick={() => history.push("/clients/register")}
            >
              Adicionar cliente
            </button>
            <div className="input-busca">
              <input
                type="text"
                id="busca"
                // onChange={(e) => handleChange(e.target.value.toLowerCase())}
                onChange={(e) => setBusca(e.target.value.toLowerCase())}
                placeholder="Procurar por Nome, E-mail ou CPF"
              />
              <button onClick={() => handleChange(busca)}>
                <img src={SearchIcon} alt="" />
                <span>BUSCAR</span>
              </button>
            </div>
          </div>
          <div className="container-description-costumers">
            <span className="span-lg">Cliente</span>
            <span className="span-lg">Cobranças Feitas</span>
            <span className="span-lg">Cobranças Recebidas</span>
            <span>Status</span>
          </div>
          <div className="box-container-details">
            {!listagem ? (
              <div className="no-register">
                <h3>Sem registros no momento!</h3>
              </div>
            ) : (
              listagem.map(
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
                      <div className="name-costumers">
                        <button onClick={() => handleDetailsClient(id)}>
                          <p>{nome}</p>
                        </button>
                      </div>
                      <div className="span-client-email">
                        <img src={EmailIcon} alt="email" />
                        <span>{email}</span>
                      </div>
                      <div>
                        <img src={PhoneIcon} alt="telefone" />
                        <NumberFormat
                          value={telefone}
                          displayType={"text"}
                          format="(##) # ####-####"
                        />
                      </div>
                    </div>

                    <span className="span-lg  ">
                      {formatToBRL(!valor_cobrado ? "0" : valor_cobrado / 100)}
                    </span>
                    <span className="span-lg margin-lg">
                      {formatToBRL(so_pago / 100)}
                    </span>

                    <span
                      className={`status-costumers ${statusCliente.toLowerCase()}`}
                    >
                      {statusCliente.replace("_", " ").toUpperCase()}
                    </span>
                    <div className="edit-clients-button">
                      <button
                        onClick={() => {
                          handleEditClient(id);
                        }}
                      >
                        <img src={EditIcon} alt="Editar Cliente" />
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </>
      </div>
    </>
  );
}

export default Customers;
