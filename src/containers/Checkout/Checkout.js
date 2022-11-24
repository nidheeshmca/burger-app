import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredient: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredient = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "totalPrice") {
        price = param[1];
      } else {
        ingredient[param[0]] = +param[1];
      }
    }
    this.setState({ ingredient: ingredient, totalPrice: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutCountinueHandler = () => {
    this.props.history.replace("checkout/conatct-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredient={this.state.ingredient}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutCountinue={this.checkoutCountinueHandler}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/conatct-data"}
          exact
          render={(props) => (
            <ContactData
              ingredient={this.state.ingredient}
              totalPrice={this.state.totalPrice}
              {...props}
            ></ContactData>
          )}
        ></Route>
      </div>
    );
  }
}

export default Checkout;
