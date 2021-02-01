//Pages

import SettingsPage from "./pages/settings.vue"

import NotFoundPage from "./pages/404.vue";

//Panels
import DataPanel from "./panels/data.vue"

const routes = [
  {
    path: "/settings/",
    component: SettingsPage
  },
  {
    path: '/panel/data/',
    component: DataPanel
  },
  {
    path: "(.*)",
    component: NotFoundPage
  }
];

export default routes;
