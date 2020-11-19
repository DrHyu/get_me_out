import React, { useState, useEffect } from "react";
import axios from "axios";
import Downshift from "downshift";

import styled from "styled-components";

const ListItem = styled.li`
  background-color: ${({ highlited }) => (highlited ? "gray" : "white")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`;

const filterOptions = (options, inputValue) => {
  return options.filter(
    (item) => !inputValue || item.value.includes(inputValue)
  );
};

const itemToString = (item) => (item ? item.value : "");

const onSelectionChange = () => {};

const Autocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchInitialSuggestions = (search) => {
    const roomSearchEndpoint = `https://5f9c1201856f4c00168c5e7c.mockapi.io/romnames`;
    axios.get(roomSearchEndpoint).then((response) => {
      const data = response.data.map((item) => item);
      setSuggestions(data);
    });
  };

  const updateSuggestions = (search) => {
    const roomSearchEndpoint = `https://5f9c1201856f4c00168c5e7c.mockapi.io/romnames?search=${search}`;
    axios.get(roomSearchEndpoint).then((response) => {
      const data = response.data.map((item) => item);
      setSuggestions(data);
    });
  };

  const onInputChange = (inputValue, other) => {
    console.log(inputValue);
    updateSuggestions(inputValue);
  };

  useEffect(() => {
    fetchInitialSuggestions();
  }, []);

  return (
    <div>
      <Downshift
        onChange={onSelectionChange}
        itemToString={itemToString}
        onInputValueChange={onInputChange}
      >
        {(ds) => (
          <div>
            <label {...ds.getLabelProps()}>Enter a fruit</label>
            <div
              // style={{ display: "inline-block" }}
              {...ds.getRootProps({}, { suppressRefError: true })}
            >
              <input {...ds.getInputProps()} />
            </div>
            <ul {...ds.getMenuProps()}>
              {ds.isOpen
                ? suggestions.map((item, index) => (
                    <ListItem
                      {...ds.getItemProps({
                        key: item.name,
                        index,
                        item,
                        selected: ds.selectedItem === item,
                        highlited: ds.highlightedIndex === index,
                      })}
                    >
                      {item.name}
                    </ListItem>
                  ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    </div>
  );
};

export default Autocomplete;
