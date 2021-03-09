import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

// const data = [
//   {
//     data: {},
//     renderFunc: () => {},
//     isSticky: false,
//     key: "",
//   },
// ];

const MixedFlatList = ({ data, ...rest }) => {
  const renderMixedFlatList = ({ item, ...rest }) => {
    return item.renderFunc({ item: item.data, ...rest });
  };

  return (
    <FlatList
      //{...rest}
      data={data}
      renderItem={renderMixedFlatList}
      keyExtractor={(item) => `${item.key}`}
      stickyHeaderIndices={data
        .map((item, idx) => [item.isSticky, idx])
        .filter(([isSticky, idx]) => isSticky)
        .map(([isSticky, idx]) => idx)}
    />
  );
};

export default MixedFlatList;
