import { StatusClient, StatusRent } from "../../components/StatusHome";
import "./styles.css";
import CustomersIcon from "../../assets/customers-icon.svg";
import ChargeIcon from "../../assets/charge-icon.svg";

function Home() {
  return (
    <div className="container-home">
      <StatusRent nome="Clientes" quantidade="0" img={CustomersIcon} />
      <StatusClient nome="Cobranças" quantidade="0" img={ChargeIcon} />
    </div>
  );
}

export default Home;
