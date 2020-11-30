import React, { useEffect } from "react";

import styled from "styled-components";

import { Row, Col } from "react-bootstrap";

import StarRatingComponent from "../../shared/StarRating";
import { GiBattleAxe, GiThumbUp, GiSandsOfTime } from "react-icons/gi";

const RecentActivity = styled.div`
  border: 1px solid #ccc;
  padding: 5px;

  flex-basis: 100%;

  .room-title {
    font-weight: bold;
    font-size: 1.2em;
  }

  .room-completion-time {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .room-user-rating {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img-container {
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
  }
`;

function RecentActivityItem({ room, idx }) {
  return (
    <RecentActivity>
      <Row>
        <Col xs={12} md={4}>
          <div className="img-container">
            <img
              src={`https://picsum.photos/seed/${idx * 24}/600/300`}
              alt=""
            />
          </div>
        </Col>
        <Col xs={12} md={8}>
          <Row>
            <Col xs={12} md={8}>
              <span className="room-title">{room.name}</span>
            </Col>
            <Col xs={6} md={4}>
              <div className="room-completion-time">
                <GiSandsOfTime /> {((idx + 1) * 34) % 60}:
                {((idx + 1) * 23) % 60}
              </div>
            </Col>
            <Col xs={6}>
              <div className="room-user-rating">
                <StarRatingComponent
                  name={`rating_${idx}`}
                  key={idx}
                  total={5}
                  renderStarIcon={() => <GiBattleAxe />}
                ></StarRatingComponent>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </RecentActivity>
  );
}

export default RecentActivityItem;
