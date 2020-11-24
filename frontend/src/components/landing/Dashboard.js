import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import styled from "styled-components";

import DashboardSearchBar from "./DashboardSearchBar";
import DashboardCarousel from "./DashboardCarousel";
import RoomEntry from "../shared/RoomEntry";

import { fetchRoomSuggestions } from "../../store/dashboard/actions";

function Dashboard() {
  const roomSuggestions = useSelector((state) => {
    return state.dashboard.roomSuggestions;
  });
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchRoomSuggestions());
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <DashboardSearchBar />
        </Col>
      </Row>
      <Row>
        <Col>
          <DashboardCarousel />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Suggested rooms:</h2>
          <div>
            {roomSuggestions.map((roomSuggestion, idx) => (
              <RoomEntry room={roomSuggestion} key={idx} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
