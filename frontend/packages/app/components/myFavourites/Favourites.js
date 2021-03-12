import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useQuery } from "@apollo/react-hooks";

import { recomendedRoomsQuery } from "@getmeout/common";

import MinifiedRoomScape from "../representationsRS/MinifiedRoomScape";
import Top3RoomScape from "../representationsRS/Top3RoomScape";

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
      <View>
        {item.map((itm, index) => (
          <Top3RoomScape
            {...itm}
            roomDuration={"60"}
            roomRating={itm.roomRating / 2}
            key={itm.roomId}
            ranking={index}
          />
        ))}
      </View>
    );
  };

  return { favouritesData: loadedData, renderHeader, renderFavourites };
};

export default useFavourites;

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
  },
  title: {
    fontSize: 24,
  },
});
