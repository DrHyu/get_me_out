import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import { recomendedRoomsQuery } from "@getmeout/common";

import MinifiedRoomScape from "../representationsRS/MinifiedRoomScape";

export default function RecomendedRS({ navigation }) {
  const { data, loading, error } = useQuery(recomendedRoomsQuery);

  if (loading) {
    return <Text style={{ paddingTop: 50 }}>Loading ....</Text>;
  } else if (!error) {
    return (
      <>
        {data.gameRooms.edges.map(({ node }) => (
          <MinifiedRoomScape
            {...node}
            roomDuration={"60"}
            roomRating={node.roomRating / 2}
            key={node.roomId}
          />
        ))}
      </>
    );
  } else {
    return <Text style={{ paddingTop: 50 }}>Error ....</Text>;
  }
}
