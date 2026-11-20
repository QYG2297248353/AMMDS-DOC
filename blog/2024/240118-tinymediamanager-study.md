---
slug: tinymediamanager-study
title: 向 TinyMediaManager 学习：一个成熟刮削工具做对了什么
authors: [studio]
tags: [ammds, comparison, feature]
date: 2024-01-18
---

在立项调研同类工具时，TinyMediaManager（简称 TMM）是我们反复研究的对象。它是一款免费的开源媒体管理工具，用 Java 写成，能跨平台运行在 Windows、Linux 和 macOS 上。它不是我们的竞争对手，而是一本很好的"教科书"。

{/* truncate */}

## 它到底做什么

TMM 的核心定位是：**帮你整理本地媒体库，并把元数据、封面和文件结构准备好**，供 Kodi、Plex、Emby、Jellyfin 等媒体中心使用。换句话说，它和 AMMDS 处在生态里的同一层——都是"整理"，而不是"播放"。

从它的公开功能清单看，几件事做得非常扎实：

- **多来源刮削**：支持 IMDb、TheMovieDB、TVDb、OFDb、Moviemeter、Trakt 等多个元数据源；
- **素材下载**：海报、背景图、Logo，以及来自 FanArt.tv 的艺术图；
- **字幕**：从 OpenSubtitles.org 抓取；
- **技术信息**：用 MediaInfo 库提取编码、时长、分辨率等，写进 NFO；
- **批量重命名**：按用户自定义的格式，自动整理文件名和目录；
- **NFO 输出**：所有信息自动写进 Kodi 兼容的 NFO 文件；
- **双界面**：既有图形界面，也有命令行接口。

## 三个值得学的点

### 第一，数据不锁死在软件里

TMM 把一切都写进 NFO 文件，而不是锁在自己的私有数据库中。这一点我们非常认同——**用户的数据必须能带走**。这也是 AMMDS 坚持标准 NFO 和标准备份包的根本原因。

### 第二，多来源 + 手动修正

它支持多个元数据源，同时允许用户手动编辑任何字段。这个组合很关键：自动刮削负责效率，手动修正负责准确性。我们后来做[优先级规则引擎](/blog/plugin-architecture)时，走的是同一条思路。

### 第三，跨平台靠的是 JVM

TMM 是 Java 应用，依赖 Java 运行时（至少 JRE 8），因此能天然跨平台。这印证了我们在[技术选型](/blog/tech-stack-decision)里看重 Java 生态的判断——只是我们选择了用 GraalVM 把运行时也打包进去，让用户连 JRE 都不用装。

## 我们和它的不同

TMM 是一款桌面应用，而 AMMDS 从一开始就是**自托管 + Web 面板**的形态，跑在 NAS 或常开的设备上，通过浏览器访问。这是产品定位的差异，没有高下之分——如果你只想在本机整理一个文件夹，TMM 很合适；如果你想让整个家庭的设备都能随时管理媒体库，那需要的是 AMMDS 这类服务。

站在巨人的肩膀上，我们才能少走弯路。TMM 验证过的很多做法，今天也体现在 AMMDS 的设计里。

> 说明：本文功能描述依据 TinyMediaManager 公开的项目说明整理，具体功能与授权以官方项目为准。

---

## 接着看

- [三款主流媒体服务器的故事：Plex、Emby 与 Jellyfin](/blog/media-server-landscape)
- [一个 NFO 文件到底是什么](/blog/nfo-files-explained)
- [技术选型：为什么最后是 Java SpringBoot + Vue3](/blog/tech-stack-decision)
