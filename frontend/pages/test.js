import React from "react";

import styled from "styled-components";
import Autocomplete from "../src/components/autocomplete/Autocomplete";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper2 = styled.div`
  width: 600px;
`;

const test = () => (
  <Wrapper>
    <Wrapper2>
      <Autocomplete />
    </Wrapper2>
  </Wrapper>
);

export default test;
