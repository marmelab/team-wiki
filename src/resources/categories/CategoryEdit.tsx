import { Typography } from "@mui/material";
import { ReferenceNodeInput } from "@react-admin/ra-tree";
import {
  Edit,
  required,
  SimpleForm,
  TextInput,
  RecordRepresentation,
} from "react-admin";

export const CategoryEdit = () => (
  <Edit redirect="show">
    <SimpleForm>
      <Typography variant="h4" gutterBottom>
        Edit Category <RecordRepresentation />
      </Typography>
      <TextInput source="name" validate={[required()]} />
      <TextInput source="description" validate={[required()]} />
      <ReferenceNodeInput source="parent_id" reference="categories" />
    </SimpleForm>
  </Edit>
);
