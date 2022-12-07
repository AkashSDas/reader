import { createTheme, Palette, PaletteColor, TypeBackground, TypeText } from "@mui/material";

var palette: Partial<Palette> = {
  primary: { main: "#28271F" } as PaletteColor,
  background: { default: "#FCFCFC" } as TypeBackground,
  text: { primary: "#28271F", secondary: "#575757" } as TypeText,
  divider: "#F1F1F1",
};

export var materialUiTheme = createTheme({
  palette,
  typography: {
    fontFamily: "Urbanist",
  },
});
