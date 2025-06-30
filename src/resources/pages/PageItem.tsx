import { useCreatePath, useRecordContext, Link } from "react-admin";
import type { Page } from "../../types";

export const PageItem = () => {
  const item = useRecordContext<Page>();
  const createPath = useCreatePath();
  if (!item) return null;
  return (
    <li>
      <Link
        to={createPath({
          resource: "pages",
          type: "show",
          id: item.id,
        })}
      >
        {item.title}
      </Link>
    </li>
  );
};
