import { StickyNoteIcon } from "lucide-react";
import { PageCreate } from "./PageCreate.tsx";
import { PageList } from "./PageList.tsx";
import { PageEdit } from "./PageEdit.tsx";
import { PageShow } from "./PageShow.tsx";

export const pages = {
  icon: StickyNoteIcon,
  list: PageList,
  create: PageCreate,
  edit: PageEdit,
  show: PageShow,
};
