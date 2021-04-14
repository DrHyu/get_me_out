import React, { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useGenericSearch } from "../misc/GenericSearchBar";

const GenericSearchBar = ({ onBlur, style }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [filterBy, setFilterBy] = useState("alphabetical");

  const {
    textInputProps,
    getItemProps,
    suggestions,
    open,
    selectedItem,
  } = useGenericSearch();

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputAndIconWrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            {...textInputProps}
            placeholder={"Search for people..."}
            placeholderTextColor="black"
            style={styles.input}
          />
          <View style={styles.suggestionsAnchor}>
            {open &&
              suggestions.map((item, idx) => (
                <View style={styles.suggestionsWrapper}>
                  <>
                    {idx > 0 && (
                      <View style={styles.suggestionSepatatorStyle} />
                    )}
                    <TouchableOpacity key={`${idx}`} {...getItemProps(item)}>
                      <Text style={styles.suggestionItemStyle}>{item}</Text>
                    </TouchableOpacity>
                  </>
                </View>
              ))}
          </View>
        </View>
        <MaterialCommunityIcons
          name="magnify"
          size={32}
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
};
const INPUT_HEIGHT = 40;
const INPUT_PADDING = 8;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    // Elevate  vs other page components
    elevation: 100,
    zIndex: 100,
    paddingHorizontal: 20,
  },
  inputAndIconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#a0a0a0",
    paddingHorizontal: 8,
  },
  inputWrapper: {
    position: "relative",
    flex: 1,
    height: INPUT_HEIGHT,
    justifyContent: "center",
  },
  input: {
    fontSize: 24,
    // backgroundColor: "pink",
  },
  suggestionsAnchor: {
    width: "100%",
    height: 0,
    backgroundColor: "red",
  },
  suggestionsWrapper: {
    position: "absolute",
    top: 10,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "black",
    borderWidth: 1,

    zIndex: 1000,
    elevation: 1000,
  },
  suggestionSepatatorStyle: {
    width: "94%",
    marginLeft: "3%",
    marginRight: "3%",
    borderTopColor: "black",
    borderTopWidth: 0.5,
  },
  suggestionItemStyle: {
    fontSize: 28,
    color: "black",
    backgroundColor: "white",
    marginVertical: 8,
    paddingHorizontal: 4,
    zIndex: 1000,
    elevation: 1000,
  },
});

export default GenericSearchBar;
