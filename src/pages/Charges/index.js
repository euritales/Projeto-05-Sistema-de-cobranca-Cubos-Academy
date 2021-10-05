import "./styles.css";
import SadIcon from "../../assets/sad-icon.svg";
import HappyIcon from "../../assets/happy-icon.svg";

function Charges() {
  return (
    <div className="container-collection">
      <img src={SadIcon} alt="" />
      <span>Site ainda em construção. Volte em breve!</span>
      <img src={HappyIcon} alt="" />
    </div>
  );
}

export default Charges;
