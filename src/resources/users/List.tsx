import { DataTable, List as RAList } from "react-admin";

export const List = () => (
  <RAList
    sort={{
      field: "id",
      order: "DESC",
    }}
  >
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="username" />
      <DataTable.Col source="fullName" />
    </DataTable>
  </RAList>
);
