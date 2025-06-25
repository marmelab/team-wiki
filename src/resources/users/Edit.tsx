import {
  Edit as RAEdit,
  PasswordInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const Edit = () => (
  <RAEdit>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="fullName" />
      <PasswordInput source="password" />
    </SimpleForm>
  </RAEdit>
);
