import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import styled from "styled-components";

import { fetchRoomSuggestions } from "../../store/actions/dashboardActions";

function DashboardCarousel() {
  const carouselInfo = useSelector((state) => state.dashboard.carouselInfo);

  return (
    <div>
      <h1>Helo !</h1>
      <Carousel>
        {carouselInfo.map((carousel, idx) => (
          <Carousel.Item key={idx}>
            <img src={carousel.img} alt="slide" width="100%" height="auto" />
            {carousel.text && (
              <Carousel.Caption>
                <h3>{carousel.text}</h3>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default DashboardCarousel;
