import React from "react";
import styled from "styled-components";

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

export default RoomBanner;
