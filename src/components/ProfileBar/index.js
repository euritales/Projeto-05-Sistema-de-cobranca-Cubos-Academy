import "./styles.css";
import Profile from "../../assets/profile-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import LogoffIcon from "../../assets/logoff-icon.svg";
// import Close from "../../assets/close-icon.svg";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../routes";

function ProfileBar() {
  const location = useLocation();
  const history = useHistory();
  const { deslogar } = useContext(AuthContext);
  const [openPopup, setOpenPopup] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  function handleOpenEdit() {
    setOpenEdit(true);
    setOpenPopup(false);
  }

  function handleOpenLogoutPage() {
    return setOpenPopup(!openPopup);
  }

  // function handleOpenProfileBar() {
  //   if (location.pathname === "/profile") {
  //     history.replace("/");
  //     return;
  //   }
  //   history.push("/profile");
  // }

  function logOff() {
    return deslogar();
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
            onClick={() => handleOpenEdit()}

            // activeClassName="edit-button-hover"
          >
            <img src={EditIcon} alt="" />
            <span>Editar</span>
          </NavLink>

          <NavLink
            to="/"
            exact
            className="logoff-button"
            onClick={() => logOff()}
          >
            <img src={LogoffIcon} alt="" />
            <span>Deslogar</span>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default ProfileBar;
