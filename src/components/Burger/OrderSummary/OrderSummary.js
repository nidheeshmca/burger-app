import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  state = {};

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((ind) => {
      return (
        <li key={ind}>
          <span style={{ textTransform: "capitalize" }}>{ind}</span> :{" "}
          {this.props.ingredients[ind]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price : {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.onCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.onContinue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
