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

  const { getClientStatusEmdia, getClientStatusInad, statusEmdia, statusInad } =
    useContext(ClientContext);

  useEffect(() => {
    async function callClientStatus() {
      await getClientStatusEmdia(token);
      await getClientStatusInad(token);
      return;
    }
    callClientStatus();
  }, []);

  return (
    <div className="container-status">
      <div className="head-status">
        <img src={img} alt="" />
        <span>{nome}</span>
      </div>
      <div className="details-status">
        <button onClick={() => history.push("/reports/clients/em_dia")}>
          <PayStatus
            situacao="Em dia"
            quantidade={statusEmdia.length ? statusEmdia.length : "0"}
          />
        </button>
        <button onClick={() => history.push("/reports/clients/inadimplente")}>
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
    return history.push(`/reports/charges/pendente`);
  }
  async function handleStatusPago() {
    await getChargeStatus("pago");
    return history.push(`/reports/charges/pago`);
  }
  async function handleStatusVencido() {
    await getChargeStatus("vencido");
    return history.push(`/reports/charges/vencido`);
  }
  //"Insira um status válido ('pago', 'pendente' ou 'vencido')"
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
