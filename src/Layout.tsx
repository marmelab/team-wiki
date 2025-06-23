import type { ReactNode } from "react";
import {
  Layout as RALayout,
  AppBar as RAAppBar,
  TitlePortal,
} from "react-admin";
import { Box } from "@mui/material";
import {
  AppLocationContext,
  Breadcrumb,
  MultiLevelMenu,
} from "@react-admin/ra-navigation";
import { Search } from "@react-admin/ra-search";
import { HomeIcon, ListTreeIcon, StickyNoteIcon, UserIcon } from "lucide-react";
import { TreeRecord, useGetTree } from "@react-admin/ra-tree";

const AppBar = () => (
  <RAAppBar>
    <TitlePortal />
    <Box sx={{ flex: "1" }} />
    <Search />
  </RAAppBar>
);

const CategorizedPageBreadcrumbItem = () => (
  <Breadcrumb.Item
    name="category"
    label={({ category }) => {
      return (category as any)?.name ?? "";
    }}
    to={({ category }) =>
      category ? `/categories/${(category as any).id}/show` : undefined
    }
  >
    <Breadcrumb.Item
      name="page"
      label={({ page }) => {
        return (page as any)?.title ?? "";
      }}
      to={({ page }) => (page ? `/pages/${(page as any).id}/show` : undefined)}
    >
      <Breadcrumb.Item name={"discussions"} label={"Discussions"} />
    </Breadcrumb.Item>
  </Breadcrumb.Item>
);

const CategorizedCategoryBreadcrumbItem = () => (
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

const RecursiveMenuItem = ({
  category,
  tree,
}: {
  category: TreeRecord;
  tree: TreeRecord[];
}) => {
  return (
    <MultiLevelMenu.Item
      name={`categories.${category.id}`}
      label={category.name}
      to={`/categories/${category.id}/show`}
    >
      {category.children?.map((childIdentifier) => {
        const child = tree.find((category) => childIdentifier == category.id);

        return child ? (
          <RecursiveMenuItem
            key={childIdentifier}
            category={child}
            tree={tree}
          />
        ) : null;
      })}
    </MultiLevelMenu.Item>
  );
};

const Menu = () => {
  const tree = useGetTree("categories");

  return (
    <MultiLevelMenu>
      <MultiLevelMenu.DashboardItem icon={<HomeIcon />} label="Home" />

      <MultiLevelMenu.Item
        name="categories"
        icon={<ListTreeIcon />}
        label="Categories"
        to="/categories"
      />
      <MultiLevelMenu.Item
        name="pages"
        icon={<StickyNoteIcon />}
        label="All Pages"
        to="/pages"
      />

      {tree.data?.map(
        (category) =>
          !category.parent_id && (
            <RecursiveMenuItem category={category} tree={tree.data} />
          ),
      )}

      <MultiLevelMenu.Item
        name="users"
        icon={<UserIcon />}
        label="Users"
        to="/users"
      />
    </MultiLevelMenu>
  );
};

export const Layout = ({ children }: { children: ReactNode }) => (
  <AppLocationContext>
    <RALayout appBar={AppBar} menu={Menu}>
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
