import React from "react";
import styled from "styled-components";

import { Popover, OverlayTrigger } from "react-bootstrap";
import {
  Gi3DHammer,
  Gi3DMeeple,
  Gi3DStairs,
  GiAbstract049,
  GiAllSeeingEye,
  GiAttachedShield,
  GiBattery100,
  GiBirdClaw,
  GiCampfire,
  GiBoltBomb,
  GiBroadheadArrow,
  GiCambodia,
  GiChemicalBolt,
  GiChickenOven,
  GiCrackedDisc,
  GiDozen,
  GiEarthWorm,
  GiFemaleVampire,
  GiFoxHead,
  GiGlobe,
  GiHangingSpider,
  GiHouseKeys,
  GiJesterHat,
} from "react-icons/gi";

import Box from "../../shared/Box";

const BadgesGrid = styled.div`
  display: grid !important;

  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 5px;
`;

const Badge = styled.div`
  img {
    border-radius: 50%;
    width: 100%;
    height: auto;
  }

  svg {
    width: 100%;
    height: auto;
    color: rgb(196, 176, 122);
  }

  span {
    display: block;
    text-align: center;
    font-weight: bold;
  }
`;

const Medal = styled.div`
  .medal-shield-mask {
    overflow: hidden;

    border: 3px solid goldenrod;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  svg {
    width: 100%;
    height: auto;
    color: rgb(196, 176, 122);
  }

  span {
    display: block;
    text-align: center;
    font-weight: bold;
  }
`;

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
  "slice11",
  "slice12",
  "slice13",
  "slice14",
  "slice15",
  "slice16",
  "slice17",
  "slice18",
  "slice19",
  "slice20",
];

const medals = [
  Gi3DHammer,
  Gi3DMeeple,
  Gi3DStairs,
  GiAbstract049,
  GiAllSeeingEye,
  GiAttachedShield,
  GiBattery100,
  GiBirdClaw,
  GiCampfire,
  GiBoltBomb,
  GiBroadheadArrow,
  GiCambodia,
  GiChemicalBolt,
  GiChickenOven,
  GiCrackedDisc,
  GiDozen,
  GiEarthWorm,
  GiFemaleVampire,
  GiFoxHead,
  GiGlobe,
  GiHangingSpider,
  GiHouseKeys,
  GiJesterHat,
];

const generatePopover = (src) => (
  <Popover id="popover-basic">
    <Popover.Title as="h3">{`Awesome title !${src}`}</Popover.Title>
    <Popover.Content>
      Obtained after doing some
      <strong>amazing</strong>
      roomscapes. Its very engaging. right?
    </Popover.Content>
  </Popover>
);

function BadgesTab() {
  return (
    <>
      <Box title="Badges">
        <BadgesGrid>
          {badges.map((src, idx) => (
            <OverlayTrigger
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              trigger={["focus", "hover"]}
              placement="auto"
              overlay={generatePopover(src)}
            >
              <Badge>
                <img
                  src={`/badges/${src}.jpg`}
                  width={80}
                  height={80}
                  alt="User avatar"
                />
                <span>{src}</span>
              </Badge>
            </OverlayTrigger>
          ))}
        </BadgesGrid>
      </Box>
      <Box title="Medals">
        <BadgesGrid>
          {medals.map((MedalSVG, idx) => (
            <OverlayTrigger
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              trigger={["focus", "hover"]}
              placement="auto"
              overlay={generatePopover("Hi")}
            >
              <Medal>
                <div className="medal-shield-mask">
                  <MedalSVG />
                </div>
                <span>random_text</span>
              </Medal>
            </OverlayTrigger>
          ))}
        </BadgesGrid>
      </Box>
    </>
  );
}

export default BadgesTab;
