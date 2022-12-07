import "../styles/globals.css";

import { ThemeProvider } from "@emotion/react";

import { materialUiTheme } from "../lib/material-ui";

import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={materialUiTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
