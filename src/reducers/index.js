import { combineReducers } from "redux";
import { rentalReducer, selectedRentalReducer } from "./rental-reducer";

export default combineReducers({
  rentals: rentalReducer,
  rental: selectedRentalReducer
});
