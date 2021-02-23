import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import Bookmarks from "../components/bookmarkedRS/bookmarkedRS";

export default function TrackScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Bookmarks
        ListHeaderComponent={
          // Bookmarks itself is a virtual view and they cannot be nested
          // The only way to make the header scrollable is to included it in the
          // ListHeaderComponent of the DraggableFlatList inside Bookmarks
          <View style={styles.header}>
            <Text style={styles.title}>BOOKMARKS</Text>
          </View>
        }
      />
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
