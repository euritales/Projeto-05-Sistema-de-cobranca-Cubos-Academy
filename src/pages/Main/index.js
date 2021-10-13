import ProfileBar from "../../components/ProfileBar";
import "./styles.css";
import SideBar from "../../components/SideBar";

import EditProfile from "../../components/EditProfile";
import { useState } from "react";

function Main({ children }) {
  const [editProfileStatus, setEditProfileStatus] = useState(false);
  return (
    <div className="container-main flex-row  ">
      <SideBar />
      <ProfileBar setEditProfileStatus={setEditProfileStatus} />
      {editProfileStatus && (
        <EditProfile setEditProfileStatus={setEditProfileStatus} />
      )}
      <div className=" container-children-main ">{children}</div>
    </div>
  );
}

export default Main;
