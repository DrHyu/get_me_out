import React from "react";

import styled from "styled-components";

const yellow = "#ffdc01";
const orange = "#fdac01";
const red = "#f73b01";
const animationtime = "1s";

const TorchSyle = styled.div`
  position: relative;

  width: ${({ glowCircle }) => glowCircle}px;
  height: ${({ glowCircle }) => glowCircle}px;

  /* transform: translate(-50%, -50%); */
`;

const HiltContainer = styled.div`
  position: absolute;

  top: ${({ glowCircle }) => glowCircle * 0.75}px;
  left: ${({ glowCircle }) => glowCircle / 2}px;

  transform: translateX(-50%);
  z-index: 10000;
  svg {
    height: ${({ size }) => size * 0.5}px;
    width: auto;
  }
`;
const FlameContainer = styled.div`
  position: absolute;

  top: ${({ glowCircle }) => glowCircle * 0.5}px;
  left: ${({ glowCircle }) => glowCircle / 2}px;

  height: ${({ glowCircle }) => glowCircle * 0.25}px;
  width: ${({ glowCircle }) => glowCircle * 0.125}px;

  transform: translateX(-50%);
`;
const Flame = styled.svg`
  position: absolute;
  bottom: 0%;
  left: 50%;
  height: auto;

  fill: ${yellow};

  transform: translate(-50%, 0px);

  &:nth-child(4n + 1) {
    animation: flame_one ${animationtime} ease-in infinite;
  }
  &:nth-child(4n + 2) {
    animation: flame_two ${animationtime} ease-in infinite;
  }
  &:nth-child(4n + 3) {
    animation: flame_three ${animationtime} ease-in infinite;
  }
  &:nth-child(4n) {
    animation: flame_four ${animationtime} ease-in infinite;
  }

  &:nth-child(1) {
    animation-delay: calc((${animationtime} / 4) * 0);
  }
  &:nth-child(2) {
    animation-delay: calc((${animationtime} / 4) * 1);
  }
  &:nth-child(3) {
    animation-delay: calc((${animationtime} / 4) * 2);
  }

  @keyframes flame_one {
    0% {
      width: 0%;
    }
    25% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
    0% {
      fill: ${yellow};
      z-index: 1000000;
    }
    40% {
      fill: ${orange};
      z-index: 1000000;
    }
    100% {
      fill: ${red};
      z-index: -10;
    }
    0% {
      left: 50%;
      bottom: 0%;
    }
    25% {
      left: 50%;
      bottom: 2%;
    }
    70% {
      left: 10%;
      bottom: 30%;
    }
    100% {
      left: 60%;
      bottom: 100%;
    }
  }
  @keyframes flame_two {
    0% {
      width: 0%;
    }
    25% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
    0% {
      fill: ${yellow};
      z-index: 1000000;
    }
    40% {
      fill: ${orange};
      z-index: 1000000;
    }
    100% {
      fill: ${red};
      z-index: -10;
    }
    0% {
      left: 50%;
      bottom: 0%;
    }
    25% {
      left: 50%;
      bottom: 2%;
    }
    70% {
      left: 80%;
      bottom: 35%;
    }
    100% {
      left: 40%;
      bottom: 100%;
    }
  }
  @keyframes flame_three {
    0% {
      width: 0%;
    }
    25% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
    0% {
      fill: ${yellow};
      z-index: 1000000;
    }
    40% {
      fill: ${orange};
      z-index: 1000000;
    }
    100% {
      fill: ${red};
      z-index: -10;
    }
    0% {
      left: 50%;
      bottom: 0%;
    }
    25% {
      left: 50%;
      bottom: 2%;
    }
    70% {
      left: 10%;
      bottom: 30%;
    }
    100% {
      left: 80%;
      bottom: 100%;
    }
  }
  @keyframes flame_four {
    0% {
      width: 0%;
    }
    25% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
    0% {
      fill: ${yellow};
      z-index: 1000000;
    }
    40% {
      fill: ${orange};
      z-index: 1000000;
    }
    100% {
      fill: ${red};
      z-index: -10;
    }
    0% {
      left: 50%;
      bottom: 0%;
    }
    25% {
      left: 50%;
      bottom: 2%;
    }
    70% {
      left: 90%;
      bottom: 45%;
    }
    100% {
      left: 20%;
      bottom: 100%;
    }
  }
`;

