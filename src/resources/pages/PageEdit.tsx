import { Edit, required, ShowButton, TextInput, TopToolbar } from "react-admin";
import {
  RevisionsButton,
  SimpleFormWithRevision,
} from "@react-admin/ra-history";
import { ReferenceNodeInput } from "@react-admin/ra-tree";

import { PageMarkdownInput } from "../../inputs/PageMarkdownInput.tsx";
import { UserName } from "../users/UserName.tsx";
import { Diff } from "./Diff.tsx";
import { Stack } from "@mui/material";

export const EditToolbar = () => (
  <TopToolbar>
    <RevisionsButton
      diff={<Diff />}
      allowRevert
      renderName={(id) => <UserName id={id} />}
    />
    <ShowButton />
  </TopToolbar>
);

export const PageEdit = () => (
  <Edit actions={<EditToolbar />} redirect="show" title="Edit Page">
    <SimpleFormWithRevision>
      <Stack direction="row" spacing={2} alignItems="top">
        <div>
          <TextInput source="title" validate={required()} helperText={false} />
          <PageMarkdownInput source="content" helperText={false} />
        </div>
        <ReferenceNodeInput source="category_id" reference="categories" />
      </Stack>
    </SimpleFormWithRevision>
  </Edit>
);
