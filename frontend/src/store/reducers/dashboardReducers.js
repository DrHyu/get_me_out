import * as actions from "../actionTypes";

const INITIAL_STATE = {
  carouselInfo: [
    {
      img:
        "https://images.unsplash.com/photo-1603698408586-4192dab0cb6f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixlib=rb-1.2.1&q=80&w=800",
      text: "Autumn is here !",
    },
    {
      img:
        "https://images.unsplash.com/photo-1603606414705-39b1550d6a85?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixlib=rb-1.2.1&q=80&w=800",
      text: "Buy some pumpkins !",
    },
    {
      img:
        "https://images.unsplash.com/photo-1603721645522-9cb770236ed5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixlib=rb-1.2.1&q=80&w=800",
    },
  ],
  roomSuggestions: [],
  isFetching: false,
  isValid: true,
};

export const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.LANDING_PAGE_INVALIDATE_DATA:
      return { ...state, isValid: false };

    case actions.LANDING_PAGE_REQUEST_DATA:
      return { ...state, isFetching: true };

    case actions.LANDING_PAGE_RECEIVE_DATA:
      return {
        ...state,
        roomSuggestions: action.payload.roomSuggestions,
        isFetching: false,
        isValid: true,
      };

    // case actions.UPDATE_FILTER_VALUE:
    //   return {
    //     ...state,
    //     /* All of state except activeFilters */
    //     activeFilters: state.activeFilters.map((filter) =>
    //       /* Update filter.value of the filter matching action.payload.id */
    //       filter.id === action.payload.id
    //         ? {
    //             ...filter,
    //             value: Array.isArray(filter.value)
    //               ? /* If value is an array update option'nth' item in the array */
    //                 filter.value.map((val, idx) =>
    //                   idx === action.payload.option ? action.payload.value : val
    //                 )
    //               : /* If value is not an 'array' then simply override value */
    //                 action.payload.value,
    //           }
    //         : filter
    //     ),
    //   };

    default:
      return state;
  }
};
