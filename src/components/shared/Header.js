import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="container">
          {/* <Link className="navbar-brand" to="/rentals">
            BookWithMe
            <img src={process.env.PUBLIC_URL + "/img/react-logo.svg"} alt="" />
          </Link> */}
          {/* <RentalSearchInput /> */}
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
              {/* {isAuth && <a className="nav-item nav-link">{username}</a>}
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)} */}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
