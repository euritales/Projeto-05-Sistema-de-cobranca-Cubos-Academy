import "./styles.css";
import Profile from "../../assets/profile-icon.svg";
// import Close from "../../assets/close-icon.svg";
// import { useState } from "react/cjs/react.development";
import { useHistory, useLocation } from "react-router-dom";

function ProfileBar() {
  // const [open, setOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();

  function handleOpenProfilePage() {
    if (location.pathname === "/profile") {
      history.push("/");
      return;
    }
    history.push("/profile");
  }
  return (
    <div className="container-profileBar">
      <img
        src={Profile}
        alt="Icon"
        className="icon"
        onClick={() => handleOpenProfilePage()}
      />
    </div>
  );
}

export default ProfileBar;
