import { bwLightTheme } from "react-admin";
import { ThemeOptions } from "@mui/material";
import deepmerge from "deepmerge";

export const appTheme: ThemeOptions = deepmerge(bwLightTheme, {
  components: {
    RaMarkdownField: {
      styleOverrides: {
        root: {
          "& .toastui-editor-contents": {
            fontSize: "1em",
            fontFamily: [
              "Geist",
              '"Source Sans Pro"',
              "-apple-system",
              "BlinkMacSystemFont",
              "Roboto",
              '"Helvetica Neue"',
              "Arial",
              "sans-serif",
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
              '"Noto Color Emoji"',
            ].join(","),
          },
        },
      },
    },
    RaMarkdownInput: {
      styleOverrides: {
        root: {
          "& .toastui-editor-contents": {
            fontSize: "1em",
            fontFamily: [
              "Geist",
              '"Source Sans Pro"',
              "-apple-system",
              "BlinkMacSystemFont",
              "Roboto",
              '"Helvetica Neue"',
              "Arial",
              "sans-serif",
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
              '"Noto Color Emoji"',
            ].join(","),
          },
        },
      },
    },
  },
} as ThemeOptions);
