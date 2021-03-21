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
import SearchSettingsModal from "./SearchSettingsModal";

const SearchBar = ({ onBlur }) => {
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
    <View style={styles.container}>
      <View style={[styles.row, styles.inputRow]}>
        <View style={styles.inputWrapper}>
          <TextInput
            {...textInputProps}
            placeholder={"Type location or room name ..."}
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
          size={48}
          style={styles.searchIcon}
        />
      </View>
      <View style={[styles.row, styles.filterIconsWrapper]}>
        <TouchableOpacity onPress={() => setFilterBy("alphabetical")}>
          <MaterialCommunityIcons
            name="alphabetical"
            style={[
              styles.filterIcon,
              filterBy === "alphabetical" ? { color: "red" } : {},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterBy("distance")}>
          <MaterialCommunityIcons
            name="map-marker-distance"
            style={[
              styles.filterIcon,
              filterBy === "distance" ? { color: "red" } : {},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterBy("stars")}>
          <MaterialCommunityIcons
            name="star-outline"
            style={[
              styles.filterIcon,
              filterBy === "stars" ? { color: "red" } : {},
            ]}
          />
        </TouchableOpacity>
        <View style={styles.verticalSep} />
        <TouchableOpacity onPressIn={() => setIsSettingsOpen(!isSettingsOpen)}>
          <MaterialCommunityIcons
            name="tune"
            style={[styles.filterIcon, styles.filterIconSettings]}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSettingsOpen}
        onRequestClose={() => {
          setIsSettingsOpen(false);
        }}
      >
        <SearchSettingsModal closeFn={() => setIsSettingsOpen(false)} />
      </Modal>
    </View>
  );
};
const INPUT_HEIGHT = 75;
const INPUT_PADDING = 8;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    // Elevate  vs other page components
    elevation: 100,
    zIndex: 100,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",

    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 0.5,
    // place behind suggestion items
    zIndex: 0,
    elevation: 0,
  },
  inputRow: {
    paddingHorizontal: 20,
    justifyContent: "center",
    // place on top of other rows
    zIndex: 100,
    elevation: 100,
  },
  inputWrapper: {
    position: "relative",
    flex: 1,
    height: INPUT_HEIGHT,
    justifyContent: "center",
  },
  input: {
    // flex: 1,
    fontSize: 24,
    borderBottomWidth: 1,
    paddingBottom: INPUT_PADDING,
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

  filterIconsWrapper: {
    justifyContent: "flex-end",
  },
  filterIcon: {
    fontSize: 32,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  filterIconSettings: {
    borderLeftWidth: 2,
    borderLeftColor: "red",
    marginHorizontal: 20,
  },
  verticalSep: {
    borderRightWidth: 1,
    height: "100%",
  },
});

export default SearchBar;
