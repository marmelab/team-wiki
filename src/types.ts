import type { Identifier } from "react-admin";

export type Page = {
  id: Identifier;
  title: string;
  content: string;
  category_id?: Identifier;
};

export type Category = {
  id: Identifier;
  name: string;
  description?: string;
  parent_id?: Identifier;
};
