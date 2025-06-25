import {
  Edit as RAEdit,
  required,
  ShowButton,
  TextInput,
  TopToolbar,
} from "react-admin";
import {
  RevisionsButton,
  SimpleFormWithRevision,
} from "@react-admin/ra-history";
import { ReferenceNodeInput } from "@react-admin/ra-tree";

import { PageMarkdownInput } from "../../inputs/PageMarkdownInput.tsx";
import { Diff } from "./Diff";

export const EditToolbar = () => (
  <TopToolbar>
    <RevisionsButton diff={<Diff />} allowRevert />
    <ShowButton />
  </TopToolbar>
);

export const Edit = () => (
  <RAEdit actions={<EditToolbar />} title="Edit Page">
    <SimpleFormWithRevision>
      <TextInput source="id" readOnly />
      <TextInput source="title" validate={required()} />
      <PageMarkdownInput source="content" />
      <ReferenceNodeInput source="category_id" reference="categories" />
    </SimpleFormWithRevision>
  </RAEdit>
);
