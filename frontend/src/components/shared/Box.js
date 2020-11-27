import React from "react";
import styled from "styled-components";

const BoxWrapper = styled.div`
  background-color: white;
  padding: 10px ${(props) => (props.no_padding ? "0px" : "15px")};

  margin-bottom: ${(props) => (props.no_gutters ? "0px" : "15px")};
  margin-top: ${(props) => (props.no_gutters ? "0px" : "15px")};

  overflow: hidden;
`;

const BoxTitle = styled.div`
  color: #ccc;
  font-size: 1em;
  font-weight: bold;

  border-bottom: 1px solid #ccc;

  padding-bottom: 5px;
  margin-bottom: 10px;

  span {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1em;
  }
`;

const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Box({
  title,
  no_gutters = undefined,
  no_padding = undefined,
  children,
}) {
  return (
    <BoxWrapper no_gutters={no_gutters} no_padding={no_padding}>
      {title && (
        <BoxTitle>
          <span>{title}</span>
        </BoxTitle>
      )}
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </BoxWrapper>
  );
}

export default Box;
