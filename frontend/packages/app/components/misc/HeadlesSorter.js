import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const useHeadlesSorter = (sortCategories, data) => {
  const [sortBy, setSortBy] = useState(0);
  const [sortDescending, setsortDescending] = useState(true);
  const [sortedData, setsortedData] = useState([]);

  const sortData = (data) => {
    return []
      .concat(data)
      .sort((a, b) => sortCategories[sortBy].sortFunc(a, b, sortDescending));
  };

  useEffect(() => {
    setsortedData(sortData(data));
  }, [data, sortBy, sortDescending]);

  return {
    sortedData,
    updateSortBy: setSortBy,
    updateSortDirection: setsortDescending,
  };
};

export default useHeadlesSorter;
