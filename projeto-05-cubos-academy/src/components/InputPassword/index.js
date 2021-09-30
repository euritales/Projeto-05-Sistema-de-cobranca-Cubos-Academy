import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState } from "react";

const InputPassword = React.forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
  );
});

export default InputPassword;
