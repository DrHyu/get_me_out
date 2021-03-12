import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { useQuery } from "@apollo/react-hooks";

import RecentActivityRS from "../representationsRS/RecentActivityRS";
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
    <ScrollView>
      {data.map((item) => {
        return renderFriendActivityItem({ item });
      })}
    </ScrollView>
  );
};

export default FriendsActivity;

const styles = StyleSheet.create({});
