import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";

import { matchSorter } from "match-sorter";

export const useGenericSearch = (
  inputData = [
    "1",
    "2",
    "3",
    "22",
    "23",
    "La Casa de Jaume",
    "Down Under",
    "Under Down",
  ],
  defaultSuggestionsIdx = [5, 7],
  keyExtractor = (item) => item,
  nameExtractor = (item) => item
) => {
  const [inputText, setInputText] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedItem, setselectedItem] = useState(null);

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // If we selected something and we modify the text -> unselected
    if (inputText !== nameExtractor(selectedItem)) {
      setselectedItem(null);
    }
    // Show default suggestions
    if (inputText === "") {
      setFilteredData(
        inputData.filter((item, idx) => defaultSuggestionsIdx.includes(idx))
      );
    } else {
      setFilteredData(
        matchSorter(inputData, inputText, { keys: [nameExtractor] })
      );
    }
  }, [inputText]);

  useEffect(() => {
    if (selectedItem) {
      setInputText(nameExtractor(selectedItem));
    }
  }, [selectedItem]);

  const onItemSelect = (key) => {
    console.log(key);
    const item = inputData.filter((item) => keyExtractor(item) === key)[0];
    if (item) {
      setselectedItem(item);
    }
  };

  const getItemProps = (key) => {
    return {
      onPress: () => onItemSelect(key),
    };
  };

  const onInputChange = ({ nativeEvent }) => {
    const { text } = nativeEvent;
    setInputText(text);
  };

  return {
    textInputProps: {
      onTextChange: onInputChange,
      onChange: onInputChange,
      onFocus: () => setOpen(true),
      onBlur: () =>
        setOpen(false) /* Will also trigger when selecting a suggestion */,
      value: inputText,
    },
    getItemProps,
    suggestions: filteredData,
    open,
    selectedItem,
  };
};

const SearchBar = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
