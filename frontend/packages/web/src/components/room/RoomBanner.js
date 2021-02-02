import React from "react";
import styled from "styled-components";

import { roomType } from "../../types";

const RoomBannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  img {
    object-fit: cover;
    object-position: 50% 50%;

    width: 100%;
    height: auto;
  }
`;

function RoomBanner({ room }) {
  return (
    <RoomBannerWrapper>
      <img src={room.img} alt={`${room.name} Banner`} />
    </RoomBannerWrapper>
  );
}

RoomBanner.propTypes = { room: roomType.isRequired };

export default RoomBanner;
