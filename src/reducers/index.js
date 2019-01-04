import { combineReducers } from "redux";
import { rentalReducer, selectedRentalReducer } from "./rental-reducer";
import { rentalMapReducer } from "./map-reducer";
import { authReducer } from "./auth-reducer";
import { reducer as formReducer } from "redux-form";
import { userBookingsReducer } from "./booking-reducer";
import { paymentReducer } from "./payment";
import { userReducer } from "./user-reducer";

export default combineReducers({
  rentals: rentalReducer,
  rental: selectedRentalReducer,
  map: rentalMapReducer,
  auth: authReducer,
  form: formReducer,
  userBookings: userBookingsReducer,
  payment: paymentReducer,
  user: userReducer
});
