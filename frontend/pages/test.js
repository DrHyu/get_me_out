import React from "react";

import Autocomplete from "../src/components/autocomplete/Autocomplete";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper2 = styled.div`
  width: 600px;
`;

const test = () => {
  return (
    <Wrapper>
      <Wrapper2>
        <Autocomplete />
      </Wrapper2>
    </Wrapper>
  );
};

export default test;
