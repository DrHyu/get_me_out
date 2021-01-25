import PT from "prop-types";
import styled from "styled-components";

import Layout from "../src/components/layout/Layout";
import Dashboard from "../src/components/landing/Dashboard";

import {
  initializeApollo,
  addApolloState,
} from "../src/lib/apollo/apolloClient";

import {
  allRoomLocationsQuery,
  allRoomNamesQuery,
  suggestedRoomsQuery,
} from "../src/lib/apollo/queries";

const Wrapper = styled.div`
  width: 100%;
  height: 2000px;
`;

const Index = () => (
  <Wrapper>
    <Layout>
      <Dashboard />
    </Layout>
  </Wrapper>
);

Index.propTypes = {};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: allRoomLocationsQuery });
  await apolloClient.query({ query: allRoomNamesQuery });
  await apolloClient.query({ query: suggestedRoomsQuery });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default Index;
