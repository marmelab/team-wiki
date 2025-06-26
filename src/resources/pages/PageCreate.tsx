import { Create, required, TextInput } from "react-admin";
import { SimpleFormWithRevision } from "@react-admin/ra-history";
import { PageMarkdownInput } from "../../inputs/PageMarkdownInput.tsx";
import { ReferenceNodeInput } from "@react-admin/ra-tree";

export const PageCreate = () => (
  <Create>
    <SimpleFormWithRevision>
      <TextInput source="title" validate={required()} />
      <PageMarkdownInput source="content" />
      <ReferenceNodeInput source="category_id" reference="categories" />
    </SimpleFormWithRevision>
  </Create>
);
