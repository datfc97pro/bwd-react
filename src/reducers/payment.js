import { PAYMENT_TOKEN } from "actions/types";
import { GET_PAYMENTS } from "../actions/types";

const InitialState = {
  token: undefined,
  payments: []
};

export const paymentReducer = (state = InitialState, action) => {
  switch (action.type) {
    case PAYMENT_TOKEN:
      return { ...state, token: action.token };
    case GET_PAYMENTS:
      return { ...state, payments: action.payments };
    default:
      return state;
  }
};
