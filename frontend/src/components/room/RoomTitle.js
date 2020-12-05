import React from "react";
import styled from "styled-components";

const RoomTitleWrapper = styled.div`
  font-size: 30px;
  text-transform: uppercase;
`;

function RoomTitle({ room }) {
  return <RoomTitleWrapper>{room.name}</RoomTitleWrapper>;
}

export default RoomTitle;
