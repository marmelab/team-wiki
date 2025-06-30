import { Create, PasswordInput, SimpleForm, TextInput } from "react-admin";

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="fullName" />
      <PasswordInput source="password" />
    </SimpleForm>
  </Create>
);
