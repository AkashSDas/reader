import { createTheme, Palette, PaletteColor, TypeBackground, TypeText } from "@mui/material";

var palette: Partial<Palette> = {
  primary: { main: "#2F2F3F" } as PaletteColor,
  background: { default: "#fff" } as TypeBackground,
  text: { primary: "#2F2F3F", secondary: "#6C6C6C" } as TypeText,
  divider: "#E8E8E8",
};

export var materialUiTheme = createTheme({
  palette,
  typography: {
    fontFamily: "Syne",
  },
});
