import { Admin, mergeTranslations, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import { raTreeLanguageEnglish } from "@react-admin/ra-tree";
import { Route } from "react-router";
import { ListTreeIcon, StickyNoteIcon } from "lucide-react";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { Layout } from "./Layout";
import {
  PageCreate,
  PageEdit,
  PageList,
  PageShow,
} from "./resources/pages.tsx";
import { appTheme } from "./theme.ts";
import { CategoriesList, CategoriesShow } from "./resources/categories.tsx";
import { PagesMessagesList } from "./resources/pages-messages.tsx";
import {
  UsersCreate,
  UsersEdit,
  UsersList,
  UsersShow,
} from "./resources/users.tsx";

const i18nProvider = polyglotI18nProvider(() => {
  // Always fallback on english
  return mergeTranslations(englishMessages, raTreeLanguageEnglish);
}, "en");

export const App = () => (
  <Admin
    theme={appTheme}
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="categories"
      icon={ListTreeIcon}
      list={CategoriesList}
      show={CategoriesShow}
    />
    <Resource
      name="pages"
      icon={StickyNoteIcon}
      list={PageList}
      edit={PageEdit}
      show={PageShow}
      create={PageCreate}
    >
      <Route path=":id/talk" element={<PagesMessagesList />} />
    </Resource>

    <Resource
      name={"users"}
      list={UsersList}
      show={UsersShow}
      edit={UsersEdit}
      create={UsersCreate}
      recordRepresentation="fullName"
    />
  </Admin>
);
