import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchResult from "./SearchResult";

import { fetchData } from "../../store/actions/searchActions";

const SearchShowResults = () => {
  const searchResults = useSelector((state) => state.search.searchResults);
  const isValid = useSelector((state) => state.search.isValid);
  const isFetching = useSelector((state) => state.search.isFetching);
  const activeFitlers = useSelector((state) => state.search.activeFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(activeFitlers));
  }, [activeFitlers]);

  if (isFetching) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else if (isValid) {
    return (
      <div>
        {searchResults.map((result) => (
          <SearchResult result={result} key={result.id} />
        ))}
      </div>
    );
  } else {
    return <div>Invalid</div>;
  }
};

export default SearchShowResults;
