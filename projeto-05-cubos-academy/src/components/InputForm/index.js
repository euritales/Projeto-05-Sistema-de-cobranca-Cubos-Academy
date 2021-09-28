import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function InputForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex-column input">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="exemplo@gmail.com"
        />
      </div>
      <div className="flex-column input input-password">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="minhasenha"
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          className="eye-password"
          color={showPassword ? "#000000" : "#bebebe"}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
    </>
  );
}

export default InputForm;
