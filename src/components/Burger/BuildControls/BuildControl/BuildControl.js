import React from "react";
import classes from "./BuildControl.css";
const BuildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.lessDisabled}
    >
      Less
    </button>
    <button
      className={classes.More}
      onClick={() => props.added(props.type)}
      disabled={props.moreDisabled}
    >
      More
    </button>
  </div>
);
export default BuildControl;
