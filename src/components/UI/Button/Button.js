import React from "react";
import classes from "./Button.css";
const button = (props) => {
  let button = (
    <button
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );

  if (props.disabled) {
    button = (
      <button
        className={[classes.Button, classes[props.btnType]].join(" ")}
        onClick={props.clicked}
        disabled
      >
        {props.children}
      </button>
    );
  }

  return button;
};

export default button;
