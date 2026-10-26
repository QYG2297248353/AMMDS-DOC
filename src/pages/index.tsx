import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Translate, { translate } from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src="/img/ammds-transparent.png" alt={translate({ message: 'AMMDS Logo', description: 'AMMDS website logo' })} className={styles.logo} />
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.title" description="AMMDS website title">AMMDS</Translate>
        </Heading>
        <p className="hero__subtitle"><Translate id="homepage.subtitle" description="AMMDS website subtitle">私人影视媒体数据中心</Translate></p>
        <p className={styles.description}>
          <Translate id="homepage.description" description="AMMDS website main description">
            从扫描识别、元数据刮削到订阅下载与媒体服务器同步，把私人影视收藏整理成可长期维护的媒体库
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/overview">
            <Translate id="homepage.button.quickStart" description="Quick Start button text">快速开始</Translate>
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/intro">
            <Translate id="homepage.button.learnMore" description="Learn More button text">了解更多</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const version = siteConfig.customFields?.version || 'v2.0.0';

  return (
    <Layout
      title={translate({ message: 'AMMDS 官方文档', description: 'Website title' })}
      description={translate({ message: 'AMMDS - 私人影视媒体数据中心', description: 'Website description' })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />

        {/* Quick Start Guide */}
        <section className={styles.quickStart}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}><Translate id="homepage.quickStart.title" description="Quick Start section title">快速开始</Translate></Heading>
            <div className="row">
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3><Translate id="homepage.quickStart.installation" description="Installation step title">1. 安装部署</Translate></h3>
                  <p><Translate id="homepage.quickStart.installation.description" description="Installation step description">Docker、Windows / Linux 原生运行、NAS 应用包与 GraalVM 原生镜像</Translate></p>
                  <Link to="/docs/getting-started/docker"><Translate id="homepage.quickStart.viewDeployment" description="View Deployment Guide link text">查看部署指南</Translate></Link>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3><Translate id="homepage.quickStart.start" description="Quick Start step title">2. 首次配置</Translate></h3>
                  <p><Translate id="homepage.quickStart.start.description" description="Quick Start step description">登录后按顺序完成基础配置，再开始扫描与刮削</Translate></p>
                  <Link to="/docs/getting-started/first-login"><Translate id="homepage.quickStart.viewQuickStart" description="View Quick Start Guide link text">查看首次配置</Translate></Link>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3><Translate id="homepage.quickStart.support" description="Support section title">3. 故障排查</Translate></h3>
                  <p><Translate id="homepage.quickStart.support.description" description="Support step description">从系统检查与网络连通性入手定位问题</Translate></p>
                  <Link to="/docs/system/system-check"><Translate id="homepage.quickStart.viewSupport" description="View Support Guide link text">查看系统检查</Translate></Link>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.quickStartCard}>
                  <h3><Translate id="homepage.quickStart.questions" description="Common Questions step title">4. 常见问题</Translate></h3>
                  <p><Translate id="homepage.quickStart.questions.description" description="Common Questions step description">部署、刮削、订阅与备份的常见问题汇总</Translate></p>
                  <Link to="/docs/faq"><Translate id="homepage.quickStart.viewQuestions" description="View Common Questions link text">查看常见问题</Translate></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Support */}
        <section className={styles.community}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}><Translate id="homepage.community.title" description="Community & Support section title">社区与支持</Translate></Heading>
            <p className={styles.sectionDescription}><Translate id="homepage.community.description" description="Community & Support section description">加入我们的社区，获取帮助与支持</Translate></p>
            <div className={styles.communityLinks}>
              <a href="https://github.com/QYG2297248353/AMMDS-Docker" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <img src="/img/app/GitHub.svg" alt="GitHub" className={styles.communityIcon} />
                <span><Translate id="homepage.community.github" description="GitHub link text">GitHub</Translate></span>
              </a>
              <a href="https://t.me/ammds_official" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <img src="/img/app/Telegram.svg" alt="Telegram" className={styles.communityIcon} />
                <span><Translate id="homepage.community.telegramChannel" description="Telegram Channel link text">Telegram 频道</Translate></span>
              </a>
              <a href="https://t.me/+9bvCp3LqLUo1N2Q1" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <img src="/img/app/Telegram.svg" alt="Telegram" className={styles.communityIcon} />
                <span><Translate id="homepage.community.telegramGroup" description="Telegram Group link text">Telegram 群组</Translate></span>
              </a>
              <a href="https://discord.gg/sxkpPZzPeJ" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <img src="/img/app/Discord.svg" alt="Discord" className={styles.communityIcon} />
                <span><Translate id="homepage.community.discord" description="Discord link text">Discord</Translate></span>
              </a>
              <a href="https://qm.qq.com/q/ZTXsLnEAM4" target="_blank" rel="noopener noreferrer" className={styles.communityLink}>
                <img src="/img/app/QQ.svg" alt="QQ" className={styles.communityIcon} />
                <span><Translate id="homepage.community.qqGroup" description="QQ Group link text">QQ 群</Translate></span>
              </a>
            </div>
          </div>
        </section>

        {/* Sponsorship */}
        <section className={styles.sponsorship}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}><Translate id="homepage.sponsorship.title" description="Sponsorship section title">赞助支持</Translate></Heading>
            <p className={styles.sectionDescription}><Translate id="homepage.sponsorship.description" description="Sponsorship section description">您的支持是我们持续前进的动力</Translate></p>
            <div className={styles.sponsorshipCard}>
              <div className={styles.sponsorshipImage}>
                <img src="/img/logo.svg" alt="AMMDS Logo" className={styles.sponsorshipLogo} />
              </div>
              <div className={styles.sponsorshipContent}>
                <h3><Translate id="homepage.sponsorship.store" description="Online Store title">前往在线商店</Translate></h3>
                <p><Translate id="homepage.sponsorship.store.description" description="Online Store description">购买产品和服务，支持 AMMDS 发展</Translate></p>
                <a href="https://store.ammds.lifebus.top/" target="_blank" rel="noopener noreferrer" className="button button--secondary button--lg">
                  <Translate id="homepage.sponsorship.store.button" description="Go to Store button text">前往商店</Translate>
                </a>
              </div>
              <div className={styles.sponsorshipImage}>
                <img src="/img/wechat-support.jpg" alt="微信赞赏码" className={styles.wechatQr} />
              </div>
            </div>
          </div>
        </section>

        {/* Latest Updates */}
        <section className={styles.latestUpdates}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}><Translate id="homepage.updates.title" description="Latest Updates section title">最新动态</Translate></Heading>
            <p className={styles.sectionDescription}><Translate id="homepage.updates.description" description="Latest Updates section description">了解 AMMDS 的最新动态和版本更新</Translate></p>
            <div className="row">
              <div className="col col--8">
                <div className={styles.changelogCard}>
                  <h3><Translate id="homepage.updates.blog" description="Blog Updates title">博客更新</Translate></h3>
                  <p><Translate id="homepage.updates.blog.description" description="Blog Updates description">关于 AMMDS 的最新消息和更新</Translate></p>
                  <Link to="/blog" className="button button--secondary">
                    <Translate id="homepage.updates.viewBlog" description="View Blog button text">查看博客</Translate>
                  </Link>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.changelogCard}>
                  <h3><Translate id="homepage.updates.version" description="Latest Version title">最新版本</Translate></h3>
                  <p>
                    <Translate id="homepage.updates.version.prefix" description="Latest Version prefix">AMMDS</Translate> {String(version)}
                  </p>
                  <a href={`https://github.com/QYG2297248353/AMMDS-Docker/releases/tag/${version}`} target="_blank" rel="noopener noreferrer" className="button button--secondary">
                    <Translate id="homepage.updates.viewChangelog" description="View Changelog button text">查看更新日志</Translate>
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
