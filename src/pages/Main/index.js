import ProfileBar from "../../components/ProfileBar";
import "./styles.css";
import SideBar from "../../components/SideBar";
import { AuthContext } from "../../routes";
import { useContext } from "react";
import EditProfile from "../../components/EditProfile";

function Main({ children }) {
  const { editProfileStatus, handleEditProfile } = useContext(AuthContext);
  return (
    <div className="container-main flex-row ">
      <SideBar />
      <ProfileBar />
      {editProfileStatus === true && <EditProfile />}
      {children}
    </div>
  );
}

export default Main;
