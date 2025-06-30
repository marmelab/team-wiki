import { UserList } from "./UserList.tsx";
import { UserCreate } from "./UserCreate.tsx";
import { UserEdit } from "./UserEdit.tsx";

export const users = {
  list: UserList,
  create: UserCreate,
  edit: UserEdit,
  recordRepresentation: "fullName",
};
