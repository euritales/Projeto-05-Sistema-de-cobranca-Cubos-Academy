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
        id={props.id}
        type={showPassword ? "text" : "password"}
        name={props.name}
        ref={ref}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
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
