import { required, SimpleForm, TextInput } from "react-admin";
import { CreateNode } from "@react-admin/ra-tree";

export const Create = () => (
  <CreateNode redirect={"edit"}>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
    </SimpleForm>
  </CreateNode>
);
