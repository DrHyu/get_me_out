import React from "react";
import styled from "styled-components";

import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";

import { IconContext } from "react-icons";

import { FaSearchLocation, FaRegCalendarAlt } from "react-icons/fa";
import { BsBoundingBoxCircles } from "react-icons/bs";

const Icon = styled.div`
  background-color: white;
  border-right: 0 !important;
`;

const DashboardSearchBar = () => {
  return (
    <div className="d-flex justify-content-center">
      <Form inline>
        <InputGroup>
          <InputGroup.Prepend>
            <Icon as={InputGroup.Text}>
              <FaSearchLocation />
            </Icon>
          </InputGroup.Prepend>
          <Form.Control placeholder="Location"></Form.Control>
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <Icon as={InputGroup.Text}>
              <BsBoundingBoxCircles />
            </Icon>
          </InputGroup.Prepend>
          <Form.Control placeholder="Roomscape"></Form.Control>
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <Icon as={InputGroup.Text}>
              <FaRegCalendarAlt />
            </Icon>
          </InputGroup.Prepend>
          <Form.Control placeholder="Date"></Form.Control>
        </InputGroup>
        <Button>Go !</Button>
      </Form>
    </div>
  );
};

export default DashboardSearchBar;
