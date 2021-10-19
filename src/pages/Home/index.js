import { StatusClient, StatusCharges } from "../../components/StatusHome";
import "./styles.css";
import CustomersIcon from "../../assets/customers-icon.svg";
import ChargeIcon from "../../assets/charge-icon.svg";

function Home() {
  return (
    <div className="container-home">
      <StatusClient nome="Clientes" img={CustomersIcon} />
      <StatusCharges nome="Cobranças" img={ChargeIcon} />
    </div>
  );
}

export default Home;
