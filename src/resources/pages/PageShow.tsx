import {
  EditButton,
  Labeled,
  ReferenceField,
  ReferenceManyCount,
  Show,
  TextField,
  TopToolbar,
  useRecordContext,
} from "react-admin";
import { Box, Button, Link as MUILink, Stack } from "@mui/material";
import { useLocation, Link as NativeLink } from "react-router";
import { MessagesSquare } from "lucide-react";
import { RevisionsButton } from "@react-admin/ra-history";
import { MarkdownField } from "@react-admin/ra-markdown";
import { fromMarkdown } from "react-markdown-toc";
import { TOC } from "react-markdown-toc/client";
import { HeadingMdNode } from "@toast-ui/editor";
import { slug } from "github-slugger";

import { CategoryTree } from "../categories/CategoryTree.tsx";
import { Diff } from "./Diff.tsx";
import { nodeToString } from "../../utils.ts";
import { UserName } from "../users/UserName.tsx";

export const PageShow = () => {
  const baseUrl = useBaseUrl();
  return (
    <Show aside={<Sidebar />} actions={<ShowToolbar />} title={false}>
      <Box padding={2}>
        <TextField
          source="title"
          variant="h2"
          gutterBottom
          sx={{ fontSize: "2.5em" }}
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

const useBaseUrl = () => {
  const { pathname } = useLocation();

  // Extract the actual page URL from the full pathname (which includes the anchored title).
  let baseUrl = pathname;
  const match = pathname.match(/^(.*)\/at\/.*$/);
  if (match) [, baseUrl] = match;

  return baseUrl;
};

const ShowToolbar = () => {
  const record = useRecordContext();
  return (
    <TopToolbar>
      <CategoryTree />
      <Button
        component={NativeLink}
        to={`/pages/${record?.id}/talk`}
        size="small"
        startIcon={<MessagesSquare size="1em" />}
        sx={{ lineHeight: 1.5 }}
      >
        <ReferenceManyCount
          reference="pages_messages"
          target="page_id"
          sx={{ fontWeight: "bold", mr: 0.5 }}
        />{" "}
        comments
      </Button>
      <RevisionsButton
        diff={<Diff />}
        renderName={(id) => <UserName id={id} />}
      />
      <EditButton />
    </TopToolbar>
  );
};

const Sidebar = () => {
  const baseUrl = useBaseUrl();
  const record = useRecordContext();
  const content = record?.content;
  const toc = fromMarkdown(content);

  return (
    <Stack
      component="ul"
      sx={{
        width: "20em",
        position: "sticky",
        top: "4em",
        pl: "1em",
        mt: 0,
        ["ul"]: {
          margin: 0,
          padding: 0,
        },
        ["li"]: {
          listStyle: "none",
        },
        ["li li"]: {
          margin: "0.5em 0",
          padding: "0 1em",
        },
      }}
    >
      <TOC
        toc={toc}
        renderList={(children) => <ul>{children}</ul>}
        renderListItem={(children) => <li>{children}</li>}
        renderLink={(children, url) => (
          <MUILink href={`#${baseUrl}/at/${url.substring(1)}`}>
            {children}
          </MUILink>
        )}
      />
      <Labeled sx={{ mt: 2 }} label="Category">
        <ReferenceField source="category_id" reference="categories">
          <TextField variant="body1" source="name" />
        </ReferenceField>
      </Labeled>
    </Stack>
  );
};
