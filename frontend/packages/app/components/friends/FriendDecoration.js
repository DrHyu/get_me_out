import React from "react";
import { StyleSheet, View, Image } from "react-native";

import TempUsrImg from "../../assets/user-profile-dummy.jpg";

const FriendDecoration = ({}) => {
  return (
    <View style={styles.positioner}>
      <View style={styles.container}>
        <Image source={TempUsrImg} style={styles.usrImage} />
      </View>
    </View>
  );
};

const SIZE = 80;

const styles = StyleSheet.create({
  positioner: {
    zIndex: 10000,
    position: "absolute",
    top: (-SIZE * 1) / 4,
    right: 5,
  },
  container: {
    width: SIZE,
    height: SIZE,
    borderWidth: 5,
    borderRadius: SIZE / 2,
    borderColor: "#54699f",
    overflow: "hidden",
  },
  usrImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});

export default FriendDecoration;
