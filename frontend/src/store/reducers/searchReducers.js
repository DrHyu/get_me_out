import * as actions from "../actionTypes";
import {
  RANGE_FILTER,
  CHOICE_FILTER,
} from "../../components/search/filters/SearchFilterDescriptor";

const INITIAL_STATE = {
  searchResults: [],
  activeFilters: [
    {
      kind: RANGE_FILTER,
      name: "rating",
      filterAttr: "rating",
      id: 1,
      min: 0,
      max: 100,
      value: 25,
    },
    {
      kind: CHOICE_FILTER,
      name: "dummy2",
      filterAttr: "open",
      id: 2,
      options: ["open", "closed"],
      optionsToAttrMapping: [true, false],
      value: 0,
    },
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

    case actions.UPDATE_FILTER_VALUE:
      return {
        ...state /* All of state except ... */,
        activeFilters: state.activeFilters.map((filter) =>
          /* Update filter.value of the filter matching action.payload.id */
          filter.id === action.payload.id
            ? { ...filter, value: action.payload.value }
            : filter
        ),
      };

    default:
      return state;
  }
};
