import PT from "prop-types";
import styled from "styled-components";
import { gql } from "@apollo/client";
import Layout from "../src/components/layout/Layout";
import Dashboard from "../src/components/landing/Dashboard";

import { searchBarData, roomType } from "../src/types";

import { initializeApollo, addApolloState } from "../src/lib/apolloClient";
import { fetchSuggestionData, fetchGamerooms } from "../src/server_side_api";
// import MagnifyingGlass from "../src/components/minigames/MagnifyingGlass";

const Wrapper = styled.div`
  width: 100%;
  height: 2000px;
`;

const Index = ({ initialSearchBoxData, suggestedRooms }) => (
  <Wrapper>
    <Layout>
      <Dashboard
        initialSearchBoxData={initialSearchBoxData}
        suggestedRooms={suggestedRooms}
      />
    </Layout>
  </Wrapper>
);

Index.propTypes = {
  initialSearchBoxData: searchBarData.isRequired,
  suggestedRooms: PT.arrayOf(roomType).isRequired,
};

// export async function getStaticProps() {
//   const initialSearchBoxData = await fetchSuggestionData();

//   if (!initialSearchBoxData) {
//     return {
//       notFound: true,
//     };
//   }

//   const suggestedRooms = await fetchGamerooms();

//   if (!suggestedRooms) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { initialSearchBoxData, suggestedRooms }, // will be passed to the page component as props
//   };
// }

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: gql`
      query getRooms {
        gameRooms {
          edges {
            node {
              gameRoomId
              name
              rating
              gameCenter {
                centerId
              }
              description
              img
            }
          }
        }
      }
    `,
    variables: [],
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default Index;
