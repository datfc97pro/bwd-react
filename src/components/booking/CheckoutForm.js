import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { connect } from "react-redux";
import * as actions from "actions";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: true, error: "", success: "" };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken();

    if (token) {
      this.props.dispatch(actions.getPaymentToken(token));

      this.setState({
        success: "Card Accepted Succesfuly!"
      });
    }
  }

  onChange(e) {
    const { error } = e;
    if (error) {
      this.setState({
        error: error.message
      });
    } else {
      this.setState({
        error: ""
      });
    }

    if (e.complete) {
      this.setState({
        complete: false
      });
    }
  }

  render() {
    const { error, success } = this.state;

    return (
      <div className="checkout">
        <CardElement style={style} onChange={e => this.onChange(e)} />
        {error && (
          <div className="error" style={{ color: "#e4584c" }}>
            {error}
          </div>
        )}
        {success && (
          <div className="success alert alert-success">
            Card Accepted Succesfuly!
          </div>
        )}
        <button disabled={this.state.complete} onClick={this.submit}>
          Submit, You will be not charged yet!
        </button>
      </div>
    );
  }
}

const style = {
  base: {
    iconColor: "#666EE8",
    color: "#31325F",
    lineHeight: "40px",
    fontWeight: 300,
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSize: "18px",
    "::placeholder": {
      color: "#CFD7E0"
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    payment: state.payment
  };
};

export default connect(mapStateToProps)(injectStripe(CheckoutForm));
