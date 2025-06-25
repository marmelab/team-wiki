import { DataTable, List as RAList, ReferenceField } from "react-admin";

export const List = () => (
  <RAList
    sort={{
      field: "title",
      order: "ASC",
    }}
  >
    <DataTable>
      <DataTable.Col source="title" />
      <DataTable.Col source="category_id">
        <ReferenceField source="category_id" reference="categories" />
      </DataTable.Col>
    </DataTable>
  </RAList>
);
