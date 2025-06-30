import { Edit, PasswordInput, SimpleForm, TextInput } from "react-admin";

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="fullName" />
      <PasswordInput source="password" />
    </SimpleForm>
  </Edit>
);
