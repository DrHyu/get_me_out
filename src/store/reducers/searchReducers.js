import * as actions from "../actionTypes";

const INITIAL_STATE = {
  searchResults: [
    // {
    //   id: 1,
    //   img: "",
    //   rating: 10,
    //   name: "The disapearing salami",
    //   description: "Lorem Opsum",
    // },
  ],
  isFetching: false,
  isValid: true,
};

export const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.INVALIDATE_DATA:
      return { ...state, isValid: false };

    case actions.REQUEST_DATA:
      return { ...state, isFetching: true };

    case actions.RECEIVE_DATA:
      return {
        ...state,
        searchResults: action.payload.searchResults,
        isFetching: false,
        isValid: true,
      };

    default:
      return state;
  }
};
