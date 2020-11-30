import React from "react";
import styled from "styled-components";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Container, Row, Col, Image } from "react-bootstrap";

import { BsStar } from "react-icons/bs";
import { GiTerror } from "react-icons/gi";

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

  font-size: 24px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .room-title {
    font-size: 1em;
    padding: 0px 1em;
    a {
      text-decoration: none;
      font-weight: bold;
      text-transform: capitalize;
      color: black;
    }
    a:hover {
      color: gray;
    }
  }

  .room-ratings {
    display: flex;
    flex-direction: row;
    align-items: start;
  }

  .rating-group {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const RoomEntry = ({ room }) => {
  return (
    <RoomEntryContainer>
      <ImageContainer>
        <img src={room.img} alt="Some stuff" />
      </ImageContainer>
      <InfoWrapper>
        <div className="room-title">
          <a href="">Cool and engaging name !</a>
        </div>
        <div className="room-ratings">
          <div className="rating-group">
            <span>{room.rating / 10}</span>
            <BsStar className="rating-star" />
          </div>
          <div className="rating-group">
            <span>-</span>
            <GiTerror className="rating-star" />
          </div>
        </div>
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
};

export default RoomEntry;
