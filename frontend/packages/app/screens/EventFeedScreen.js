import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import FilterRoomScapes from "../components/roomFilter/FilterRoomScapes";

import Friendlist from "../components/friendlist/Friendlist";

const EventFeedScreen = ({ userName = "Mr Trump Jr" }) => {
  return (
    <View>
      <View style={styles.header}></View>
      <Friendlist></Friendlist>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    backgroundColor: "#1E272C",
  },
});
export default EventFeedScreen;
