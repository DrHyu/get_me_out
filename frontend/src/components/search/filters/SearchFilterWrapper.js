import React from "react";

import { filterKindToComponent } from "./SearchFilterDescriptor";

export const SearchFilterWrapper = (props) => {
  const SomeFilterComponent = filterKindToComponent[props.filter.kind];
  return (
    <div className="filter-group">
      <label className="filter-group-title">{props.filter.name}</label>
      <div>
        <SomeFilterComponent
          filter={props.filter}
          onChangeCallback={props.onChangeCallback}
        />
      </div>
    </div>
  );
};

export default SearchFilterWrapper;
