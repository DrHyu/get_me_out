import axios from "axios";
import * as actions from "../actionTypes";

export const requestData = () => ({
  type: actions.LANDING_PAGE_REQUEST_DATA,
});

export const receiveData = (data) => ({
  type: actions.LANDING_PAGE_RECEIVE_DATA,
  payload: {
    roomSuggestions: data.map((hit) => hit),
  },
});

export const invalidateData = () => ({
  type: actions.LANDING_PAGE_INVALIDATE_DATA,
});

export const fetchRoomSuggestions = () => (dispatch) => {
  /* Mark request ongoing */
  dispatch(requestData());

  /* Request data from server */
  return axios(
    "https://5f9c1201856f4c00168c5e7c.mockapi.io/roomSuggestions?limit=10"
  ).then((json) => {
    /* Add in difictuly data since couldn't get it in mockapi */
    const difLvls = ["easy", "medium", "hard"];
    const data = json.data.map((elem) => ({
      ...elem,
      difficulty: difLvls[Math.floor(Math.random() * 3)],
    }));

    dispatch(receiveData(data.slice(0, 5)));
  });
};
