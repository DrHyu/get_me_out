import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import Bookmarks from "../components/bookmarkedRS/bookmarkedRS";

export default function TrackScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>BOOKMARKS</Text>
        </View>
        <Bookmarks />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    flex: 1,
    flexDirection: "column",
  },
  header: {
    width: "100%",
    height: 150,
    backgroundColor: "#1E272C",
  },
  title: {
    paddingTop: 40,

    fontSize: 48,
    color: "#1A76CB",
    textAlign: "center",
  },
});
