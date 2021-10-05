import ProfileBar from "../../components/ProfileBar";
import "./styles.css";
import SideBar from "../../components/SideBar";
import { AuthContext } from "../../routes";
import { useContext } from "react";
import EditProfile from "../../components/EditProfile";

function Main({ children }) {
  const { editProfileStatus } = useContext(AuthContext);
  return (
    <div className="container-main flex-row ">
      <SideBar />
      <ProfileBar />
      {editProfileStatus && <EditProfile />}

      {children}
    </div>
  );
}

export default Main;
