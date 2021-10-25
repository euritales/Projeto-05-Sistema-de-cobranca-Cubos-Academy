import { PayStatus, ForeseenStatus, DefaultStatus } from "./detailsStatus.js";
import "./styles.css";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { ChargeContext } from "../../context/charge";
import { ClientContext } from "../../context/client";
import { useHistory } from "react-router-dom";
import { useContext } from "react";

export function StatusClient({ nome, img }) {
  const history = useHistory();
  const { token } = useContext(AuthContext);

  const {
    getClientStatusEmdia,
    getClientStatusInad,
    getClientStatus,
    statusClient,
    statusEmdia,
    statusInad,
  } = useContext(ClientContext);

  useEffect(() => {
    async function callClientStatus() {
      await getClientStatusEmdia(token);
      await getClientStatusInad(token);
      return;
    }
    callClientStatus();
  }, []);

  async function handleStatusEmDia() {
    const statusAtual = "em_dia";
    await getClientStatus("em_dia");
    return history.push(`/reports/clients/em_dia`, statusAtual);
  }
  async function handleStatusInadimplente() {
    const statusAtual = "inadimplente";
    await getClientStatus("inadimplente");
    return history.push(`/reports/clients/inadimplente`, statusAtual);
  }

  return (
    <div className="container-status">
      <div className="head-status">
        <img src={img} alt="" />
        <span>{nome}</span>
      </div>
      <div className="details-status">
        <button onClick={() => handleStatusEmDia()}>
          <PayStatus
            situacao="Em dia"
            quantidade={statusEmdia.length ? statusEmdia.length : "0"}
          />
        </button>
        <button onClick={() => handleStatusInadimplente()}>
          <ForeseenStatus
            situacao="Inadimplentes"
            quantidade={statusInad.length ? statusInad.length : "0"}
          />
        </button>
      </div>
    </div>
  );
}

export function StatusCharges({ nome, img }) {
  const history = useHistory();
  const [pendente, setPendente] = useState([]);

  const {
    getChargeStatusPendente,
    getChargeStatusPago,
    getChargeStatusVencido,
    statusPendente,
    statusPago,
    statusVencido,
    getChargeStatus,
  } = useContext(ChargeContext);
  useEffect(() => {
    async function callClientStatus() {
      await getChargeStatusPendente();
      setPendente(statusPendente);
      await getChargeStatusPago();
      await getChargeStatusVencido();
      return;
    }
    callClientStatus();
  }, []);

  async function handleStatusPendente() {
    await getChargeStatus("pendente");
    const statusAtual = "pendente";
    return history.push(`/reports/charges/pendente`, statusAtual);
  }
  async function handleStatusPago() {
    await getChargeStatus("pago");
    const statusAtual = "pago";
    return history.push(`/reports/charges/pago`, statusAtual);
  }
  async function handleStatusVencido() {
    await getChargeStatus("vencido");
    const statusAtual = "vencido";
    return history.push(`/reports/charges/vencido`, statusAtual);
  }
  return (
    <div className="container-status">
      <div className="head-status">
        <img src={img} alt="" />
        <span>{nome}</span>
      </div>
      <div className="details-status">
        <button onClick={() => handleStatusPendente()}>
          <DefaultStatus
            situacao="Previstas"
            quantidade={statusPendente.length ? statusPendente.length : "0"}
          />
        </button>
        <button onClick={() => handleStatusVencido()}>
          <ForeseenStatus
            situacao="Vencidas"
            quantidade={statusVencido.length ? statusVencido.length : "0"}
          />
        </button>
        <button onClick={() => handleStatusPago()}>
          <PayStatus
            situacao="Pagas"
            quantidade={statusPago.length ? statusPago.length : "0"}
          />
        </button>
      </div>
    </div>
  );
}
