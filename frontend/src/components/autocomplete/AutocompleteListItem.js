import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { GiPositionMarker } from "react-icons/gi";

import { BsBoundingBoxCircles } from "react-icons/bs";

const SeparatorLIStyle = styled.li`
  font-weight: bold;
  font-size: 1.5em;
  text-transform: uppercase;

  background-color: white;
`;

function SeparatorListItem({ renderprops, item }) {
  return <SeparatorLIStyle {...renderprops}>{item.name}</SeparatorLIStyle>;
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

function RoomListItem({ renderprops, highlighted, item }) {
  if (highlighted === "true") {
    return (
      <HighlightedRoomItemStyle {...renderprops}>
        <BsBoundingBoxCircles />
        {item.name}
      </HighlightedRoomItemStyle>
    );
  }
  return (
    <RoomItemStyle {...renderprops}>
      <BsBoundingBoxCircles />
      {item.name}
    </RoomItemStyle>
  );
}

const LocationItemStyle = styled(BaselineStyle)`
  padding: 5px 20px;
  background-color: white;
`;

const HighlightedLocationItemStyle = styled(LocationItemStyle)`
  background-color: lightgray;
`;

function LocationListItem({ renderprops, highlighted, item }) {
  if (highlighted === "true") {
    return (
      <HighlightedLocationItemStyle {...renderprops}>
        <GiPositionMarker />
        {item.name}
      </HighlightedLocationItemStyle>
    );
  }
  return (
    <LocationItemStyle {...renderprops}>
      <GiPositionMarker />
      {item.name}
    </LocationItemStyle>
  );
}

function AutocompleteListItem(item, selected, highlighted, renderprops) {
  const props = {
    renderprops,
    selected: selected ? "true" : undefined,
    highlighted: highlighted ? "true" : undefined,
    item,
    key: renderprops.key,
  };

  switch (item.category) {
    case "SEPARATOR":
      return <SeparatorListItem {...props} />;
    case "ROOM":
      return <RoomListItem {...props} />;
    case "LOCATION":
      return <LocationListItem {...props} />;
    default:
      return <li {...props}>{props.item.name}</li>;
  }
}

const propTypes = {
  renderprops: PropTypes.shape({}).isRequired,
  selected: PropTypes.string,
  highlighted: PropTypes.string,
  item: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

const defautValues = {
  selected: false,
  highlighted: false,
};

SeparatorListItem.propTypes = propTypes;
SeparatorListItem.defautValues = defautValues;

RoomListItem.propTypes = propTypes;
RoomListItem.defautValues = defautValues;

LocationListItem.propTypes = propTypes;
LocationListItem.defautValues = defautValues;

export default AutocompleteListItem;
