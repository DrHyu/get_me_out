/* eslint-disable react/prop-types */

import { ThemeProvider } from "styled-components";

import theme from "../src/utils/theme";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
