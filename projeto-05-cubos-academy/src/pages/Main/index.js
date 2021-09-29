import ProfileBar from "../../components/ProfileBar";
import "./styles.css";
import SideBar from "../../components/SideBar";

function Main() {
  return (
    <div className="container-main flex-row">
      <SideBar />
      <>
        <ProfileBar />
        <h1>teste</h1>
      </>
    </div>
  );
}

export default Main;
