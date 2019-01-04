import { Link } from "react-router-dom";
import { toUpperCase, pretifyDate } from "helpers";

import React, { Component } from "react";

class PaymentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: ""
    };
  }

  acceptPayment(payment) {
    this.props.acceptPayment(payment).then(() => {
      this.setState({
        pending: "paid"
      });
    });
  }

  declinePayment(payment) {
    this.props.declinePayment(payment).then(() => {
      this.setState({
        pending: "declined"
      });
    });
  }

  render() {
    const { payment } = this.props;
    const { pending } = this.state;

    return (
      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-header">
            Booking made by {payment.fromUser.username}
          </div>
          <div className="card-block">
            <React.Fragment>
              <h4 className="card-title">
                {payment.booking.rental.title} -{" "}
                {toUpperCase(payment.booking.rental.city)}
              </h4>
              <p className="card-text booking-desc">
                {payment.booking.rental.description}
              </p>
            </React.Fragment>
            <p className="card-text booking-days">
              {pretifyDate(payment.booking.startAt)} -{" "}
              {pretifyDate(payment.booking.endAt)} | {payment.booking.days} days
            </p>
            <p className="card-text">
              <span>Revenue: </span>
              <span className="booking-price-value">
                {payment.amount / 100} $
              </span>
            </p>
            <p className="card-text">
              <span>Status: </span>
              <span className="booking-price-value">
                {pending ? pending : payment.status}
              </span>
            </p>
            <Link
              className="btn btn-bwm"
              to={`/rentals/${payment.booking.rental._id}`}
            >
              Go to Rental
            </Link>
          </div>
          <div className="card-footer text-muted">
            Created {pretifyDate(payment.booking.createdAt)}
            {!pending && payment.status === "pending" && (
              <div>
                <button
                  onClick={() => this.acceptPayment(payment)}
                  className="btn btn-success mr-1"
                >
                  Confirm
                </button>
                <button
                  onClick={() => this.declinePayment(payment)}
                  className="btn btn-danger ml-1"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentCard;
