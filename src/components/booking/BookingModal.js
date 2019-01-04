import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { BwmResError } from "components/shared/form/BwmResError";
import CheckoutForm from "./CheckoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";

class BookingModal extends Component {
  componentWillMount() {
    console.log(this.props.paymentToken);
  }

  render() {
    const {
      open,
      closeModal,
      booking,
      confirmModal,
      errors,
      rentalPrice
    } = this.props;

    return (
      <Modal
        open={open}
        onClose={closeModal}
        little
        classNames={{ modal: "booking-modal" }}
      >
        <h4 className="modal-title title">Confirm Booking </h4>
        <p className="dates">
          {booking.startAt} / {booking.endAt}
        </p>
        <div className="modal-body">
          <em>{booking.days}</em> nights /<em>{rentalPrice}$</em> per Night
          <p>
            Guests: <em>{booking.guests}</em>
          </p>
          <p>
            Price: <em>{booking.totalPrice}$ </em>
          </p>
          <p>Do you confirm your booking for selected days?</p>
        </div>

        <StripeProvider apiKey="pk_test_fm3f1nL7BFBmXMuLC5OawOPz">
          <Elements>
            <CheckoutForm />
          </Elements>
        </StripeProvider>

        <BwmResError errors={errors} />
        <div className="modal-footer">
          <button
            onClick={confirmModal}
            disabled={!this.props.paymentToken}
            type="button"
            className="btn btn-bwm"
          >
            Confirm
          </button>
          <button type="button" onClick={closeModal} className="btn btn-bwm">
            Cancel
          </button>
        </div>
      </Modal>
    );
  }
}

export default BookingModal;
