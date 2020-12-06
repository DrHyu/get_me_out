import Head from "next/head";
import { Container } from "react-bootstrap";
import styled from "styled-components";

import PropTypes from "prop-types";
import NavBar from "../nav/NavBar";

const MainStyle = styled.div`
  background-color: #f5f6f7;
`;

export default function Layout({ children, title }) {
  return (
    <MainStyle>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <Container>{children}</Container>

      <footer>I`m here to stay</footer>
    </MainStyle>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: "",
};
