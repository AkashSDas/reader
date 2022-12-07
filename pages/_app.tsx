import "../styles/globals.css";

import { ThemeProvider } from "@emotion/react";
import { Anton, Urbanist } from "@next/font/google";
import localFont from "@next/font/local";

import { materialUiTheme } from "../lib/material-ui";

import type { AppProps } from "next/app";

const anton = Anton({ weight: "400", variable: "--font-anton" });
const urbanist = Urbanist({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
});
const gilroy = localFont({
  src: "../public/gilroy.otf",
  variable: "--font-gilroy",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${anton.className} ${urbanist.className} ${gilroy.className}`}
    >
      <ThemeProvider theme={materialUiTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}
