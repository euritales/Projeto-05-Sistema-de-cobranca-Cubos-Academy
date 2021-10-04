import { PayStatus, ForeseenStatus, DefaultStatus } from "./detailsStatus.js";
import "./styles.css";
export function StatusClient({ nome, img, quantidade }) {
  return (
    <div>
      <div className="tittle-status">
        <img src={img} alt="" />
        <span>{nome}</span>
      </div>
      <div className="container-status">
        <PayStatus situacao="Em dia" quantidade={quantidade} />
        <ForeseenStatus situacao="Inadiplentes" quantidade={quantidade} />
      </div>
    </div>
  );
}
export function StatusRent({ nome, img, quantidade }) {
  return (
    <div>
      <div className="tittle-status">
        <img src={img} alt="" />
        <span>{nome}</span>
      </div>
      <div className="container-status">
        <DefaultStatus situacao="Previstas" quantidade={quantidade} />
        <ForeseenStatus situacao="Vencidas" quantidade={quantidade} />
        <PayStatus situacao="Pagas" quantidade={quantidade} />
      </div>
    </div>
  );
}
