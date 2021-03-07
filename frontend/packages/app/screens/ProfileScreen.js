import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import Favourites from "../components/myFavourites/Favourites";
import RecentActivity from "../components/myRecentActivity/RecentActivity";
import TempUsrImg from "../assets/user-profile-dummy.jpg";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileScreen = ({ userName = "Mr Trump Jr" }) => {
  return (
    <View>
      <View style={styles.header}></View>
      <View style={styles.avatarRow}>
        <View style={styles.profilePictureWrapper}>
          <View style={styles.profilePictureCircle}>
            <Image source={TempUsrImg} style={styles.profilePicture} />
          </View>
        </View>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <ScrollView>
        <View style={styles.favouritesWrapper}>
          <Favourites />
        </View>
        <View style={styles.myActivityWrapper}>
          <RecentActivity />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: windowHeight * 0.1,
    backgroundColor: "#1E272C",
  },
  avatarRow: {
    flexDirection: "row",
    marginBottom: 20,
    height: windowHeight * 0.15,
  },
  profilePictureWrapper: {
    marginTop: -30,
    marginLeft: 10,
    marginRight: 10,

    width: 120, // Should be same as profilePictureCircle
    height: 120, // Should be same as profilePictureCircle
    borderRadius: 60, // Should be same as profilePictureCircle

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  profilePictureCircle: {
    width: 120, // Should be same as profilePictureWrapper
    height: 120, // Should be same as profilePictureWrapper
    borderRadius: 60, // Should be same as profilePictureWrapper

    borderWidth: 10,
    borderColor: "white",

    overflow: "hidden",
  },
  profilePicture: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  userName: {
    marginTop: 12,
    fontSize: 24,
  },
  favouritesWrapper: { height: windowHeight * 0.5 },
  myActivityWrapper: {},
});

export default ProfileScreen;
