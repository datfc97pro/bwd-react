import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import Spinner from "../Spinner";

class UserGuard extends Component {
  render() {
    const { isAllowed, isFetching, history } = this.props;

    if (isAllowed && !isFetching) {
      return this.props.children;
    } else if (!isAllowed && !isFetching) {
      return history.goBack()
    } else {
      return <Spinner />;
    }
  }
}

export default UserGuard;
