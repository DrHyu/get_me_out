import styled from "styled-components";
import Head from "next/head";
import { useState } from "react";
import Layout from "../src/components/layout/Layout";

import MapSearch from "../src/components/searchMap/MapSearch";
import cities from "../src/data/cities.json";

const Wrapper = styled.div`
  background-color: gray;
  width: 1000px;
  height: 500px;
`;

const Index = () => (
  <Layout>
    <Head key="map-style">
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
        rel="stylesheet"
      />
    </Head>
    <Wrapper>
      <MapSearch roomScapeList={cities} />
    </Wrapper>
  </Layout>
);

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
