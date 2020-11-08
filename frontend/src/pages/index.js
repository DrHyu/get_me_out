import React from "react";
// import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Dashboard from "../components/landing/Dashboard";
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Dashboard />
  </Layout>
);

export default IndexPage;
