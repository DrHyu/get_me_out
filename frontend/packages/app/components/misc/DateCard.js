import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { HSeparator } from "../style-snipets";
const DateCard = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <AntDesign name="calendar" style={styles.iconStyle} />
      <View
        style={[HSeparator, { borderBottomColor: "white", width: "80%" }]}
      ></View>
      <Text style={styles.dateText}>
        Dec
        {"\n"}
        2020
      </Text>
    </View>
  );
};

export default DateCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#132732",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  iconStyle: {
    fontSize: 24,
    color: "white",
    marginVertical: 4,
  },
  dateText: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 8,
  },
});
