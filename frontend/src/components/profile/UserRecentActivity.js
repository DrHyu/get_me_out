import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

import RoomEntry from "../shared/RoomEntry";
import { fetchRoomSuggestions } from "../../store/dashboard/actions";

import { Row, Col } from "react-bootstrap";

// import StarRatingComponent from "react-star-rating-component";
import StarRatingComponent from "../shared/StarRating";
import { GiBattleAxe, GiThumbUp, GiSandsOfTime } from "react-icons/gi";

const Top = styled.div`
  color: #ccc;
  font-size: 1em;
  font-weight: bold;

  border-bottom: 1px solid #ccc;

  padding: 10px 0px;
`;

const RecentActivityContainer = styled.div`
  /* border: 1px solid grey; */
  /* border-radius: 5px; */

  padding: 10px 0px;
  display: flex;
  flex-wrap: wrap;
`;

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

function UserRecentActivity() {
  const roomSuggestions = useSelector((state) => {
    return state.dashboard.roomSuggestions;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomSuggestions());
  }, []);

  return (
    <div>
      <div></div>
      <Top>Recent Activity</Top>
      <RecentActivityContainer>
        {roomSuggestions.map((roomSuggestion, idx) => (
          <RecentActivity key={idx}>
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
                    <span className="room-title">{roomSuggestion.name}</span>
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
        ))}
      </RecentActivityContainer>
    </div>
  );
}

export default UserRecentActivity;
