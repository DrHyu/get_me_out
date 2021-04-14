import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";

import { useQuery } from "@apollo/react-hooks";

import RecentActivityRS from "../representationsRS/RecentActivityRSv2";
import { recomendedRoomsQuery } from "@getmeout/common";
import FriendDecoration from "./FriendDecoration";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const useFriendsActivity = () => {
  const { data, loading, error } = useQuery(recomendedRoomsQuery);
  const loadedData =
    loading || error
      ? []
      : data.gameRooms.edges.slice(0, 4).map(({ node }) => node);

  const renderFriendActivityItem = ({ item }) => {
    return (
      <RecentActivityRS
        {...item}
        roomRating={item.roomRating / 2}
        key={item.roomId}
        withButtons={true}
        decoration={<FriendDecoration />}
      />
    );
  };

  return {
    data: loadedData,
    renderFriendActivityItem,
    error,
  };
};

const FriendsActivity = () => {
  const { data, renderFriendActivityItem } = useFriendsActivity();

  return (
    <FlatList
      data={data}
      renderItem={renderFriendActivityItem}
      keyExtractor={(node) => `${node.roomId}`}
    />
  );
};

export default FriendsActivity;

const styles = StyleSheet.create({});
