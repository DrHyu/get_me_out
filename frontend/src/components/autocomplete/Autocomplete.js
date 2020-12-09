import React, { useState } from "react";
import { useCombobox } from "downshift";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { isEmpty } from "lodash";
import { matchSorter } from "match-sorter";
import { GiPositionMarker } from "react-icons/gi";
import { BsCalendar } from "react-icons/bs";

import Router from "next/router";

import ListItem from "./AutocompleteListItem";
import { searchBarData } from "../../types";

import "react-datepicker/dist/react-datepicker.css";

const AutocompleteStyle = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;

  svg {
    width: 25px;
    height: auto;
  }

  .react-datepicker-wrapper {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
    margin-bottom: 0;
  }
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

const composeSuggesitons = (sugg) => {
  if (isEmpty(sugg)) return [];

  const composedSuggestions = sugg.reduce(
    (acumulator, suggestionGrp) => [
      ...acumulator,
      { name: suggestionGrp.name, category: "SEPARATOR" },
      ...suggestionGrp.data.map((room) => ({
        ...room,
        category: suggestionGrp.category,
      })),
    ],
    []
  );

  return composedSuggestions;
};

const updateSuggestions = (initSugg, key) => {
  if (isEmpty(initSugg)) return {};
  const updatedSuggestions = initSugg.map((suggestionGrp) => ({
    ...suggestionGrp,
    data: matchSorter(suggestionGrp.data, key, {
      keys: [(d) => d.name],
    }),
  }));
  return composeSuggesitons(updatedSuggestions);
};

const Autocomplete = ({ initialSearchBoxData }) => {
  const [suggestionData] = useState(initialSearchBoxData);
  const [suggestions, setSuggestions] = useState(
    composeSuggesitons(initialSearchBoxData)
  );
  const [startDate, setStartDate] = useState(new Date());

  function stateReducer(state, actionAndChanges) {
    const { type, changes } = actionAndChanges;

    switch (type) {
      // On input change
      case useCombobox.stateChangeTypes.InputChange:
        /* Fetch new suggestions based on the new inputValue */
        setSuggestions(updateSuggestions(suggestionData, changes.inputValue));
        return changes;

      // On selection.
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
        /* Ensure that the 'separator' items cannot be selected */
        if (
          changes.selectedItem &&
          changes.selectedItem.category &&
          changes.selectedItem.category === "SEPARATOR"
        ) {
          /* Return state -> as if no action had been taken */
          return state;
        }
        return changes;

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
        {...ds.getComboboxProps()}
        className="row align-items-center justify-content-center"
      >
        {/* <label {...ds.getLabelProps()}>Choose an element:</label> */}

        <div className="input-group col-lg-7 col-sm-12 px-0">
          <div className="input-group-prepend">
            <span className="input-group-text">
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
                suggestions.map((item, index) =>
                  ListItem(
                    item /* Ref to item */,
                    ds.selectItem === item /* selected ? */,
                    ds.highlightedIndex === index /* highlighted ? */,
                    ds.getItemProps({
                      key: item.name,
                      index,
                    })
                  )
                )}
            </ul>
          </ResultContainer>
        </div>

        <div className="input-group col px-0">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupPrepend">
              <BsCalendar />
            </span>
          </div>
          {/* <input className="form-control form-control-lg" /> */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control form-control-lg"
          />
        </div>

        <div className="col-auto pull-right px-0">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            // {...ds.getToggleButtonProps()}
            // aria-label="toggle menu"
            onClick={(e) => {
              e.preventDefault();
              if (ds.selectedItem) {
                Router.push(`/room/${ds.selectedItem.id}`);
              }
            }}
          >
            GO
          </button>
        </div>
      </div>
    </AutocompleteStyle>
  );
};

Autocomplete.propTypes = {
  initialSearchBoxData: searchBarData.isRequired,
};
Autocomplete.defaultProps = {};

export default Autocomplete;
