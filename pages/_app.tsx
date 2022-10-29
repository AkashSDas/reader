import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Head from "next/head";
import { SnackbarProvider } from "notistack";

import Layout from "@components/layout";
import Navbar from "@components/navbar";
import { ThemeProvider } from "@emotion/react";
import { UserContext } from "@lib/context";
import { useUserData } from "@lib/hooks";
import { createTheme, CssBaseline, Palette, PaletteColor, TypeBackground, TypeText } from "@mui/material";

function MyApp({ Component, pageProps }) {
  var palette: Partial<Palette> = {
    primary: { main: "#2F2F3F" } as PaletteColor,
    background: { default: "#fff" } as TypeBackground,
    text: { primary: "#2F2F3F", secondary: "#6C6C6C" } as TypeText,
    divider: "#E8E8E8",
  };

  var theme = createTheme({
    palette,
    typography: {
      fontFamily: "Syne",
    },
  });

  var { user, username } = useUserData();

  return (
    <UserContext.Provider value={{ user, username }}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>📒 Reader</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Layout>
            <Navbar />
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
