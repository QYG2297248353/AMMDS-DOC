import { defineConfig, type DefaultTheme } from "vitepress";

export const zhCN = defineConfig({
  lang: "zh-Hans",
  description: "个人影视数据管理平台",
  themeConfig: {
    siteTitle: "AMMDS 文档",
    nav: nav(),

    sidebar: {
      "/guide/": {
        base: "/guide/",
        items: sidebarGuide(),
      },
      "/integration/": {
        base: "/integration/",
        items: sidebarDeploy(),
      },
    },

    editLink: {
      pattern: "https://github.com/QYG2297248353/AMMDS-Docker/edit/main/docs/",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "新疆萌森软件开发工作室提供技术支持",
      copyright: `版权所有 © 2023-${new Date().getFullYear()} <a href="https://beian.miit.gov.cn" rel="noreferrer" target="_blank">新ICP备2023003452号-1</a>`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "使用指南",
      link: "/guide/introduction",
      activeMatch: "/guide/",
    },
    {
      text: "集成",
      link: "/integration/introduction",
      activeMatch: "/integration/",
    },
    {
      text: "发行地址",
      items: [
        {
          text: "GitHub",
          link: "https://github.com/QYG2297248353/AMMDS-Docker",
        },
        {
          text: "Docker Hub",
          link: "https://hub.docker.com/r/QYG2297248353/AMMDS-Docker",
        },
      ],
    },
    {
      text: "博客",
      link: "https://blog.lifebus.top",
    },
    {
      text: "店铺",
      link: "https://store.lifebus.top",
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "概览",
      collapsed: false,
      items: [
        { text: "简介", link: "introduction" },
        { text: "快速开始", link: "quick-start" },
        { text: "支持一下", link: "support-the-project" },
      ],
    },
    {
      text: "部署",
      collapsed: false,
      items: [
        { text: "前言", link: "install-requirements" },
        { text: "Docker", link: "install-docker" },
        { text: "Docker Compose", link: "install-docker-compose" },
      ],
    },
  ];
}
function sidebarDeploy(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "已支持应用",
      collapsed: false,
      items: [{ text: "前言", link: "introduction" }],
    },
    {
      text: "即将支持应用",
      collapsed: false,
      items: [{ text: "前言", link: "introduction" }],
    },
  ];
}

export const zhSearch: DefaultTheme.AlgoliaSearchOptions["locales"] = {
  root: {
    placeholder: "搜索文档",
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        searchBox: {
          resetButtonTitle: "清除查询条件",
          resetButtonAriaLabel: "清除查询条件",
          cancelButtonText: "取消",
          cancelButtonAriaLabel: "取消",
        },
        startScreen: {
          recentSearchesTitle: "搜索历史",
          noRecentSearchesText: "没有搜索历史",
          saveRecentSearchButtonTitle: "保存至搜索历史",
          removeRecentSearchButtonTitle: "从搜索历史中移除",
          favoriteSearchesTitle: "收藏",
          removeFavoriteSearchButtonTitle: "从收藏中移除",
        },
        errorScreen: {
          titleText: "无法获取结果",
          helpText: "你可能需要检查你的网络连接",
        },
        footer: {
          selectText: "选择",
          navigateText: "切换",
          closeText: "关闭",
          searchByText: "搜索提供者",
        },
        noResultsScreen: {
          noResultsText: "无法找到相关结果",
          suggestedQueryText: "你可以尝试查询",
          reportMissingResultsText: "你认为该查询应该有结果？",
          reportMissingResultsLinkText: "点击反馈",
        },
      },
    },
  },
};
