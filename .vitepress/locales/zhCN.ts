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
      link: "/guide/overview/introduction",
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
          link: "https://hub.docker.com/r/QYG2297248353/AMMDS",
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
        { text: "简介", link: "overview/introduction" },
        { text: "快速开始", link: "overview/quick-start" },
        { text: "支持一下", link: "overview/support-the-project" },
      ],
    },
    {
      text: "部署",
      collapsed: false,
      items: [
        { text: "前言", link: "deploy/install-requirements" },
        { text: "Docker", link: "deploy/install-docker" },
        { text: "Docker Compose", link: "deploy/install-docker-compose" },
        { text: "1Panel", link: "deploy/install-1panel" },
        { text: "环境变量", link: "deploy/install-environment" },
      ],
    },
    {
      text: "使用教程",
      collapsed: true,
      items: [
        {
          text: "任务管理",
          collapsed: true,
          items: [
            { text: "任务配置", link: "usage/task/config" },
            { text: "扫描日志", link: "usage/task/scan-log" },
            { text: "刮削入库", link: "usage/task/scrape" },
            { text: "刮削日志", link: "usage/task/scrape-log" },
          ],
        },
        {
          text: "媒体管理",
          collapsed: true,
          items: [
            { text: "媒体库", link: "usage/library/media" },
            { text: "演员库", link: "usage/library/actor" },
            { text: "漫画库", link: "usage/library/comics" },
          ],
        },
        {
          text: "订阅检索",
          collapsed: true,
          items: [
            { text: "站点检索", link: "usage/search/site" },
            { text: "订阅管理", link: "usage/search/subscribe" },
          ],
        },
        {
          text: "信息管理",
          collapsed: true,
          items: [
            { text: "RSS 管理", link: "usage/information/rss" },
            { text: "消息管理", link: "usage/information/message" },
            { text: "分享管理", link: "usage/information/share" },
          ],
        },
        {
          text: "集成应用",
          collapsed: true,
          items: [
            {
              text: "元数据",
              collapsed: true,
              items: [
                { text: "MetaTube", link: "usage/integration/MetaTube" },
                { text: "ThePornDB", link: "usage/integration/ThePornDB" },
              ],
            },
            {
              text: "站点检索",
              collapsed: true,
              items: [
                { text: "M-Team", link: "usage/integration/MTeam" },
                { text: "FSM", link: "usage/integration/FSM" },
                { text: "Prowlarr", link: "usage/integration/Prowlarr" },
              ],
            },
            {
              text: "下载器",
              collapsed: true,
              items: [
                { text: "qBittorrent", link: "usage/integration/qBittorrent" },
                { text: "Transmission", link: "usage/integration/Transmission" },
              ],
            },
            {
              text: "推送通知",
              collapsed: true,
              items: [
                { text: "爱语飞飞", link: "usage/integration/IYUU" },
                { text: "Bark", link: "usage/integration/Bark" },
                { text: "Telegram", link: "usage/integration/Telegram" },
              ],
            },
            {
              text: "媒体服务器",
              collapsed: true,
              items: [
                { text: "JellyFin", link: "usage/integration/JellyFin" },
                { text: "Emby", link: "usage/integration/Emby" },
                { text: "飞牛影视", link: "usage/integration/FnMedia" },
              ],
            },
          ],
        },
        {
          text: "工具箱",
          collapsed: true,
          items: [
            {
              text: "PT辅种",
              link: "usage/toolbox/iyuu"
            },
            {
              text: "下载器",
              link: "usage/toolbox/downloader"
            },
          ],
        },
        {
          text: "系统管理",
          collapsed: true,
          items: [
            { text: "标签管理", link: "usage/system/label" },
            { text: "密钥管理", link: "usage/system/secret" },
            { text: "登录日志", link: "usage/system/login" },
            { text: "运行日志", link: "usage/system/runlog" },
          ],
        },
        {
          text: "用户管理",
          collapsed: true,
          items: [
            { text: "用户信息", link: "usage/user/info" },
            { text: "站点认证", link: "usage/user/certification" },
          ],
        },
      ],
    },
    {
      text: "快捷教程",
      collapsed: true,
      items: [
        {
          text: "扫描刮削",
          link: "quick/scan-scrape/scan-scrape",
        },
        {
          text: "自动辅种",
          link: "quick/auto-seed/auto-seed",
        },
      ],
    },
    { text: "常见问题", link: "qa" },
    { text: "更新日志", link: "changelog" },
  ];
}

function sidebarDeploy(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "集成说明",
      link: "introduction",
    },
    {
      text: "AMMDS 助手",
      collapsed: false,
      items: [
        { text: "概述", link: "assistant/overview" },
        { text: "安装", link: "assistant/install" },
        { text: "使用", link: "assistant/usage" },
      ],
    },
    {
      text: "已支持应用",
      collapsed: false,
      items: [
        { text: "MetaTube", link: "support/MetaTube" },
        { text: "ThePornDB", link: "support/ThePornDB" },
        { text: "Prowlarr", link: "support/Prowlarr" },
        { text: "IYUU", link: "support/IYUU" },
      ],
    },
    {
      text: "即将支持应用",
      collapsed: false,
      items: [{ text: "JellyFin", link: "unsupport/JellyFin" }],
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
