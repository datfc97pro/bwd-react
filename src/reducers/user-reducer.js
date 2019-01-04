import { GET_PROFILE, UPDATE_PROFILE } from "../actions/types";

const InitialState = {
  user: {}
};
export const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, user: action.user };
    case UPDATE_PROFILE:
      return { ...state, user: action.userUpdate };
    default:
      return state;
  }
};
