import React, { useState, useEffect, isValidElement } from "react";
import { useCombobox } from "downshift";
import DatePicker from "react-datepicker";
import ListItem from "./AutocompleteListItem";

import styled from "styled-components";

import { fetchInitialSuggestions, updateSuggestions } from "./api";

import { Button, InputGroup } from "react-bootstrap";
import { GiPositionMarker } from "react-icons/gi";
import { BsCalendar } from "react-icons/bs";

const AutocompleteStyle = styled.div`
  svg {
    width: 25px;
    height: auto;
  }
`;

const DatePickerStyle = styled.div`
  /* display: block;
  width: 100%; */
`;

const ResultContainer = styled.div`
  display: block;

  max-height: 300px;
  width: 100%;

  top: 100%;
  left: 0%;
  overflow-y: scroll;
  position: absolute;
  z-index: 5;

  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
`;

const itemToString = (item) => (item ? item.name : "");

const Autocomplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    fetchInitialSuggestions().then((initialData) => {
      console.log(initialData);
      if (initialData) setSuggestions(initialData);
    });
  }, []);

  function stateReducer(state, actionAndChanges) {
    const { type, changes } = actionAndChanges;

    console.log(type);
    switch (type) {
      // On input change
      case useCombobox.stateChangeTypes.InputChange:
        /* Fetch new suggestions based on the new inputValue */
        updateSuggestions(changes.inputValue).then((newSuggestions) =>
          setSuggestions(newSuggestions)
        );
        return changes;

      // On selection.
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
        /* Ensure that the 'separator' items cannot be selected */
        if (
          changes.selectedItem &&
          changes.selectedItem.category === "SEPARATOR"
        ) {
          /* Return state -> as if no action had been taken */
          return state;
        } else {
          return changes;
        }
      case useCombobox.stateChangeTypes.InputBlur:
        return state;

      default:
        return changes; // otherwise business as usual.
    }
  }

  const ds = useCombobox({
    items: suggestions,
    itemToString,
    stateReducer,
  });

  return (
    <AutocompleteStyle as="form">
      <div
        // {...ds.getComboboxProps()}
        className="row align-items-center justify-content-center"
      >
        {/* <label {...ds.getLabelProps()}>Choose an element:</label> */}

        <div className="input-group col-sm-7 px-0">
          <div className="input-group-prepend">
            <span class="input-group-text">
              <GiPositionMarker />
            </span>
          </div>
          <input
            className="form-control form-control-lg"
            {...ds.getInputProps()}
          />
          <ResultContainer>
            <ul {...ds.getMenuProps()}>
              {ds.isOpen &&
                suggestions.map((item, index) => {
                  return ListItem(
                    item /* Ref to item */,
                    ds.selectItem === item /* selected ? */,
                    ds.highlightedIndex === index /* highlighted ? */,
                    ds.getItemProps({
                      key: item.name,
                      index,
                    })
                  );
                })}
            </ul>
          </ResultContainer>
        </div>

        <div className="input-group col-sm-4 px-0">
          <div className="input-group-prepend">
            <span class="input-group-text" id="inputGroupPrepend">
              <BsCalendar />
            </span>
          </div>
          <input className="form-control form-control-lg" />
          {/* <DatePicker
            // className="form-control form-control-lg"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            // customInput={<input className="form-control form-control-lg" />}
            // className="form-control form-control-lg"
          /> */}
        </div>

        <div className="col-md-auto px-0">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            {...ds.getToggleButtonProps()}
            aria-label="toggle menu"
          >
            GO
          </button>
        </div>
      </div>
    </AutocompleteStyle>
  );
};

export default Autocomplete;
