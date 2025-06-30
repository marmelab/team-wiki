import { useCreatePath, useRecordContext, Link } from "react-admin";
import type { Category } from "../../types";

export const CategoryItem = () => {
  const item = useRecordContext<Category>();
  const createPath = useCreatePath();
  if (!item) return null;
  return (
    <li>
      <Link
        to={createPath({
          resource: "categories",
          type: "show",
          id: item.id,
        })}
      >
        {item.name}
      </Link>
    </li>
  );
};
