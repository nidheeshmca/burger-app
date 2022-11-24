import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../Axios-order";
import Loader from "../../components/UI/Loader/Loader";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 20,
  cheese: 40,
  meat: 60,
  bacon: 50,
};

const INGREDIENT_MAX_QAUNTITY = {
  salad: 3,
  cheese: 3,
  meat: 2,
  bacon: 2,
};

class BurgerBuilder extends Component {
  state = {
    ingredient: null,
    totalPrice: 80,
    isBuyable: false,
    buying: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    Axios.get("ingredient.json")
      .then((response) => {
        console.log(response);
        this.setState({ ingredient: response.data });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }

  updateBuyableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ isBuyable: sum > 0 });
  }
  buyingHandler = () => {
    this.setState({ buying: true });
  };
  backDropHandler = () => {
    this.setState({ buying: false });
  };
  continueHandler = () => {
    //this.setState({ loading: true });
    const queryParam = [];
    for (let i in this.state.ingredient) {
      queryParam.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredient[i])
      );
    }
    queryParam.push("totalPrice=" + this.state.totalPrice);
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryParam.join("&"),
    });

    /*
    const order = {
      ingredient: this.state.ingredient,
      price: this.state.totalPrice,
      customer: {
        name: "Nidheesh Kumar",
        address: {
          street: "Jaitra",
          zipCode: "246761",
          city: "Dhampur",
          state: "UP",
          country: "India",
        },
        email: "nidheeshmca@gmail.com",
        mobile: "9871539131",
      },
    };
    Axios.post("orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false, buying: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false, buying: false });
      });

      */
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredient[type];
    const udatedCount = oldCount + 1;
    const udatedIngredients = { ...this.state.ingredient };
    udatedIngredients[type] = udatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredient: udatedIngredients, totalPrice: newPrice });
    this.updateBuyableState(udatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredient[type];
    if (oldCount > 0) {
      const udatedCount = oldCount - 1;
      const udatedIngredients = { ...this.state.ingredient };
      udatedIngredients[type] = udatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceAddition;
      this.setState({ ingredient: udatedIngredients, totalPrice: newPrice });
      this.updateBuyableState(udatedIngredients);
    }
  };

  render() {
    const lessDisableInfo = { ...this.state.ingredient };
    const moreDisableInfo = { ...this.state.ingredient };
    let orderSummary = null;
    if (this.state.ingredient) {
      for (let key in lessDisableInfo) {
        lessDisableInfo[key] = lessDisableInfo[key] <= 0;
      }
      for (let key in moreDisableInfo) {
        moreDisableInfo[key] =
          moreDisableInfo[key] >= INGREDIENT_MAX_QAUNTITY[key];
      }

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredient}
          onCancel={this.backDropHandler}
          onContinue={this.continueHandler}
          price={this.state.totalPrice}
        ></OrderSummary>
      );
    }

    if (this.state.loading) orderSummary = <Loader></Loader>;

    return (
      <Aux>
        <Modal show={this.state.buying} backDropClicked={this.backDropHandler}>
          {orderSummary}
        </Modal>
        {this.state.ingredient !== null ? (
          <Aux>
            <Burger ingredient={this.state.ingredient}></Burger>
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              lessDisableInfo={lessDisableInfo}
              moreDisableInfo={moreDisableInfo}
              price={this.state.totalPrice}
              isBuyable={this.state.isBuyable}
              buying={this.buyingHandler}
            ></BuildControls>
          </Aux>
        ) : this.state.error ? (
          <p>Network erorr! Please try again.</p>
        ) : (
          <Loader></Loader>
        )}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, Axios);
