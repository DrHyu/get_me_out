import React from "react";
import styled from "styled-components";

import Link from "next/link";

import { BsStar } from "react-icons/bs";
import { GiTerror } from "react-icons/gi";

import { roomType } from "../../types";

const RoomEntryContainer = styled.div`
  margin: 2px 0px;
  max-height: 110px;
  border: 1px solid gray;

  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  flex-basis: 40%;

  overflow: hidden;
  display: flex;

  img {
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const InfoWrapper = styled.div`
  flex-basis: 60%;

  padding: 10px 10px 2px 20px;
  font-size: 20px;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto 1fr;

  align-items: center;

  .room-title {
    grid-column: 1 / 10;

    font-size: 1em;

    a {
      text-decoration: none;
      font-weight: bold;
      text-transform: uppercase;
      color: black;
    }
    a:hover {
      color: darkgoldenrod;
    }
  }

  .room-ratings {
    grid-column: 10/-1;

    font-size: 24px;

    display: flex;
    align-items: flex-start;
    justify-content: space-around;

    .rating-group {
      display: flex;
      align-items: center;
      padding: 0px 0.125em;

      svg {
        width: 0.8em;
        height: auto;
        margin: 0px 0.25em 0px 0px;
      }

      .rating-star {
        color: goldenrod;
      }
      .rating-terror {
        color: rebeccapurple;
      }

      .score {
      }

      .no-score {
        padding: 0px 0.25em 0px 0px;
        white-space: nowrap;
      }
    }
  }

  .room-owner {
    grid-column: 2/7;
    align-self: start;
    font-size: 0.8em;
  }

  .room-location {
    grid-column: 7/10;
    align-self: start;
    font-size: 0.8em;
  }
`;

const RoomEntry = ({ room }) => (
  <RoomEntryContainer>
    <ImageContainer>
      <img src={room.img} alt="Some stuff" />
    </ImageContainer>
    <InfoWrapper>
      <div className="room-title">
        <Link href={`/room/${room.id}`} passHref>
          {room.name}
        </Link>
      </div>
      <div className="room-ratings">
        <div className="rating-group">
          <BsStar className="rating-star" />
          <span>{room.rating / 10}</span>
        </div>
        <div className="rating-group">
          <GiTerror className="rating-terror" />
          <span className="no-score">--</span>
        </div>
      </div>
      <div className="room-owner">{room.owner}</div>
      <div className="room-location">{room.location}</div>
    </InfoWrapper>
    {/* <SuggestionRow>
        <RattingsCol>
          <RoomStats room={room} />
        </RattingsCol>
        <DescriptionCol xs="auto">
          <h2>{room.name}</h2>
          <p>{room.description}</p>
        </DescriptionCol>
      </SuggestionRow> */}
  </RoomEntryContainer>
);

RoomEntry.propTypes = {
  room: roomType.isRequired,
};

export default RoomEntry;
