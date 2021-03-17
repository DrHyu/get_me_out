import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useGenericSearch } from "../misc/GenericSearchBar";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SearchBar() {
  const {
    textInputProps,
    getItemProps,
    suggestions,
    open,
    selectedItem,
  } = useGenericSearch();

  useEffect(() => {
    console.log("selected", selectedItem);
  }, [selectedItem]);

  return (
    <View style={styles.base}>
      <View style={styles.inputWrapper}>
        <TextInput
          {...textInputProps}
          style={styles.input}
          placeholder={"Type location or room name ..."}
        />
        <MaterialCommunityIcons name="magnify" style={styles.icon} />
        <View style={styles.suggestionsWrapper}>
          {open &&
            suggestions.map((item, idx) => (
              <TouchableOpacity key={`${idx}`} {...getItemProps(item)}>
                <Text
                  style={{
                    fontSize: 40,
                    color: "white",
                    backgroundColor: "red",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
}

const INPUT_HEIGHT = 75;
const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,

    /** zIndex not working for Android ??? use elevation */
    elevation: 100,
    zIndex: 100,
  },
  inputWrapper: {
    position: "relative",
    // dimensions
    width: "90%",
    height: INPUT_HEIGHT,

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
  suggestionsWrapper: {
    position: "absolute",
    top: INPUT_HEIGHT,
    width: "100%",

    zIndex: 10,
    elevation: 10,
  },
});
