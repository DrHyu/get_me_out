import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AvatarNoBorder from "../misc/AvatarNoBorder";

import SimpleOptionsModal from "../misc/SimpleOptionsModal";

const FriendMinifiedCard = ({ friendName = "Bob The Fisher", style }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatarWrapper}>
        <AvatarNoBorder />
      </View>
      <Text style={styles.friendName}> {friendName}</Text>
      <View style={styles.optionsButtonWrapper}>
        <View
          style={
            isOptionsOpen
              ? { ...styles.optionsButtonMaskBg, backgroundColor: "#0085FF" }
              : styles.optionsButtonMaskBg
          }
        />
        <Pressable onPress={() => setIsOptionsOpen(true)}>
          <MaterialCommunityIcons
            name="dots-vertical"
            style={
              isOptionsOpen
                ? { ...styles.optionsButton, color: "white" }
                : styles.optionsButton
            }
          />
        </Pressable>
        <SimpleOptionsModal
          isOpen={isOptionsOpen}
          onRequestClose={() => setIsOptionsOpen(false)}
        >
          <View style={styles.optionsContainer}>
            <Pressable
              style={styles.optionsItem}
              onPress={() => setIsOptionsOpen(false)}
            >
              <Text style={styles.optionsText}>View</Text>
            </Pressable>
            <Pressable
              style={[styles.optionsItem, styles.optionsLastItem]}
              onPress={() => setIsOptionsOpen(false)}
            >
              <Text style={styles.optionsText}>Remove</Text>
            </Pressable>
          </View>
        </SimpleOptionsModal>
      </View>
    </View>
  );
};

export default FriendMinifiedCard;

const ICON_SIZE = 60;
const DOTS_WIDTH = ICON_SIZE / 4;
const TOP_SPACING = ICON_SIZE / 7;
const HIGHLIGHT_SIZE = 2;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,

    width: "100%",

    borderRadius: 8,
    backgroundColor: "white",

    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  avatarWrapper: {
    paddingRight: 16,
  },
  friendName: {
    fontSize: 20,
    flex: 1,
    fontWeight: "bold",
  },
  optionsButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  optionsButtonMaskBg: {
    position: "absolute",
    top: TOP_SPACING - HIGHLIGHT_SIZE,
    left: ICON_SIZE / 2 - DOTS_WIDTH / 2 - HIGHLIGHT_SIZE,
    width: DOTS_WIDTH + HIGHLIGHT_SIZE * 2,
    height: DOTS_WIDTH * 3 + HIGHLIGHT_SIZE * 2,
    borderRadius: 100,
  },
  optionsButton: {
    fontSize: ICON_SIZE,
    color: "#A19E9E",
  },
  optionsContainer: {
    backgroundColor: "#DBEEFF",
    borderColor: "#0085FF",
    borderWidth: 2,
    width: 300,
  },
  optionsItem: {
    borderColor: "#0085FF",
    borderBottomWidth: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  optionsLastItem: {
    borderBottomWidth: 0,
  },
  optionsText: {
    fontSize: 32,
    color: "#0085FF",
  },
});
