import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateFilterValue } from "../../store/search/actions";

import FilterWrapper from "./filters/SearchFilterWrapper";

function SearchFilterAll(props) {
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const dispatch = useDispatch();
  /* Transform from filter descriptor to react component */
  return (
    <div>
      {activeFilters.map((filter) => {
        return (
          <FilterWrapper
            key={filter.id + "_" + filter.name}
            filter={filter}
            onChangeCallback={(value, option = -1) => {
              dispatch(updateFilterValue(filter.id, value, option));
            }}
          />
        );
      })}
    </div>
  );
}

export default SearchFilterAll;
