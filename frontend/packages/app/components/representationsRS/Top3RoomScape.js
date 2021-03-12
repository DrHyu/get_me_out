import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const colors = ["gold", "silver", "brown"];

const Top3RoomScape = ({ roomName, roomImg, ranking }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, { borderColor: colors[ranking] }]}>
        <Image
          source={{ uri: "http://178.62.72.241" + roomImg }}
          style={styles.img}
        />
      </View>
      <Text>{roomName}</Text>
    </View>
  );
};

export default Top3RoomScape;

const RADIUS = 60;
const BORDER_WIDTH = 7;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    borderWidth: BORDER_WIDTH,
    borderColor: "goldenrod",
    overflow: "hidden",
  },
  img: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    resizeMode: "cover",
  },
});
