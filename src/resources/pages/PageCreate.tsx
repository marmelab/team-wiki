import { Create, required, TextInput } from "react-admin";
import { SimpleFormWithRevision } from "@react-admin/ra-history";
import { ReferenceNodeInput } from "@react-admin/ra-tree";
import { Stack } from "@mui/material";

import { PageMarkdownInput } from "../../inputs/PageMarkdownInput.tsx";

export const PageCreate = () => (
  <Create redirect="show">
    <SimpleFormWithRevision>
      <Stack direction="row" spacing={2} alignItems="top">
        <div>
          <TextInput source="title" validate={required()} helperText={false} />
          <PageMarkdownInput source="content" helperText={false} />
        </div>
        <ReferenceNodeInput source="category_id" reference="categories" />
      </Stack>
    </SimpleFormWithRevision>
  </Create>
);
