import Layout from "../src/components/layout/Layout";
import Dashboard from "../src/components/landing/Dashboard";

import { fetchSuggestionData } from "../src/server_side_api";

const Index = ({ initialSearchBoxData }) => (
  <Layout>
    <Dashboard initialSearchBoxData={initialSearchBoxData} />
  </Layout>
);

export async function getStaticProps(context) {
  const initialSearchBoxData = await fetchSuggestionData();

  if (!initialSearchBoxData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { initialSearchBoxData }, // will be passed to the page component as props
  };
}

export default Index;
