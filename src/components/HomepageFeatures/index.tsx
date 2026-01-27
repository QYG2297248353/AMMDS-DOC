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
    title: <Translate id="homepage.features.library.title" description="Movie Library Management feature title">Movie Library Management</Translate>,
    icon: '🎬',
    description: <Translate id="homepage.features.library.description" description="Movie Library Management feature description">Supports multiple video formats, automatically scrapes metadata, and creates a personalized movie library</Translate>,
  },
  {
    title: <Translate id="homepage.features.actorRecognition.title" description="Automatic Actor Recognition feature title">Automatic Actor Recognition</Translate>,
    icon: '👤',
    description: <Translate id="homepage.features.actorRecognition.description" description="Automatic Actor Recognition feature description">Automatically recognizes actor information in films and provides detailed actor profiles and filmography</Translate>,
  },
  {
    title: <Translate id="homepage.features.metadataScraping.title" description="Automatic Metadata Scraping feature title">Automatic Metadata Scraping</Translate>,
    icon: '📄',
    description: <Translate id="homepage.features.metadataScraping.description" description="Automatic Metadata Scraping feature description">Automatically retrieves metadata for films from the internet, including posters, summaries, ratings, etc.</Translate>,
  },
  {
    title: <Translate id="homepage.features.sharing.title" description="Sharing Functionality feature title">Sharing Functionality</Translate>,
    icon: '📤',
    description: <Translate id="homepage.features.sharing.description" description="Sharing Functionality feature description">Share your movie library with friends or family, easily share your film collection</Translate>,
  },
  {
    title: <Translate id="homepage.features.plugin.title" description="Plugin Integration feature title">Plugin Integration</Translate>,
    icon: '🔌',
    description: <Translate id="homepage.features.plugin.description" description="Plugin Integration feature description">Offers rich plugin support, easily integrates with existing media servers or players</Translate>,
  },
  {
    title: <Translate id="homepage.features.multiSource.title" description="Multi-source Scraping feature title">Multi-source Scraping</Translate>,
    icon: '🌐',
    description: <Translate id="homepage.features.multiSource.description" description="Multi-source Scraping feature description">Supports scraping film information from multiple data sources, ensuring comprehensive and accurate data</Translate>,
  },
  {
    title: <Translate id="homepage.features.intelligentMatching.title" description="Intelligent Matching feature title">Intelligent Matching</Translate>,
    icon: '🤖',
    description: <Translate id="homepage.features.intelligentMatching.description" description="Intelligent Matching feature description">Automatically matches local files with online metadata through intelligent algorithms, reducing manual operations</Translate>,
  },
  {
    title: <Translate id="homepage.features.batchProcessing.title" description="Batch Processing feature title">Batch Processing</Translate>,
    icon: '⚡',
    description: <Translate id="homepage.features.batchProcessing.description" description="Batch Processing feature description">Supports batch processing of multiple video files, improving management efficiency</Translate>,
  },
  {
    title: <Translate id="homepage.features.customTags.title" description="Custom Tags feature title">Custom Tags</Translate>,
    icon: '🏷️',
    description: <Translate id="homepage.features.customTags.description" description="Custom Tags feature description">Supports custom tags for personalized classification and management of film resources</Translate>,
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
