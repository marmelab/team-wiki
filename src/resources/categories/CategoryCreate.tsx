import { ReferenceNodeInput } from "@react-admin/ra-tree";
import { Create, required, SimpleForm, TextInput } from "react-admin";
import { Typography } from "@mui/material";

export const CategoryCreate = () => (
  <Create redirect="show">
    <SimpleForm>
      <Typography variant="h4" gutterBottom>
        Create Category
      </Typography>
      <TextInput source="name" validate={[required()]} />
      <TextInput source="description" validate={[required()]} />
      <ReferenceNodeInput source="parent_id" reference="categories" />
    </SimpleForm>
  </Create>
);
