async function umamiPlugin() {
  return {
    name: "docusaurus-umami-plugin",

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: "https://analytics.lifebus.top/",
            },
          },
          {
            tagName: "script",
            attributes: {
              defer: true,
              src: "https://analytics.lifebus.top/script.js",
              "data-website-id": "dadf3a08-8479-419f-bd00-55f883edd494",
            },
          },
        ],
      };
    },
  };
}

export default umamiPlugin;
