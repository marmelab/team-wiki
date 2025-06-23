import fakeRestDataProvider from "ra-data-fakerest";
import { addRevisionMethodsBasedOnRelatedResource } from "@react-admin/ra-history";
import { addTreeMethodsBasedOnParentAndPosition } from "@react-admin/ra-tree";
import { addSearchMethod } from "@react-admin/ra-search";
import data from "./data.json";

export const dataProvider = addSearchMethod(
  addTreeMethodsBasedOnParentAndPosition(
    addRevisionMethodsBasedOnRelatedResource(
      fakeRestDataProvider(data, process.env.NODE_ENV !== "test", 300),
      {
        getRevisionResourceName: (resource) => `${resource}_history`,
      },
    ),
  ),
  {
    pages: {
      label: "title",
    },
    categories: {
      label: "name",
    },
  },
  "show",
);
