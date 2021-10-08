import "./styles.css";

const arrayCliets = [
  {
    id: "1",
    cliente: "ramon",
    descricao: "agiotagem",
    valor: "74000",
    statusCobranca: "pendente",
    vencimento: "12/10/2021",
  },
  {
    id: "121",
    cliente: "ramon",
    descricao: "agiotagem",
    valor: "74000",
    statusCobranca: "pendente",
    vencimento: "12/10/2021",
  },
];

function Charges() {
  return (
    <div className="container-charge">
      <div className="container-description-charge">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
            </tr>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Vencimento</th>
            </tr>
          </thead>
          <tbody>
            {arrayCliets.map(
              ({
                id,
                cliente,
                descricao,
                valor,
                statusCobranca,
                vencimento,
              }) => (
                <tr className="container-details-charge">
                  {/* //text align left */}
                  <td>{id}</td>
                  <td>{cliente}</td>
                  <td>{descricao}</td>
                  <td>{valor}</td>
                  <td>{statusCobranca}</td>
                  <td>{vencimento}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DetailsCharges(
  id,
  cliente,
  descricao,
  valor,
  status,
  vencimento
) {
  return (
    <>
      <tbody>
        <tr>
          <td>{id}</td>
          <td>{cliente}</td>
          <td>{descricao}</td>
          <td>{valor}</td>
          <td>{status}</td>
          <td>{vencimento}</td>
        </tr>
      </tbody>
    </>
  );
}

export default Charges;
