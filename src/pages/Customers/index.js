import "./styles.css";
import { useHistory } from "react-router-dom";

function Customers() {
  const history = useHistory();

  return (
    <div className="container-costumers">
      <button onClick={() => history.push("/clients/register")}></button>
      <h1>Clientes</h1>
    </div>
  );
}

export default Customers;
