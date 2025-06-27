import { useParams } from "react-router";
import {
  Empty,
  ListBase,
  useGetOne,
  RecordContextProvider,
  TextField,
  TopToolbar,
  ShowButton,
  useListContext,
} from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";

import { MessagesList } from "./MessagesList.tsx";
import { CategoryTree } from "../categories/CategoryTree.tsx";

export const PageMessagesList = () => {
  const { id } = useParams();
  const { isPending, error, data } = useGetOne("pages", { id });
  if (isPending || error) {
    return null;
  }
  return (
    <ListBase
      resource="pages_messages"
      filter={{ page_id: id }}
      sort={{
        field: "date",
        order: "ASC",
      }}
    >
      <RecordContextProvider value={data}>
        <TopToolbar>
          <CategoryTree />
          <ShowButton resource="pages" />
        </TopToolbar>
        <Card>
          <CardContent>
            <TextField
              source="title"
              variant="h2"
              gutterBottom
              sx={{
                fontSize: "2.5em",
                textAlign: "center",
              }}
            />{" "}
            <Typography
              variant="h2"
              component="span"
              sx={{
                fontSize: "2.5em",
                textAlign: "center",
              }}
            >
              - Comments
            </Typography>
            <EmptyMessagesList />
            <MessagesList />
          </CardContent>
        </Card>
      </RecordContextProvider>
    </ListBase>
  );
};

export const EmptyMessagesList = () => {
  const { isPending, error, total } = useListContext();
  if (isPending || error || total > 0) return null;
  return (
    <>
      <Empty resource={"comments"} />
    </>
  );
};
