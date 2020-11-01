import * as actions from "../actionTypes";
import axios from "axios";

import { filterData } from "../../components/search/filters/SearchFilterDescriptor";

/* Search actions */
export const requestData = () => {
  return {
    type: actions.REQUEST_DATA,
  };
};

export const receiveData = (data) => {
  return {
    type: actions.RECEIVE_DATA,
    payload: {
      searchResults: data.map((hit) => hit),
    },
  };
};

export const invalidateData = () => {
  return {
    type: actions.INVALIDATE_DATA,
  };
};

export const fetchData = (activeFilters) => {
  return (dispatch) => {
    /* Mark request ongoing */
    dispatch(requestData());

    /* Request data from server */
    /* If filtering is done in the server here we would 
      pass the filter parameters through some POST/GET
    */
    return axios("https://5f9c1201856f4c00168c5e7c.mockapi.io/name").then(
      (json) => {
        /* Add in difictuly data since couldn't get it in mockapi */
        let difLvls = ["easy", "medium", "hard"];
        const data = json.data.map((elem) => ({
          ...elem,
          difficulty: difLvls[Math.floor(Math.random() * 3)],
        }));
        /* Theoretically this will be done server side */
        const filteredData = filterData(activeFilters, data);
        dispatch(receiveData(filteredData));
      }
    );
  };
};

/* Filter actions */

export const updateFilterValue = (id, value, option = -1) => {
  return {
    type: actions.UPDATE_FILTER_VALUE,
    payload: {
      id,
      value,
      option,
    },
  };
};
