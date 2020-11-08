import * as actions from "../actionTypes";
import axios from "axios";

export const requestData = () => {
  return {
    type: actions.REQUEST_DATA,
  };
};

export const receiveData = (data) => {
  return {
    type: actions.RECEIVE_DATA,
    payload: {
      roomSuggestions: data.map((hit) => hit),
    },
  };
};

export const invalidateData = () => {
  return {
    type: actions.INVALIDATE_DATA,
  };
};

export const fetchRoomSuggestions = () => {
  return (dispatch) => {
    /* Mark request ongoing */
    dispatch(requestData());

    /* Request data from server */
    return axios(
      "https://5f9c1201856f4c00168c5e7c.mockapi.io/roomSuggestions?limit=10"
    ).then((json) => {
      /* Add in difictuly data since couldn't get it in mockapi */
      let difLvls = ["easy", "medium", "hard"];
      const data = json.data.map((elem) => ({
        ...elem,
        difficulty: difLvls[Math.floor(Math.random() * 3)],
      }));

      dispatch(receiveData(data.slice(0, 5)));
    });
  };
};
