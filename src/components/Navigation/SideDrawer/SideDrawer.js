import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Aux from "../../../hoc/Aux";
import BackDrop from "../../UI/BackDrop/BackDrop";
const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed}></BackDrop>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo height="60px"></Logo>
        </div>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Aux>
  );
};
export default SideDrawer;
