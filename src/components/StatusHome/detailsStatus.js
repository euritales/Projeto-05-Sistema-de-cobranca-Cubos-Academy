import "./styles.css";
// Apenas exibção dos numeros na home
export function DefaultStatus({ situacao, quantidade }) {
  return (
    <div className="status default">
      <span>{situacao}</span>
      <h3>{quantidade}</h3>
    </div>
  );
}
export function PayStatus({ situacao, quantidade }) {
  return (
    <div className="status pay">
      <span>{situacao}</span>
      <h3>{quantidade}</h3>
    </div>
  );
}
export function ForeseenStatus({ situacao, quantidade }) {
  return (
    <div className="status foreseen">
      <span>{situacao}</span>
      <h3>{quantidade}</h3>
    </div>
  );
}
