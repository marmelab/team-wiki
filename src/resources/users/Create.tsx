import {
  Create as RACreate,
  PasswordInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const Create = () => (
  <RACreate>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="fullName" />
      <PasswordInput source="password" />
    </SimpleForm>
  </RACreate>
);
