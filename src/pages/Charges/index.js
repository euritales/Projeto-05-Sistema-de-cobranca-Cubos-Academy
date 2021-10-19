import "./styles.css";
import { useEffect, useState } from "react";
import { useCharges } from "../../context/charge";
import SearchIcon from "../../assets/search-icon.svg";
import { formatToBRL, formatToDate } from "brazilian-values";
import EditChargesModal from "../../components/EditCharges";

function Charges() {
  const { charges } = useCharges();
  const [openEditCharges, setOpenEditCharges] = useState(false);
  const [chargeId, setChargeId] = useState("");
  const [busca, setBusca] = useState("");
  const [listagem, setListagem] = useState([]);

  useEffect(() => {
    setListagem(charges);
  }, [charges]);

  function handleChange(value) {
    console.log(value);
    if (value === "") {
      setListagem(charges);
      return;
    }
    const filterClient = charges.filter((charge) =>
      charge.nome.toLowerCase().includes(value)
    );
    setListagem(filterClient);
  }

  function handleEditClient(id) {
    setChargeId(id);
    setOpenEditCharges(true);
  }

  return (
    <>
      {openEditCharges && (
        <EditChargesModal
          id={chargeId}
          setOpenEditCharges={setOpenEditCharges}
        />
      )}
      <div className="container-charge">
        <div className="input-busca margin-busca">
          <input
            type="text"
            id="busca"
            onChange={(e) => setBusca(e.target.value.toLowerCase())}
            placeholder="Procurar por Nome, E-mail ou CPF"
          />
          <button type="submit" onClick={() => handleChange(busca)}>
            <img src={SearchIcon} alt="" />
            <span>BUSCAR</span>
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
          {listagem.length < 0 ? (
            <div className="no-register">
              <h3>Sem registros no momento!</h3>
            </div>
          ) : (
            listagem.map(
              ({ id, nome, descricao, valor, status, data_vencimento }) => {
                return (
                  <button onClick={() => handleEditClient(id)} key={id}>
                    <div className="container-details-charge">
                      <span className="span-sm">#{id}</span>
                      <span className="span-lg margin-lg">{nome}</span>
                      <span className="span-lg margin-lg">{descricao}</span>
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
                  </button>
                );
              }
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Charges;
