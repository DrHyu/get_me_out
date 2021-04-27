import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { SimpleLineIcons } from "@expo/vector-icons";

const BaseButton = ({ icon, text, onPress }) => {
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={styles.separator} />
      <View style={styles.textWrapper}>{text}</View>
    </Pressable>
  );
};

import { MaterialCommunityIcons } from "@expo/vector-icons";

export const GoToRSWebButton = ({ link, onPress = () => {} }) => {
  return (
    <BaseButton
      icon={<MaterialCommunityIcons name="web" style={styles.icon} />}
      text={<Text style={styles.text}>Website</Text>}
      onPress={onPress}
    />
  );
};

export const ReviewRSButton = ({ link, onPress = () => {} }) => {
  return (
    <BaseButton
      icon={
        <MaterialCommunityIcons name="thumbs-up-down" style={styles.icon} />
      }
      text={<Text style={styles.text}>Review</Text>}
      onPress={onPress}
    />
  );
};

export const BookmarkRSButton = ({ link, onPress = () => {} }) => {
  return (
    <BaseButton
      icon={
        <MaterialCommunityIcons name="notebook-outline" style={styles.icon} />
      }
      text={<Text style={styles.text}>Bookmark</Text>}
      onPress={onPress}
    />
  );
};

export const ShareRSButton = ({ link, onPress = () => {} }) => {
  return (
    <BaseButton
      icon={<MaterialCommunityIcons name="share" style={styles.icon} />}
      text={<Text style={styles.text}>Share</Text>}
      onPress={onPress}
    />
  );
};

export const CopyInivteLinkButton = ({ link, onPress = () => {} }) => {
  return (
    <Pressable
      style={[
        styles.wrapper,

        { flexDirection: "row", alignItems: "center", padding: 10 },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize: 28, paddingRight: 14 }]}>
        Copy Invite Link
      </Text>
      <SimpleLineIcons name="share-alt" size={32} color="white" />
    </Pressable>
  );
};

export const OnlyTextButton = ({ text, onPress = () => {} }) => {
  return (
    <Pressable
      style={[
        styles.base,
        styles.shadow,
        {
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 8,
          flexGrow: 0,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize: 24, textAlign: "center" }]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default [];

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#0085FF",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
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
