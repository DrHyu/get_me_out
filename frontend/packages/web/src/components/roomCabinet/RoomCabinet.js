import { useState } from "react";
import styled from "styled-components";

import Image from "next/image";
import PT from "prop-types";
import shortid from "shortid";
import { BsStarFill } from "react-icons/bs";
import { GiTerror } from "react-icons/gi";
import ProgressRing from "../shared/ProgressRing";
import { roomType } from "../../types";

const Wrapper = styled.div`
  --animation-duration: 1s;

  padding: 32px;

  z-index: 0;
  position: relative;
  overflow: hidden;

  height: 500px;
  width: 1000px;

  border-radius: 16px;
  display: grid;
  grid-template-columns: max-content repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  grid-gap: 16px;

  .bg-div-static {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    position: absolute;
    background-image: url(${({ bgImgUrl }) => bgImgUrl});
    background-size: cover;
    background-repeat: no-repeat;

    transition: all calc(var(--animation-duration) / 1);

    z-index: -11;
  }
  .bg-div-animated {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;

    position: absolute;
    z-index: 2;

    background-image: url(${({ bgImgUrl }) => bgImgUrl});
    background-size: cover;
    background-repeat: no-repeat;

    animation-name: grow;
    animation-duration: var(--animation-duration);
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-direction: normal;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;

    @keyframes grow {
      0% {
        clip-path: circle(10% at 10% 50%);
        filter: blur(5px);
        opacity: 1;
      }
      100% {
        clip-path: circle(100% at 50% 50%);
        opacity: 0;
        filter: blur(0px);
      }
    }
  }
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

  z-index: 10;

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
const RoomSCBgImage = styled.div`
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

const RoomSCArea = styled.div`
  grid-row: 7/-1;
  grid-column: 2/10;

  background-color: ${({ theme }) => theme.primary};

  border-radius: 16px;

  padding: 16px;

  display: flex;
  flex-direction: column;
`;

const RoomSCTitle = styled.div`
  align-self: flex-start;

  color: ${({ theme }) => theme.onPrimary};
  font-size: 24px;
  font-weight: bold;
`;

const RoomSCBy = styled.div`
  align-self: flex-start;

  color: ${({ theme }) => theme.onPrimary};
  font-size: 16px;
`;

const RoomSCDescription = styled.div`
  align-self: center;

  color: ${({ theme }) => theme.onPrimary};
  font-size: 12px;
`;

const RoomSCNumbers = styled.div`
  grid-row: 7/-1;
  grid-column: 10/ -1;

  /* border: 4px solid ${({ theme }) => theme.primaryDark}; */
  /* background-color: ${({ theme }) => theme.primary}; */

  display: grid;

  grid-template-columns: 1fr 1fr;

  justify-content: center;
  align-items: center;
`;

const RoomNumbersGroup = styled.div`
  grid-row: span 1;
  grid-column: span 1;

  display: flex;
  justify-content: space-around;
  align-items: center;

  span {
    font-size: 32px;
    font-weight: 600;
  }
  svg {
    width: 32px;
    height: 32px;

    color: ${({ theme }) => theme.primaryDark};
  }
`;

const RoomCabinet = ({ rooms }) => {
  const [selectedRoom, setselectedRoom] = useState(0);
  return (
    <Wrapper bgImgUrl={rooms[selectedRoom].roomImg}>
      <RoomHintsOverflowWrapper>
        <RoomHintsContainer>
          {rooms.map((room, idx) => (
            <RoomHint key={room.roomId}>
              <ProgressRing
                key={room.roomId}
                radius={48}
                stroke={4}
                timerDuration={10000}
                timerTickPercent={1}
                isActive={idx === selectedRoom}
                onClick={() => setselectedRoom(idx)}
                onHover={() => setselectedRoom(idx)}
                onTimerEnd={() =>
                  setselectedRoom((selectedRoom + 1) % rooms.length)
                }
              >
                <RoomHintImgWrapper>
                  <img src={room.roomImg} alt="" />
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
      <RoomSCBgImage>
        {/* <img src={rooms[selectedRoom].img} alt="" />

        <div className="full-degradation" /> */}
        <div className="bg-div-animated" key={shortid.generate()} />
        <div className="bg-div-static" />
      </RoomSCBgImage>
      <RoomSCArea>
        <RoomSCTitle>{rooms[selectedRoom].roomName}</RoomSCTitle>
        <RoomSCBy>My Mom</RoomSCBy>
        <RoomSCDescription>
          {rooms[selectedRoom].roomDescription}
        </RoomSCDescription>
      </RoomSCArea>
      <RoomSCNumbers>
        <RoomNumbersGroup>
          <span>7/10</span>
          <BsStarFill />
        </RoomNumbersGroup>
        <RoomNumbersGroup>
          <span>7/10</span>
          <BsStarFill />
        </RoomNumbersGroup>
        <RoomNumbersGroup>
          <span>7/10</span>
          <BsStarFill />
        </RoomNumbersGroup>
        <RoomNumbersGroup>
          <span>7/10</span>
          <BsStarFill />
        </RoomNumbersGroup>
        <RoomNumbersGroup>
          <span>7/10</span>
          <BsStarFill />
        </RoomNumbersGroup>
        <RoomNumbersGroup>
          <span>7/10</span>
          <BsStarFill />
        </RoomNumbersGroup>
      </RoomSCNumbers>
    </Wrapper>
  );
};

RoomCabinet.propTypes = { rooms: PT.arrayOf(roomType).isRequired };

export default RoomCabinet;
