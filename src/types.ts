import type { Identifier } from "react-admin";

export type Page = {
  id: Identifier;
  title: string;
  content: string;
  category_id?: Identifier;
};

export type PageMessage = {
  id: number;
  page_id: number;
  author_id: number;
  date: string;
  message: string;
};

export type Category = {
  id: Identifier;
  name: string;
  description?: string;
  parent_id?: Identifier;
};

export type User = {
  id: Identifier;
  username: string;
  password: string;
  fullName: string;
  avatar: string;
};
