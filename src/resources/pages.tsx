import React from "react";
import {
  DataTable,
  List,
  Edit,
  TextInput,
  ReferenceField,
  Show,
  TextField,
  Labeled,
  TopToolbar,
  EditButton,
  ShowButton,
  FunctionField,
  Create,
  required,
} from "react-admin";
import { MarkdownField } from "@react-admin/ra-markdown";
import {
  FieldDiff,
  RevisionsButton,
  SimpleFormWithRevision,
} from "@react-admin/ra-history";
import { Box, Stack, Typography } from "@mui/material";
import { fromMarkdown } from "react-markdown-toc";
import { TOC } from "react-markdown-toc/client";
import { ReferenceNodeInput } from "@react-admin/ra-tree";

import { PageMarkdownInput } from "../inputs/PageMarkdownInput.tsx";

export const PageList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      <DataTable.Col source="content" />
      <DataTable.Col source="category_id">
        <ReferenceField source="category_id" reference="categories" />
      </DataTable.Col>
    </DataTable>
  </List>
);

export const PageDiff = () => (
  <Stack gap={1}>
    <FieldDiff source="title" />
    <MarkdownField source="content" />
  </Stack>
);

export const PageShowToolbar = () => (
  <TopToolbar>
    <RevisionsButton diff={<PageDiff />} />
    <EditButton />
  </TopToolbar>
);

export const PageSidebar = () => {
  return (
    <FunctionField
      source="content"
      render={({ content }) => {
        const toc = fromMarkdown(content);

        return (
          <Stack>
            <TOC
              toc={toc}
              renderList={(children) => <ul>{children}</ul>}
              renderListItem={(children) => <li>{children}</li>}
              renderLink={(children) => <a>{children}</a>}
            />
          </Stack>
        );
      }}
    />
  );
};

export const PageShow = () => {
  return (
    <Show aside={<PageSidebar />} actions={<PageShowToolbar />}>
      <Box padding={2}>
        <TextField
          source="title"
          component={({ children }: { children: React.ReactNode }) => (
            <Typography variant="h2" gutterBottom>
              {children}
            </Typography>
          )}
        />

        <Labeled label="Category">
          <ReferenceField source="category_id" reference="categories" />
        </Labeled>

        <Box>
          <MarkdownField source="content" />
        </Box>
      </Box>
    </Show>
  );
};

export const PageEditToolbar = () => (
  <TopToolbar>
    <RevisionsButton diff={<PageDiff />} allowRevert />
    <ShowButton />
  </TopToolbar>
);

export const PageEdit = () => (
  <Edit actions={<PageEditToolbar />}>
    <SimpleFormWithRevision>
      <TextInput source="id" readOnly />
      <TextInput source="title" validate={required()} />
      <PageMarkdownInput source="content" />
      <ReferenceNodeInput source="category_id" reference="categories" />
    </SimpleFormWithRevision>
  </Edit>
);

export const PageCreate = () => (
  <Create>
    <SimpleFormWithRevision>
      <TextInput source="title" validate={required()} />
      <PageMarkdownInput source="content" />
      <ReferenceNodeInput source="category_id" reference="categories" />
    </SimpleFormWithRevision>
  </Create>
);
