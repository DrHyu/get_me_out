import * as actions from "../actionTypes";
import axios from "axios";

export const requestData = () => {
  return {
    type: actions.REQUEST_DATA,
  };
};

export const receiveData = (json) => {
  return {
    type: actions.RECEIVE_DATA,
    payload: {
      searchResults: json.data.map((hit) => hit),
    },
  };
};

export const invalidateData = () => {
  return {
    type: actions.INVALIDATE_DATA,
  };
};

export const fetchData = () => {
  return (dispatch) => {
    /* Mark request ongoing */
    dispatch(requestData());

    /* Request data from server */
    return axios(
      "https://5f9c1201856f4c00168c5e7c.mockapi.io/name"
    ).then((json) => dispatch(receiveData(json)));
  };
};
