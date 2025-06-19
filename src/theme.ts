import { defaultLightTheme } from "react-admin";
import { ThemeOptions } from "@mui/material";
import deepmerge from "deepmerge";

export const appTheme: ThemeOptions = deepmerge(defaultLightTheme, {
  components: {
    RaMarkdownField: {
      styleOverrides: {
        root: {
          [".toastui-editor-contents"]: {
            fontSize: "1em",
          },
        },
      },
    },
  },
} as ThemeOptions);