const FlameGlow = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;

  /* transform: translate(-50%, 25%); */
  width: ${({ glowCircle }) => glowCircle}px;
  height: ${({ glowCircle }) => glowCircle}px;

  border-radius: 50%;
  background: rgb(255, 133, 0);
  background: radial-gradient(
    circle at center,
    rgba(255, 133, 0, 0.5) 2%,
    rgba(255, 217, 177, 0.5) 100%
  );

  z-index: 5000;
`;

function Torch({ size = 300, glowCircle = 400 }) {
  return (
    <TorchSyle>
      <FlameGlow glowCircle={glowCircle} />
      <FlameContainer size={size} glowCircle={glowCircle}>
        <Flame
          width="80"
          height="108"
          viewBox="0 0 80 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.28378e-06 40.2685C-1.04973e-07 36.2576 1.60634 32.4137 4.46024 29.5954L29.4598 4.90801C35.302 -0.861234 44.6969 -0.8613 50.5392 4.90786L75.5396 29.5954C78.3936 32.4137 80 36.2576 80 40.2686L80 67.7867C80 71.765 78.4196 75.5803 75.6065 78.3934L50.6062 103.393C44.7483 109.251 35.2508 109.251 29.393 103.393L4.39335 78.3934C1.58034 75.5803 1.21893e-05 71.7651 1.08118e-05 67.7868L1.28378e-06 40.2685Z" />
        </Flame>
        <Flame
          width="80"
          height="108"
          viewBox="0 0 80 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.28378e-06 40.2685C-1.04973e-07 36.2576 1.60634 32.4137 4.46024 29.5954L29.4598 4.90801C35.302 -0.861234 44.6969 -0.8613 50.5392 4.90786L75.5396 29.5954C78.3936 32.4137 80 36.2576 80 40.2686L80 67.7867C80 71.765 78.4196 75.5803 75.6065 78.3934L50.6062 103.393C44.7483 109.251 35.2508 109.251 29.393 103.393L4.39335 78.3934C1.58034 75.5803 1.21893e-05 71.7651 1.08118e-05 67.7868L1.28378e-06 40.2685Z" />
        </Flame>
        <Flame
          width="80"
          height="108"
          viewBox="0 0 80 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.28378e-06 40.2685C-1.04973e-07 36.2576 1.60634 32.4137 4.46024 29.5954L29.4598 4.90801C35.302 -0.861234 44.6969 -0.8613 50.5392 4.90786L75.5396 29.5954C78.3936 32.4137 80 36.2576 80 40.2686L80 67.7867C80 71.765 78.4196 75.5803 75.6065 78.3934L50.6062 103.393C44.7483 109.251 35.2508 109.251 29.393 103.393L4.39335 78.3934C1.58034 75.5803 1.21893e-05 71.7651 1.08118e-05 67.7868L1.28378e-06 40.2685Z" />
        </Flame>
        <Flame
          width="80"
          height="108"
          viewBox="0 0 80 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.28378e-06 40.2685C-1.04973e-07 36.2576 1.60634 32.4137 4.46024 29.5954L29.4598 4.90801C35.302 -0.861234 44.6969 -0.8613 50.5392 4.90786L75.5396 29.5954C78.3936 32.4137 80 36.2576 80 40.2686L80 67.7867C80 71.765 78.4196 75.5803 75.6065 78.3934L50.6062 103.393C44.7483 109.251 35.2508 109.251 29.393 103.393L4.39335 78.3934C1.58034 75.5803 1.21893e-05 71.7651 1.08118e-05 67.7868L1.28378e-06 40.2685Z" />
        </Flame>
      </FlameContainer>
      <HiltContainer size={size} glowCircle={glowCircle}>
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
      </HiltContainer>
    </TorchSyle>
  );
}

export default Torch;
