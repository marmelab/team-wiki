import { TreeWithDetails } from "@react-admin/ra-tree";
import { Create } from "./Create.tsx";
import { Edit } from "./Edit";

export const List = () => (
  <TreeWithDetails
    linkTo="edit"
    create={Create}
    edit={Edit}
    allowMultipleRoots
  />
);
