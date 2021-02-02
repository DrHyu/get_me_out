import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import styled from "styled-components/native";

import { BsSearch } from "react-icons/bs";

const Container = styled.View`
  width: 100%;
  height: 48px;

  border: 1px solid white;
  border-radius: 24px;

  display: flex;
  flex-direction: row;
`;

const InputField = styled.TextInput`
  flex: 1 1 0;

  border: 1px solid black;
  border-radius: 24px;

  background-color: white;
  color: gray;

  text-align: center;
`;

const SearchButton = styled.TouchableOpacity`
  width: 48px;

  border-radius: 24px;
  border: none;
  background-color: #ff385c;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoupeIcon = styled.Image`
  width: 50%;
  height: 50%;
`;

export default function SearchBar() {
  return (
    <Container>
      <InputField value={"Room Escape or Location"} />
      <SearchButton>
        <LoupeIcon source={require("../../assets/loupe.png")}></LoupeIcon>
      </SearchButton>
    </Container>
  );
}
