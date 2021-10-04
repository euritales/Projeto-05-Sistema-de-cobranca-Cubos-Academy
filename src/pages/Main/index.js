import ProfileBar from "../../components/ProfileBar";
import "./styles.css";
import SideBar from "../../components/SideBar";

function Main({ children }) {
  return (
    <div className="container-main flex-row ">
      <SideBar />
      <ProfileBar />
      {children}
    </div>
  );
}

export default Main;
