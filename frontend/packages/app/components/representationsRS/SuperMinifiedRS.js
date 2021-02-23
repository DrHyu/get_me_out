import React from "react";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";

import { range } from "lodash";

const windowWidth = Dimensions.get("window").width;

const SuperMinifiedRoomScape = ({ roomName, roomImg, order }) => {
  console.log(order);
  return (
    <View style={styles.conatiner}>
      <Image
        source={{ uri: "http://178.62.72.241" + roomImg }}
        style={styles.img}
      />
      <Text style={styles.title}>{roomName}</Text>
      <View style={styles.square}>
        <View style={styles.medal}>
          <Text style={styles.orderNum}>{order}</Text>
        </View>
      </View>
    </View>
  );
};

export default SuperMinifiedRoomScape;

const styles = StyleSheet.create({
  conatiner: {
    marginHorizontal: 8,
    marginVertical: 4,

    borderWidth: 2,
    borderColor: "#0085FF",
    borderRadius: 6,

    overflow: "hidden",
    backgroundColor: "#1E272C",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  img: {
    width: Math.floor(windowWidth * 0.95),
    height: 90,
    resizeMode: "cover",
  },

  square: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 24,
    height: 24,
    backgroundColor: "#0085FF",

    justifyContent: "center",
    alignItems: "center",
  },
  medal: {
    backgroundColor: "black",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  orderNum: {
    color: "white",
    fontSize: 10,
  },
  /* Title of the roomscape */
  title: {
    marginLeft: 16,
    marginVertical: 2,
    color: "white",
    textTransform: "capitalize",
    fontSize: 16,
  },
});
