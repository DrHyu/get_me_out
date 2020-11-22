import React from "react";

import Image from "next/image";
import { range } from "lodash";
import styled from "styled-components";

import { Popover, Tooltip, OverlayTrigger } from "react-bootstrap";

const MedalContainer = styled.div`
  height: 100%;

  padding: 10px;

  display: flex;
  flex-wrap: wrap;

  justify-content: space-around;

  overflow: hidden;

  border: 1px solid gray;
  border-radius: 10px;
`;

const Medal = styled.div`
  padding: 5px 0px 5px 0px;

  img {
    border-radius: 50%;
    height: 100px !important;
    width: 100px !important;
  }
`;

function UserAchievements() {
  const badges = [
    "slice1",
    "slice2",
    "slice3",
    "slice4",
    "slice5",
    "slice6",
    "slice7",
    "slice8",
    "slice9",
    "slice10",
    // "slice11",
    // "slice12",
    // "slice13",
    // "slice14",
    // "slice15",
    // "slice16",
    // "slice17",
    // "slice18",
    // "slice19",
    // "slice20",
  ];

  const generatePopover = (src) => {
    return (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Awesome title ! {src}</Popover.Title>
        <Popover.Content>
          Obtained after doing some <strong>amazing</strong> roomscapes. It's
          very engaging. right?
        </Popover.Content>
      </Popover>
    );
  };

  return (
    <MedalContainer>
      {badges.map((src, idx) => (
        <OverlayTrigger
          trigger={["focus", "hover"]}
          placement="auto"
          overlay={generatePopover(src)}
        >
          <Medal>
            <img
              src={`/badges/${src}.jpg`}
              width={80}
              height={80}
              alt="User avatar"
            />
          </Medal>
        </OverlayTrigger>
      ))}
    </MedalContainer>
  );
}

export default UserAchievements;
