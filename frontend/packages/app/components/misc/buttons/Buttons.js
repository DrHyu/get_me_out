import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { SimpleLineIcons } from "@expo/vector-icons";

const BaseButton = ({ icon, text, onClick }) => {
  return (
    <Pressable style={styles.wrapper} onPress={onClick}>
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={styles.separator} />
      <View style={styles.textWrapper}>{text}</View>
    </Pressable>
  );
};

import { MaterialCommunityIcons } from "@expo/vector-icons";

export const GoToRSWebButton = ({ link }) => {
  return (
    <BaseButton
      icon={<MaterialCommunityIcons name="web" style={styles.icon} />}
      text={<Text style={styles.text}>Website</Text>}
    />
  );
};

export const ReviewRSButton = ({ link }) => {
  return (
    <BaseButton
      icon={
        <MaterialCommunityIcons name="thumbs-up-down" style={styles.icon} />
      }
      text={<Text style={styles.text}>Review</Text>}
    />
  );
};

export const BookmarkRSButton = ({ link }) => {
  return (
    <BaseButton
      icon={
        <MaterialCommunityIcons name="notebook-outline" style={styles.icon} />
      }
      text={<Text style={styles.text}>Bookmark</Text>}
    />
  );
};

export const ShareRSButton = ({ link }) => {
  return (
    <BaseButton
      icon={<MaterialCommunityIcons name="share" style={styles.icon} />}
      text={<Text style={styles.text}>Share</Text>}
    />
  );
};

export const CopyInivteLinkButton = ({ link }) => {
  return (
    <Pressable
      style={[
        styles.wrapper,
        { flexDirection: "row", alignItems: "center", padding: 10 },
      ]}
      onPress={() => {}}
    >
      <Text style={[styles.text, { fontSize: 28, paddingRight: 14 }]}>
        Copy Invite Link
      </Text>
      <SimpleLineIcons name="share-alt" size={32} color="white" />
    </Pressable>
  );
};

export default [];

const styles = StyleSheet.create({
  wrapper: {
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#0085FF",

    flex: 1,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "white",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  icon: {
    margin: 4,
    fontSize: 60,
    color: "white",
  },
});
