import React from "react";

import styled from "styled-components";

const black = "#111217";
const brownl = "#70392f";
const brownd = "#612e25";
const yellow = "#ffdc01";
const orange = "#fdac01";
const red = "#f73b01";
const animationtime = "1.5s";

const TorchSyle = styled.div`
  position: relative;
  top: 0%;
  left: 0%;
  /*   
  height: 20vw;
  width: 20vw; */
  transform: translate(-50%, -50%);
  //background-color:$red;
  .flames {
    position: absolute;
    height: 20vw;
    width: 20vw;

    top: 0px;
    left: 0px;

    //background-color:$red;
    transform: translateX(-50%) rotate(45deg);
    .flame {
      position: absolute;
      right: 0%;
      bottom: 0%;
      width: 0%;
      height: 0%;
      background-color: ${yellow};
      border-radius: 1vw;
      &:nth-child(2n + 1) {
        animation: flameodd ${animationtime} ease-in infinite;
      }
      &:nth-child(2n) {
        animation: flameeven ${animationtime} ease-in infinite;
      }
      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: calc(${animationtime} / 4);
      }
      &:nth-child(3) {
        animation-delay: calc(${animationtime} / 4 * 2);
      }
      &:nth-child(4) {
        animation-delay: calc(${animationtime} / 4 * 3);
      }
    }
  }

  @keyframes flameodd {
    0%,
    100% {
      width: 0%;
      height: 0%;
    }
    25% {
      width: 100%;
      height: 100%;
    }
    0% {
      background-color: ${yellow};
      z-index: 1000000;
    }
    40% {
      background-color: ${orange};
      z-index: 1000000;
    }
    100% {
      background-color: ${red};
      z-index: -10;
    }
    0% {
      right: 0%;
      bottom: 0%;
    }
    25% {
      right: 1%;
      bottom: 2%;
    }
    100% {
      right: 150%;
      bottom: 170%;
    }
  }

  @keyframes flameeven {
    0%,
    100% {
      width: 0%;
      height: 0%;
    }
    25% {
      width: 100%;
      height: 100%;
    }
    0% {
      background-color: ${yellow};
      z-index: 1000000;
    }
    40% {
      background-color: ${orange};
      z-index: 1000000;
    }
    100% {
      background-color: ${red};
      z-index: -10;
    }
    0% {
      right: 0%;
      bottom: 0%;
    }
    25% {
      right: 2%;
      bottom: 1%;
    }
    100% {
      right: 170%;
      bottom: 150%;
    }
  }
`;

function Torch() {
  return (
    <TorchSyle>
      <div className="flames">
        <div className="flame" />
        <div className="flame" />
        <div className="flame" />
        <div className="flame" />
      </div>
      <svg
        width="149"
        height="406"
        viewBox="0 0 149 406"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.0758972 30.2399H27.0933L55.9732 350.239C42.2347 355.205 36.9377 365.746 36.9377 373.076C36.9377 382.987 73.6785 405.022 73.6785 405.022C73.6785 405.022 111.097 380.124 111.484 371.623C111.75 365.789 106.525 356.724 94.6491 351.519C97.7934 314.845 123.722 75.5451 128.633 30.2616H148.345L148.853 0.593109H0.60803L0.0758972 30.2399Z"
          fill="black"
        />
      </svg>
    </TorchSyle>
  );
}

export default Torch;
