import React, { Component } from "react";
import Aux from "../Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SlideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSlideDrawer: false,
  };

  slideDrawerCloseHandler = () => {
    this.setState({ showSlideDrawer: false });
  };

  slideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSlideDrawer: !prevState.showSlideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.slideDrawerToggleHandler}></Toolbar>
        <SlideDrawer
          open={this.state.showSlideDrawer}
          closed={this.slideDrawerCloseHandler}
        ></SlideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
