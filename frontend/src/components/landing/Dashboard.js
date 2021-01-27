import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { Container, Row, Col } from "react-bootstrap";

import styled from "styled-components";
import Image from "next/image";
import SearchBar from "../searchBar/SearchBar";
import DashboardCarousel from "./DashboardCarousel";
import RoomCabinet from "../roomCabinet/RoomCabinet";

import {
  allRoomLocationsQuery,
  allRoomNamesQuery,
  suggestedRoomsQuery,
} from "../../lib/apollo/queries";

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

function Dashboard() {
  const { data: suggestedRooms, loading: suggestedRoomsLoading } = useQuery(
    suggestedRoomsQuery
  );
  const { data: roomLocations } = useQuery(allRoomLocationsQuery);
  const { data: roomNames } = useQuery(allRoomNamesQuery);

  return (
    <LayoutStyled>
      <SearchBarWrapper>
        <SearchBar
          categories={[
            {
              name: "Room Escapes",
              data: roomNames.gameRooms.edges.map((edge) => ({
                name: edge.node.roomName,
                id: edge.node.roomId,
              })),
            },
            {
              name: "Locations",
              data: roomLocations.cities.edges.map((edge) => ({
                name: edge.node.cityName,
                id: edge.node.cityId,
              })),
            },
          ]}
        />
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
            {!suggestedRoomsLoading && (
              <RoomCabinet
                rooms={suggestedRooms.gameRooms.edges.map((edge) => edge.node)}
              />
            )}
          </Col>
        </Row>
      </Container>
    </LayoutStyled>
  );
}

Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default Dashboard;
