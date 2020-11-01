import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterKindToComponent } from "./filters/SearchFilterDescriptor";

import { updateFilterValue } from "../../store/actions/searchActions";

function SearchFilterAll(props) {
  /* Configure filters available with the FilterDescription class */

  const activeFilters = useSelector((state) => state.search.activeFilters);
  const dispatch = useDispatch();
  /* Transform from filter descriptor to react component */
  return (
    <div>
      {activeFilters.map((filter) => {
        const TempComponent = filterKindToComponent[filter.kind];
        return (
          <TempComponent
            key={filter.id + "_" + filter.name}
            settings={filter}
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
