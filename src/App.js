import React from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Redirect, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <Layout>
      <Switch>
        <Redirect from="/" exact to="/burgerbuilder"></Redirect>
        <Route path="/burgerbuilder" exact component={BurgerBuilder}></Route>
        <Route path="/orders" exact component={Orders}></Route>
        <Route path="/checkout" component={Checkout}></Route>
      </Switch>
    </Layout>
  );
}

export default App;
