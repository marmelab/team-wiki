import fakeRestDataProvider from "ra-data-fakerest";
import { addRevisionMethodsBasedOnRelatedResource } from "@react-admin/ra-history";
import { addTreeMethodsBasedOnParentAndPosition } from "@react-admin/ra-tree";
import { addSearchMethod } from "@react-admin/ra-search";
import type { Category } from "./types";

import data from "./data.json";

const dataProvider1 = fakeRestDataProvider(
  data,
  process.env.NODE_ENV !== "test",
  300,
);

const dataProvider2 = addRevisionMethodsBasedOnRelatedResource(dataProvider1, {
  getRevisionResourceName: (resource) => `${resource}_history`,
});

const dataProvider3 = addTreeMethodsBasedOnParentAndPosition(dataProvider2);

const dataProvider4 = addSearchMethod(
  dataProvider3,
  { pages: { label: "title" }, categories: { label: "name" } },
  "show",
);

const dataProvider5 = {
  ...dataProvider4,
  getRootPath: async (resource: string, params: { childId: number }) => {
    if (resource !== "categories") {
      throw new Error(
        `getAncestorNodes is only supported for the 'categories' resource, got '${resource}'`,
      );
    }
    const { data: tree } = await dataProvider4.getTree(resource);
    const child = tree.find((node: Category) => node.id === params.childId);
    if (!child) {
      return { data: [] };
    }
    const ancestors = [child];
    let current = child;
    while (current && current.parent_id) {
      const parent = tree.find(
        (node: Category) => node.id === current.parent_id,
      );
      if (parent) {
        ancestors.unshift(parent);
      }
      current = parent;
    }
    return { data: ancestors };
  },
};

export const dataProvider = dataProvider5;
