import React, { useState } from "react";
import PropTypes from "prop-types";

import FilterDescriptor from "./filters/SearchFilterDescriptor";

function SearchFilterAll(props) {
  /* Configure filters available with the FilterDescription class */
  const [filters, setfilters] = useState([
    // FilterDescriptor.radio_filter("People", [1, 2, 3, 4]),
    // FilterDescriptor.radio_filter("Stars", [1, 2, 3, 4, 5]),
    // FilterDescriptor.slider_filter("Rating", 1, 100),
  ]);

  /* 'Inflate' the components based on the contents of each FilterDescription obj */
  return (
    <div>
      {filters.map((filter, idx) => {
        const ReactComponent = filter.react_component;
        return <ReactComponent id={idx} settings={filter.settings} />;
      })}
    </div>
  );
}

SearchFilterAll.propTypes = {};

export default SearchFilterAll;
