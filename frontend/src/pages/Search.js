import React from "react";

import FilterSearch from "../components/search/SearchFilterAll";
import ShowResults from "../components/search/SearchShowResults";
import Layout from "../components/layout";

const SearchPage = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <FilterSearch />
          </div>
          <div className="col-10">
            <ShowResults />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
