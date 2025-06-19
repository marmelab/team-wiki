import fakeRestDataProvider from "ra-data-fakerest";
import { addRevisionMethodsBasedOnRelatedResource } from "@react-admin/ra-history";
import { addTreeMethodsBasedOnParentAndPosition } from "@react-admin/ra-tree";
import data from "./data.json";

export const dataProvider = addTreeMethodsBasedOnParentAndPosition(
  addRevisionMethodsBasedOnRelatedResource(
    fakeRestDataProvider(data, process.env.NODE_ENV !== "test", 300),
    {
      getRevisionResourceName: (resource) => `${resource}_history`,
    },
  ),
);
