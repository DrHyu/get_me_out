import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Favourites = () => {
  return (
    <View style={styles.container}>
      <Text styles={styles.title}>My Favourites</Text>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: "red",
  },
  title: {
    flex: 1,
    fontSize: 24,
    alignSelf: "center",
  },
});
