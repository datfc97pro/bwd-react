import React, { Component } from "react";
import RentalAssets from "./RentalAssets";
import { toUpperCase, rentalType } from "helpers";

class RentalDetailInfo extends Component {
  render() {
    const rental = this.props.rental;

    return (
      <div className="rental">
        <h2 className={`rental-type ${rental.category}`}>
          {rentalType(rental.shared)} {rental.category}
        </h2>
        <div className="rental-owner">
          <img
            src={
              rental.user.avatar
                ? rental.user.avatar
                : "https://api.adorable.io/avatars/285/abott@adorable.png"
            }
            alt="owner"
          />
          <span>{rental.user && rental.user.username}</span>
        </div>
        <h1 className="rental-title">{rental.title}</h1>
        <h2 className="rental-city">{toUpperCase(rental.city)}</h2>
        <div className="rental-room-info">
          <span>
            <i className="fa fa-building" />
            {rental.bedrooms} bedrooms
          </span>
          <span>
            <i className="fa fa-user" /> {rental.bedrooms + 4} guests
          </span>
          <span>
            <i className="fa fa-bed" /> {rental.bedrooms + 2} beds
          </span>
        </div>
        <p className="rental-description">{rental.description}</p>
        <hr />
        <RentalAssets />
      </div>
    );
  }
}

export default RentalDetailInfo;
