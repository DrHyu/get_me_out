import React from "react";
import { ApolloProvider } from "@apollo/client";

import { StyleSheet, Text, View } from "react-native";

import { createApolloClient } from "./lib/apollo/apolloClient";
import SearchBar from "./components/searchBar/SearchBar";
import TestList from "./components/TestList";

// Add this in node_modules/react-dom/index.js
window.React1 = require("react");

// Add this in your component file
require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);

console.log(window.React1, window.React2);

export default function App() {
  const apolloClient = createApolloClient();

  return (
    <View style={styles.root}>
      <ApolloProvider client={apolloClient}>
        <View style={styles.container}>
          {/* <SearchBar /> */}
          <TestList />
        </View>
      </ApolloProvider>
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
