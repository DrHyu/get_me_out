import React from "react";
import styled from "styled-components";
import PT, { oneOf } from "prop-types";

import { GiPositionMarker } from "react-icons/gi";

import { BsBoundingBoxCircles } from "react-icons/bs";

import { roomType } from "../../types";

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
  if (highlighted) {
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
  if (highlighted) {
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

function SearchBarListItem(item, selected, highlighted, renderprops) {
  const props = {
    renderprops,
    highlighted,
    item,
    key: renderprops.key,
  };

  if (item.isSeparator) {
    return <SeparatorListItem {...props} />;
  }
  if (item.isRoomScape) {
    return <RoomListItem {...props} />;
  }
  if (item.isLocation) {
    return <LocationListItem {...props} />;
  }
  return <li {...props}>{item.name}</li>;
}

SeparatorListItem.propTypes = {
  renderprops: PT.shape({}).isRequired,
  highlighted: PT.bool.isRequired,
  item: PT.shape({
    isSeparator: PT.oneOf([true]).isRequired,
    name: PT.string.isRequired,
  }).isRequired,
};

RoomListItem.propTypes = {
  renderprops: PT.shape({}).isRequired,
  highlighted: PT.bool.isRequired,
  item: PT.shape({
    isRoomScape: PT.oneOf([true]).isRequired,
    name: PT.string.isRequired,
    id: PT.oneOfType([PT.number, PT.string]).isRequired,
  }).isRequired,
};

LocationListItem.propTypes = {
  renderprops: PT.shape({}).isRequired,
  highlighted: PT.bool.isRequired,
  item: PT.shape({
    isLocation: PT.oneOf([true]).isRequired,
    name: PT.string.isRequired,
    id: PT.oneOfType([PT.number, PT.string]).isRequired,
  }).isRequired,
};

export default SearchBarListItem;
