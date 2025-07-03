import {
  CreateButton,
  Link,
  ListBase,
  RecordContextProvider,
  TopToolbar,
  useListContext,
} from "react-admin";
import { Card, CardContent, Box, Breadcrumbs, Typography } from "@mui/material";

import { PageItem } from "./PageItem";
import type { Page } from "../../types";

export const PageList = () => (
  <ListBase sort={{ field: "title", order: "ASC" }} perPage={1000}>
    <TopToolbar>
      <Breadcrumbs sx={{ flexGrow: 1 }}>
        <Link to={`/`}>Home</Link>
        <Typography color="textSecondary">All pages</Typography>
      </Breadcrumbs>
      <CreateButton label="Add page" />
    </TopToolbar>
    <Articles />
  </ListBase>
);

const Articles = () => {
  const { data } = useListContext<Page>();
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          All Pages
        </Typography>
        <Box sx={{ columnCount: 2, columnGap: "2em" }}>
          {Object.entries(
            data
              ? data.reduce(
                  (acc, article) => {
                    const letter = article.title?.[0]?.toUpperCase() || "#";
                    if (!acc[letter]) acc[letter] = [];
                    acc[letter].push(article);
                    return acc;
                  },
                  {} as Record<string, Page[]>,
                )
              : {},
          )
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, articles]) => (
              <div key={letter}>
                <Typography variant="h6" sx={{ pl: 0 }}>
                  {letter}
                </Typography>
                <Box
                  component="ul"
                  sx={{ padding: 0, listStylePosition: "inside" }}
                >
                  {articles.map((article) => (
                    <RecordContextProvider key={article.id} value={article}>
                      <PageItem />
                    </RecordContextProvider>
                  ))}
                </Box>
              </div>
            ))}
        </Box>
      </CardContent>
    </Card>
  );
};
