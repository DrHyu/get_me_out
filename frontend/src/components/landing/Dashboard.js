import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import DashboardSearchBar from "./DashboardSearchBar";
import DashboardCarousel from "./DashboardCarousel";
import RoomCabinet from "../roomCabinet/RoomCabinet";
import RoomEntry from "../shared/RoomEntry";

import { searchBarData } from "../../types";

import { fetchRoomSuggestions } from "../../store/dashboard/actions";

function Dashboard({ initialSearchBoxData, suggestedRooms }) {
  const roomSuggestions = useSelector(
    (state) => state.dashboard.roomSuggestions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomSuggestions());
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <DashboardSearchBar initialSearchBoxData={initialSearchBoxData} />
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
          <RoomCabinet rooms={suggestedRooms.slice(0, 4)} />
        </Col>
      </Row>
    </Container>
  );
}

Dashboard.propTypes = { initialSearchBoxData: searchBarData.isRequired };
Dashboard.defaultProps = {};

export default Dashboard;
