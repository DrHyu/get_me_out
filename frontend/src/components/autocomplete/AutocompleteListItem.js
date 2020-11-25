import React from "react";
import styled from "styled-components";

import { GiPositionMarker, GiJigsawBox } from "react-icons/gi";

import { AiOutlineScan } from "react-icons/ai";
import { BsBoundingBoxCircles } from "react-icons/bs";

const SeparatorLIStyle = styled.li`
  font-weight: bold;
  font-size: 1.5em;
  text-transform: uppercase;

  background-color: white;
`;

function SeparatorListItem({ renderProps, selected, highlighted, item }) {
  return <SeparatorLIStyle {...renderProps}>{item.name}</SeparatorLIStyle>;
}

const BaselineStyle = styled.div`
  svg {
    width: 30px;
    height: auto;

    padding-right: 5px;
  }
`;

const RoomItemStyle = styled(BaselineStyle)`
  padding: 5px 20px;
  background-color: white;
`;

const HighlightedRoomItemStyle = styled(RoomItemStyle)`
  background-color: lightgray;
`;

function RoomListItem({ renderProps, selected, highlighted, item }) {
  if (highlighted) {
    return (
      <HighlightedRoomItemStyle {...renderProps}>
        <BsBoundingBoxCircles />
        {item.name}
      </HighlightedRoomItemStyle>
    );
  } else {
    return (
      <RoomItemStyle {...renderProps}>
        <BsBoundingBoxCircles />
        {item.name}
      </RoomItemStyle>
    );
  }
}

const LocationItemStyle = styled(BaselineStyle)`
  padding: 5px 20px;
  background-color: white;
`;

const HighlightedLocationItemStyle = styled(LocationItemStyle)`
  background-color: lightgray;
`;

function LocationListItem({ renderProps, selected, highlighted, item }) {
  if (highlighted) {
    return (
      <HighlightedLocationItemStyle {...renderProps}>
        <GiPositionMarker />
        {item.name}
      </HighlightedLocationItemStyle>
    );
  } else {
    return (
      <LocationItemStyle {...renderProps}>
        <GiPositionMarker />
        {item.name}
      </LocationItemStyle>
    );
  }
}

function AutocompleteListItem(item, selected, highlighted, renderProps) {
  const props = {
    renderProps,
    selected,
    highlighted,
    item,
    key: renderProps.key,
  };

  switch (item.category) {
    case "SEPARATOR":
      return <SeparatorListItem {...props} />;
      break;
    case "ROOM":
      return <RoomListItem {...props} />;
      break;
    case "LOCATION":
      return <LocationListItem {...props} />;
      break;
    default:
      return <li {...props}>{props.item.name}</li>;
      break;
  }
}

export default AutocompleteListItem;
