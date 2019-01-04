import React, { Component } from "react";
import Spinner from "../../shared/Spinner";
import RentalMap from "./RentalMap";
import Booking from "components/booking/Booking";
import { connect } from "react-redux";
import RentalDetailInfo from "./RentalDetailInfo";

import * as actions from "actions";

class RentalDetail extends Component {
  componentWillMount() {
    // Dispatch action
    const rentalId = this.props.match.params.id;

    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  render() {
    const { rental } = this.props;

    if (rental._id) {
      return (
        <section id="rentalDetails">
          <div className="upper-section">
            <div className="row">
              <div className="col-md-6">
                <img src={rental.image} alt="" />
              </div>
              <div className="col-md-6">
                <RentalMap location={`${rental.city}, ${rental.street}`} />
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="row">
              <div className="col-md-8">
                <RentalDetailInfo rental={rental} />
              </div>
              <div className="col-md-4">
                <Booking rental={rental} />
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    rental: state.rental.data,
    errors: state.rental.errors
  };
};

export default connect(mapStateToProps)(RentalDetail);
