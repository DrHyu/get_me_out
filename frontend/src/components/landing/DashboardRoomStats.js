import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import styled from "styled-components";
// import { BsPersonPlusFill, BsPersonPlus } from "react-icons/bs";
import { IconContext } from "react-icons";
import { GiMining, GiDuration, GiBattleAxe, GiThumbUp } from "react-icons/gi";

const UL = styled.ul`
  list-style: none;
`;

const LI = styled.li`
  margin: 0;
  float: left;
`;

const DivNoWrap = styled.div`
  white-space: nowrap;
`;
const DashboardRoomStats = ({ room }) => {
  const threshold = Math.floor(room.rating / 20);
  const ratings = [];
  for (let i = 0; i < 5; i++) {
    ratings.push(i < threshold);
  }
  console.log(threshold);
  console.log(ratings);
  return (
    // <UL>
    //   <LI>{room.rating}</LI>
    //   <LI>{room.difficulty}</LI>
    //   <LI>{room.open ? "Open" : "Closed"}</LI>
    // </UL>
    <div>
      <Container>
        <Row>
          <Col>
            <DivNoWrap>
              {ratings.map((rating, idx) => {
                return rating ? (
                  <GiThumbUp key={idx} />
                ) : (
                  <IconContext.Provider value={{ color: "gray" }}>
                    <GiThumbUp />
                  </IconContext.Provider>
                );
              })}
            </DivNoWrap>
          </Col>
          <Col>{room.difficulty}</Col>
        </Row>
        <Row>
          <Col>{room.open ? "Open" : "Closed"}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardRoomStats;
