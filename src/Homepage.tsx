import { CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { MarkdownField } from "@react-admin/ra-markdown";
import {
  DateField,
  FunctionField,
  Link,
  ListBase,
  Show,
  SimpleList,
} from "react-admin";

export const HomepageSidebar = () => (
  <Stack sx={{ margin: "0 1em", maxWidth: "30%" }}>
    <Typography variant="h5">Recent revisions</Typography>
    <ListBase
      resource="pages_history"
      sort={{ field: "date", order: "DESC" }}
      disableSyncWithLocation
    >
      <SimpleList
        rowClick={(_id, _resource, record) => `/pages/${record.data.id}/show`}
        primaryText={(record) => record.data.title}
        secondaryText={(record) => record.message}
        tertiaryText={(record) => (
          <DateField record={record} source="date" showTime />
        )}
        disablePadding
      />
    </ListBase>
  </Stack>
);

export const Homepage = () => (
  <Show
    title="Homepage"
    resource="pages"
    id="0"
    aside={<HomepageSidebar />}
    actions={
      <Stack direction="row" spacing={1} sx={{ justifyContent: "end", my: 2 }}>
        <Link to="/categories">Categories</Link>
        <Link to="/pages">All pages</Link>
      </Stack>
    }
  >
    <FunctionField
      source="title"
      render={({ title }) => <CardHeader title={title} />}
    />
    <CardContent>
      <MarkdownField source="content" />
    </CardContent>
  </Show>
);
