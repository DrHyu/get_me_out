import React from "react";
import { roomType } from "../../types";
import RoomEntry from "../shared/RoomEntry";

const SearchShowResults = ({ isFetching, searchResults }) => {
  if (isFetching) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      {searchResults.map((result) => (
        // <RoomEntry room={result} key={result.id} />
        <div key={result.room_id}>{result.room_name}</div>
      ))}
    </div>
  );
};

export default SearchShowResults;
