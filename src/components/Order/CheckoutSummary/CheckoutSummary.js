import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
const CheckoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>Hope! it taste will be good.</h1>
    <div style={{ width: "100%", margin: "auto" }}>
      <Burger ingredient={props.ingredient}></Burger>
    </div>
    <Button btnType="Danger" clicked={props.checkoutCancelled}>
      CANCEL
    </Button>
    <Button btnType="Success" clicked={props.checkoutCountinue}>
      CONTINUE
    </Button>
  </div>
);

export default CheckoutSummary;
