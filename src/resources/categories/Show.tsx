import {
  DataTable,
  EditButton,
  ReferenceManyField,
  Show as RAShow,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useGetOne,
} from "react-admin";
import { useParams } from "react-router";
import { useDefineAppLocation } from "@react-admin/ra-navigation";

const CategoriesShowToolbar = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

export const Show = () => {
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
    <RAShow actions={<CategoriesShowToolbar />} title="Categories">
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
    </RAShow>
  );
};
