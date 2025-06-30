import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  optimizeDeps: {
    include: ["@emotion/styled", "@mui/material/Tooltip"],
  },
  server: {
    host: true,
  },
  base: "./",
  build: {
    sourcemap: mode === "development",
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
}));
