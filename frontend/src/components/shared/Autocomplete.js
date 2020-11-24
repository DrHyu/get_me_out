import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCombobox } from "downshift";

import styled from "styled-components";

import cities from "../../utils/cities";

const ListItem = styled.li`
  background-color: ${({ highlited }) => (highlited ? "gray" : "white")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`;

const cityItems = cities.map((city, idx) => ({ name: city, id: idx }));
const itemToString = (item) => (item ? item.name : "");

const composeItems = (rooms, places) => {
  return [
    { name: "Roomscapes ---", separator: true },
    ...rooms,
    { name: "Places ---", separator: true },
    ...places,
  ];
};

const Autocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setinputValue] = useState("");

  const fetchInitialSuggestions = (search) => {
    const roomSearchEndpoint = `https://5f9c1201856f4c00168c5e7c.mockapi.io/romnames`;
    axios.get(roomSearchEndpoint).then((response) => {
      const data = response.data.map((item) => item);
      setSuggestions(composeItems(data, cityItems));
    });
  };

  const updateSuggestions = (search) => {
    const roomSearchEndpoint = `https://5f9c1201856f4c00168c5e7c.mockapi.io/romnames?search=${search}`;
    axios.get(roomSearchEndpoint).then((response) => {
      const data = response.data.map((item) => item);

      const filteredCities = cityItems.filter((item) =>
        item.name.toLowerCase().startsWith(search.toLowerCase())
      );

      setSuggestions(composeItems(data, filteredCities));
    });
  };

  const onInputValueChange = ({ inputValue }) => {
    setinputValue(inputValue);
    updateSuggestions(inputValue);
  };

  useEffect(() => {
    fetchInitialSuggestions();
  }, []);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    selectedItem,
    getItemProps,
  } = useCombobox({
    items: suggestions,
    onInputValueChange,
    onStateChange: (e) => console.log(e),
    itemToString,
    inputValue /* We control the input value field */,
  });

  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      <div {...getComboboxProps()}>
        <input {...getInputProps()} />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
        >
          &#8595;
        </button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          suggestions.map((item, index) => (
            <ListItem
              {...getItemProps({
                key: item.name,
                index,
                item,
                selected: selectedItem === item,
                highlited: highlightedIndex === index,
              })}
            >
              {item.name}
            </ListItem>
          ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
