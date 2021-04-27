import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useQuery } from "@apollo/react-hooks";

import { recomendedRoomsQuery } from "@getmeout/common";

import MinifiedRoomScape from "../representationsRS/MinifiedRoomScape";
import TopRoomScape from "../representationsRS/FavouriteRS";

const useFavourites = () => {
  const { data, loading, error } = useQuery(recomendedRoomsQuery);

  const [loadedData, setloadedData] = useState([]);

  useEffect(() => {
    if (!loading && !error) {
      setloadedData(data.gameRooms.edges.slice(0, 4).map(({ node }) => node));
    }
  }, [data, loading, error]);

  const renderFavourites = ({ item }) => {
    return (
      <View style={styles.conatiner}>
        <Text style={styles.title}>My Favourites</Text>
        <View style={styles.cardsWrapper}>
          {item.map((itm, index) => (
            <View style={styles.cardWrapper} key={itm.roomId}>
              <TopRoomScape
                {...itm}
                roomDuration={"60"}
                roomRating={itm.roomRating / 2}
                ranking={index}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  return { favouritesData: loadedData, renderFavourites };
};

export default useFavourites;

const styles = StyleSheet.create({
  conatiner: {
    paddingHorizontal: 10,
    paddingVertical: 4,

    alignItems: "flex-start",
    backgroundColor: "#E7E7E7",
    flex: 1,
  },
  cardsWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",

    flexWrap: "wrap",
  },
  cardWrapper: {
    width: "48%",
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
  },
});
