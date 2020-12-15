import { useState } from "react";
import styled from "styled-components";

import Image from "next/image";
import PT from "prop-types";
import ProgressRing from "../shared/ProgressRing";
import { roomType } from "../../types";

const Wrapper = styled.div`
  display: grid;

  grid-template-columns: minmax(100px, max-content) minmax(800px, max-content);
  grid-template-rows: max-content;
  /* grid-template-rows: repeat(10, 100px); */
`;

const IconCol = styled.div`
  grid-column: 1;
  grid-row: 1/-1;

  overflow-y: auto;
`;

const IconColWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: flex-start;
  position: relative;

  border-right: 2px solid black;
`;

const RoomIcon = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const RoomShowcase = styled.div`
  grid-column: 2/-1;
  grid-row: 1/-1;

  border-radius: 32px 32px 32px 32px;
  overflow: hidden;

  display: grid;

  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
`;

const RoomShowCaseBgImage = styled.div`
  grid-row: 1 / 9;
  grid-column: 1/ 9;

  width: 100%;
  height: 100%;

  position: relative;

  .full-degradation {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;

    z-index: 100;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.05) 70%,
        rgba(0, 0, 0, 0.1) 80%,
        #000
      ),
      linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.05) 70%,
        rgba(0, 0, 0, 0.1) 80%,
        #000
      );
  }

  img {
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

const RomShowCaseTitle = styled.div`
  grid-column: 9/ -1;
  grid-row: 1 / 9;

  z-index: 100;
  position: relative;
  background-color: black;

  span {
    position: absolute;

    left: -20%;
    color: white;
  }
`;

const RoomShowFooter = styled.div`
  grid-column: 1/ -1;
  grid-row: 9 / -1;
  background-color: black;
`;

const RoomCabinet = ({ rooms }) => {
  const [selectedRoom, setselectedRoom] = useState(0);

  return (
    <Wrapper>
      <IconCol>
        <IconColWrapper>
          {rooms.map((room, idx) => (
            <ProgressRing
              key={room.id}
              radius={48}
              stroke={4}
              timerDuration={10000}
              timerTickPercent={1}
              isActive={idx === selectedRoom}
              onClick={() => setselectedRoom(idx)}
              onTimerEnd={() =>
                setselectedRoom((selectedRoom + 1) % rooms.length)
              }
            >
              <RoomIcon>
                <img src={room.img} alt="" />
              </RoomIcon>
            </ProgressRing>
          ))}
        </IconColWrapper>
      </IconCol>
      <RoomShowcase imgUrl={rooms[selectedRoom].img}>
        <RoomShowCaseBgImage>
          <img src={rooms[selectedRoom].img} alt="" />
          {/* <div className="right-degradation" /> */}
          <div className="full-degradation" />
        </RoomShowCaseBgImage>
        <RomShowCaseTitle>
          <span>{rooms[selectedRoom].name}</span>
        </RomShowCaseTitle>
        <RoomShowFooter />
      </RoomShowcase>
    </Wrapper>
  );
};

RoomCabinet.propTypes = { rooms: PT.arrayOf(roomType).isRequired };

export default RoomCabinet;
