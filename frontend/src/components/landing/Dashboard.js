import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import DashboardSearchBar from "./DashboardSearchBar";
import DashboardCarousel from "./DashboardCarousel";
import RoomEntry from "../shared/RoomEntry";

import { searchBarData } from "../../types";

import { fetchRoomSuggestions } from "../../store/dashboard/actions";

function Dashboard({ initialSearchBoxData }) {
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
          <div>
            {roomSuggestions.map((roomSuggestion) => (
              <RoomEntry room={roomSuggestion} key={roomSuggestion.id} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

Dashboard.propTypes = { initialSearchBoxData: searchBarData.isRequired };
Dashboard.defaultProps = {};

export default Dashboard;
