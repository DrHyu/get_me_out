import React, { useState } from "react";
import { useCombobox } from "downshift";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { isEmpty } from "lodash";
import { matchSorter } from "match-sorter";
// import { GiPositionMarker } from "react-icons/gi";
// import { BsCalendar } from "react-icons/bs";

import Router from "next/router";

import PT from "prop-types";

import { BsSearch } from "react-icons/bs";
import ListItem from "./AutocompleteListItem";
import { searchBarData } from "../../types";

import "react-datepicker/dist/react-datepicker.css";
// .react-datepicker-wrapper {
//   position: relative;
//   flex: 1 1 auto;
//   width: 1%;
//   min-width: 0;
//   margin-bottom: 0;
// }
const AutoCompleteStyle = styled.div`
  display: flex;
  justify-content: center;

  .wrapper {
    background-color: white;

    display: flex;
    justify-content: center;
    border-radius: 32px;

    .item {
      height: 64px;
      padding: 14px 32px;
      /* flex: 1 0 0%;
      width: 0px; */

      /* overflow: hidden; */
      position: relative;
      z-index: 1;

      background-clip: padding-box;
    }

    /* HIGHLIGHT */
    /* hightlight style no bg color here yet */
    .item::after {
      content: "" !important;

      background-clip: padding-box !important;

      /* border: 1px solid transparent !important; */
      border-radius: 32px !important;

      position: absolute !important;
      bottom: 0px !important;
      left: 0px !important;
      right: 0px !important;
      top: 0px !important;

      z-index: -1 !important;
    }
    /* set bg color on hover to "enable" hightlighting */
    .item:hover::after {
      background-color: #ebebeb !important;
    }

    /* SEPARATOR */
    .item::before {
      content: "" !important;
      top: 30%;
      bottom: 30%;
      left: 0px;
      position: absolute;
      border-right: 1px solid #dddddd;
    }
    /* first elem doesnt need a separator */
    .item:first-child::before {
      border: none;
    }
    /* Remove neightbouring separators on hover */
    /* before of item next to item which is hovered */
    .item:hover + .item::before {
      border: none;
    }
    /* item beeing hovered */
    .item:hover::before {
      border: none;
    }

    .search-field {
      display: flex;
      align-items: center;
      input {
        border: none;
        padding: 0px;
      }
    }

    .date-field {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .submit-button {
      display: flex;
      align-items: center;
      justify-content: center;

      padding-right: 12px;
      padding-left: 12px;

      button {
        border-radius: 50%;
        height: 48px;
        width: 48px;
        border: none;
        background-color: #ff385c;

        display: flex;
        justify-content: center;
        align-items: center;
      }
      button:hover {
        background-color: #ff005c;
      }

      svg {
        color: white;
      }
    }
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

const ExampleCustomInput = ({ value, onClick }) => (
  <button className="example-custom-input" onClick={onClick}>
    {value}
  </button>
);

ExampleCustomInput.propTypes = {
  value: PT.string.isRequired,
  onClick: PT.func.isRequired,
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
    <AutoCompleteStyle {...ds.getComboboxProps()} className="">
      <div className="wrapper">
        <div className="item search-field">
          <span className="item-title">Room/Location</span>
          <input className="" {...ds.getInputProps()} />
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

        <div className="item date-field">
          <DatePicker
            customInput={<ExampleCustomInput />}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className=""
          />
        </div>

        <div className="item submit-button">
          <button
            type="button"
            className=""
            onClick={(e) => {
              e.preventDefault();
              if (ds.selectedItem) {
                Router.push(`/room/${ds.selectedItem.id}`);
              }
            }}
          >
            <BsSearch />
          </button>
          {/* </div> */}
        </div>
      </div>
    </AutoCompleteStyle>
  );
};

Autocomplete.propTypes = {
  initialSearchBoxData: searchBarData.isRequired,
};
Autocomplete.defaultProps = {};

export default Autocomplete;
