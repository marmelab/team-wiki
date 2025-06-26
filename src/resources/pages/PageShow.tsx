import {
  EditButton,
  Link,
  ReferenceManyCount,
  Show,
  TextField,
  TopToolbar,
  useDataProvider,
  useGetOne,
  useRecordContext,
} from "react-admin";
import {
  Box,
  Breadcrumbs,
  Button,
  Link as MUILink,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useParams, Link as NativeLink } from "react-router";
import { MessagesSquare } from "lucide-react";
import { RevisionsButton } from "@react-admin/ra-history";
import { useDefineAppLocation } from "@react-admin/ra-navigation";
import { MarkdownField } from "@react-admin/ra-markdown";
import { fromMarkdown } from "react-markdown-toc";
import { TOC } from "react-markdown-toc/client";
import { HeadingMdNode } from "@toast-ui/editor";
import { slug } from "github-slugger";
import { useQuery } from "@tanstack/react-query";

import type { Category } from "../../types";
import { Diff } from "./Diff.tsx";
import { nodeToString } from "../../utils.ts";

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
      <RevisionsButton diff={<Diff />} />
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
        pl: 0,
        mt: 0,
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
          <MUILink href={`#${baseUrl}/at/${url.substring(1)}`}>
            {children}
          </MUILink>
        )}
      />
    </Stack>
  );
};

export const PageShow = () => {
  const baseUrl = useBaseUrl();

  const { id: pageId } = useParams<{ id: string }>();
  const { data: page } = useGetOne("pages", { id: pageId });
  const { data: category } = useGetOne("categories", { id: page?.category_id });
  useDefineAppLocation(
    (category?.parent_id ? "nested." : "") + "category.page",
    { page, category },
  );

  return (
    <Show aside={<Sidebar />} actions={<ShowToolbar />} title={false}>
      <Box padding={2}>
        <TextField
          source="title"
          variant="h2"
          gutterBottom
          sx={{
            fontSize: "2.5em",
            textAlign: "center",
          }}
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

const CategoryTree = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const { data: ancestors } = useQuery<{ data: Category[] }>({
    queryKey: ["categories", "getAncestorNodes", record?.category_id],
    queryFn: () =>
      dataProvider.getRootPath("categories", { childId: record?.category_id }),
  });
  return (
    <Breadcrumbs sx={{ flexGrow: 1 }}>
      <Link to={`/`}>Home</Link>
      {ancestors?.data?.map((ancestor) => (
        <Link key={ancestor.id} to={`/categories/${ancestor.id}/show`}>
          {ancestor.name}
        </Link>
      ))}
      <Typography color="textSecondary">{record?.title}</Typography>
    </Breadcrumbs>
  );
};
