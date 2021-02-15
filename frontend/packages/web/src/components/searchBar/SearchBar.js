/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from "react";
import { useCombobox } from "downshift";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { isEmpty } from "lodash";
import { matchSorter } from "match-sorter";

import Router from "next/router";

import PT from "prop-types";

import { BsSearch } from "react-icons/bs";
import ListItem from "./SearchBarItem";
import { searchBarData } from "../../types";

import "react-datepicker/dist/react-datepicker.css";

const SearchBarStyle = styled.div`
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

/* Flatten a list of categories (with a list of items inside each category) 
  into a list of items. 
  A 'separator' item is added inbetween each set of categoy items.
*/
const composeSuggesitons = (categories) => {
  if (isEmpty(categories)) return [];

  const composedSuggestions = categories.reduce(
    (acumulator, category) => [
      ...acumulator,
      { name: category.name, isSeparator: true },
      ...category.data.map((item) => ({
        isRoomScape: category.name === "Room Escapes",
        isLocation: category.name === "Locations",
        ...item,
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

const SearchBar = ({ categories }) => {
  const [suggestionData] = useState(categories);
  const [suggestions, setSuggestions] = useState(
    composeSuggesitons(categories)
  );
  const [startDate, setStartDate] = useState();

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

        if (changes?.selectedItem?.isSeparator) {
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
    <SearchBarStyle {...ds.getComboboxProps()} className="">
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
            // selected={startDate}
            placeholderText="Add Date"
            onChange={(date) => setStartDate(date)}
            customInput={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <div className="item-inner">
                <span className="item-header">When ?</span>
                <span className="item-text">
                  {startDate
                    ? startDate.toLocaleDateString("en-GB")
                    : "Add date"}
                </span>
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
                if (ds.selectedItem.isLocation) {
                  Router.push({
                    pathname: `/search`,
                    query: { city: ds.selectedItem.name, date: startDate },
                  });
                } else if (ds.selectedItem.isRoomScape) {
                  Router.push(`/room/${ds.selectedItem.id}`);
                }
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
    </SearchBarStyle>
  );
};

SearchBar.propTypes = {
  categories: searchBarData.isRequired,
};
SearchBar.defaultProps = {};

export default SearchBar;
