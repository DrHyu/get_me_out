import React, { useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";

import styled from "styled-components";
import Image from "next/image";
import SearchBar from "../searchBar/SearchBar";
import DashboardCarousel from "./DashboardCarousel";
import RoomCabinet from "../roomCabinet/RoomCabinet";

import { searchBarData } from "../../types";

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
  height: 65vh;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: -1000;

  margin-bottom: 5vh;
`;

const SearchBarWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 0px;
  right: 0px;
`;

function Dashboard({ initialSearchBoxData, suggestedRooms }) {
  return (
    <LayoutStyled>
      <SearchBarWrapper>
        <SearchBar initialSearchBoxData={initialSearchBoxData} />
      </SearchBarWrapper>
      <SplashImageWrapper>
        <Image
          src="/splash_img/splash_maze_1.svg"
          alt="Splash Maze"
          layout="fill"
          objectFit="cover"
          objectPosition="50% 50%"
        />
      </SplashImageWrapper>

      <Container>
        <Row>
          <Col>
            <DashboardCarousel />
          </Col>
        </Row>
        <Row>
          <Col>
            <RoomCabinet rooms={suggestedRooms.slice(0, 4)} />
          </Col>
        </Row>
      </Container>
    </LayoutStyled>
  );
}

Dashboard.propTypes = { initialSearchBoxData: searchBarData.isRequired };
Dashboard.defaultProps = {};

export default Dashboard;
