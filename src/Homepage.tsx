import { Avatar, Box, CardContent, Stack, Typography } from "@mui/material";
import { MarkdownField } from "@react-admin/ra-markdown";
import {
  CreateButton,
  DateField,
  TextField,
  Link,
  ListBase,
  Show,
  WithRecord,
  SingleFieldList,
  ReferenceField,
  RecordRepresentation,
  useRecordContext,
} from "react-admin";

export const Homepage = () => (
  <Show
    title="Homepage"
    resource="pages"
    id="0"
    aside={<HomepageSidebar />}
    actions={
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "end", my: 2 }}
      >
        <Link to="/categories">Categories</Link>
        <Link to="/pages">All pages</Link>
        <CreateButton resource="pages" />
      </Stack>
    }
  >
    <CardContent>
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
        <MarkdownField source="content" />
      </Box>
    </CardContent>
  </Show>
);

const HomepageSidebar = () => (
  <Stack sx={{ margin: "0 1em", maxWidth: "30%" }}>
    <Typography variant="h5" gutterBottom>
      Recent revisions
    </Typography>
    <ListBase
      resource="pages_history"
      sort={{ field: "date", order: "DESC" }}
      disableSyncWithLocation
    >
      <SingleFieldList gap={2} linkType={false}>
        <Change />
      </SingleFieldList>
    </ListBase>
  </Stack>
);

const Change = () => {
  const record = useRecordContext();
  return (
    <Link to={`/pages/${record?.data.id}/show`} sx={{ textDecoration: "none" }}>
      <TextField
        source="data.title"
        variant="body1"
        component="div"
        sx={{ fontWeight: "600" }}
      />
      <TextField source="message" variant="body1" color="textDisabled" />
      <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
        <ReferenceField source="authorId" reference="users" link={false}>
          <WithRecord
            render={(record: any) => (
              <Avatar src={record.avatar} sx={{ width: 24, height: 24 }} />
            )}
          />
        </ReferenceField>
        <ReferenceField source="authorId" reference="users" link={false}>
          <Typography color="textDisabled">
            <RecordRepresentation /> on
          </Typography>
        </ReferenceField>
        <DateField source="date" color="textDisabled" variant="body1" />
      </Stack>
    </Link>
  );
};
