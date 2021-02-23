import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { recomendedRoomsQuery } from "@getmeout/common";

import Bookmark from "../representationsRS/SuperMinifiedRS";

export default function BookmarkedRS({ navigation }) {
  const { data, loading, error } = useQuery(recomendedRoomsQuery);
  console.log(data);
  if (loading) {
    return <Text style={{ paddingTop: 50 }}>Loading ....</Text>;
  } else if (!error) {
    return (
      <>
        {data.gameRooms.edges.map(({ node }, idx) => (
          <Bookmark
            {...node}
            roomDuration={"60"}
            roomRating={node.roomRating / 2}
            key={node.roomId}
            order={idx}
          />
        ))}
      </>
    );
  } else {
    return <Text style={{ paddingTop: 50 }}>Error ....</Text>;
  }
}
