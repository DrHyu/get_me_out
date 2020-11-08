import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import RoomSuggestion from "./DashboardRoomSuggestion";

import { fetchRoomSuggestions } from "../../store/actions/dashboardActions";

function Dashboard() {
  const carouselInfo = useSelector((state) => state.dashboard.carouselInfo);
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
          <h1>Helo !</h1>
          <Carousel>
            {carouselInfo.map((carousel, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={carousel.img}
                  alt="slide"
                  width="100%"
                  height="auto"
                />
                {carousel.text && (
                  <Carousel.Caption>
                    <h3>{carousel.text}</h3>
                  </Carousel.Caption>
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Suggested rooms:</h2>
          <div>
            {roomSuggestions.map((roomSuggestion, idx) => (
              <RoomSuggestion room={roomSuggestion} key={idx} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
