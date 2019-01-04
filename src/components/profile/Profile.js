import React, { Component } from "react";
import * as actions from "actions";
import { connect } from "react-redux";
import authService from "../../services/auth-service";
import { toast, ToastContainer } from "react-toastify";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      username: "",
      address: ""
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { username, address } = this.state;

    if (!username && !address) {
      const { user } = nextProps.user;

      if (!user.address) {
        this.setState({
          username: user.username
        });
      } else {
        this.setState({
          username: user.username,
          address: user.address
        });
      }
    }
  }

  componentWillMount() {
    const userId = authService.getUserId();
    this.props.dispatch(actions.getProfile(userId));
  }

  eidt() {
    this.setState({
      isEdit: true
    });
  }

  onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      ...this.state,
      [name]: value
    });
  }

  onChangeImage(event) {
    const file = event.target.files[0];

    actions.uploadImage(file).then(imageUrl => {
      this.props
        .dispatch(actions.updateProfile({ avatar: imageUrl }))
        .then(() => {
          toast.success("🦄 Update image success", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        });
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, address } = this.state;

    const userData = {
      username,
      address
    };

    this.props.dispatch(actions.updateProfile(userData)).then(() => {
      toast.success("🦄 Update success", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      this.setState({
        isEdit: false
      });
    });
  }

  render() {
    const { user } = this.props.user;
    const { isEdit } = this.state;

    return (
      <div className="container bootstrap snippet" id="user">
        <ToastContainer />
        <div className="row">
          <div className="col-sm-8">
            <h1>{user.username}</h1>
          </div>
          <div className="col-sm-4 revenue">
            {user.revenue && (
              <h1>Revenue: {parseInt(user.revenue, 10) / 100}$</h1>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            {/*left col*/}
            <div className="text-center">
              {
                <img
                  src={
                    user.avatar
                      ? user.avatar
                      : "https://api.adorable.io/avatars/285/abott@adorable.png"
                  }
                  className="avatar img-circle img-thumbnail"
                  alt="avatar"
                />
              }

              <div>
                <label
                  className="image-upload-container btn btn-bwm"
                  onChange={event => this.onChangeImage(event)}
                >
                  <span>Select Image</span>
                  <input type="file" accept="image/*" />
                </label>
              </div>
              <h6>Upload a different photo...</h6>
            </div>
            <div className="panel panel-default" />
          </div>
          {/*/col-3*/}
          <div className="col-lg-9">
            <div className="tab-pane active" id="home">
              <form className="form">
                <br />
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="username">
                      {" "}
                      <h4>Username</h4>{" "}
                    </label>
                    {!isEdit && <p>{user.username}</p>}
                    {isEdit && (
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        placeholder="full name"
                        title="enter your full name if any."
                        required
                        value={this.state.username}
                        onChange={e => this.onChange(e)}
                      />
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="address">
                      {" "}
                      <h4>Address</h4>{" "}
                    </label>
                    {!isEdit && <p>{user.address}</p>}
                    {isEdit && (
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        id="address"
                        placeholder="address"
                        title="enter your address if any."
                        value={this.state.address}
                        onChange={e => this.onChange(e)}
                      />
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-6">
                    <label htmlFor="email">
                      {" "}
                      <h4>Email</h4>{" "}
                    </label>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-12">
                    <br />
                    {!isEdit && (
                      <button
                        className="btn btn-warning"
                        type="button"
                        onClick={() => this.eidt()}
                      >
                        <i className="glyphicon glyphicon-ok-sign" /> Edit
                      </button>
                    )}
                    {isEdit && (
                      <button
                        className="btn btn-success"
                        type="submit"
                        onClick={e => this.onSubmit(e)}
                        disabled={!this.state.username}
                      >
                        <i className="glyphicon glyphicon-ok-sign" /> Save
                      </button>
                    )}

                    {isEdit && (
                      <button className="btn btn-warning ml-2" type="reset">
                        <i className="glyphicon glyphicon-repeat" /> Reset
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Profile);
