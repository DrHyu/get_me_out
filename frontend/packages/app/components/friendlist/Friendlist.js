import { map } from "lodash";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import TempUsrImg from "../../assets/user-profile-dummy.jpg";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const friends = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
];

const Friendlist = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>My Friends</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => setExpanded(!expanded)}
        >
          <Text>{!expanded ? "View all" : "View less"}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.row]}>
        {!expanded && (
          <ScrollView horizontal={true}>
            <View style={styles.friendsMiniHorizontalGallery}>
              {friends
                .filter((friend, idx) => idx < 6)
                .map((friend, idx) => (
                  <View key={friend} style={styles.avatarImageWrapper}>
                    <Image source={TempUsrImg} style={styles.avatarImage} />
                  </View>
                ))}
              <TouchableOpacity
                style={[styles.addFriendButton, styles.avatarImageWrapper]}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={styles.addFriendButtonIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addFriendButton, styles.avatarImageWrapper]}
                onPress={() => setExpanded(true)}
              >
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  style={styles.dotdotdotButtonIcon}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        {expanded && (
          <ScrollView
            horizontal={false}
            style={styles.friendsVerticalGallery}
            // contentContainerStyle={{ padding: 16 }}
          >
            {friends.map((friend) => (
              <View key={friend} style={styles.friendsVerticalGalleryRow}>
                <View style={styles.avatarImageWrapper}>
                  <Image source={TempUsrImg} style={styles.avatarImage} />
                </View>
                <Text>Donald J Thumb</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <View style={styles.row}></View>
      <Text>Hi</Text>
    </View>
  );
};

export default Friendlist;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: "90%",
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  viewAllButton: {
    flex: 0,
    fontSize: 8,
  },
  addFriendButton: {
    flex: 0,

    backgroundColor: "lightblue",

    justifyContent: "center",
    alignItems: "center",
  },
  addFriendButtonIcon: {
    fontSize: 60,
    color: "white",
  },
  dotdotdotButtonIcon: {
    fontSize: 60,
    color: "black",
  },

  friendsMiniHorizontalGallery: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",

    flexWrap: "wrap",
    backgroundColor: "lightgray",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  friendsMiniHorizontalGalleryItem: {},

  avatarImageWrapper: {
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 4,
    marginHorizontal: 2,
    marginVertical: 2,

    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
  },
  avatarImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  friendsVerticalGallery: {
    maxHeight: windowHeight * 0.6,

    borderRadius: 16,
    backgroundColor: "lightblue",
    padding: 16,
  },
  friendsVerticalGalleryRow: {
    padding: 8,
    margin: 4,

    borderRadius: 8,

    backgroundColor: "lightgray",

    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  friendsVerticalGalleryFriendName: {},
});
