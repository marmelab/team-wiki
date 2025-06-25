import { Stack, Typography } from "@mui/material";
import { FieldDiff, SmartFieldDiff } from "@react-admin/ra-history";

export const Diff = () => (
  <Stack gap={1}>
    <FieldDiff source="title" />
    <Typography component="pre">
      <SmartFieldDiff source="content" />
    </Typography>
  </Stack>
);
