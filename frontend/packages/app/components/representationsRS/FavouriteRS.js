import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import StarRating from "../ratings/StarRating";

import { range } from "lodash";

const FavouriteRS = ({
  roomName,
  roomImg,
  roomRating,
  completionDate = "Dec 2020",
  commentaryText = "It was ok...",
  withButtons = false,
  decoration,
}) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.roomImgWrapper}>
        <Image
          source={{ uri: "http://178.62.72.241" + roomImg }}
          style={styles.roomImg}
        />
      </View>

      <View style={styles.statsBar}>
        <StarRating rating={4.2} starSize={20} />
      </View>
    </View>
  );
};

export default FavouriteRS;

const styles = StyleSheet.create({
  conatiner: {
    borderColor: "#061b30",
    borderWidth: 1,
    borderRadius: 4,

    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  /* Wrapper arround all the stats of the room */
  statsBar: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#061b30",
    flexDirection: "row",
    justifyContent: "center",
  },
  /* Roomscape image */
  roomImgWrapper: {
    width: "100%",
    height: 80,
  },
  roomImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
