import isEmpty from "lodash/isEmpty";
import * as actions from "../actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action = {}) => {
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

export default authReducer;
