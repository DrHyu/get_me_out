import React from "react";
import styled from "styled-components";

import { roomType } from "../../types";

const RoomTitleWrapper = styled.div`
  font-size: 30px;
  text-transform: uppercase;
`;

function RoomTitle({ room }) {
  return <RoomTitleWrapper>{room.name}</RoomTitleWrapper>;
}

RoomTitle.propTypes = { room: roomType.isRequired };

export default RoomTitle;
