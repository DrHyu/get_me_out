import * as actions from "../actionTypes";
import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.payload.user),
        user: action.payload.user,
      };
    default:
      return state;
  }
};
