import { FunctionField, Labeled, Show as RAShow, TextField } from "react-admin";
import { Avatar, Box, Stack } from "@mui/material";

export const Show = () => (
  <RAShow>
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      padding="1em"
      gap="1em"
    >
      <FunctionField
        source="avatar"
        render={(record) => <Avatar src={record.avatar} />}
      />

      <Stack>
        <Labeled label="Username">
          <TextField source="username" />
        </Labeled>
        <Labeled label="Full name">
          <TextField source="fullName" />
        </Labeled>
      </Stack>
    </Box>
  </RAShow>
);
