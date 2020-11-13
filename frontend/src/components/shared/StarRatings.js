import React from "react";

import styled from "styled-components";
import { IconContext, icons } from "react-icons";

const numberStars = 5;

const DivNoWrap = styled.div`
  white-space: nowrap;
  height: 100%;
`;

const StarRatings = ({ rating, outOF, icon }) => {
  const threshold = Math.floor(rating / (outOF / numberStars));

  const ratings = [];
  for (let i = 0; i < 5; i++) {
    ratings.push(i < threshold);
  }
  const Icon = icon;

  return (
    <DivNoWrap>
      {ratings.map((r, idx) => {
        return r ? (
          <IconContext.Provider
            value={{
              color: "black",
              style: { width: "auto", height: "100%" },
            }}
            key={idx}
          >
            <Icon />
          </IconContext.Provider>
        ) : (
          <IconContext.Provider
            value={{
              color: "gray",
              style: { width: "auto", height: "100%" },
            }}
            key={idx}
          >
            <Icon />
          </IconContext.Provider>
        );
      })}
    </DivNoWrap>
  );
};

export default StarRatings;
