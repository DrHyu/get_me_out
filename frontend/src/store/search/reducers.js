import * as actions from "../actionTypes";
import {
  RANGE_FILTER,
  CHOICE_FILTER,
  MULT_CHOICE_FILTER,
} from "../../components/search/Filters";

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
      optionsToAttrMapping: [false, true],
      optionsToAttrMappingMode: "OR",
      value: [true, false],
    },
    {
      kind: MULT_CHOICE_FILTER,
      name: "Difficulty",
      id: 3,
      options: ["easy", "medium", "hard"],
      filterAttr: "difficulty",
      optionsToAttrMapping: ["easy", "medium", "hard"],
      optionsToAttrMappingMode: "OR", // vs AND
      value: [true, true, false],
    },
    {
      kind: MULT_CHOICE_FILTER,
      name: "Category",
      id: 4,
      options: ["Action", "Adventure", "Sci-Fi", "Terror", "Mistery"],
      filterAttr: "difficulty",
      optionsToAttrMapping: [
        "Action",
        "Adventure",
        "Sci-Fi",
        "Terror",
        "Mistery",
      ],
      optionsToAttrMappingMode: "OR", // vs AND
      value: [true, true, false, true, false],
    },
  ],
  isFetching: false,
  isValid: true,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SEARCH_PAGE_INVALIDATE_DATA:
      return { ...state, isValid: false };

    case actions.SEARCH_PAGE_REQUEST_DATA:
      return { ...state, isFetching: true };

    case actions.SEARCH_PAGE_RECEIVE_DATA:
      return {
        ...state,
        searchResults: action.payload.searchResults,
        isFetching: false,
        isValid: true,
      };

    case actions.SEARCH_PAGE_UPDATE_FILTER_VALUE:
      return {
        ...state,
        /* All of state except activeFilters */
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

export default searchReducer;
