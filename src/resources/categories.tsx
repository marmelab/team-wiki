import {
  DataTable,
  EditButton,
  Labeled,
  ReferenceManyField,
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
  <EditNode title="Categories">
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />

      <Labeled label="Pages">
        <ReferenceManyField
          reference="pages"
          target="category_id"
          label="Pages"
          sort={{
            field: "title",
            order: "ASC",
          }}
        >
          <DataTable>
            <DataTable.Col source="title" />
          </DataTable>
        </ReferenceManyField>
      </Labeled>
    </SimpleForm>
  </EditNode>
);

const CategoriesShowToolbar = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

export const CategoriesShow = () => (
  <Show actions={<CategoriesShowToolbar />} title="Categories">
    <SimpleShowLayout>
      <TextField source="name" />

      <ReferenceManyField
        reference="categories"
        target="parent_id"
        label="Subcategories"
        sort={{
          field: "name",
          order: "ASC",
        }}
      >
        <DataTable>
          <DataTable.Col source="name" />
        </DataTable>
      </ReferenceManyField>

      <ReferenceManyField
        reference="pages"
        target="category_id"
        label="Pages"
        sort={{
          field: "title",
          order: "ASC",
        }}
      >
        <DataTable>
          <DataTable.Col source="title" />
        </DataTable>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
