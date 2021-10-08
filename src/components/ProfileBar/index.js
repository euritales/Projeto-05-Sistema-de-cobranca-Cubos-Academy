import "./styles.css";
import Profile from "../../assets/profile-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import LogoffIcon from "../../assets/logoff-icon.svg";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../services/auth";

function ProfileBar({ setEditProfileStatus }) {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const [openPopup, setOpenPopup] = useState(false);

  function handleOpenLogoutPage() {
    return setOpenPopup(!openPopup);
  }

  return (
    <div className="container-profileBar">
      <img
        src={Profile}
        alt="Icon"
        className="icon"
        onClick={() => handleOpenLogoutPage()}
      />
      {openPopup === true && (
        <div className="pop-up">
          <NavLink
            to={location.pathname}
            exact
            className="edit-button"
            onClick={() => setEditProfileStatus(true)}
          >
            <img src={EditIcon} alt="" />
            <span>Editar</span>
          </NavLink>

          <NavLink to="/" exact className="logoff-button" onClick={logout}>
            <img src={LogoffIcon} alt="" />
            <span>Deslogar</span>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default ProfileBar;
