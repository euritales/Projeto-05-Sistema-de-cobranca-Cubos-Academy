import React from "react";
import InputMask from "react-input-mask";
import "./styles.css";

export const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

export function MaskedInput({ value, onChange, name, mask }) {
  function handleChange(event) {
    onChange({
      ...event,
      target: {
        ...event.target,
        name,
        value: onlyNumbers(event.target.value),
        // value: event.target.value,
      },
    });
  }
  return (
    <InputMask
      className="mask-input"
      name={name}
      mask={mask}
      value={value}
      onChange={handleChange}
    />
  );
}
