import React from "react";

import FilterSearch from "../components/search/SearchFilterSearch";
import ShowResults from "../components/search/SearchShowResults";

export default function Search() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <FilterSearch />
          </div>
          <div className="col-10">
            <ShowResults />
          </div>
        </div>
      </div>
    </div>
  );
}
