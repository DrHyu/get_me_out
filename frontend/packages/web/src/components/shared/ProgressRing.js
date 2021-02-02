import React, { useEffect, useState, useContext } from "react";

import PT from "prop-types";
import styled, { ThemeContext } from "styled-components";

const ProgressRingStyle = styled.div`
  flex-shrink: 0;

  position: relative;
  z-index: 0;

  width: ${({ radius }) => radius * 2}px;
  height: ${({ radius }) => radius * 2}px;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &::after {
    content: "";

    z-index: 2;
    position: absolute;
    top: ${({ stroke }) => stroke * 1.5}px;
    left: ${({ stroke }) => stroke * 1.5}px;

    width: ${({ radius, stroke }) => radius * 2 - stroke * 3}px;
    height: ${({ radius, stroke }) => radius * 2 - stroke * 3}px;
    border: ${({ stroke }) => stroke}px solid
      ${({ theme }) => theme.primaryLight};
    border-radius: 50% 50% 50% 50%;
  }

  svg {
    z-index: 3;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  circle {
    transition: stroke-dashoffset ${({ tickTime }) => (1 * tickTime) / 1000}s
      linear;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
`;

const ChildWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: ${({ stroke }) => stroke * 2}px;
  left: ${({ stroke }) => stroke * 2}px;

  width: ${({ radius, stroke }) => radius * 2 - stroke * 4}px;
  height: ${({ radius, stroke }) => radius * 2 - stroke * 4}px;

  border-radius: 50% 50% 50% 50%;
  overflow: hidden;
`;

function ProgressRing({
  isActive,
  radius,
  stroke,
  intialProgress,
  timerTickPercent,
  timerDuration,
  onTimerEnd,
  onClick,
  onHover,
  children,
}) {
  const [progress, setprogress] = useState(intialProgress);
  const [isPaused, setisPaused] = useState(false);
  const themeContext = useContext(ThemeContext);

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        if (progress + timerTickPercent > 100) {
          onTimerEnd();
          setprogress((progress + timerTickPercent) % 100);
        } else {
          setprogress(progress + timerTickPercent);
        }
      }, timerDuration / (100 / timerTickPercent));
    } else if (!isActive && progress !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, progress, isPaused]);

  useEffect(
    () =>
      /* Dependency on isActive, will set the progress to 0 after it has been deactivated */
      () => {
        if (isActive) setprogress(0);
      },
    [isActive]
  );

  return (
    <ProgressRingStyle
      radius={radius}
      stroke={stroke}
      tickTime={timerDuration / (100 / timerTickPercent)}
      onClick={onClick}
      onMouseEnter={() => {
        setisPaused(true);
        onHover();
      }}
      onMouseLeave={() => setisPaused(false)}
    >
      {isActive && (
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke={themeContext.primary}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
      )}

      <ChildWrapper radius={radius} stroke={stroke}>
        {children}
      </ChildWrapper>
    </ProgressRingStyle>
  );
}

ProgressRing.propTypes = {
  isActive: PT.bool.isRequired,
  radius: PT.number,
  stroke: PT.number,
  intialProgress: PT.number,
  timerDuration: PT.number.isRequired,
  timerTickPercent: PT.number,
  onTimerEnd: PT.func,
  children: PT.node.isRequired,
  onClick: PT.func,
  onHover: PT.func,
};

ProgressRing.defaultProps = {
  radius: 80,
  stroke: 5,
  intialProgress: 0,
  timerTickPercent: 1,
  onTimerEnd: undefined,
  onClick: undefined,
  onHover: undefined,
};

export default ProgressRing;
