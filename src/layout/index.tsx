import type { ReactNode } from "react";
import { AppLocationContext } from "@react-admin/ra-navigation";
import { Layout as RALayout } from "react-admin";

import { AppBar } from "./AppBar.tsx";
import { Menu } from "./Menu.tsx";
import { Breadcrumb } from "./Breadcrumb.tsx";

export const Layout = ({ children }: { children: ReactNode }) => (
  <AppLocationContext>
    <RALayout appBar={AppBar} menu={Menu}>
      <Breadcrumb />
      {children}
    </RALayout>
  </AppLocationContext>
);
