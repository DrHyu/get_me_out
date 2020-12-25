import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import styled from "styled-components";
import SearchBar from "../searchBar/SearchBar";
import DashboardCarousel from "./DashboardCarousel";
import RoomCabinet from "../roomCabinet/RoomCabinet";
import RoomEntry from "../shared/RoomEntry";

import Box from "../shared/Box";
import SplashImg from "../../../public/splash_maze.svg";

import { searchBarData } from "../../types";

import { fetchRoomSuggestions } from "../../store/dashboard/actions";

const LayoutStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 0;
`;

const SplashImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: -1000;

  /* svg {
    margin-left: auto;
    margin-right: auto;
    display: block;
  } */

  img {
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const SearchBarWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 0px;
  right: 0px;
`;

function Dashboard({ initialSearchBoxData, suggestedRooms }) {
  const roomSuggestions = useSelector(
    (state) => state.dashboard.roomSuggestions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomSuggestions());
  }, []);

  return (
    <LayoutStyled>
      <SearchBarWrapper>
        <SearchBar initialSearchBoxData={initialSearchBoxData} />
      </SearchBarWrapper>
      <SplashImageWrapper>
        {/* <SplashImg /> */}
        <img src="/splash_maze.svg" alt="" />
      </SplashImageWrapper>

      <Container>
        <Row>
          <Col>
            <DashboardCarousel />
          </Col>
        </Row>
        <Row>
          <Col>
            <Box title="Suggestions">
              <RoomCabinet rooms={suggestedRooms.slice(0, 4)} />
            </Box>
          </Col>
        </Row>
      </Container>
    </LayoutStyled>
  );
}

Dashboard.propTypes = { initialSearchBoxData: searchBarData.isRequired };
Dashboard.defaultProps = {};

export default Dashboard;
