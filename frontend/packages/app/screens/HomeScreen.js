import React from "react";

import { StyleSheet, Text, View, Button } from "react-native";

import FilterRoomScapes from "../components/roomFilter/FilterRoomScapes";

import TestList from "../components/TestList";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text>HomeScreen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "green",
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
  },
  root: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  container: {
    paddingTop: 50,
    flex: 1,
    flexDirection: "column",
  },
});
