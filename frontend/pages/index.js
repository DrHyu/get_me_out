import Layout from "../src/components/layout/Layout";
import Dashboard from "../src/components/landing/Dashboard";

import { fetchSuggestionData } from "../src/components/autocomplete/api";

const Index = ({ initialSearcBoxData }) => {
  return (
    <Layout>
      <Dashboard initialSearcBoxData={initialSearcBoxData} />
    </Layout>
  );
};

export async function getStaticProps(context) {
  const initialSearcBoxData = await fetchSuggestionData();

  if (!initialSearcBoxData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { initialSearcBoxData }, // will be passed to the page component as props
  };
}

export default Index;
