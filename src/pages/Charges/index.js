import "./styles.css";

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
            {/* <DetailsCharges
          id="1"
          cliente="Jose"
          descricao="agiota"
          valor="74k"
          status="pago"
          vencimento="01/12/1948"
        /> */}
            <tr className="container-details-charge">
              <td>1</td>
              <td>Jose</td>
              <td>agiota</td>
              <td>74k</td>
              <td>pago</td>
              <td>01/12/1948</td>
            </tr>
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
