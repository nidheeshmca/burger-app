import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Burger Price : <strong>{props.price.toFixed(2)}</strong>{" "}
    </p>
    {controls.map((cltr) => {
      return (
        <BuildControl
          label={cltr.label}
          key={cltr.label}
          type={cltr.type}
          added={props.ingredientAdded}
          removed={() => props.ingredientRemoved(cltr.type)}
          lessDisabled={props.lessDisableInfo[cltr.type]}
          moreDisabled={props.moreDisableInfo[cltr.type]}
        ></BuildControl>
      );
    })}
    <button
      disabled={!props.isBuyable}
      className={classes.OrderButton}
      onClick={props.buying}
    >
      Order Now
    </button>
  </div>
);
export default BuildControls;
