import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AvatarNoBorder from "../misc/AvatarNoBorder";

import { AntDesign } from "@expo/vector-icons";

const FriendMinifiedCard = ({ friendName = "Bob The Fisher", style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatarWrapper}>
        <AvatarNoBorder />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.friendName}>{friendName}</Text>
        <Text style={styles.extraText}>Wants to be your friend</Text>
      </View>

      <Pressable>
        <AntDesign name="closecircleo" style={styles.acceptIcon} />
      </Pressable>
      <Pressable>
        <AntDesign name="checkcircle" style={styles.acceptIcon} />
      </Pressable>
    </View>
  );
};

export default FriendMinifiedCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    width: "100%",

    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#0085FF",
    backgroundColor: "#DBEEFF",

    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  avatarWrapper: {
    paddingRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  friendName: {
    fontSize: 20,
    color: "#0085FF",
    fontWeight: "bold",
  },
  extraText: {
    fontSize: 12,
    color: "#0085FF",
    fontWeight: "bold",
  },
  acceptIcon: {
    backgroundColor: "white",
    fontSize: 48,
    color: "#0085FF",
    borderRadius: 100,
    marginHorizontal: 8,
  },
});
