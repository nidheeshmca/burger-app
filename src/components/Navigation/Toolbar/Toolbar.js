import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
  <div className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
    <Logo height="100%"></Logo>
    <nav className={classes.DesktopOnly}>
      <NavigationItems></NavigationItems>
    </nav>
  </div>
);

export default toolbar;
