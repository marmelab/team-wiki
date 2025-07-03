import {
  CreateButton,
  EditButton,
  RecordRepresentation,
  ReferenceFieldBase,
  ReferenceManyField,
  Show,
  SingleFieldList,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  WithRecord,
  Labeled,
  Link,
  useRecordContext,
  useCreatePath,
} from "react-admin";
import { Typography } from "@mui/material";

import { CategoryTreeForCategory } from "./CategoryTreeForCategory";
import { CategoryItem } from "./CategoryItem";
import { PageItem } from "../pages/PageItem";

const CategoriesShowToolbar = () => (
  <TopToolbar>
    <CategoryTreeForCategory />
    <EditButton />
  </TopToolbar>
);

export const CategoryShow = () => (
  <Show actions={<CategoriesShowToolbar />} title="Categories">
    <SimpleShowLayout gap={2}>
      <Typography variant="h4" gutterBottom>
        Category <RecordRepresentation />
      </Typography>
      <TextField source="description" variant="body1" />
      <Labeled label="Parent category">
        <ReferenceFieldBase source="parent_id" reference="categories">
          <CategoryLink />
        </ReferenceFieldBase>
      </Labeled>
      <ReferenceManyField
        reference="categories"
        target="parent_id"
        label="Subcategories"
        sort={{
          field: "name",
          order: "ASC",
        }}
      >
        <SingleFieldList
          component="ul"
          linkType={false}
          sx={{
            display: "block",
            columnCount: 2,
            columnGap: "2em",
            padding: 0,
            margin: 0,
            listStylePosition: "inside",
          }}
          empty={<Typography>No subcategories</Typography>}
        >
          <CategoryItem />
        </SingleFieldList>
        <WithRecord
          render={(record) => (
            <CreateButton
              label="Add subcategory"
              variant="text"
              state={{ record: { parent_id: record.id } }}
            />
          )}
        />
      </ReferenceManyField>
      <ReferenceManyField
        reference="pages"
        target="category_id"
        label="Pages"
        sort={{
          field: "title",
          order: "ASC",
        }}
      >
        <SingleFieldList
          component="ul"
          linkType={false}
          sx={{
            display: "block",
            columnCount: 2,
            columnGap: "2em",
            padding: 0,
            margin: 0,
            listStylePosition: "inside",
          }}
          empty={<Typography>No page</Typography>}
        >
          <PageItem />
        </SingleFieldList>
        <WithRecord
          render={(record) => (
            <CreateButton
              resource="pages"
              label="Add page"
              variant="text"
              state={{ record: { category_id: record.id } }}
            />
          )}
        />
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

const CategoryLink = () => {
  const category = useRecordContext();
  const createPath = useCreatePath();
  return category ? (
    <Link
      to={createPath({
        resource: "categories",
        type: "show",
        id: category.id,
      })}
    >
      {category.name}
    </Link>
  ) : (
    <Typography>No parent - this is a root category</Typography>
  );
};
