import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "actions";
import LoginForm from "./LoginForm";
import { ToastContainer, toast } from "react-toastify";
import queryString from "query-string";
import LoginGoogle from "./LoginGoogle";
import authService from "../../services/auth-service";

class Login extends Component {
  loginUser = userData => {
    this.props.dispatch(actions.login(userData));
  };

  componentWillMount() {
    const query = queryString.parse(this.props.location.search);

    if (query.register === "true") {
      toast("🦄 Register Success", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);

    if (query.loginGoogle) {
      authService.saveToken(query.loginGoogle);
      window.location.reload();
    }
  }

  render() {
    const { isAuth, errors } = this.props.auth;
    // const { successRegister } = this.props.location.state || false;

    if (isAuth) {
      return <Redirect to={{ pathname: "/rentals" }} />;
    }

    return (
      <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>

              <ToastContainer />
              <LoginForm submitCb={this.loginUser} errors={errors} />
              <LoginGoogle />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img
                  src={process.env.PUBLIC_URL + "/img/login-image.jpg"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Login);
