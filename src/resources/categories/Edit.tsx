import {
  DataTable,
  Labeled,
  ReferenceManyField,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { EditNode } from "@react-admin/ra-tree";

export const Edit = () => (
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
