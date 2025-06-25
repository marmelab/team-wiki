import { Card, Toolbar, Typography } from "@mui/material";
import { SaveButton, SimpleForm, useCreate, useGetIdentity } from "react-admin";
import { Send } from "@mui/icons-material";
import { useParams } from "react-router";
import { useState } from "react";

import { PageMarkdownInput } from "../../inputs/PageMarkdownInput.tsx";

const MessageFormToolbar = () => (
  <Toolbar>
    <SaveButton icon={<Send />} label="Send" />
  </Toolbar>
);

export const NewMessageForm = ({ title }: { title: string }) => {
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
};
