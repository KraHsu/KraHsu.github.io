import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import HomePage from "./pages/HomePage.vue";
import { createAppI18n, localeFromRoute } from "./i18n";
import { vReveal } from "./directives/reveal";
import "./styles.css";

const routes = [{ path: "/:lang(zh)?/", component: HomePage }];

export const createApp = ViteSSG(
  App,
  {
    routes,
    // Switching language keeps the reader where they are; hash anchors are left to the browser.
    scrollBehavior: (to, from, savedPosition) => savedPosition ?? false,
  },
  ({ app, router }) => {
    const i18n = createAppI18n();
    app.use(i18n).directive("reveal", vReveal);
    router.beforeEach((to) => {
      i18n.global.locale.value = localeFromRoute(to);
    });
  },
);
