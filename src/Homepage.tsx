import { CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { MarkdownField } from "@react-admin/ra-markdown";
import {
  DateField,
  FunctionField,
  Show,
  SimpleList,
  useGetList,
} from "react-admin";

export const HomepageSidebar = () => {
  const recentRevisions = useGetList("pages_history", {
    sort: {
      field: "date",
      order: "DESC",
    },
    pagination: {
      page: 1,
      perPage: 10,
    },
  });

  return (
    <Stack sx={{ margin: "0 1em", maxWidth: "40%" }}>
      <Typography variant="h4">Recent revisions</Typography>
      <SimpleList
        data={recentRevisions.data}
        linkType={(record) => `/pages/${record.data.id}/show`}
        primaryText={(record) => record.data.title}
        secondaryText={(record) => record.message}
        tertiaryText={(record) => (
          <DateField record={record} source="date" showTime />
        )}
      />
    </Stack>
  );
};

export const Homepage = () => (
  <Show title="Homepage" resource="pages" id="0" aside={<HomepageSidebar />}>
    <FunctionField
      source="title"
      render={({ title }) => <CardHeader title={title} />}
    />
    <CardContent>
      <MarkdownField source="content" />
    </CardContent>
  </Show>
);
