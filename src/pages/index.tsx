import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src="/img/ammds-transparent.png" alt={translate({ message: 'AMMDS Logo', description: 'AMMDS website logo' })} className={styles.logo} />
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.title" description="AMMDS website title">AMMDS</Translate>
        </Heading>
        <p className="hero__subtitle"><Translate id="homepage.subtitle" description="AMMDS website subtitle">Adult Movie MetaData Scraper</Translate></p>
        <p className={styles.description}>
          <Translate id="homepage.description" description="AMMDS website main description">
            Create an exclusive home theater experience with intelligent scraping metadata, actor recognition, multi-source data matching and more
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/tutorial/quick-start">
            <Translate id="homepage.button.quickStart" description="Quick Start button text">Quick Start</Translate>
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/intro">
            <Translate id="homepage.button.learnMore" description="Learn More button text">Learn More</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const version = siteConfig.customFields?.version || "v1.6.48";

  return (
    <Layout
      title={translate({ message: siteConfig.title, description: 'Website title' })}
      description={translate({ message: 'AMMDS - Adult Movie MetaData Scraper', description: 'Website description' })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />

        {/* Quick Start Guide */}
        <section className={styles.quickStart}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}><Translate id="homepage.quickStart.title" description="Quick Start section title">Quick Start</Translate></Heading>
            <div className="row">
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3><Translate id="homepage.quickStart.installation" description="Installation step title">1. Installation</Translate></h3>
                  <p><Translate id="homepage.quickStart.installation.description" description="Installation step description">Choose the deployment method that suits you best, including Docker, Windows, Linux, etc.</Translate></p>
                  <Link to="/docs/deploy/docker"><Translate id="homepage.quickStart.viewDeployment" description="View Deployment Guide link text">View Deployment Guide</Translate></Link>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3><Translate id="homepage.quickStart.start" description="Quick Start step title">2. Quick Start</Translate></h3>
                  <p><Translate id="homepage.quickStart.start.description" description="Quick Start step description">Get started with AMMDS in just a few simple steps</Translate></p>
                  <Link to="/docs/tutorial/quick-start"><Translate id="homepage.quickStart.viewQuickStart" description="View Quick Start Guide link text">View Quick Start Guide</Translate></Link>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3><Translate id="homepage.quickStart.support" description="Support & Help step title">3. Support & Help</Translate></h3>
                  <p><Translate id="homepage.quickStart.support.description" description="Support & Help step description">Get technical support and answers to common questions about AMMDS</Translate></p>
                  <Link to="/docs/tutorial/support"><Translate id="homepage.quickStart.viewSupport" description="View Support Guide link text">View Support Guide</Translate></Link>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3><Translate id="homepage.quickStart.questions" description="Common Questions step title">4. Common Questions</Translate></h3>
                  <p><Translate id="homepage.quickStart.questions.description" description="Common Questions step description">Find answers to common questions about AMMDS</Translate></p>
                  <Link to="/docs/qa"><Translate id="homepage.quickStart.viewQuestions" description="View Common Questions link text">View Common Questions</Translate></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Support */}
        <section className={styles.community}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}><Translate id="homepage.community.title" description="Community & Support section title">Community & Support</Translate></Heading>
            <p className={styles.sectionDescription}><Translate id="homepage.community.description" description="Community & Support section description">Join our community to get help and support</Translate></p>
            <div className={styles.communityLinks}>
              <a href="https://github.com/QYG2297248353/AMMDS-Docker" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <span className={styles.communityIcon}>🔗</span>
                <span><Translate id="homepage.community.github" description="GitHub link text">GitHub</Translate></span>
              </a>
              <a href="https://t.me/ammds_official" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <span className={styles.communityIcon}>💬</span>
                <span><Translate id="homepage.community.telegramChannel" description="Telegram Channel link text">Telegram Channel</Translate></span>
              </a>
              <a href="https://t.me/+9bvCp3LqLUo1N2Q1" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <span className={styles.communityIcon}>👥</span>
                <span><Translate id="homepage.community.telegramGroup" description="Telegram Group link text">Telegram Group</Translate></span>
              </a>
              <a href="https://discord.gg/sxkpPZzPeJ" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <span className={styles.communityIcon}>🎮</span>
                <span><Translate id="homepage.community.discord" description="Discord link text">Discord</Translate></span>
              </a>
              <a href="https://qm.qq.com/q/ZTXsLnEAM4" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <span className={styles.communityIcon}>💬</span>
                <span><Translate id="homepage.community.qqGroup" description="QQ Group link text">QQ Group</Translate></span>
              </a>
            </div>
          </div>
        </section>

        {/* Sponsorship */}
        <section className={styles.sponsorship}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}><Translate id="homepage.sponsorship.title" description="Sponsorship section title">Sponsorship</Translate></Heading>
            <p className={styles.sectionDescription}><Translate id="homepage.sponsorship.description" description="Sponsorship section description">Your support is our driving force to continue advancing</Translate></p>
            <div className={styles.sponsorshipCard}>
              <div className={styles.sponsorshipContent}>
                <h3><Translate id="homepage.sponsorship.afdian" description="Sponsor AMMDS on 爱发电 title">Sponsor AMMDS on 爱发电</Translate></h3>
                <p><Translate id="homepage.sponsorship.afdian.description" description="Sponsor AMMDS on 爱发电 description">Support AMMDS development and get exclusive benefits</Translate></p>
                <a href="https://afdian.com/a/qyg2297248353" target="_blank" rel="noopener noreferrer" className="button button--secondary button--lg">
                  <Translate id="homepage.sponsorship.afdian.button" description="Go to 爱发电 button text">Go to 爱发电</Translate>
                </a>
              </div>
              <div className={styles.sponsorshipImage}>
                <img src="/img/afd-logo-white.png" alt={translate({ message: '爱发电', description: '爱发电 logo white' })} className={styles.afdLogoWhite} />
                <img src="/img/afd-logo-purple.png" alt={translate({ message: '爱发电', description: '爱发电 logo purple' })} className={styles.afdLogoPurple} />
              </div>
            </div>
          </div>
        </section>

        {/* Latest Updates */}
        <section className={styles.latestUpdates}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}><Translate id="homepage.updates.title" description="Latest Updates section title">Latest Updates</Translate></Heading>
            <p className={styles.sectionDescription}><Translate id="homepage.updates.description" description="Latest Updates section description">Stay up-to-date with the latest developments and version updates of AMMDS</Translate></p>
            <div className="row">
              <div className="col col--8">
                <div className={styles.changelogCard}>
                  <h3><Translate id="homepage.updates.blog" description="Blog Updates title">Blog Updates</Translate></h3>
                  <p><Translate id="homepage.updates.blog.description" description="Blog Updates description">Latest news and updates about AMMDS</Translate></p>
                  <Link to="/blog" className="button button--secondary">
                    <Translate id="homepage.updates.viewBlog" description="View Blog button text">View Blog</Translate>
                  </Link>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.changelogCard}>
                  <h3><Translate id="homepage.updates.version" description="Latest Version title">Latest Version</Translate></h3>
                  <p>
                    <Translate id="homepage.updates.version.prefix" description="Latest Version prefix">AMMDS</Translate> {String(version)}
                  </p>
                  <a href={`https://github.com/QYG2297248353/AMMDS-Docker/releases/tag/${version}`} target="_blank" rel="noopener noreferrer" className="button button--secondary">
                    <Translate id="homepage.updates.viewChangelog" description="View Changelog button text">View Changelog</Translate>
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
