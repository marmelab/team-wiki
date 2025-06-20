import type { ReactNode } from "react";
import {
  Layout as RALayout,
  AppBar as RAAppBar,
  TitlePortal,
} from "react-admin";
import { Box } from "@mui/material";
import { AppLocationContext, Breadcrumb } from "@react-admin/ra-navigation";
import { Search } from "@react-admin/ra-search";

const AppBar = () => (
  <RAAppBar>
    <TitlePortal />
    <Box sx={{ flex: "1" }} />
    <Search />
  </RAAppBar>
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <AppLocationContext>
    <RALayout appBar={AppBar}>
      <Breadcrumb />
      {children}
    </RALayout>
  </AppLocationContext>
);
