import { ListTreeIcon } from "lucide-react";
import { CategoryList } from "./CategoryList.tsx";
import { CategoryShow } from "./CategoryShow.tsx";
import { CategoryEdit } from "./CategoryEdit.tsx";
import { CategoryCreate } from "./CategoryCreate.tsx";

export const categories = {
  icon: ListTreeIcon,
  list: CategoryList,
  show: CategoryShow,
  create: CategoryCreate,
  edit: CategoryEdit,
};
