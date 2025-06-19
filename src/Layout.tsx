import type { ReactNode } from "react";
import {
  Breadcrumb,
  SolarAppBar,
  SolarLayout,
  SolarMenu,
  SolarMenuUserItem,
} from "@react-admin/ra-navigation";
import { Search } from "@react-admin/ra-search";

import { SearchMenuItem } from "./Search.tsx";

const WikiAppBar = () => (
  <SolarAppBar>
    <Search />
  </SolarAppBar>
);

const BottomToolbar = () => (
  <>
    <SearchMenuItem />
    <SolarMenu.LoadingIndicatorItem />
    <SolarMenuUserItem />
  </>
);

const Menu = () => <SolarMenu bottomToolbar={<BottomToolbar />} />;

export const Layout = ({ children }: { children: ReactNode }) => (
  <SolarLayout appBar={WikiAppBar} menu={Menu}>
    <Breadcrumb />
    {children}
  </SolarLayout>
);
