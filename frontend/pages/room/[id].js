import { useRouter } from "next/router";

import { fetchGamerooms, fetchGameroom } from "../../src/server_side_api";

import { isEmpty, isNull } from "lodash";

const RoomPage = ({ room }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <p>
      RoomPage: {id} {room.name}
    </p>
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
