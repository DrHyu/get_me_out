/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from "react";
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

    width: 800px;

    display: flex;
    justify-content: center;
    border-radius: 32px;

    /* overflow: hidden; */
  }
`;

const Item = styled.div`
  & {
    height: 64px;
    padding: 14px 32px;
    margin: 0px;

    /* overflow: hidden; */
    position: relative;
    z-index: 1;

    background-clip: padding-box;
  }

  /* HIGHLIGHT */
  /* hightlight style no bg color here yet */
  &::after {
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

    box-shadow: ${({ isWidgetOpen }) =>
      isWidgetOpen ? " 0px 6px 20px rgba(0, 0, 0, 0.2) !important" : "none"};

    background-color: ${({ isWidgetOpen }) =>
      isWidgetOpen ? "white !important" : "none"};
  }
  /* set bg color on hover to "enable" hightlighting */
  &:hover::after {
    background-color: #ebebeb;
  }

  /* SEPARATOR */
  &::before {
    content: "" !important;
    top: 30%;
    bottom: 30%;
    left: 0px;
    position: absolute;
    border-right: ${({ isWidgetOpen, isNeighbourOpen }) =>
      isNeighbourOpen || isWidgetOpen ? "none" : "1px solid #dddddd"};
  }
  /* first elem doesnt need a separator */
  &:first-child::before {
    border: none;
  }
  /* Remove neightbouring separators on hover */
  /* before of item next to item which is hovered */
  &:hover + &::before {
    border: none;
  }
  /* item beeing hovered */
  &:hover::before {
    border: none;
  }

  .item-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    .item-header {
      flex-basis: 100%;

      font-size: 12px;
      font-weight: bold;
      color: #222222;

      margin: 0px;
    }

    .item-text {
      flex-basis: 100%;
      font-size: 14px;
      /* font-weight: bold; */
      color: #717171;
    }
  }
`;

const SearchField = styled(Item)`
  display: flex;
  align-items: flex-start;

  flex: 2 0 0%;

  input {
    border: none;
    padding: 0px;

    background: transparent;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
`;

const DateField = styled(Item)`
  flex: 1 0 0%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SubmitButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding-right: 12px;
  padding-left: 12px;

  button {
    padding: 16px;

    height: 48px;
    width: ${({ isExtended }) => (!isExtended ? "48px;" : "110px;")};
    transition: 0.2s width ease-out !important;
    transition-delay: 0.2s !important;

    border-radius: 24px;
    border: none;
    background-color: #ff385c;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  button:hover {
    background-color: #ff005c;
  }

  button div {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: white;
    }

    span {
      color: white;
      margin-left: 12px;
      opacity: ${({ isExtended }) => (isExtended ? "1" : "0")} !important;
      transition: 0.1s opacity cubic-bezier(0.35, 0, 0.65, 1) !important;
      transition-delay: 0.1s !important;

      font-size: 16px !important;
      font-weight: 600 !important;
      line-height: 16px !important;
    }
  }
`;

const ResultsWindow = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;

  top: 96px;
  left: 0%;
  z-index: 5;

  height: 300px;
  width: 100%;

  padding: 32px;
  box-sizing: border-box;
  border-radius: 32px;
  background-color: white;

  .overflow-wrapper {
    height: 100%;
    overflow-y: scroll;

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }

    ::-webkit-scrollbar {
      width: 12px;
      background-color: #f5f5f5;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #555;
    }
  }

  .test2 {
  }

  ul {
    /* overflow: hidden; */
    list-style: none;
    margin: 0px;
    padding: 0px;
    text-decoration: none;
  }
  li {
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

  const [isOPenDatePicker, setIsOPenDatePicker] = useState(false);
  const datePickerRef = useRef();

  useEffect(() => {
    datePickerRef.current.setOpen(isOPenDatePicker);
  }, [isOPenDatePicker]);

  function stateReducer(state, actionAndChanges) {
    const { type, changes } = actionAndChanges;

    switch (type) {
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
          /* Open the Date Picker */
          return state;
        }
        setIsOPenDatePicker(true);
        return changes;

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
      <div className="wrapper open-search-on-click">
        <SearchField
          className="open-search-on-click"
          isWidgetOpen={ds.isOpen}
          isNeighbourOpen={false}
          onClick={(e) => {
            if (e.target.classList.contains("open-search-on-click"))
              ds.openMenu();
          }}
        >
          <div className="item-inner open-search-on-click">
            <label
              {...ds.getLabelProps()}
              className="item-header open-search-on-click"
            >
              Room Escape or City
            </label>
            <input
              className="item-text open-search-on-click"
              placeholder="Where are you going ?"
              {...ds.getInputProps()}
            />
            <ResultsWindow isOpen={ds.isOpen}>
              <div className="overflow-wrapper ">
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
              </div>
            </ResultsWindow>
          </div>
        </SearchField>

        <DateField isWidgetOpen={isOPenDatePicker} isNeighbourOpen={ds.isOpen}>
          <DatePicker
            ref={datePickerRef}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <div className="item-inner">
                <span className="item-header">When ?</span>
                <span className="item-text">Add dates</span>
              </div>
            }
            onCalendarClose={() => setIsOPenDatePicker(false)}
            onCalendarOpen={() => {
              if (ds.isOpen) ds.closeMenu();
              setIsOPenDatePicker(true);
            }}
          />
        </DateField>

        <SubmitButton isExtended={ds.isOpen || isOPenDatePicker}>
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
            <div>
              <BsSearch />
              <span>Search</span>
            </div>
          </button>
        </SubmitButton>
      </div>
    </AutoCompleteStyle>
  );
};

Autocomplete.propTypes = {
  initialSearchBoxData: searchBarData.isRequired,
};
Autocomplete.defaultProps = {};

export default Autocomplete;
