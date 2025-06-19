import type { ReactNode } from "react";
import { Breadcrumb, SolarLayout } from "@react-admin/ra-navigation";

export const Layout = ({ children }: { children: ReactNode }) => (
  <SolarLayout>
    <Breadcrumb />
    {children}
  </SolarLayout>
);
