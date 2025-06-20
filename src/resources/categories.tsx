import {
  EditButton,
  required,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { CreateNode, EditNode, TreeWithDetails } from "@react-admin/ra-tree";

export function CategoriesList() {
  return (
    <TreeWithDetails
      linkTo="edit"
      create={CategoriesCreate}
      edit={CategoriesEdit}
      allowMultipleRoots
    />
  );
}

const CategoriesCreate = () => (
  <CreateNode>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
    </SimpleForm>
  </CreateNode>
);

const CategoriesEdit = () => (
  <EditNode>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
    </SimpleForm>
  </EditNode>
);

const CategoriesShowToolbar = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

export const CategoriesShow = () => (
  <Show actions={<CategoriesShowToolbar />}>
    <SimpleShowLayout>
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);
