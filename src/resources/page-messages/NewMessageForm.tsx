import { Box, Typography } from "@mui/material";
import {
  CreateBase,
  SaveButton,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";
import { Send } from "@mui/icons-material";
import { useParams } from "react-router";

const MessageFormToolbar = () => (
  <Box sx={{ mt: 1 }}>
    <SaveButton icon={<Send />} label="Send" />
  </Box>
);

export const NewMessageForm = ({ title }: { title: string }) => {
  const { id: pageId } = useParams();
  const { data: authenticatedAccount } = useGetIdentity();

  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      <CreateBase resource="pages_messages" redirect={false}>
        <SimpleForm
          toolbar={<MessageFormToolbar />}
          defaultValues={{
            page_id: pageId,
            author_id: authenticatedAccount?.id,
            date: new Date().toISOString(),
          }}
          sx={{ p: 0 }}
        >
          <TextInput
            source={"message"}
            multiline
            rows={4}
            label={false}
            helperText={false}
          />
        </SimpleForm>
      </CreateBase>
    </div>
  );
};
