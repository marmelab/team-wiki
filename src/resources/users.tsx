import {
  Create,
  DataTable,
  Edit,
  FunctionField,
  Labeled,
  List,
  PasswordInput,
  Show,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { Avatar, Box, Stack } from "@mui/material";

export function UsersList() {
  return (
    <List
      sort={{
        field: "id",
        order: "DESC",
      }}
    >
      <DataTable>
        <DataTable.Col source="id" />
        <DataTable.Col source="username" />
        <DataTable.Col source="fullName" />
      </DataTable>
    </List>
  );
}

export function UsersShow() {
  return (
    <Show>
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
    </Show>
  );
}

export function UsersEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="username" />
        <TextInput source="fullName" />
        <PasswordInput source="password" />
      </SimpleForm>
    </Edit>
  );
}

export function UsersCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="username" />
        <TextInput source="fullName" />
        <PasswordInput source="password" />
      </SimpleForm>
    </Create>
  );
}
