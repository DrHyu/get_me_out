import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import FriendMinifiedCard from "./FriendMinifiedCard";
import FriendRequestCard from "./FriendRequestCard";

import { CopyInivteLinkButton } from "../misc/buttons/Buttons";
const friends = [1, 2, 3, 4, 5];

const Friendlist = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CopyInivteLinkButton />
      <View style={styles.separator} />
      {friends.map((f, idx) => (
        <FriendRequestCard key={idx} style={{ marginBottom: 5 }} />
      ))}
      <View style={styles.separator} />
      {friends.map((f, idx) => (
        <FriendMinifiedCard key={idx} style={{ marginBottom: 5 }} />
      ))}
    </ScrollView>
  );
};

export default Friendlist;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  separator: {
    width: "95%",
    borderColor: "white",
    height: 0,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 8,
  },
});
