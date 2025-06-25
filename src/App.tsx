import { Admin, mergeTranslations, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import englishMessages from "ra-language-english";
import { raTreeLanguageEnglish } from "@react-admin/ra-tree";
import { Route } from "react-router";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { appTheme } from "./theme.ts";
import { Layout } from "./layout";
import { Homepage } from "./Homepage.tsx";
import { LoginPage } from "./LoginPage.tsx";
import { categories } from "./resources/categories";
import { pages } from "./resources/pages";
import { users } from "./resources/users";
import { PageMessagesList } from "./resources/page-messages/PageMessagesList.tsx";

const i18nProvider = polyglotI18nProvider(() => {
  // Always fallback on english
  return mergeTranslations(englishMessages, raTreeLanguageEnglish);
}, "en");

export const App = () => (
  <Admin
    theme={appTheme}
    layout={Layout}
    dashboard={Homepage}
    loginPage={LoginPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource name="categories" {...categories} />
    <Resource name="pages" {...pages}>
      <Route path=":id/talk" element={<PageMessagesList />} />
    </Resource>
    <Resource name={"users"} {...users} />
  </Admin>
);
