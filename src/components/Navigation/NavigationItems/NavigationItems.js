import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = () => (
  <div>
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/burgerbuilder">Burger Bulder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  </div>
);
export default NavigationItems;
