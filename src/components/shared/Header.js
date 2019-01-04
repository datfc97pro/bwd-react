import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "actions";
import RentalSearchInput from "../rental/RentalSearchInput";

class Header extends Component {
  handleLogout = () => {
    // this.props.logout();
    this.props.dispatch(actions.logout());
    // this.props.history.push("/rentals");
  };

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return (
        <Link
          className="nav-item nav-link clickable"
          onClick={this.handleLogout}
          to="/"
        >
          Logout
        </Link>
      );
    }

    return (
      <React.Fragment>
        <Link className="nav-item nav-link" to="/login">
          Login <span className="sr-only">(current)</span>
        </Link>
        <Link className="nav-item nav-link" to="/register">
          Register
        </Link>
      </React.Fragment>
    );
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <a
            className="nav-link nav-item dropdown-toggle clickable"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            href=" "
          >
            Owner Section
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link className="dropdown-item" to="/user/profile">
              Profile
            </Link>
            <Link className="dropdown-item" to="/rentals/new">
              Create Rental
            </Link>
            <Link className="dropdown-item" to="/rentals/manage">
              Manage Rentals
            </Link>
            <Link className="dropdown-item" to="/bookings/manage">
              Manage Bookings
            </Link>
          </div>
        </div>
      );
    }
  }
  render() {
    const { username, isAuth } = this.props.auth;

    return (
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/rentals">
            BookWithĐạt
            <img src={process.env.PUBLIC_URL + "/img/logo.svg"} alt="" />
          </Link>
          <RentalSearchInput />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              {isAuth && (
                <Link className="nav-item nav-link" to="/rentals">
                  {username}
                </Link>
              )}
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

export default withRouter(connect(mapStateToProps)(Header));
