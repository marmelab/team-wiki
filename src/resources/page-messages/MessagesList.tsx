import {
  DateField,
  FunctionField,
  RecordContextProvider,
  ReferenceField,
  TextField,
  useListContext,
} from "react-admin";
import { Avatar, Card, Stack, styled } from "@mui/material";
import { MarkdownField } from "@react-admin/ra-markdown";

import { NewMessageForm } from "./NewMessageForm.tsx";

export const MessagesList = () => {
  const listContext = useListContext<{
    id: number;
    page_id: number;
    author_id: number;
    date: string;
    message: string;
  }>();

  return (
    <Stack sx={{ gap: "1em" }}>
      <NewMessageForm title="Post a message" />

      {listContext.data?.map((pageMessage) => (
        <Card
          key={pageMessage.id}
          sx={{
            padding: "1em",
          }}
        >
          <Stack>
            <RecordContextProvider value={pageMessage}>
              <ReferenceField reference="users" source="author_id">
                <AuthorRoot className="author">
                  <FunctionField
                    render={(record) => <Avatar src={record.avatar} />}
                  />
                  <TextField source="fullName" />
                </AuthorRoot>
              </ReferenceField>

              <MarkdownField source="message" />

              <DateField
                sx={{
                  margin: "auto 0 auto auto",
                  textAlign: "right",
                }}
                showTime
                source="date"
              />
            </RecordContextProvider>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

const AuthorRoot = styled("div")({
  display: "flex",
  alignItems: "center",

  ["& .MuiAvatar-root"]: {
    marginRight: "0.5em",
  },
});
