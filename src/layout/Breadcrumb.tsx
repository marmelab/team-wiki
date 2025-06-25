import { Breadcrumb as RABreadcrumb } from "@react-admin/ra-navigation";

const CategorizedPageBreadcrumbItem = () => (
  <RABreadcrumb.Item
    name="category"
    label={({ category }) => {
      return (category as any)?.name ?? "";
    }}
    to={({ category }) =>
      category ? `/categories/${(category as any).id}/show` : undefined
    }
  >
    <RABreadcrumb.Item
      name="page"
      label={({ page }) => {
        return (page as any)?.title ?? "";
      }}
      to={({ page }) => (page ? `/pages/${(page as any).id}/show` : undefined)}
    >
      <RABreadcrumb.Item name={"discussions"} label={"Discussions"} />
    </RABreadcrumb.Item>
  </RABreadcrumb.Item>
);

const CategorizedCategoryBreadcrumbItem = () => (
  <RABreadcrumb.Item
    name="parent"
    label={({ parent }) => {
      return (parent as any)?.name ?? "";
    }}
    to={({ parent }) =>
      parent ? `/categories/${(parent as any).id}/show` : undefined
    }
  >
    <RABreadcrumb.Item
      name="category"
      label={({ category }) => {
        return (category as any)?.name ?? "";
      }}
    />
  </RABreadcrumb.Item>
);

export const Breadcrumb = () => (
  <RABreadcrumb>
    <RABreadcrumb.ResourceItems />

    <CategorizedCategoryBreadcrumbItem />
    <CategorizedPageBreadcrumbItem />
    <RABreadcrumb.Item name="nested" label={"..."}>
      <CategorizedCategoryBreadcrumbItem />
      <CategorizedPageBreadcrumbItem />
    </RABreadcrumb.Item>
  </RABreadcrumb>
);
