import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// 指南侧边栏。
// 菜单名统一取自各文档的 frontmatter.sidebar_label：专业、简短、名词化；
// 正文标题（title / H1）保留口语化写法，两者分工。
// 结构按使用路径排列：快速开始 → 后台管理 → 集成应用 → 前台站点 → 参考。
const sidebars: SidebarsConfig = {
  guideSidebar: [
    {
      type: 'category',
      label: '快速开始',
      link: {
        type: 'generated-index',
        title: '快速开始',
        slug: '/getting-started',
        description: '从认识项目、选安装方式，到第一次打开并整理出首批影片，按顺序跟着做即可。',
      },
      items: [
        'intro',
        'getting-started/overview',
        'getting-started/docker',
        'getting-started/native',
        'getting-started/launcher',
        'getting-started/nas',
        'getting-started/install-wizard',
        'getting-started/first-login',
        'getting-started/first-library',
        'getting-started/settings',
        'getting-started/license',
      ],
    },
    {
      type: 'category',
      label: '后台管理',
      link: {
        type: 'generated-index',
        title: '后台管理',
        slug: '/backend',
        description: '与登录后后台左侧菜单对应：仪表盘、任务管理、媒体管理、订阅检索、信息管理、生活档案、工具箱、账号、系统管理。',
      },
      items: [
        {
          type: 'category',
          label: '仪表盘',
          link: {
            type: 'generated-index',
            title: '仪表盘',
            slug: '/backend/dashboard',
            description: '登录后第一眼看到的页面，以及网络诊断与榜单。',
          },
          items: ['backend/dashboard/overview', 'backend/dashboard/network'],
        },
        {
          type: 'category',
          label: '任务管理',
          link: {
            type: 'generated-index',
            title: '任务管理',
            slug: '/backend/task',
            description: '文件扫描、元数据刮削与定时任务：让程序自动认识并补齐你的文件。',
          },
          items: ['backend/task/scan', 'backend/task/scrape', 'backend/task/automation'],
        },
        {
          type: 'category',
          label: '媒体管理',
          link: {
            type: 'generated-index',
            title: '媒体管理',
            slug: '/backend/media',
            description: '影片、剧集、演员、漫画、小说，以及系列、厂牌与标签的整理。',
          },
          items: [
            'backend/media/library',
            'backend/media/organize',
            'backend/media/comic',
            'backend/media/information',
            'backend/media/health-check',
          ],
        },
        {
          type: 'category',
          label: '订阅检索',
          link: {
            type: 'generated-index',
            title: '订阅检索',
            slug: '/backend/subscribe',
            description: '搜索资源、订阅更新、推送到下载器并自动入库。',
          },
          items: ['backend/subscribe/search', 'backend/subscribe/downloader'],
        },
        {
          type: 'category',
          label: '信息管理',
          link: {
            type: 'generated-index',
            title: '信息管理',
            slug: '/backend/information',
            description: '系统消息、RSS、分享链接与实例互通。',
          },
          items: ['backend/information/center'],
        },
        'backend/life-archive',
        {
          type: 'category',
          label: '工具箱',
          link: {
            type: 'generated-index',
            title: '工具箱',
            slug: '/backend/toolbox',
            description: '批量处理文件、图片、字幕与转码的工具集合。',
          },
          items: ['backend/toolbox/overview', 'backend/toolbox/media-server'],
        },
        {
          type: 'category',
          label: '个人中心与商城',
          link: {
            type: 'generated-index',
            title: '个人中心与商城',
            slug: '/backend/account',
            description: '个人资料、官方商城与登录安全。',
          },
          items: ['backend/account/overview'],
        },
        {
          type: 'category',
          label: '系统管理',
          link: {
            type: 'generated-index',
            title: '系统管理',
            slug: '/backend/system',
            description: '系统设置、备份恢复，以及系统检查、日志、许可证等日常维护。',
          },
          items: [
            'backend/system/config',
            'backend/system/backup-restore',
            'backend/system/maintenance',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '集成应用',
      link: {
        type: 'generated-index',
        title: '集成应用',
        slug: '/integration',
        description: '影片资料网站、资源站点、下载器、播放器、通知与小工具，每类一页讲清楚。菜单与后台「集成应用」子项对应。',
      },
      items: [
        'integration/overview',
        'integration/metadata',
        'integration/indexer',
        'integration/downloader',
        'integration/media-server',
        'integration/notification',
        'integration/auxiliary',
        'integration/telegram-commands',
      ],
    },
    {
      type: 'category',
      label: '前台站点',
      link: {
        type: 'generated-index',
        title: '前台站点',
        slug: '/site',
        description: '不用登录后台也能看的页面：浏览、分享、商店与个人主页。',
      },
      items: ['site/overview', 'site/browse', 'site/share'],
    },
    'glossary',
    'upgrade',
    'faq',
  ],
};

export default sidebars;
