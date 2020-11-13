import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import styled from "styled-components";
import {
  GiMining,
  GiDuration,
  GiBattleAxe,
  GiThumbUp,
  GiGhost,
} from "react-icons/gi";

import StarRatings from "./StarRatings";

const RoomStatRow = styled(Row)`
  padding-top: 10%;
  height: 15%;
`;

const RoomStatCol = styled(Col)``;

const RoomStats = ({ room }) => {
  const difficulty =
    room.difficulty === "hard" ? 5 : room.difficulty === "medium" ? 3 : 1;
  return (
    <div>
      <RoomStatRow>
        <RoomStatCol xs={12}>
          <StarRatings icon={GiThumbUp} rating={room.rating} outOF={100} />
        </RoomStatCol>
      </RoomStatRow>
      <RoomStatRow>
        <RoomStatCol xs={12}>
          <StarRatings icon={GiBattleAxe} rating={difficulty} outOF={5} />
        </RoomStatCol>
      </RoomStatRow>
      <RoomStatRow>
        <RoomStatCol xs={12}>
          <StarRatings icon={GiGhost} rating={difficulty} outOF={5} />
        </RoomStatCol>
      </RoomStatRow>
      <RoomStatRow>
        <RoomStatCol xs={12}>
          <RoomStatCol xs={12}>{room.open ? "Open" : "Closed"}</RoomStatCol>
        </RoomStatCol>
      </RoomStatRow>
    </div>
  );
};

export default RoomStats;
