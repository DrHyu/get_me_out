import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";

export default function SearchShowResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await axios(
        "https://5f9c1201856f4c00168c5e7c.mockapi.io/name"
      );
      console.log(resp);
      setResults(resp.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {results.map((result) => (
        <SearchResult result={result} key={result.id} />
      ))}
    </div>
  );
}
