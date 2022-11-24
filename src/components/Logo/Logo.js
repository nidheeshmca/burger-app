import React from "react";
import LogoImage from "../../assets/Images/burger-logo.png";
import classes from "./Logo.css";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={LogoImage} style={{ height: props.height }}></img>
  </div>
);

export default logo;
