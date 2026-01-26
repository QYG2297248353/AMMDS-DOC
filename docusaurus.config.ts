import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "AMMDS Documentation",
  tagline: "Personal video data management platform",
  favicon: "img/favicon.ico",
  staticDirectories: ["static"],
  future: {
    v4: true,
  },
  url: "https://ammds.lifebus.top",
  baseUrl: "/",
  organizationName: "QYG2297248353",
  projectName: "AMMDS-Doc",
  onBrokenLinks: "throw",
  customFields: {
    version: "v1.6.47",
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-Hans"],
    localeConfigs: {
      en: {
        label: "English",
        htmlLang: "en-US",
      },
      "zh-Hans": {
        label: "简体中文",
        htmlLang: "zh-Hans",
        direction: "ltr",
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/QYG2297248353/AMMDS-Doc/tree/master/",
          lastVersion: "current",
          versions: {
            current: {
              label: "v1.6.47",
            },
            "v1.5.0": {
              label: "v1.5.0",
            },
            "v1.4.0": {
              label: "v1.4.0",
            },
            "v1.3.0": {
              label: "v1.3.0",
            },
            "v1.2.0": {
              label: "v1.2.0",
            },
            "v1.1.0": {
              label: "v1.1.0",
            },
            "v1.0.0": {
              label: "v1.0.0",
            },
          },
        },
        blog: {
          blogTitle: "AMMDS Blog",
          blogDescription: "AMMDS Development Blog",
          showReadingTime: true,
          readingTime: ({ content, locale, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({
              content,
              locale,
              options: { wordsPerMinute: 300 },
            }),
          feedOptions: {
            type: 'all',
            xslt: true,
            copyright: `Copyright © ${new Date().getFullYear()} 新疆萌森软件开发工作室, Inc.`,
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              return defaultCreateFeedItems({
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
          editUrl: "https://github.com/QYG2297248353/AMMDS-Doc/tree/master/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true,
  },
  themeConfig: {
    image: "img/ammds-social-card.png",
    metadata: [
      { name: "description", content: "AMMDS 文档中心" },
      {
        name: "keywords",
        content: "AMMDS, 刮削, 整理, 成人电影, 小姐姐, MDCx, mdc-ng",
      },
      { name: "author", content: "新疆萌森软件开发工作室" },
    ],
    announcementBar: {
      id: "announcement_bar",
      content:
        'AMMDS 1.6.47 (公测版) 已发布！<a target="_blank" rel="noopener noreferrer" href="https://github.com/QYG2297248353/AMMDS-Docker/releases/tag/1.6.47">查看详情</a>',
      textColor: "#091E42",
      isCloseable: true,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      versionPersistence: "localStorage",
      sidebar: {
        hideable: false,
        autoCollapseCategories: true,
      },
    },
    blog: {
      sidebar: {
        groupByYear: true,
      },
    },
    navbar: {
      title: "AMMDS",
      logo: {
        alt: "AMMDS 文档 Logo",
        src: "img/logo.svg",
        href: "https://ammds.lifebus.top",
      },
      items: [
        {
          label: "Guide",
          type: "docSidebar",
          sidebarId: "guideSidebar",
          position: "left",
        },
        {
          label: "Blog",
          to: "/blog",
          position: "left",
        },
        {
          type: 'docsVersionDropdown',
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          href: "https://github.com/QYG2297248353/AMMDS-Docker",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Guide",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Telegram Channel",
              href: "https://t.me/ammds_official",
            },
            {
              label: "Telegram Group",
              href: "https://t.me/+9bvCp3LqLUo1N2Q1",
            },
            {
              label: "Discord",
              href: "https://discord.gg/sxkpPZzPeJ",
            },
            {
              label: "QQ Group",
              href: "https://qm.qq.com/q/ZTXsLnEAM4",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/QYG2297248353/AMMDS-Docker",
            },
            {
              label: "Docker Hub",
              href: "https://hub.docker.com/r/qyg2297248353/ammds",
            },
          ],
        },
      ],
      copyright: `Copyright © 2023-${new Date().getFullYear()} 新疆萌森软件开发工作室`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
