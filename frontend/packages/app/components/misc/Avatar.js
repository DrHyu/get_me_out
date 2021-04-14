import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import TempUsrImg from "../../assets/user-profile-dummy.jpg";

const Avatar = ({ img, level }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarImgWrapper}>
        <Image source={TempUsrImg} style={styles.avatarImg} />
      </View>
      <View style={styles.levelContainer}>
        <Text style={styles.level}>42</Text>
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
    height: HEIGHT,
    borderColor: "#1A76CB",
    borderWidth: BORDER_WIDTH,
    borderTopLeftRadius: WIDTH / 2,
    borderTopRightRadius: WIDTH / 2,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
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
  levelContainer: {
    height: HEIGHT - WIDTH - BORDER_WIDTH, // simplified formula
    borderRadius: 4,
    marginVertical: BORDER_WIDTH,
    marginHorizontal: BORDER_WIDTH,
    backgroundColor: "#0A2B4A",

    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  level: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
