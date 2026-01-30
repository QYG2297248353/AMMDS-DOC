import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "AMMDS Documentation",
  titleDelimiter: " | ",
  tagline: "Personal video data management platform",
  favicon: "img/favicon.ico",
  url: "https://ammds.lifebus.top",
  baseUrl: "/",
  organizationName: "QYG2297248353",
  projectName: "AMMDS-Docker",
  staticDirectories: ["static"],
  onBrokenLinks: "throw",
  future: {
    v4: true,
  },
  customFields: {
    version: "v1.6.48",
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-Hans", "ja", "ko"],
    localeConfigs: {
      en: {
        label: "English",
        htmlLang: "en-US",
      },
      "zh-Hans": {
        label: "简体中文",
        htmlLang: "zh-Hans",
      },
      ja: {
        label: "日本語",
        htmlLang: "ja-JP",
      },
      ko: {
        label: "한국어",
        htmlLang: "ko-KR",
      },
    },
  },
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "canonical",
        href: "https://ammds.lifebus.top",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://www.google-analytics.com",
      },
    },
    {
      tagName: "script",
      attributes: { type: "application/ld+json" },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "AMMDS",
        url: "https://ammds.lifebus.top",
        logo: "https://ammds.lifebus.top/img/logo.png",
        sameAs: [
          "https://github.com/QYG2297248353/AMMDS-Docker",
          "https://hub.docker.com/r/qyg2297248353/ammds",
          "https://t.me/ammds_official",
        ],
      }),
    },
    {
      tagName: "script",
      attributes: { type: "application/ld+json" },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "AMMDS",
        operatingSystem: "Linux, Windows, macOS",
        applicationCategory: "MultimediaApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "AMMDS 是一个媒体元数据抓取与管理工具，支持 Emby、Jellyfin、Plex。",
        url: "https://ammds.lifebus.top",
      }),
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/QYG2297248353/AMMDS-Doc/tree/master/",
          lastVersion: "current",
          versions: {
            current: {
              label: "最新",
            },
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
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
            type: "all",
            xslt: true,
            copyright: `Copyright © ${new Date().getFullYear()} 新疆萌森软件开发工作室`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
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
        gtag: {
          trackingID: "G-9R3SQ829S2",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    "docusaurus-plugin-image-zoom",
    "./src/plugin/plugin-umami.ts",
    [
      "@docusaurus/plugin-pwa",
      {
        id: "ammds-pwa",
        debug: true,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/pwa/icon-maskable-192.png",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json",
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "rgb(37, 194, 160)",
          },
        ],
      },
    ],
    [
      "@docusaurus/plugin-sitemap",
      {
        id: "ammds-sitemap",
        changefreq: "weekly",
        priority: 0.5,
        ignorePatterns: ["/tags/**"],
      },
    ],
  ],
  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },
  themeConfig: {
    image: "img/ammds-social-card.png",
    metadata: [
      {
        name: "description",
        content:
          "AMMDS 是高效的媒体元数据抓取与整理工具，支持电影/视频自动刮削、海报下载、演员与标签管理，兼容 Emby、Jellyfin、Plex 等服务，助你构建专业媒体库。",
      },
      {
        name: "keywords",
        content:
          "AMMDS, 媒体刮削, Movie metadata scraper, 元数据抓取工具, Emby, Jellyfin, Plex, 媒体库整理, 海报下载, 演员管理, NSFW 内容管理, 自动整理, 影视元数据",
      },
      { name: "author", content: "新疆萌森软件开发工作室" },
      { name: "robots", content: "index, follow" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#4a90e2" },
      { name: "language", content: "zh-CN" },

      // Open Graph (社交媒体分享)
      {
        property: "og:title",
        content: "AMMDS 文档中心 | 媒体元数据刮削与整理工具",
      },
      {
        property: "og:description",
        content:
          "AMMDS 提供高效的媒体刮削、海报下载、演员与标签管理等功能，支持多媒体服务器兼容，提升媒体库管理体验。",
      },
      {
        property: "og:image",
        content: "https://ammds.lifebus.top/img/ammds-social-card.png",
      },
      { property: "og:url", content: "https://ammds.lifebus.top" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "AMMDS Documentation" },
      { property: "og:locale", content: "zh_CN" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:locale:alternate", content: "ja_JP" },
      { property: "og:locale:alternate", content: "ko_KR" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AMMDS 文档中心" },
      {
        name: "twitter:description",
        content: "AMMDS — 强大的媒体元数据抓取与整理工具",
      },
      {
        name: "twitter:image",
        content: "https://ammds.lifebus.top/img/ammds-social-card.png",
      },
      { name: "twitter:site", content: "@MS2297248353" },
    ],
    announcementBar: {
      id: "announcement_bar",
      content:
        '🎉️ <a target="_blank" rel="noopener noreferrer" href="https://github.com/QYG2297248353/AMMDS-Docker/releases/v1.6.48">AMMDS v1.6.48</a> (公测版) 已发布！🥳️',
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
    algolia: {
      appId: "VIZF28CBV3",
      apiKey: "53c721a0594a68372eeb648cf0c59fe2",
      indexName: "ammds",
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: "search",
      insights: false,
    },
    zoom: {
      selector: ".markdown img",
      background: {
        light: "rgb(255, 255, 255)",
        dark: "rgb(50, 50, 50)",
      },
      config: {},
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
          type: "docsVersionDropdown",
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
      additionalLanguages: ["bash", "java", "graphql"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
