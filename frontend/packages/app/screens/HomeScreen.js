import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import RecomendedRS from "../components/recomendedRS/RecomendedRS";
import SearchBar from "../components/searchBar/SearchBar";
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>GET ME OUT</Text>
        </View>
        <SearchBar />
        <RecomendedRS />
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
    marginBottom: -20,
  },
  title: {
    paddingTop: 40,

    fontSize: 48,
    color: "#1A76CB",
    textAlign: "center",
  },
});
