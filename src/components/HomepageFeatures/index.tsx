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
    title: <Translate id="homepage.features.library.title" description="Movie Library Management feature title">影片库管理</Translate>,
    icon: '🎬',
    description: <Translate id="homepage.features.library.description" description="Movie Library Management feature description">支持多种视频格式，自动刮削元数据，打造个性化影片库</Translate>,
  },
  {
    title: <Translate id="homepage.features.actorRecognition.title" description="Automatic Actor Recognition feature title">自动演员识别</Translate>,
    icon: '👤',
    description: <Translate id="homepage.features.actorRecognition.description" description="Automatic Actor Recognition feature description">自动识别影片中的演员信息，提供详细的演员介绍和作品列表</Translate>,
  },
  {
    title: <Translate id="homepage.features.metadataScraping.title" description="Automatic Metadata Scraping feature title">自动元数据刮削</Translate>,
    icon: '📄',
    description: <Translate id="homepage.features.metadataScraping.description" description="Automatic Metadata Scraping feature description">自动从互联网获取影片元数据，包括海报、简介、评分等信息</Translate>,
  },
  {
    title: <Translate id="homepage.features.sharing.title" description="Sharing Functionality feature title">共享功能</Translate>,
    icon: '📤',
    description: <Translate id="homepage.features.sharing.description" description="Sharing Functionality feature description">与朋友或家人共享您的影片库，轻松分享您的影视收藏</Translate>,
  },
  {
    title: <Translate id="homepage.features.plugin.title" description="Plugin Integration feature title">插件集成</Translate>,
    icon: '🔌',
    description: <Translate id="homepage.features.plugin.description" description="Plugin Integration feature description">提供丰富的插件支持，轻松集成现有媒体服务器或播放器</Translate>,
  },
  {
    title: <Translate id="homepage.features.multiSource.title" description="Multi-source Scraping feature title">多源刮削</Translate>,
    icon: '🌐',
    description: <Translate id="homepage.features.multiSource.description" description="Multi-source Scraping feature description">支持从多个数据源刮取影片信息，确保数据全面准确</Translate>,
  },
  {
    title: <Translate id="homepage.features.intelligentMatching.title" description="Intelligent Matching feature title">智能匹配</Translate>,
    icon: '🤖',
    description: <Translate id="homepage.features.intelligentMatching.description" description="Intelligent Matching feature description">通过智能算法自动匹配本地文件与线上元数据，减少人工操作</Translate>,
  },
  {
    title: <Translate id="homepage.features.batchProcessing.title" description="Batch Processing feature title">批量处理</Translate>,
    icon: '⚡',
    description: <Translate id="homepage.features.batchProcessing.description" description="Batch Processing feature description">支持批量处理多个视频文件，提高管理效率</Translate>,
  },
  {
    title: <Translate id="homepage.features.customTags.title" description="Custom Tags feature title">自定义标签</Translate>,
    icon: '🏷️',
    description: <Translate id="homepage.features.customTags.description" description="Custom Tags feature description">支持自定义标签，对影片资源进行个性化分类管理</Translate>,
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
