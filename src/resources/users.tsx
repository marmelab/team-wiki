import {
  Create,
  DataTable,
  Edit,
  FunctionField,
  List,
  PasswordInput,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";
import { Avatar } from "@mui/material";

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
      <SimpleShowLayout>
        <FunctionField
          source="avatar"
          render={(record) => <Avatar src={record.avatar} />}
        />

        <TextField source="username" />
        <TextField source="fullName" />
      </SimpleShowLayout>
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
