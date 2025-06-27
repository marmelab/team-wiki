import { Link, useDataProvider, useRecordContext } from "react-admin";
import { Breadcrumbs, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import type { Category } from "../../types";

export const CategoryTree = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const { data: ancestors } = useQuery<{ data: Category[] }>({
    queryKey: ["categories", "getAncestorNodes", record?.category_id],
    queryFn: () =>
      dataProvider.getRootPath("categories", { childId: record?.category_id }),
  });
  return (
    <Breadcrumbs sx={{ flexGrow: 1 }}>
      <Link to={`/`}>Home</Link>
      {ancestors?.data?.map((ancestor) => (
        <Link key={ancestor.id} to={`/categories/${ancestor.id}/show`}>
          {ancestor.name}
        </Link>
      ))}
      <Typography color="textSecondary">{record?.title}</Typography>
    </Breadcrumbs>
  );
};
