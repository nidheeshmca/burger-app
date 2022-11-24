import React from "react";
import classes from "./Order.css";
const Order = (props) => {
  let ingredient = Object.keys(props.order.ingredient).map((inKey) => {
    return (
      <li key={inKey} style={{ textTransform: "capitalize" }}>
        {inKey + " : " + props.order.ingredient[inKey]}
      </li>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Thanks for order a burger with below indgredirnts.</p>
      <p>Ingredient:</p>
      <ul>{ingredient}</ul>

      <p>Price : {props.order.price} Rs.</p>
      <p>Order by : {props.order.customer.name} </p>
    </div>
  );
};

export default Order;
