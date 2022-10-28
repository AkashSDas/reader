import { Box } from "@mui/material";

function Layout({ children }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ maxWidth: "1440px", width: "100%" }}>{children}</Box>
    </Box>
  );
}

export default Layout;
