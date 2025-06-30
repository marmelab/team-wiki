import { DataTable, List } from "react-admin";

export const UserList = () => (
  <List
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
  </List>
);
