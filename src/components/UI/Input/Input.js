import React from "react";
import classes from "./Input.css";
const Input = (props) => {
  let inputElement = null;
  let inputClass = [classes.Input];
  if (!props.valid && props.touched) {
    inputClass.push(classes.HasError);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClass}
          value={props.value}
          onChange={props.changed}
        ></input>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={inputClass}
          value={props.value}
          onChange={props.changed}
        ></textarea>
      );
      break;
    case "select":
      inputElement = (
        <select className={inputClass} onChange={props.changed}>
          <option key={"0"} value={""}>
            {props.elementConfig.placeholder}
          </option>
          {props.elementConfig.options.map((opt) => {
            const seleted =
              props.elementConfig.value == opt.value ? true : false;
            if (seleted) {
              return (
                <option value={opt.value} selected>
                  {opt.text}
                </option>
              );
            } else {
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.text}
                </option>
              );
            }
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          {...props.elementConfig}
          className={inputClass}
          value={props.value}
        ></input>
      );
  }
  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {props.valid ? null : (
        <span className={classes.Error}>{props.error}</span>
      )}
    </div>
  );
};

export default Input;
