import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '影视库管理',
    icon: '🎬',
    description: (
      <>
        支持多种格式的视频文件，自动刮削元数据，打造专属影视库
      </>
    ),
  },
  {
    title: '演员自动识别',
    icon: '👤',
    description: (
      <>
        自动识别影视作品中的演员信息，提供详细的演员资料和作品列表
      </>
    ),
  },
  {
    title: '元数据自动刮削',
    icon: '📄',
    description: (
      <>
        自动从互联网获取影视作品的元数据，包括封面、简介、评分等
      </>
    ),
  },
  {
    title: '分享功能',
    icon: '📤',
    description: (
      <>
        支持将影视库分享给朋友或家人，轻松共享你的影视收藏
      </>
    ),
  },
  {
    title: '插件集成',
    icon: '🔌',
    description: (
      <>
        提供丰富的插件支持，轻松集成到现有的媒体服务器或播放器中
      </>
    ),
  },
  {
    title: '多源刮削',
    icon: '🌐',
    description: (
      <>
        支持从多个数据源刮削影视信息，确保数据全面且准确
      </>
    ),
  },
  {
    title: '智能匹配',
    icon: '🤖',
    description: (
      <>
        通过智能算法自动匹配本地文件与在线元数据，减少手动操作
      </>
    ),
  },
  {
    title: '批量处理',
    icon: '⚡',
    description: (
      <>
        支持批量处理多个影视文件，提高管理效率
      </>
    ),
  },
  {
    title: '自定义标签',
    icon: '🏷️',
    description: (
      <>
        支持自定义标签，便于对影视资源进行个性化分类和管理
      </>
    ),
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
