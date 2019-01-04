import React, { Component } from "react";
import * as actions from "actions";
import { Link } from "react-router-dom";
import RentalManageCard from "./RentalManageCard";
import RentalManageModal from "./RentalManageModal";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../shared/Spinner";

class RentalManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    };
  }

  componentWillMount() {
    this.setState({ isFetching: true });

    actions
      .getUserRentals()
      .then(
        userRentals => this.setState({ userRentals, isFetching: false }),
        errors => this.setState({ errors, isFetching: false })
      );
  }

  renderRentalCards(rentals) {
    return rentals.map((rental, index) => (
      <RentalManageCard
        modal={<RentalManageModal bookings={rental.bookings} />}
        key={index}
        rental={rental}
        rentalIndex={index}
        deleteRentalCb={this.deleteRental}
      />
    ));
  }

  deleteRental = (rentalId, rentalIndex) => {
    actions.deleteRental(rentalId).then(
      () => this.deleteRentalFromList(rentalIndex),
      errors =>
        toast.error(`🚀 ${errors[0].detail}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
    );
  };

  deleteRentalFromList(rentalIndex) {
    const userRentals = this.state.userRentals.slice();
    userRentals.splice(rentalIndex, 1);
    this.setState({ userRentals });
    toast.success("🦄 Delete success!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  render() {
    const { userRentals, isFetching } = this.state;

    if (userRentals.length === 0 && isFetching === true) {
      return <Spinner />;
    }

    return (
      <section id="userRentals">
        <ToastContainer />
        <h1 className="page-title">My Rentals</h1>
        <div className="row">{this.renderRentalCards(userRentals)}</div>
        {!isFetching && userRentals.length === 0 && (
          <div className="alert alert-warning">
            You dont have any rentals currenty created. If you want advertised
            your property please follow this link.
            <Link
              style={{ marginLeft: "10px" }}
              className="btn btn-bwm"
              to="/rentals/new"
            >
              Register Rental
            </Link>
          </div>
        )}
      </section>
    );
  }
}

export default RentalManage;
