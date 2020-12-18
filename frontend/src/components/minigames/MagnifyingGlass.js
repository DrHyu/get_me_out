import React, { useState, useRef } from "react";
import { IconContext } from "react-icons";
import styled from "styled-components";

import { BsSearch } from "react-icons/bs";
import { GiPrimitiveTorch } from "react-icons/gi";
import Torch from "../uifx/Torch";

const MagnifyingGlassWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;

  overflow: hidden;
`;

const DarkBg = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  z-index: 1;
`;

const HiddenContentWrapper = styled.div`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  position: absolute;

  overflow: hidden;
  z-index: 2;
`;

const SearchedItem = styled.div`
  position: absolute;
  background-color: red;

  top: 45%;
  left: 10%;

  width: 10px;
  height: 10px;

  border-radius: 50%;
  z-index: 3;
`;

const MagnifyingGlassSVG = styled.div`
  position: absolute;

  z-index: 4;
`;

function MagnifyingGlass({ glassSize = "40", children }) {
  const parent = useRef();
  const hidden = useRef();
  const magGlass = useRef();

  const HandleMouseMove = (e) => {
    // is it moving within the bounds ?
    if (
      e.clientX >= parent.current.getBoundingClientRect().left &&
      e.clientX < parent.current.getBoundingClientRect().right &&
      e.clientY >= parent.current.getBoundingClientRect().top &&
      e.clientY < parent.current.getBoundingClientRect().bottom
    ) {
      const x = e.clientX - parent.current.getBoundingClientRect().left;
      const y = e.clientY - parent.current.getBoundingClientRect().top;

      // Move the clip-path to show part of the hidden content
      hidden.current.style.setProperty(
        "clip-path",
        `circle(${glassSize}px at ${x}px ${y}px)`
      );
      // Move the magnifying glass svg so that it is surrounding the clpi-path
      magGlass.current.style.setProperty(
        "transform",
        `translate(${x - glassSize}px, ${y - glassSize}px)`
      );
    } else {
      const centerX =
        (parent.current.getBoundingClientRect().right -
          parent.current.getBoundingClientRect().left) /
        2;
      const centerY =
        (parent.current.getBoundingClientRect().bottom -
          parent.current.getBoundingClientRect().top) /
        2;

      // Move the clip-path to show part of the hidden content
      hidden.current.style.setProperty(
        "clip-path",
        `circle(${glassSize}px at ${centerX}px ${centerY}px)`
      );
      // Move the magnifying glass svg so that it is surrounding the clpi-path
      magGlass.current.style.setProperty(
        "transform",
        `translate(${centerX}px, ${centerY}px)`
      );
    }
  };
  return (
    <MagnifyingGlassWrapper onMouseMove={HandleMouseMove} ref={parent}>
      <DarkBg />
      <MagnifyingGlassSVG ref={magGlass} glassSize={glassSize}>
        <Torch glowCircle={glassSize * 2} />
      </MagnifyingGlassSVG>
      <HiddenContentWrapper ref={hidden}>{children}</HiddenContentWrapper>
    </MagnifyingGlassWrapper>
  );
}

export default MagnifyingGlass;
