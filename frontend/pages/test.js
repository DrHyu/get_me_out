import styled from "styled-components";
import dynamic from "next/dynamic";
import { useState } from "react";
import Layout from "../src/components/layout/Layout";

import cities from "../src/data/cities.json";

const Wrapper = styled.div`
  background-color: gray;
  width: 1000px;
  height: 500px;
`;

const Index = () => {
  const SearchMap = dynamic(
    () => import("../src/components/searchMap/SearchMapLeaflet"),
    {
      ssr: false,
    }
  );

  const [selected, setselected] = useState(null);

  return (
    <Layout>
      <Wrapper>
        <SearchMap
          markers={cities}
          // onMarkerSelected={(m) => console.log(m.city)}
          initSelectedMarker={selected}
        />
      </Wrapper>
      <button
        type="button"
        onClick={() => {
          console.log(cities[0]);
          setselected(cities[0]);
        }}
      >
        0
      </button>
      <button
        type="button"
        onClick={() => {
          console.log(cities[1]);
          setselected(cities[1]);
        }}
      >
        1
      </button>
      <button
        type="button"
        onClick={() => {
          console.log(cities[2]);
          setselected(cities[2]);
        }}
      >
        2
      </button>
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
