import { Link, useDataProvider, useRecordContext } from "react-admin";
import { Breadcrumbs, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import type { Category } from "../../types";

export const CategoryTreeForCategory = () => {
  const record = useRecordContext<Category>();
  const dataProvider = useDataProvider();
  const { data: ancestors, isPending } = useQuery<{ data: Category[] }>({
    queryKey: ["categories", "getAncestorNodes", record?.parent_id],
    queryFn: () =>
      dataProvider.getRootPath("categories", { childId: record?.parent_id }),
  });
  if (isPending) {
    return null;
  }
  return (
    <Breadcrumbs sx={{ flexGrow: 1 }}>
      <Link to={`/`}>Home</Link>
      {ancestors?.data?.map((ancestor) => (
        <Link key={ancestor.id} to={`/categories/${ancestor.id}/show`}>
          {ancestor.name}
        </Link>
      ))}
      <Typography color="textSecondary">{record?.name}</Typography>
    </Breadcrumbs>
  );
};
