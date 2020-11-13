import React from "react";
import styled from "styled-components";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Container, Row, Col, Image } from "react-bootstrap";

import RoomStats from "./RoomStats";

const SuggestionContainer = styled.div`
  border: 2px outset;
  margin: 2px;
  padding: 0px;
  /* background-color: lightgray; */
  border-radius: 0px 5px 5px 0px;
`;

const SuggestionRow = styled(Row)``;

const SuggestionCol = styled(Col)`
  height: 200px;
`;

const RattingsCol = styled(SuggestionCol)`
  padding: 4px;
  max-width: 200px;

  :after {
    /* Separation line */
    content: "";
    background: black;
    position: absolute;
    top: 10%;
    right: 0;
    height: 80%;
    width: 1px;
  }
`;

const DescriptionCol = styled(SuggestionCol)`
  padding: 4px 4px 4px 30px;
`;

const ImageCol = styled(SuggestionCol)`
  overflow: hidden;
  img {
    margin: 0px;
  }
`;

const RoomEntry = ({ room }) => {
  return (
    <SuggestionContainer>
      <SuggestionRow>
        <ImageCol xs="4">
          <img src={room.img} alt="Some stuff" />
        </ImageCol>
        <RattingsCol>
          <RoomStats room={room} />
        </RattingsCol>
        <DescriptionCol xs="auto">
          <h2>{room.name}</h2>
          <p>{room.description}</p>
        </DescriptionCol>
      </SuggestionRow>
    </SuggestionContainer>
  );
};

export default RoomEntry;
