import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useQuery } from "@apollo/react-hooks";

import { recomendedRoomsQuery } from "@getmeout/common";

import MinifiedRoomScape from "../representationsRS/MinifiedRoomScape";
import SuperMinifiedRoomScape from "../representationsRS/SuperMinifiedRS";

const useFavourites = () => {
  const { data, loading, error } = useQuery(recomendedRoomsQuery);

  const [loadedData, setloadedData] = useState([]);

  useEffect(() => {
    if (!loading && !error) {
      setloadedData(data.gameRooms.edges.slice(0, 3).map(({ node }) => node));
    }
  }, [data, loading, error]);

  const renderHeader = () => (
    <View style={styles.headerWrapper}>
      <Text style={styles.title}>My Favourites</Text>
    </View>
  );

  const renderFavourites = ({ item }) => {
    return (
      <SuperMinifiedRoomScape
        {...item}
        roomDuration={"60"}
        roomRating={item.roomRating / 2}
        key={item.roomId}
      />
    );
  };

  return { favouritesData: loadedData, renderHeader, renderFavourites };
};

export default useFavourites;

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
  },
  title: {
    fontSize: 24,
  },
});
