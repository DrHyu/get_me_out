import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateFilterValue } from "../../store/search/actions";

import { BaseFilter } from "./Filters";

function SearchFilterAll(props) {
  const activeFilters = useSelector((state) => state.search.activeFilters);
  const dispatch = useDispatch();
  /* Transform from filter descriptor to react component */
  return (
    <div>
      {activeFilters.map((filter) => {
        return (
          <BaseFilter
            key={filter.id + "_" + filter.name}
            filter={filter}
            onChangeCallback={(value) => {
              dispatch(updateFilterValue(filter.id, value));
            }}
          />
        );
      })}
    </div>
  );
}

export default SearchFilterAll;
