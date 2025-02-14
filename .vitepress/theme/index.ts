// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import { Message } from "@arco-design/web-vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // Vue 增强
    app.use(ArcoVue);
    Message._context = app._context;
  },
} satisfies Theme;
