import React from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";

function DashboardCarousel() {
  const carouselInfo = useSelector((state) => state.dashboard.carouselInfo);

  return (
    <div>
      <Carousel>
        {carouselInfo.map((carousel) => (
          <Carousel.Item key={`${carousel.img}`}>
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
