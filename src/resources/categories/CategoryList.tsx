import {
  Link,
  TopToolbar,
  CreateButton,
  RecordContextProvider,
} from "react-admin";
import { useGetRootNodes } from "@react-admin/ra-tree";
import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { CategoryItem } from "./CategoryItem";

export const CategoryList = () => {
  const { data, error, isPending } = useGetRootNodes("categories");
  if (error || isPending) {
    return null;
  }
  return (
    <>
      <TopToolbar>
        <Breadcrumbs sx={{ flexGrow: 1 }}>
          <Link to={`/`}>Home</Link>
          <Typography color="textSecondary">All categories</Typography>
        </Breadcrumbs>
        <CreateButton resource="categories" label="Add category" />
      </TopToolbar>
      <Card>
        <Typography variant="h4" gutterBottom sx={{ pt: 2, pl: 2 }}>
          Categories
        </Typography>
        <CardContent sx={{ columnCount: 2, columnGap: "2em", pt: 0 }}>
          <ul style={{ padding: 0, listStylePosition: "inside" }}>
            {data
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                <RecordContextProvider value={item} key={item.id}>
                  <CategoryItem key={item.id} />
                </RecordContextProvider>
              ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};
