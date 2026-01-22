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
    title: 'Movie Library Management',
    icon: '🎬',
    description: (
      <>
        Supports multiple video formats, automatically scrapes metadata, and creates a personalized movie library
      </>
    ),
  },
  {
    title: 'Automatic Actor Recognition',
    icon: '👤',
    description: (
      <>
        Automatically recognizes actor information in films and provides detailed actor profiles and filmography
      </>
    ),
  },
  {
    title: 'Automatic Metadata Scraping',
    icon: '📄',
    description: (
      <>
        Automatically retrieves metadata for films from the internet, including posters, summaries, ratings, etc.
      </>
    ),
  },
  {
    title: 'Sharing Functionality',
    icon: '📤',
    description: (
      <>
        Share your movie library with friends or family, easily share your film collection
      </>
    ),
  },
  {
    title: 'Plugin Integration',
    icon: '🔌',
    description: (
      <>
        Offers rich plugin support, easily integrates with existing media servers or players
      </>
    ),
  },
  {
    title: 'Multi-source Scraping',
    icon: '🌐',
    description: (
      <>
        Supports scraping film information from multiple data sources, ensuring comprehensive and accurate data
      </>
    ),
  },
  {
    title: 'Intelligent Matching',
    icon: '🤖',
    description: (
      <>
        Automatically matches local files with online metadata through intelligent algorithms, reducing manual operations
      </>
    ),
  },
  {
    title: 'Batch Processing',
    icon: '⚡',
    description: (
      <>
        Supports batch processing of multiple video files, improving management efficiency
      </>
    ),
  },
  {
    title: 'Custom Tags',
    icon: '🏷️',
    description: (
      <>
        Supports custom tags for personalized classification and management of film resources
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
