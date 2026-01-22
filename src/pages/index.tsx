import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src="/img/ammds-transparent.png" alt="AMMDS Logo" className={styles.logo} />
        <Heading as="h1" className="hero__title">
          AMMDS
        </Heading>
        <p className="hero__subtitle">Adult Movie MetaData Scraper</p>
        <p className={styles.description}>
          Create an exclusive home theater experience with intelligent scraping metadata, actor recognition, multi-source data matching and more
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/tutorial/quick-start">
            Quick Start
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/intro">
            Learn More
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const version = siteConfig.customFields?.version || "v1.6.47";
  
  return (
    <Layout
      title={siteConfig.title}
      description="AMMDS - Adult Movie MetaData Scraper">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        
        {/* Quick Start Guide */}
        <section className={styles.quickStart}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>Quick Start</Heading>
            <div className="row">
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3>1. Installation</h3>
                  <p>Choose the deployment method that suits you best, including Docker, Windows, Linux, etc.</p>
                  <Link to="/docs/deploy/docker">View Deployment Guide</Link>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3>2. Quick Start</h3>
                  <p>Get started with AMMDS in just a few simple steps</p>
                  <Link to="/docs/tutorial/quick-start">View Quick Start Guide</Link>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3>3. Support & Help</h3>  
                  <p>Get technical support and answers to common questions about AMMDS</p>
                  <Link to="/docs/tutorial/support">View Support Guide</Link>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3>4. Common Questions</h3>
                  <p>Find answers to common questions about AMMDS</p>
                  <Link to="/docs/qa">View Common Questions</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Community & Support */}
        <section className={styles.community}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>Community & Support</Heading>
            <p className={styles.sectionDescription}>Join our community to get help and support</p>
            <div className={styles.communityLinks}>
              <a href="https://github.com/QYG2297248353/AMMDS-Docker" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <span className={styles.communityIcon}>🔗</span>
                <span>GitHub</span>
              </a>
              <a href="https://t.me/ammds_official" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <span className={styles.communityIcon}>💬</span>
                <span>Telegram Channel</span>
              </a>
              <a href="https://t.me/+9bvCp3LqLUo1N2Q1" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <span className={styles.communityIcon}>👥</span>
                <span>Telegram Group</span>
              </a>
              <a href="https://discord.gg/sxkpPZzPeJ" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <span className={styles.communityIcon}>🎮</span>
                <span>Discord</span>
              </a>
              <a href="https://qm.qq.com/q/ZTXsLnEAM4" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <span className={styles.communityIcon}>💬</span>
                <span>QQ Group</span>
              </a>
            </div>
          </div>
        </section>
        
        {/* Sponsorship */}
        <section className={styles.sponsorship}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>Sponsorship</Heading>
            <p className={styles.sectionDescription}>Your support is our driving force to continue advancing</p>
            <div className={styles.sponsorshipCard}>
              <div className={styles.sponsorshipContent}>
                <h3>Sponsor AMMDS on 爱发电</h3>
                <p>Support AMMDS development and get exclusive benefits</p>
                <a href="https://afdian.com/a/qyg2297248353" target="_blank" rel="noopener noreferrer" className="button button--secondary button--lg">
                  Go to 爱发电
                </a>
              </div>
              <div className={styles.sponsorshipImage}>
                <img src="/img/afd-logo-white.png" alt="爱发电" className={styles.afdLogoWhite} />
                <img src="/img/afd-logo-purple.png" alt="爱发电" className={styles.afdLogoPurple} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Latest Updates */}
        <section className={styles.latestUpdates}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>Latest Updates</Heading>
            <p className={styles.sectionDescription}>Stay up-to-date with the latest developments and version updates of AMMDS</p>
            <div className="row">
              <div className="col col--8">
                <div className={styles.changelogCard}>
                  <h3>Blog Updates</h3>
                  <p>Latest news and updates about AMMDS</p>
                  <Link to="/blog" className="button button--secondary">
                    View Blog
                  </Link>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.changelogCard}>
                  <h3>Latest Version</h3>
                  <p>AMMDS {String(version)}</p>
                  <a href={`https://github.com/QYG2297248353/AMMDS-Docker/releases/tag/${version}`} target="_blank" rel="noopener noreferrer" className="button button--secondary">
                    View Changelog
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
