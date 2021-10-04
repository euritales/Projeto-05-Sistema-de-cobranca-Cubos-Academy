import "./styles.css";

export function DefaultStatus({ situacao, quantidade }) {
  return (
    <div className="container-details default">
      <span>{situacao}</span>
      <h3>{quantidade}</h3>
    </div>
  );
}
export function PayStatus({ situacao, quantidade }) {
  return (
    <div className="container-details pay">
      <span>{situacao}</span>
      <h3>{quantidade}</h3>
    </div>
  );
}
export function ForeseenStatus({ situacao, quantidade }) {
  return (
    <div className="container-details foreseen">
      <span>{situacao}</span>
      <h3>{quantidade}</h3>
    </div>
  );
}
