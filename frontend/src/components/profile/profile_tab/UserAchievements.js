import React from "react";

import Image from "next/image";
import { range } from "lodash";
import styled from "styled-components";

import { Popover, Tooltip, OverlayTrigger, ProgressBar } from "react-bootstrap";

import Box from "../../shared/Box";

const LevelTrackingContainer = styled.div`
  padding: 30px;

  align-self: stretch;

  .level-badge-container-layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .level-badge {
    display: block;
    text-align: center;
    span {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .level-progrssion-bar-container {
    margin-top: 20px;
  }

  .level-progression-bar-label {
    font-size: 0.8rem;
    text-align: center;

    .-bold {
      font-weight: bold;
    }
  }
`;

const NumberCircle = styled.div`
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  border: 2px solid #666;
`;

const MedalContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Medal = styled.div`
  padding: 5px 0px 5px 0px;

  width: 100px !important;

  img {
    border-radius: 50%;
    width: 100%;
    height: auto;
  }

  span {
    display: block;
    text-align: center;
    font-weight: bold;
  }
`;

/* Used as a spacer in the end of the flex container so that
  the justify-content: space-arround does not 'space-arround' 
  the last elements in the container, but rather are kept to 
  the side.    
*/
const SpacerMedal = styled(Medal)`
  visibility: hidden;
  height: 0px !important;
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
    // "slice10",
    // "slice11",
    // "slice12",
    // "slice13",
    // "slice14",
    // "slice15",
    // "slice16",
    // "slice17",
    // "slice18",
    // "slice19",
    "slice20",
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
    <>
      <Box title="Level" no_gutters>
        <LevelTrackingContainer>
          <div className="level-badge-container-layout">
            <div className="level-badge">
              <NumberCircle>29</NumberCircle>
              <span>Level 29</span>
            </div>
            <div className="level-badge">
              <NumberCircle>30</NumberCircle>
              <span>Level 30</span>
            </div>
          </div>
          <div className="level-progrssion-bar-container">
            <ProgressBar
              striped
              animated
              variant="success"
              min={0}
              max={1000}
              now={200}
            />
            <div className="level-progression-bar-label">
              <span className="-bold">200/1000</span> for next level !
            </div>
          </div>
        </LevelTrackingContainer>
      </Box>
      <Box title="Badges" no_gutters>
        <MedalContainer>
          {badges.map((src, idx) => (
            <OverlayTrigger
              key={idx}
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
                <span>{src}</span>
              </Medal>
            </OverlayTrigger>
          ))}
          <SpacerMedal />
          <SpacerMedal />
          <SpacerMedal />
          <SpacerMedal />
        </MedalContainer>
      </Box>
    </>
  );
}

export default UserAchievements;
