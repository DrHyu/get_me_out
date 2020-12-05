import { useRouter } from "next/router";
import { isEmpty, isNull } from "lodash";

import styled from "styled-components";

import Layout from "../../src/components/layout/Layout";
import { fetchGamerooms, fetchGameroom } from "../../src/server_side_api";

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

const RoomPage = ({ room }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
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
};

export default RoomPage;

// This also gets called at build time
export async function getStaticProps({ params }) {
  console.log("Building page for room:", params.id);
  const room = await fetchGameroom(Number(params.id));

  if (isNull(room) || isEmpty(room)) {
    return {
      notFound: true,
    };
  }

  // Pass room data to the page via props
  return { props: { room } };
}

export async function getStaticPaths() {
  const gameRooms = await fetchGamerooms();

  // Get the paths we want to pre-render based on rooms
  const paths = gameRooms.map((room) => ({
    params: { id: room.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
