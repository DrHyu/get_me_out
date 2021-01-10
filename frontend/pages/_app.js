/* eslint-disable react/prop-types */
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { useApollo } from "../src/lib/apolloClient";

import theme from "../src/utils/theme";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
