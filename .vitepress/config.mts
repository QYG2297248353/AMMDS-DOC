import { defineConfig } from "vitepress";
import { route } from "./config/config.base.route.mts";
import { markdown } from "./config/config.base.markdown.mts";
import { build } from "./config/config.base.build.mts";
import { zhCN, zhSearch } from "./locales/zhCN";
import { enSearch, enUS } from "./locales/enUS";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...route,
  ...markdown,
  ...build,
  title: "AMMDS 文档",
  description: "个人影视元数据刮削与管理平台",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "script",
      {
        defer: "true",
        src: "https://analytics.lifebus.top/script.js",
        "data-website-id": "dadf3a08-8479-419f-bd00-55f883edd494",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh" }],
    ["meta", { property: "og:title", content: "AMMDS | 个人影视刮削管理平台" }],
    ["meta", { property: "og:site_name", content: "AMMDS 文档" }],
    ["meta", { property: "og:image", content: "/logo.png" }],
    ["meta", { property: "og:url", content: "https://ammds.lifebus.top/" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "AMMDS 是个人私有影视刮削管理平台，支持多源元数据刮削、智能匹配、跨平台管理，打造专属影视库。",
      },
    ],
  ],
  lang: "zh-CN",
  base: "/",
  lastUpdated: true,
  sitemap: {
    hostname: "https://ammds.lifebus.top",
    transformItems(items) {
      return items.filter((item) => !item.url.includes("migration"));
    },
  },
  themeConfig: {
    logo: "/logo.svg",
    siteTitle: "AMMDS",
    i18nRouting: true,
    socialLinks: [
      { icon: "github", link: "https://github.com/QYG2297248353/AMMDS-Docker" },
      { icon: "docker", link: "https://hub.docker.com/r/qyg2297248353/ammds" },
      { icon: "twitter", link: "https://x.com/ms2297248353" },
    ],
    search: {
      provider: "local",
      options: {
        locales: {
          ...zhSearch,
          ...enSearch,
        },
      },
    },
  },
  locales: {
    root: {
      label: "简体中文",
      ...zhCN,
    },
    en: {
      label: "English",
      ...enUS,
    },
  },

  vite: {
    server: {
      open: true,
      host: "127.0.0.1",
      port: 9596,
    },
  },
});
