import React, { useEffect } from "react";
import RoomEntry from "../shared/RoomEntry";

const SearchShowResults = () => {
  const searchResults = [];
  const isValid = false;
  const isFetching = false;

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
