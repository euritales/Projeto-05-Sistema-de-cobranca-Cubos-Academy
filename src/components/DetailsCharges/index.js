import "./styles.css";

function DetailsCharge(id, cliente, descricao, valor, status, vencimento) {
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

export default DetailsCharge;
