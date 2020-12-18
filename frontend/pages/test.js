import styled from "styled-components";
import PT from "prop-types";
import Layout from "../src/components/layout/Layout";
import RoomCabinet from "../src/components/roomCabinet/RoomCabinet";
import MagnifyingGlass from "../src/components/minigames/MagnifyingGlass";
import { roomType } from "../src/types";
import { fetchGamerooms } from "../src/server_side_api";

import Torch from "../src/components/uifx/Torch";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 1000px;
`;

const HiddenElement = styled.div`
  width: 30%;
  height: 30%;

  top: 0%;
  left: 0%;

  background-color: red;

  .surpise {
    font-size: 50px;
  }
`;

const Index = () => (
  <Layout>
    <Wrapper>
      <Torch />
    </Wrapper>
  </Layout>
);

Index.propTypes = { rooms: PT.arrayOf(roomType).isRequired };

export async function getStaticProps() {
  const rooms = await fetchGamerooms();

  if (!rooms) {
    return {
      notFound: true,
    };
  }

  return {
    props: { rooms }, // will be passed to the page component as props
  };
}

export default Index;
