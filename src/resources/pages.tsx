import React from "react";
import {
  DataTable,
  List,
  Edit,
  TextInput,
  ReferenceField,
  Show,
  TextField,
  TopToolbar,
  EditButton,
  ShowButton,
  FunctionField,
  Create,
  required,
  useGetOne,
} from "react-admin";
import { MarkdownField } from "@react-admin/ra-markdown";
import {
  FieldDiff,
  RevisionsButton,
  SimpleFormWithRevision,
} from "@react-admin/ra-history";
import { Box, Link, Stack, Typography } from "@mui/material";
import { fromMarkdown } from "react-markdown-toc";
import { TOC } from "react-markdown-toc/client";
import { ReferenceNodeInput } from "@react-admin/ra-tree";
import { useLocation, useParams } from "react-router";
import { HeadingMdNode } from "@toast-ui/editor";
import { slug } from "github-slugger";

import { PageMarkdownInput } from "../inputs/PageMarkdownInput.tsx";
import { nodeToString } from "../utils.ts";
import { useDefineAppLocation } from "@react-admin/ra-navigation";

export const PageList = () => (
  <List
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

const useBaseUrl = () => {
  const { pathname } = useLocation();

  // Extract the actual page URL from the full pathname (which includes the anchored title).
  let baseUrl = pathname;
  const match = pathname.match(/^(.*)\/at\/.*$/);
  if (match) [, baseUrl] = match;

  return baseUrl;
};

export const PageSidebar = () => {
  const baseUrl = useBaseUrl();

  return (
    <FunctionField
      source="content"
      render={({ content }) => {
        const toc = fromMarkdown(content);

        return (
          <Stack
            sx={{
              width: "20em",
              position: "sticky",
              top: "4em",

              ["ul"]: {
                margin: 0,
                padding: 0,
              },
              ["li"]: {
                margin: "0.5em 0",
                padding: "0 1em",
                listStyle: "none",
              },
            }}
          >
            <TOC
              toc={toc}
              renderList={(children) => <ul>{children}</ul>}
              renderListItem={(children) => <li>{children}</li>}
              renderLink={(children, url) => (
                <Link href={`#${baseUrl}/at/${url.substring(1)}`}>
                  {children}
                </Link>
              )}
            />
          </Stack>
        );
      }}
    />
  );
};

export const PageShow = () => {
  const baseUrl = useBaseUrl();

  const { id: pageId } = useParams<{ id: string }>();
  const { data: page } = useGetOne("pages", { id: pageId });
  const { data: category } = useGetOne("categories", { id: page?.category_id });
  useDefineAppLocation(
    (category.parent_id ? "nested." : "") + "category.page",
    { page, category },
  );

  return (
    <Show aside={<PageSidebar />} actions={<PageShowToolbar />} title={false}>
      <Box padding={2}>
        <TextField
          source="title"
          component={({ children }: { children: React.ReactNode }) => (
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontSize: "2.5em",
                textAlign: "center",
              }}
            >
              {children}
            </Typography>
          )}
        />

        <Box>
          <MarkdownField
            source="content"
            customHTMLRenderer={{
              heading(node, context) {
                return {
                  type: context.entering ? "openTag" : "closeTag",
                  tagName: `h${(node as HeadingMdNode).level}`,
                  attributes: {
                    id: `${baseUrl}/at/${slug(nodeToString(node))}`,
                  },
                };
              },
            }}
          />
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
  <Edit actions={<PageEditToolbar />} title={"Edit Page"}>
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
