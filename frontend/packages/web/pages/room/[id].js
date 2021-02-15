// import { useRouter } from "next/router";
import { isEmpty, isNull } from "lodash";

import styled from "styled-components";

import { allRoomIdsQuery, fetchGameRoomByIdQuery } from "@getmeout/common";

import { initializeApollo } from "../../src/lib/apollo/apolloClient";

import Layout from "../../src/components/layout/Layout";

import { roomType } from "../../src/types";

import RoomTitle from "../../src/components/room/RoomTitle";
import RoomBanner from "../../src/components/room/RoomBanner";

const RoomPageLayout = styled.div`
  display: grid;

  grid-template-columns: repeat(12, 1fr);
  gap: 15px;
`;
const Base = styled.div`
  background-color: white;
  padding: 15px;
`;
const Title = styled(Base)`
  grid-area: 1 / 1 / 1 / -1;
`;
const Banner = styled(Base)`
  grid-area: 2 / 1 / 2 / -1;

  padding: 0px;
  height: 200px;
`;
const Attributes = styled(Base)`
  grid-area: 3 / 1 / 3 / 5;
`;
const Calendar = styled(Base)`
  grid-area: 3 / 5 / 3 / -1;
`;
const Reviews = styled(Base)`
  grid-area: 5 / 1 / 5 / -1;
`;

const RoomPage = ({ room }) => (
  // const router = useRouter();
  // const { id } = router.query;

  <Layout>
    <RoomPageLayout>
      <Title>
        <RoomTitle room={room} />
      </Title>
      <Banner>
        <RoomBanner room={room} />
      </Banner>
      <Attributes>Attributes</Attributes>
      <Calendar>Calendar/Description</Calendar>
      <Reviews>Reviews</Reviews>
    </RoomPageLayout>
  </Layout>
);
export default RoomPage;

RoomPage.propTypes = {
  room: roomType.isRequired,
};

// This also gets called at build time
export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: fetchGameRoomByIdQuery,
    variables: { roomId: params.id },
  });

  if (data?.gameRooms?.edges.length !== 1) {
    return {
      notFound: true,
    };
  }

  // Pass room data to the page via props
  return { props: { room: data.gameRooms.edges[0].node } };
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({ query: allRoomIdsQuery });

  // Get the paths we want to pre-render based on rooms
  const paths = data.gameRooms.edges.map((edge) => ({
    params: { id: edge.node.roomId },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
