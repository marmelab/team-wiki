import { AppBar as RAAppBar, TitlePortal } from "react-admin";
import { Search } from "@react-admin/ra-search";

import { UserMenu } from "./UserMenu.tsx";

export const AppBar = () => (
  <RAAppBar userMenu={<UserMenu />}>
    <TitlePortal />
    <Search />
  </RAAppBar>
);
