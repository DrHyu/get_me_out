import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Row, Col, Container } from "react-bootstrap";
import { roomCategoriesQuery, listOfCitiesQuery } from "@getmeout/common";
import Layout from "../src/components/layout/Layout";

import FilterSearch from "../src/components/search/SearchFilters";
import ShowResults from "../src/components/search/SearchShowResults";

import {
  fetchFilteredRoomScapes,
  FILTER_PARAMS,
} from "../src/lib/axios/queries";

import {
  initializeApollo,
  addApolloState,
} from "../src/lib/apollo/apolloClient";

const routerParamsToFilterState = (routerParams) => {
  const temp = {};
  if (routerParams?.city) {
    // TODO pending api fix
    // temp[FILTER_PARAMS.CITY] = [routerParams.city];
  }

  return temp;
};

const SearchPage = () => {
  const router = useRouter();

  const [filters, setfilters] = useState(
    routerParamsToFilterState(router.query)
  );
  const [searchResults, setSearchRestuls] = useState([]);
  const [isFetching, setisFetching] = useState(true);

  /** Run after inital render */
  useEffect(() => {
    setisFetching(true);
    fetchFilteredRoomScapes(filters).then(
      (results) => {
        setSearchRestuls(results);
        setisFetching(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {};
  }, []);

  /** Run after filters have changed */
  useEffect(() => {
    setisFetching(true);
    fetchFilteredRoomScapes(filters).then(
      (results) => {
        setSearchRestuls(results);
        setisFetching(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [filters]);

  const filterUpdatedCallback = (updates) => {
    setfilters({ ...filters, ...updates });
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={3}>
            <FilterSearch
              {...router.query}
              filterUpdatedCallback={filterUpdatedCallback}
            />
          </Col>
          <Col sm={9}>
            <ShowResults
              isFetching={isFetching}
              searchResults={searchResults}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: roomCategoriesQuery });
  await apolloClient.query({ query: listOfCitiesQuery });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default SearchPage;
