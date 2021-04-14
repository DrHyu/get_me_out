import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import TempUsrImg from "../../assets/user-profile-dummy.jpg";

const Avatar = ({ img, level }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarImgWrapper}>
        <Image source={TempUsrImg} style={styles.avatarImg} />
      </View>
    </View>
  );
};

export default Avatar;

const WIDTH = 70;
const HEIGHT = 95;
const BORDER_WIDTH = 4;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: WIDTH,
    borderColor: "#1A76CB",
    borderWidth: BORDER_WIDTH,
    borderRadius: WIDTH / 2,
    backgroundColor: "#1A76CB",
    position: "relative",
  },
  avatarImgWrapper: {
    width: WIDTH - BORDER_WIDTH * 2,
    height: WIDTH - BORDER_WIDTH * 2,
    borderRadius: (WIDTH - BORDER_WIDTH * 2) / 2,
    backgroundColor: "red",
    overflow: "hidden",
  },
  avatarImg: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});
