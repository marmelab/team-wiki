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
  useGetOne,
} from "react-admin";
import { CreateNode, EditNode, TreeWithDetails } from "@react-admin/ra-tree";
import { useParams } from "react-router";
import { useDefineAppLocation } from "@react-admin/ra-navigation";

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
  <CreateNode redirect={"edit"}>
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

export const CategoriesShow = () => {
  const { id: categoryId } = useParams<{ id: string }>();
  const { data: category } = useGetOne("categories", { id: categoryId });
  const { data: parent } = useGetOne("categories", { id: category?.parent_id });
  useDefineAppLocation(
    (parent?.parent_id ? "nested." : "") +
      (parent ? "parent." : "") +
      "category",
    { parent, category },
  );

  return (
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
};
