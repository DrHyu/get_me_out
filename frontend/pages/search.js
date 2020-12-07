import React from "react";

import { Row, Col } from "react-bootstrap";
import Layout from "../src/components/layout/Layout";

import FilterSearch from "../src/components/search/SearchFilters";
import ShowResults from "../src/components/search/SearchShowResults";

const SearchPage = () => (
  <Layout>
    <Row>
      <Col sm={3}>
        <FilterSearch />
      </Col>
      <Col sm={9}>
        <ShowResults />
      </Col>
    </Row>
  </Layout>
);

export default SearchPage;
