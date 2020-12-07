import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RoomEntry from "../shared/RoomEntry";

import { fetchData } from "../../store/search/actions";

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
  }
  if (isValid) {
    return (
      <div>
        {searchResults.map((result) => (
          <RoomEntry room={result} key={result.id} />
        ))}
      </div>
    );
  }
  return <div>Invalid</div>;
};

export default SearchShowResults;
