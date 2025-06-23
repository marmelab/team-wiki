import { useState } from "react";
import {
  DateField,
  Empty,
  FunctionField,
  List,
  RecordContextProvider,
  ReferenceField,
  SaveButton,
  SimpleForm,
  TextField,
  useCreate,
  useGetIdentity,
  useGetOne,
  useListContext,
} from "react-admin";
import { useParams } from "react-router";
import { useDefineAppLocation } from "@react-admin/ra-navigation";
import {
  Avatar,
  Card,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { PageMarkdownInput } from "../inputs/PageMarkdownInput.tsx";
import { MarkdownField } from "@react-admin/ra-markdown";
import { Send } from "@mui/icons-material";

export function PagesMessagesList() {
  const { id: pageId } = useParams();

  const { data: page } = useGetOne("pages", { id: pageId });
  const { data: category } = useGetOne("categories", { id: page?.category_id });
  useDefineAppLocation(
    (category?.parent_id ? "nested." : "") + "category.page.discussions",
    { page, category },
  );

  return (
    <List
      title="Discussions"
      resource="pages_messages"
      filter={{ page_id: pageId }}
      sort={{
        field: "date",
        order: "DESC",
      }}
      empty={<EmptyMessagesList />}
      sx={{
        ["& .RaList-content"]: {
          border: "none",
          background: "none",
          boxShadow: "0 0 0 0 transparent",
        },
      }}
    >
      <MessagesList />
    </List>
  );
}

export function EmptyMessagesList() {
  return (
    <>
      <NewMessageForm title="Start discussion" />
      <Empty resource={"messages"} />
    </>
  );
}

function MessageFormToolbar() {
  return (
    <Toolbar>
      <SaveButton icon={<Send />} label="Send" />
    </Toolbar>
  );
}

export function NewMessageForm({ title }: { title: string }) {
  const { id: pageId } = useParams();
  const { data: authenticatedAccount } = useGetIdentity();
  const [create] = useCreate();

  const [forceReset, setForceReset] = useState(0);

  return (
    <Card>
      <Typography
        variant="h3"
        sx={{ margin: "1em 1em 0 0.75em", fontSize: "1.33em" }}
      >
        {title}
      </Typography>
      <SimpleForm
        key={forceReset}
        resource="page_messages"
        toolbar={<MessageFormToolbar />}
        onSubmit={async (data: any) => {
          const newMessage = await create("pages_messages", {
            data: {
              page_id: pageId,
              author_id: authenticatedAccount?.id,
              date: new Date().toISOString(),
              message: data.message,
            },
          });
          setForceReset(forceReset + 1);
          return newMessage;
        }}
      >
        <PageMarkdownInput source={"message"} height="15em" />
      </SimpleForm>
    </Card>
  );
}

export function MessagesList() {
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
}

const AuthorRoot = styled("div")({
  display: "flex",
  alignItems: "center",

  ["& .MuiAvatar-root"]: {
    marginRight: "0.5em",
  },
});
