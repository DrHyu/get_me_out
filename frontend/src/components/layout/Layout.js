import Link from "next/link";
import Head from "next/head";
import NavBar from "../nav/NavBar";

import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const MainStyle = styled.div`
  background-color: #f5f6f7;
`;

export default function Layout({
  children,
  title = "This is the default title",
}) {
  return (
    <MainStyle>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <Container>{children}</Container>

      <footer>{"I`m here to stay"}</footer>
    </MainStyle>
  );
}
