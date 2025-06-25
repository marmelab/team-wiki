import { AppBar as RAAppBar, TitlePortal } from "react-admin";
import { Search } from "@react-admin/ra-search";

export const AppBar = () => (
  <RAAppBar>
    <TitlePortal />
    <Search />
  </RAAppBar>
);
