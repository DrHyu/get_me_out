import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

import Constants from "expo-constants";

const Layout = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.conatiner, style]}>{children}</SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  conatiner: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    flex: 1,
  },
});
