import { required, SimpleForm, TextInput } from "react-admin";
import { CreateNode, EditNode, TreeWithDetails } from "@react-admin/ra-tree";

export function CategoriesList() {
  return (
    <TreeWithDetails
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
