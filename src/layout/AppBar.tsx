import { Header } from "@react-admin/ra-navigation";
import { Search } from "@react-admin/ra-search";

import { UserMenu } from "./UserMenu.tsx";

export const AppBar = () => (
  <Header
    userMenu={<UserMenu />}
    menu={
      <Search
        sx={{ "& .RaSearchInput-input": { width: "300px!important" } }}
        withKeyboardShortcut
      />
    }
  />
);
