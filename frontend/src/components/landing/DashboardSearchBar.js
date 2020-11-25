import React from "react";
import styled from "styled-components";

import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";

import { IconContext } from "react-icons";

import { FaSearchLocation, FaRegCalendarAlt } from "react-icons/fa";
import { BsBoundingBoxCircles } from "react-icons/bs";

import AutocompleteBar from "../autocomplete/Autocomplete";

const Icon = styled.div`
  background-color: white;
  border-right: 0 !important;
`;

const DashboardSearchBar = () => {
  return <AutocompleteBar />;
};

export default DashboardSearchBar;
