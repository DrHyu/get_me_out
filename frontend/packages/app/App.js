import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, TextInput, Platform } from "react-native";

import SearchBar from "./components/searchBar/SearchBar";

import styled from "styled-components";

const Root = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Container = styled.View`
  padding-top: 50px;

  display: flex;
  flex-direction: column;
`;

export default function App() {
  return (
    <Root>
      <Container>
        <SearchBar />
      </Container>
    </Root>
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
});
