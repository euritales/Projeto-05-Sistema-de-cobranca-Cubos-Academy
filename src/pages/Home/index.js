import { StatusClient, StatusRent } from "../../components/StatusHome";
import "./styles.css";
import CustomersIcon from "../../assets/customers-icon.svg";
import ChargeIcon from "../../assets/charge-icon.svg";

function Home() {
  return (
    <div className="container-home">
      <StatusClient nome="Clientes" quantidade="0" img={CustomersIcon} />
      <StatusRent nome="Cobranças" quantidade="0" img={ChargeIcon} />
    </div>
  );
}

export default Home;
