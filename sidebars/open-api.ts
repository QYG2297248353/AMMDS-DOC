import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  openApiSidebar: [
    {
      type: 'category',
      label: '使用概述',
      items: [
        'platform-guide/overview',
        'platform-guide/api-key',
      ],
    },
    {
      type: 'category',
      label: '接口详情',
      items: [
        'api-docs/overview',
        'api-docs/system',
        'api-docs/movie',
        'api-docs/translate',
        'api-docs/appendix',
      ],
    },
  ],
};

export default sidebars;
