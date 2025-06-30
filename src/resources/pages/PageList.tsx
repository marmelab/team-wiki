import {
  CreateButton,
  List,
  RecordContextProvider,
  TopToolbar,
  useListContext,
} from "react-admin";
import { Box, Typography } from "@mui/material";

import { PageItem } from "./PageItem";
import type { Page } from "../../types";

export const PageList = () => (
  <List
    sort={{ field: "title", order: "ASC" }}
    title="All pages"
    perPage={1000}
    pagination={false}
    actions={
      <TopToolbar>
        <CreateButton label="Add page" />
      </TopToolbar>
    }
  >
    <Articles />
  </List>
);

const Articles = () => {
  const { data } = useListContext<Page>();
  return (
    <Box sx={{ padding: "1em" }}>
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
    </Box>
  );
};
