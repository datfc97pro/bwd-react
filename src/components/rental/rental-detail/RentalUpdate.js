import React, { Component } from "react";
import Spinner from "../../shared/Spinner";
import RentalMap from "./RentalMap";
import Booking from "components/booking/Booking";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { withRouter } from "react-router-dom";
import { toUpperCase } from "helpers";

import * as actions from "actions";
import RentalAssets from "./RentalAssets";
import EditableInput from "../../shared/editable/EditableInput";
import EditableText from "../../shared/editable/EditableText";
import EditableSelect from "../../shared/editable/EditableSelect";
import UserGuard from "../../shared/auth/UserGuard";
import EditableImage from "../../shared/editable/EditableImage";

class RentalUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAllowed: false,
      isFetching: true
    };
  }

  componentWillMount() {
    // Dispatch action
    const rentalId = this.props.match.params.id;

    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  componentDidMount() {
    this.verifyRentalOwner();
  }

  updateRental(rentalData) {
    const {
      rental: { _id },
      dispatch
    } = this.props;

    dispatch(actions.updateRental(_id, rentalData));
  }

  resetRentalErrors() {
    this.props.dispatch(actions.resetRentalErrors());
  }

  verifyRentalOwner() {
    const rentalId = this.props.match.params.id;
    this.setState({ isFetching: true });

    return actions.verifyRentalOwner(rentalId).then(
      () => {
        this.setState({ isAllowed: true, isFetching: false });
      },
      () => {
        this.setState({ isAllowed: false, isFetching: false });
      }
    );
  }

  render() {
    const { rental, errors, history } = this.props;
    const { isFetching, isAllowed } = this.state;

    if (errors && errors.length > 0) {
      toast.error(`🦄 ${errors[0].detail}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }

    if (rental._id) {
      return (
        <UserGuard
          isAllowed={isAllowed}
          isFetching={isFetching}
          history={history}
        >
          <section id="rentalDetails">
            <div className="upper-section">
              <div className="row">
                <div className="col-md-6">
                  <EditableImage
                    entity={rental}
                    entityField={"image"}
                    errors={errors}
                    updateEntity={rentalData => this.updateRental(rentalData)}
                  />
                </div>
                <div className="col-md-6">
                  <RentalMap location={`${rental.city}, ${rental.street}`} />
                </div>
              </div>
            </div>

            <div className="details-section">
              <div className="row">
                <div className="col-md-8">
                  <div className="rental">
                    <ToastContainer />
                    <label
                      className={`rental-label rental-type ${rental.category}`}
                    >
                      Shared
                    </label>

                    <EditableSelect
                      resetErrors={() => this.resetRentalErrors()}
                      errors={errors}
                      entity={rental}
                      options={[true, false]}
                      entityField={"shared"}
                      containerStyle={{ display: "inline-block" }}
                      className={`rental-type ${rental.category}`}
                      updateEntity={rentalData => this.updateRental(rentalData)}
                    />

                    <EditableSelect
                      resetErrors={() => this.resetRentalErrors()}
                      errors={errors}
                      entity={rental}
                      options={["apartment", "house", "condo"]}
                      entityField={"category"}
                      className={`rental-type ${rental.category}`}
                      updateEntity={rentalData => this.updateRental(rentalData)}
                    />
                    <div className="rental-owner">
                      <img
                        src="https://api.adorable.io/avatars/285/abott@adorable.png"
                        alt="owner"
                      />
                      <span>{rental.user && rental.user.username}</span>
                    </div>
                    <EditableInput
                      resetErrors={() => this.resetRentalErrors()}
                      errors={errors}
                      entity={rental}
                      type={"text"}
                      entityField={"title"}
                      className={"rental-title"}
                      updateEntity={rentalData => this.updateRental(rentalData)}
                    />

                    <EditableInput
                      resetErrors={() => this.resetRentalErrors()}
                      formatPipe={[toUpperCase]}
                      errors={errors}
                      entity={rental}
                      type={"text"}
                      entityField={"city"}
                      className={"rental-city"}
                      updateEntity={rentalData => this.updateRental(rentalData)}
                    />

                    <EditableInput
                      resetErrors={() => this.resetRentalErrors()}
                      errors={errors}
                      entity={rental}
                      type={"text"}
                      entityField={"street"}
                      className={"rental-street"}
                      updateEntity={rentalData => this.updateRental(rentalData)}
                    />

                    <div className="rental-room-info">
                      <span>
                        <i className="fa fa-building" />
                        <EditableInput
                          resetErrors={() => this.resetRentalErrors()}
                          errors={errors}
                          type={"number"}
                          entity={rental}
                          entityField={"bedrooms"}
                          className={"rental-bedrooms"}
                          containerStyle={{ display: "inline-block" }}
                          updateEntity={rentalData =>
                            this.updateRental(rentalData)
                          }
                        />{" "}
                        bedrooms
                      </span>
                      <span>
                        <i className="fa fa-user" /> {rental.bedrooms + 4}{" "}
                        guests
                      </span>
                      <span>
                        <i className="fa fa-bed" /> {rental.bedrooms + 2} beds
                      </span>
                    </div>

                    <EditableText
                      resetErrors={() => this.resetRentalErrors()}
                      errors={errors}
                      entity={rental}
                      entityField={"description"}
                      className={"rental-description"}
                      rows={6}
                      cols={50}
                      updateEntity={rentalData => this.updateRental(rentalData)}
                    />
                    <hr />
                    <RentalAssets />
                  </div>
                </div>
                <div className="col-md-4">
                  <Booking rental={rental} />
                </div>
              </div>
            </div>
          </section>
        </UserGuard>
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

export default connect(mapStateToProps)(withRouter(RentalUpdate));
