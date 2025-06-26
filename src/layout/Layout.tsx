import type { ReactNode } from "react";
import { ContainerLayout } from "@react-admin/ra-navigation";

import { AppBar } from "./AppBar.tsx";

export const Layout = ({ children }: { children: ReactNode }) => (
  <ContainerLayout appBar={<AppBar />} menu={false}>
    {children}
  </ContainerLayout>
);
