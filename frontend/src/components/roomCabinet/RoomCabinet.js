import { useState } from "react";
import styled from "styled-components";

import Image from "next/image";
import PT from "prop-types";
import ProgressRing from "../shared/ProgressRing";
import { roomType } from "../../types";

const Wrapper = styled.div`
  padding: 32px;

  z-index: 0;
  position: relative;
  overflow: hidden;

  height: 500px;
  width: 1000px;

  border-radius: 16px;
  /* border: 1px solid ${({ theme }) => theme.primary};*/
  background-color: ${({ theme }) => theme.primaryDark};

  display: grid;
  grid-template-columns: max-content repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  &::after {
    content: "";

    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    transition: background-image 2s ease-in-out;
    background-image: url(${({ bgImgUrl }) => bgImgUrl});
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(3px);
    z-index: -1;
  }

  /* grid-template-rows: repeat(10, 100px); */
`;

/*  ------------------------------------  */
/*              ROOM HINT                 */
/*  ------------------------------------  */

const RoomHintsOverflowWrapper = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1/-1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;

  --separator-size: 1px;
  --separator-space: 16px;

  padding-right: calc(var(--separator-size) + var(--separator-space) * 2);

  &::after {
    content: "";
    position: absolute;
    top: 16px;
    bottom: 16px;
    right: var(--separator-space);
    border-right: var(--separator-size) solid ${({ theme }) => theme.primary};
  }
`;

const RoomHintsContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  position: relative;
`;

const RoomHint = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const RoomHintImgWrapper = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;
const RoomHintAbstract = styled.div`
  display: flex;
  flex-direction: column;

  .room-hint-room-name {
    color: white;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 16px;
    font-weight: bold;
  }
  .room-hint-catch-phrase {
    color: white;
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 12px;
    /* font-weight: bold; */
  }
`;

/*  ------------------------------------  */
/*              ROOM SHOWCASE             */
/*  ------------------------------------  */
const RoomShowCaseBgImage = styled.div`
  grid-row: 2 / 7;
  grid-column: 2/ -1;

  position: relative;

  /* margin: -32px; */

  /* .full-degradation {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;

    z-index: 100;
    background: linear-gradient(
        to right,
        ${({ theme }) => `${theme.surface}00`},
        ${({ theme }) => `${theme.surface}08`} 90%,
        ${({ theme }) => `${theme.surface}10`} 95%,
        ${({ theme }) => `${theme.surface}ff`}
      ),
      linear-gradient(
        to left,
        ${({ theme }) => `${theme.surface}00`},
        ${({ theme }) => `${theme.surface}08`} 90%,
        ${({ theme }) => `${theme.surface}10`} 95%,
        ${({ theme }) => `${theme.surface}ff`}
      ),
      linear-gradient(
        to top,
        ${({ theme }) => `${theme.surface}00`},
        ${({ theme }) => `${theme.surface}08`} 90%,
        ${({ theme }) => `${theme.surface}10`} 95%,
        ${({ theme }) => `${theme.surface}ff`}
      ),
      linear-gradient(
        to bottom,
        ${({ theme }) => `${theme.surface}00`},
        ${({ theme }) => `${theme.surface}08`} 90%,
        ${({ theme }) => `${theme.surface}10`} 95%,
        ${({ theme }) => `${theme.surface}ff`}
      );
  } */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* object-fit: fit; */
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
    <Wrapper bgImgUrl={rooms[selectedRoom].img}>
      <RoomHintsOverflowWrapper>
        <RoomHintsContainer>
          {rooms.map((room, idx) => (
            <RoomHint>
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
                <RoomHintImgWrapper>
                  <img src={room.img} alt="" />
                </RoomHintImgWrapper>
              </ProgressRing>
              {/* <RoomHintAbstract>
                <div className="room-hint-room-name">{room.name}</div>
                <div className="room-hint-catch-phrase">
                  Lorem ipsum dolor sit amet.
                </div>
              </RoomHintAbstract> */}
            </RoomHint>
          ))}
        </RoomHintsContainer>
      </RoomHintsOverflowWrapper>

      {/* <RoomShowCaseBgImage>
        <img src={rooms[selectedRoom].img} alt="" />

        <div className="full-degradation" />
      </RoomShowCaseBgImage> */}
      {/* <RomShowCaseTitle>
        <span>{rooms[selectedRoom].name}</span>
      </RomShowCaseTitle>
      <RoomShowFooter /> */}
    </Wrapper>
  );
};

RoomCabinet.propTypes = { rooms: PT.arrayOf(roomType).isRequired };

export default RoomCabinet;
