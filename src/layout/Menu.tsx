import { MultiLevelMenu } from "@react-admin/ra-navigation";
import { HomeIcon, ListTreeIcon, StickyNoteIcon } from "lucide-react";
import { TreeRecord, useGetTree } from "@react-admin/ra-tree";

const RecursiveMenuItem = ({
  category,
  tree,
}: {
  category: TreeRecord;
  tree: TreeRecord[];
}) => {
  return (
    <MultiLevelMenu.Item
      name={`categories.${category.id}`}
      label={category.name}
      to={`/categories/${category.id}/show`}
    >
      {category.children?.map((childIdentifier) => {
        const child = tree.find((category) => childIdentifier == category.id);

        return child ? (
          <RecursiveMenuItem
            key={childIdentifier}
            category={child}
            tree={tree}
          />
        ) : null;
      })}
    </MultiLevelMenu.Item>
  );
};

export const Menu = () => {
  const tree = useGetTree("categories");

  return (
    <MultiLevelMenu>
      <MultiLevelMenu.DashboardItem icon={<HomeIcon />} label="Home" />

      <MultiLevelMenu.Item
        name="categories"
        icon={<ListTreeIcon />}
        label="Categories"
        to="/categories"
      />
      <MultiLevelMenu.Item
        name="pages"
        icon={<StickyNoteIcon />}
        label="All Pages"
        to="/pages"
      />

      {tree.data?.map(
        (category) =>
          !category.parent_id && (
            <RecursiveMenuItem category={category} tree={tree.data} />
          ),
      )}
    </MultiLevelMenu>
  );
};
