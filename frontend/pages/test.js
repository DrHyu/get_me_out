import styled from "styled-components";
import PT from "prop-types";
import Layout from "../src/components/layout/Layout";
import RoomCabinet from "../src/components/roomCabinet/RoomCabinet";

import { roomType } from "../src/types";
import { fetchGamerooms } from "../src/server_side_api";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Index = ({ rooms }) => (
  <Layout>
    <Wrapper>
      <RoomCabinet rooms={rooms.slice(0, 4)} />
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
