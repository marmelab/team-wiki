import {
  DateField,
  FunctionField,
  RecordContextProvider,
  RecordRepresentation,
  ReferenceField,
  TextField,
  useListContext,
} from "react-admin";
import { Avatar, Card, CardContent, Stack } from "@mui/material";

import { NewMessageForm } from "./NewMessageForm.tsx";
import type { PageMessage } from "../../types.ts";

export const MessagesList = () => {
  const listContext = useListContext<PageMessage>();
  return (
    <Stack sx={{ gap: 2, mt: 2, maxWidth: 600 }}>
      {listContext.data?.map((pageMessage) => (
        <RecordContextProvider key={pageMessage.id} value={pageMessage}>
          <Card>
            <CardContent>
              <Stack gap={2}>
                <Stack direction="row" gap={1}>
                  <ReferenceField
                    reference="users"
                    source="author_id"
                    link={false}
                  >
                    <FunctionField
                      render={(record) => (
                        <Avatar
                          src={record.avatar}
                          sx={{ width: 32, height: 32 }}
                        />
                      )}
                    />
                  </ReferenceField>
                  <Stack>
                    <ReferenceField
                      reference="users"
                      source="author_id"
                      link={false}
                    >
                      <FunctionField
                        sx={{ fontWeight: "600" }}
                        render={() => <RecordRepresentation />}
                      />
                    </ReferenceField>
                    <DateField color="textSecondary" showTime source="date" />
                  </Stack>
                </Stack>
                <TextField source="message" variant="body1" />
              </Stack>
            </CardContent>
          </Card>
        </RecordContextProvider>
      ))}
      <NewMessageForm title="Add a comment" />
    </Stack>
  );
};
