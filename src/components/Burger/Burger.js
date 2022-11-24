import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  let transformedIngredient = Object.keys(props.ingredient)
    .map((igkey) => {
      return [...Array(props.ingredient[igkey])].map((_, i) => {
        return (
          <BurgerIngredient key={igkey + i} type={igkey}></BurgerIngredient>
        );
      });
    })
    .reduce((err, el) => {
      return err.concat(el);
    }, []);

  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Please start adding ingredients.</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default Burger;
