import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id="homepage.features.library.title" description="Movie Library Management feature title">影视库管理</Translate>,
    icon: '🎬',
    description: <Translate id="homepage.features.library.description" description="Movie Library Management feature description">按番号识别本地文件，统一管理标题、简介、海报、剧照与收藏状态</Translate>,
  },
  {
    title: <Translate id="homepage.features.actorRecognition.title" description="Automatic Actor Recognition feature title">剧集与演员</Translate>,
    icon: '👤',
    description: <Translate id="homepage.features.actorRecognition.description" description="Automatic Actor Recognition feature description">支持季集结构与剧集文件匹配，演员资料库自动关联作品</Translate>,
  },
  {
    title: <Translate id="homepage.features.metadataScraping.title" description="Automatic Metadata Scraping feature title">自动元数据刮削</Translate>,
    icon: '📄',
    description: <Translate id="homepage.features.metadataScraping.description" description="Automatic Metadata Scraping feature description">多数据源按优先级回填字段，缺失项可二次补全，统一写入媒体库</Translate>,
  },
  {
    title: <Translate id="homepage.features.comicNovel.title" description="Comic and Novel feature title">漫画与小说</Translate>,
    icon: '📚',
    description: <Translate id="homepage.features.comicNovel.description" description="Comic and Novel feature description">相册与书籍管理、章节阅读进度，支持压缩包导入</Translate>,
  },
  {
    title: <Translate id="homepage.features.subscribe.title" description="Subscribe and Download feature title">订阅与下载</Translate>,
    icon: '🔍',
    description: <Translate id="homepage.features.subscribe.description" description="Subscribe and Download feature description">站点检索、磁力检索与按番号订阅，命中后自动推送到下载器</Translate>,
  },
  {
    title: <Translate id="homepage.features.automation.title" description="Task Automation feature title">任务自动化</Translate>,
    icon: '⚙️',
    description: <Translate id="homepage.features.automation.description" description="Task Automation feature description">扫描、刮削、定时任务与失败重试，全流程留痕可查</Translate>,
  },
  {
    title: <Translate id="homepage.features.plugin.title" description="Plugin Integration feature title">插件集成</Translate>,
    icon: '🔌',
    description: <Translate id="homepage.features.plugin.description" description="Plugin Integration feature description">元数据源、站点索引、下载器、媒体服务器与通知渠道，按需启用</Translate>,
  },
  {
    title: <Translate id="homepage.features.toolbox.title" description="Toolbox feature title">工具箱</Translate>,
    icon: '🧰',
    description: <Translate id="homepage.features.toolbox.description" description="Toolbox feature description">视频转码、字幕识别、海报裁剪、辅种与文件浏览器</Translate>,
  },
  {
    title: <Translate id="homepage.features.openPlatform.title" description="Open Platform feature title">开放能力</Translate>,
    icon: '🔗',
    description: <Translate id="homepage.features.openPlatform.description" description="Open Platform feature description">开放 API、Mihon 阅读器协议与实例互通，方便接入现有系统</Translate>,
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
