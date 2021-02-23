import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SearchBar() {
  return (
    <View style={styles.base}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={"Type location or room name ..."}
        />
        <MaterialCommunityIcons name="magnify" style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputWrapper: {
    // dimensions
    width: "90%",
    height: 75,

    // bg
    backgroundColor: "white",
    // border
    borderRadius: 8,
    borderColor: "gray",
    borderWidth: 1,

    //padding
    paddingHorizontal: 10,

    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    // childs
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    flex: 1,
    fontSize: 18,
  },
  icon: {
    fontSize: 48,
  },
});
