import HomeBar from "../../components/HomeBar";
import ProfilleBar from "../../components/ProfileBar";
import "./styles.css";

function Main() {
  return (
    <div className="container-main flex-row">
      <HomeBar />

      <div className="main-screen">
        <h1>Outra parte do menu</h1>
      </div>
    </div>
  );
}

export default Main;
