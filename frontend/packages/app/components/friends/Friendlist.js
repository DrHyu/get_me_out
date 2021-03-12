import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";

import { centeredFull } from "../style-snipets";
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

export const useFriendList = () => {};

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

        <Modal
          animationType="slide"
          transparent={true}
          visible={expanded}
          onRequestClose={() => {
            setExpanded(false);
          }}
        >
          <View style={centeredFull} onPress={() => setExpanded(false)}>
            {/* Full screen overlay to catch a press outside the "modal" to close the modal */}
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setExpanded(false)}
            />
            <View style={styles.friendsModalGalleryWrapper}>
              <ScrollView>
                {friends.map((friend) => (
                  <View key={friend} style={styles.friendsModalGalleryRow}>
                    <View style={styles.avatarImageWrapper}>
                      <Image source={TempUsrImg} style={styles.avatarImage} />
                    </View>
                    <Text>Donald J Thumb</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
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
    width: "95%",
  },
  title: {
    flex: 1,
    fontSize: 24,
    paddingVertical: 4,
    backgroundColor: "#f3f3f3",
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

  modalOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  friendsModalGalleryWrapper: {
    height: windowHeight * 0.6,
    width: windowWidth * 0.8,
    borderRadius: 16,
    padding: 10,
    backgroundColor: "white",
  },

  friendsModalGalleryRow: {
    padding: 8,
    margin: 4,

    borderRadius: 8,

    backgroundColor: "lightgray",

    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  friendsModalGalleryFriendName: {},
});
