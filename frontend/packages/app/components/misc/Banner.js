import React from "react";
import { StyleSheet, View } from "react-native";

const Banner = ({ width = 40, height = 60, color = "red", children }) => {
  const styles = createStyles(width, height, color);

  return (
    <View style={styles.positioner}>
      <View style={styles.imgBannerSquare} />
      <View style={styles.imgBannerTriangle} />
      <View style={styles.imgBannerIconWrapper}>{children}</View>
    </View>
  );
};

const createStyles = (width, height, color) =>
  StyleSheet.create({
    positioner: {
      position: "absolute",
      top: -5,
      right: 25,
    },
    imgBannerSquare: {
      position: "absolute",
      width: width,
      height: (height * 2) / 3,
      backgroundColor: color,
    },
    imgBannerTriangle: {
      position: "absolute",
      top: (height * 2) / 3,

      width: 0,
      height: 0,

      borderLeftWidth: width / 2,
      borderLeftColor: "transparent",
      borderRightWidth: width / 2,
      borderRightColor: "transparent",
      borderTopWidth: height / 3,
      borderTopColor: color,
    },
    imgBannerIconWrapper: {
      width: width,
      height: (height * 2) / 3,

      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Banner;
