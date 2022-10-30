import Link from "next/link";
import { useContext } from "react";

import { UserContext } from "@lib/context";
import { containedBtnStyle, textBtnStyle } from "@lib/material-ui";
import { AppBar, Avatar, Box, Button, useTheme } from "@mui/material";
import { Stack } from "@mui/system";

function Logo() {
  return (
    <svg
      width="130"
      height="28"
      viewBox="0 0 130 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="13.8561"
        height="13.8561"
        transform="matrix(0.866044 0.499967 -0.866044 0.499967 12 0.148773)"
        fill="#565673"
      />
      <rect
        width="13.8561"
        height="13.8561"
        transform="matrix(3.76274e-05 1 -0.866007 -0.500033 11.9999 13.9951)"
        fill="#2F2F3F"
      />
      <rect
        width="13.8561"
        height="13.8561"
        transform="matrix(0.866026 -0.5 -7.53472e-05 1 11.9999 13.9951)"
        fill="#7C7CA6"
      />
      <path
        d="M33.54 21V8.06H42.32C43.32 8.06 44.1867 8.2 44.92 8.48C45.6667 8.74667 46.2467 9.17333 46.66 9.76C47.0733 10.3333 47.28 11.0733 47.28 11.98C47.28 12.5933 47.1733 13.1133 46.96 13.54C46.7467 13.9667 46.4467 14.3133 46.06 14.58C45.6867 14.8467 45.2533 15.0533 44.76 15.2C44.2667 15.3333 43.74 15.42 43.18 15.46L42.9 15.3C43.8333 15.3133 44.6 15.3933 45.2 15.54C45.8 15.6733 46.2467 15.9267 46.54 16.3C46.8467 16.66 47 17.2 47 17.92V21H44.34V18.1C44.34 17.6067 44.2533 17.2267 44.08 16.96C43.9067 16.68 43.5933 16.4867 43.14 16.38C42.7 16.2733 42.06 16.22 41.22 16.22H36.2V21H33.54ZM36.2 14.14H42.32C43.0667 14.14 43.6333 13.96 44.02 13.6C44.42 13.24 44.62 12.7533 44.62 12.14C44.62 11.5533 44.42 11.1067 44.02 10.8C43.6333 10.4933 43.0667 10.34 42.32 10.34H36.2V14.14ZM52.7234 15.6V18.78H62.7034V21H50.0634V8.06H62.6834V10.28H52.7234V13.5H60.8834V15.6H52.7234ZM67.4545 18.18V15.96H76.0145V18.18H67.4545ZM64.2345 21L70.3145 8.06H73.1945L79.3345 21H76.4345L71.1145 9.34H72.3945L67.1145 21H64.2345ZM88.6158 8.06C90.0691 8.06 91.2824 8.23333 92.2558 8.58C93.2291 8.92667 94.0024 9.4 94.5758 10C95.1624 10.5867 95.5758 11.2667 95.8158 12.04C96.0691 12.8133 96.1958 13.6267 96.1958 14.48C96.1958 15.3333 96.0558 16.1533 95.7758 16.94C95.5091 17.7267 95.0758 18.4267 94.4758 19.04C93.8891 19.64 93.1091 20.12 92.1358 20.48C91.1758 20.8267 90.0024 21 88.6158 21H81.2158V8.06H88.6158ZM83.8758 18.72H88.5558C89.5158 18.72 90.3091 18.6067 90.9358 18.38C91.5758 18.14 92.0824 17.82 92.4558 17.42C92.8291 17.02 93.0958 16.5667 93.2558 16.06C93.4158 15.5533 93.4958 15.0267 93.4958 14.48C93.4958 13.9333 93.4158 13.4133 93.2558 12.92C93.0958 12.4267 92.8291 11.9867 92.4558 11.6C92.0824 11.2133 91.5758 10.9067 90.9358 10.68C90.3091 10.4533 89.5158 10.34 88.5558 10.34H83.8758V18.72ZM101.454 15.6V18.78H111.434V21H98.7939V8.06H111.414V10.28H101.454V13.5H109.614V15.6H101.454ZM114.165 21V8.06H122.945C123.945 8.06 124.812 8.2 125.545 8.48C126.292 8.74667 126.872 9.17333 127.285 9.76C127.698 10.3333 127.905 11.0733 127.905 11.98C127.905 12.5933 127.798 13.1133 127.585 13.54C127.372 13.9667 127.072 14.3133 126.685 14.58C126.312 14.8467 125.878 15.0533 125.385 15.2C124.892 15.3333 124.365 15.42 123.805 15.46L123.525 15.3C124.458 15.3133 125.225 15.3933 125.825 15.54C126.425 15.6733 126.872 15.9267 127.165 16.3C127.472 16.66 127.625 17.2 127.625 17.92V21H124.965V18.1C124.965 17.6067 124.878 17.2267 124.705 16.96C124.532 16.68 124.218 16.4867 123.765 16.38C123.325 16.2733 122.685 16.22 121.845 16.22H116.825V21H114.165ZM116.825 14.14H122.945C123.692 14.14 124.258 13.96 124.645 13.6C125.045 13.24 125.245 12.7533 125.245 12.14C125.245 11.5533 125.045 11.1067 124.645 10.8C124.258 10.4933 123.692 10.34 122.945 10.34H116.825V14.14Z"
        fill="#2F2F3F"
      />
    </svg>
  );
}

function Navbar() {
  var { user, username } = useContext(UserContext);
  var theme = useTheme();

  return (
    <Box sx={{ height: "60px", width: "100%" }} px={{ xs: 2, sm: 4 }}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: theme.palette.background.default,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          height: "100%",
          maxWidth: "1440px",
        }}
        elevation={0}
      >
        <Link href="/">
          <Box sx={{ cursor: "pointer" }}>
            <Logo />
          </Box>
        </Link>

        {/* user is signed in and has username */}
        {username && (
          <Stack direction="row" spacing={2}>
            <Link href="/admin">
              <Button
                variant="contained"
                disableElevation
                sx={containedBtnStyle}
              >
                Write Post
              </Button>
            </Link>
            <Link href={`/${username}`}>
              <Avatar src={user?.photoURL} sx={{ cursor: "pointer" }} />
            </Link>
          </Stack>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <Stack direction="row" spacing={2}>
            <Button variant="text" sx={textBtnStyle}>
              Explore
            </Button>
            <Link href="/get-started">
              <Button
                variant="contained"
                disableElevation
                sx={containedBtnStyle}
              >
                Get started
              </Button>
            </Link>
          </Stack>
        )}
      </AppBar>
    </Box>
  );
}

export default Navbar;
