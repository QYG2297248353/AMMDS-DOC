import { defineConfig, type DefaultTheme } from "vitepress";

export const enUS = defineConfig({
  lang: "en-US",
  description: "Personal video data management platform",
  themeConfig: {
    siteTitle: "AMMDS Documentation",
    nav: nav(),

    sidebar: {
      "/en/guide/": {
        base: "/en/guide/",
        items: sidebarGuide(),
      },
      "/en/integration/": {
        base: "/en/integration/",
        items: sidebarDeploy(),
      },
    },

    editLink: {
      pattern: "https://github.com/QYG2297248353/AMMDS-Docker/edit/main/docs/",
      text: "Edit this page on GitHub",
    },

    footer: {
      message:
        "Technical support provided by Xinjiang Mengsen Software Development Studio",
      copyright: `Copyright © 2023-${new Date().getFullYear()} <a href="https://beian.miit.gov.cn" rel="noreferrer" target="_blank">新ICP备2023003452号-1</a>`,
    },

    docFooter: {
      prev: "Previous",
      next: "Next",
    },

    outline: {
      label: "Page Navigation",
    },

    lastUpdated: {
      text: "Last updated on",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "Languages",
    returnToTopLabel: "Back to Top",
    sidebarMenuLabel: "Menu",
    darkModeSwitchLabel: "Theme",
    lightModeSwitchTitle: "Switch to Light Mode",
    darkModeSwitchTitle: "Switch to Dark Mode",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Guide",
      link: "/en/guide/introduction",
      activeMatch: "/en/guide/",
    },
    {
      text: "Integration",
      link: "/en/integration/introduction",
      activeMatch: "/en/integration/",
    },
    {
      text: "Release",
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
      text: "Blog",
      link: "https://blog.lifebus.top",
    },
    {
      text: "Store",
      link: "https://store.lifebus.top",
    },
  ];
}
function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Overview",
      collapsed: false,
      items: [
        { text: "Introduction", link: "introduction" },
        { text: "Quick start", link: "quick-start" },
        { text: "Support The Project", link: "support-the-project" },
      ],
    },
    {
      text: "Deployment",
      collapsed: false,
      items: [
        { text: "Preface", link: "install-requirements" },
        { text: "Docker", link: "install-docker" },
        { text: "Docker Compose", link: "install-docker-compose" },
      ],
    },
  ];
}
function sidebarDeploy(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Supported Applications",
      collapsed: false,
      items: [{ text: "Preface", link: "introduction" }],
    },
    {
      text: "Upcoming Supported",
      collapsed: false,
      items: [{ text: "Preface", link: "introduction" }],
    },
  ];
}

export const enSearch: DefaultTheme.AlgoliaSearchOptions["locales"] = {
  en: {
    placeholder: "Search documents",
    translations: {
      button: {
        buttonText: "Search documents",
        buttonAriaLabel: "Search documents",
      },
      modal: {
        searchBox: {
          resetButtonTitle: "Clear query",
          resetButtonAriaLabel: "Clear query",
          cancelButtonText: "Cancel",
          cancelButtonAriaLabel: "Cancel",
        },
        startScreen: {
          recentSearchesTitle: "Recent searches",
          noRecentSearchesText: "No recent searches",
          saveRecentSearchButtonTitle: "Save to recent searches",
          removeRecentSearchButtonTitle: "Remove from recent searches",
          favoriteSearchesTitle: "Favorites",
          removeFavoriteSearchButtonTitle: "Remove from favorites",
        },
        errorScreen: {
          titleText: "Unable to fetch results",
          helpText: "You might want to check your internet connection",
        },
        footer: {
          selectText: "Select",
          navigateText: "Navigate",
          closeText: "Close",
          searchByText: "Search provider",
        },
        noResultsScreen: {
          noResultsText: "No relevant results found",
          suggestedQueryText: "You may try searching for",
          reportMissingResultsText:
            "Do you think this query should have results?",
          reportMissingResultsLinkText: "Report missing results",
        },
      },
    },
  },
};
