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

export const CategorizedPageBreadcrumbItem = () => (
  <Breadcrumb.Item
    name="category"
    label={({ category }) => {
      return (category as any)?.name ?? "";
    }}
    to={({ category }) => `/categories/${(category as any).id}/show`}
  >
    <Breadcrumb.Item
      name="page"
      label={({ page }) => {
        return (page as any)?.title ?? "";
      }}
    />
  </Breadcrumb.Item>
);

export const CategorizedCategoryBreadcrumbItem = () => (
  <Breadcrumb.Item
    name="parent"
    label={({ parent }) => {
      return (parent as any)?.name ?? "";
    }}
    to={({ parent }) =>
      parent ? `/categories/${(parent as any).id}/show` : undefined
    }
  >
    <Breadcrumb.Item
      name="category"
      label={({ category }) => {
        return (category as any)?.name ?? "";
      }}
    />
  </Breadcrumb.Item>
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <AppLocationContext>
    <RALayout appBar={AppBar}>
      <Breadcrumb>
        <Breadcrumb.ResourceItems />

        <CategorizedCategoryBreadcrumbItem />
        <CategorizedPageBreadcrumbItem />
        <Breadcrumb.Item name="nested" label={"..."}>
          <CategorizedCategoryBreadcrumbItem />
          <CategorizedPageBreadcrumbItem />
        </Breadcrumb.Item>
      </Breadcrumb>
      {children}
    </RALayout>
  </AppLocationContext>
);
