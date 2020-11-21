import React from "react";

import Layout from "../src/components/layout/Layout";
import { Row, Col } from "react-bootstrap";

import FilterSearch from "../src/components/search/SearchFilterAll";
import ShowResults from "../src/components/search/SearchShowResults";

const SearchPage = () => {
  return (
    <Layout>
      <Row>
        <Col sm={2}>
          <FilterSearch />
        </Col>
        <Col sm={10}>
          <ShowResults />
        </Col>
      </Row>
    </Layout>
  );
};

export default SearchPage;
