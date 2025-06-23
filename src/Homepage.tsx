import { CardContent, CardHeader } from "@mui/material";
import { MarkdownField } from "@react-admin/ra-markdown";
import { FunctionField, Show } from "react-admin";

export function Homepage() {
  return (
    <Show title="Homepage" resource="pages" id="0">
      <FunctionField
        source="title"
        render={({ title }) => <CardHeader title={title} />}
      />
      <CardContent>
        <MarkdownField source="content" />
      </CardContent>
    </Show>
  );
}
