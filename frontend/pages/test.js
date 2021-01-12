import styled from "styled-components";
import dynamic from "next/dynamic";
import Layout from "../src/components/layout/Layout";

import cities from "../src/data/cities.json";

const Wrapper = styled.div`
  background-color: gray;
  width: 100%;
  height: 1000px;
`;

const Index = () => {
  const SearchMap = dynamic(
    () => import("../src/components/searchMap/SearchMapLeaflet"),
    {
      ssr: false,
    }
  );

  return (
    <Layout>
      <Wrapper>
        <SearchMap markers={cities} />
      </Wrapper>
    </Layout>
  );
};

// Index.propTypes = { rooms: PT.arrayOf(roomType).isRequired };

// export async function getStaticProps() {
//   const rooms = await fetchGamerooms();

//   if (!rooms) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { rooms }, // will be passed to the page component as props
//   };
// }

export default Index;
