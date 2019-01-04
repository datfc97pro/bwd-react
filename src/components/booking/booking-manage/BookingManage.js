import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BookingCard from "./BookingCard";
import Spinner from "../../shared/Spinner";
import { toast, ToastContainer } from "react-toastify";

import * as actions from "actions";
import PaymentCard from "./PaymentCard";

class BookingManage extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchUserBookings());

    this.props.dispatch(actions.getPendingPayments());
  }

  renderPayments(payments) {
    return payments.map((payment, index) => (
      <PaymentCard
        payment={payment}
        key={index}
        acceptPayment={payment => this.acceptPayment(payment)}
        declinePayment={payment => this.declinePayment(payment)}
      />
    ));
  }

  renderBookings(bookings) {
    return bookings.map((booking, index) => (
      <BookingCard booking={booking} key={index} />
    ));
  }

  acceptPayment(payment) {
    return actions.acceptPayment(payment).then(() => {
      toast.success(`🦄 Confirm success!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    });
  }

  declinePayment(payment) {
    return actions.declinePayment(payment).then(() => {
      toast.warn(`🦄 Decline success!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    });
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;
    const { payments } = this.props.payment;

    if (bookings.length === 0 && isFetching === true) {
      return <Spinner />;
    }

    return (
      <section id="userBookings">
        <ToastContainer />
        <h1 className="page-title">My Bookings</h1>
        <div className="row">{this.renderBookings(bookings)}</div>

        {!isFetching && bookings.length === 0 && (
          <div className="alert alert-warning">
            You have no bookings created go to rentals section and book your
            place today.
            <Link
              style={{ marginLeft: "10px" }}
              className="btn btn-bwm"
              to="/rentals"
            >
              Available Rental
            </Link>
          </div>
        )}

        <h1 className="page-title">My Pending Bookings</h1>
        <div className="row">{this.renderPayments(payments)}</div>

        {!isFetching && payments.length === 0 && (
          <div className="alert alert-warning">
            You have no pending bookings curently!
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userBookings: state.userBookings,
    payment: state.payment
  };
};

export default connect(mapStateToProps)(BookingManage);
