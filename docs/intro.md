---
sidebar_position: 0
sidebar_label: "简介"
title: 简介
description: AMMDS 是私有化部署的影视媒体数据中心，覆盖元数据刮削、媒体库管理、订阅下载、插件集成与系统运维，本文介绍其定位、能力边界与文档导航。
keywords: [AMMDS, 影视管理, 媒体库, 元数据刮削, 私有化部署, 文档导航]
tags: []
---

# 简介

本文介绍 AMMDS 的定位、核心能力与文档导航，帮助你在十分钟内判断它是否适合自己，并找到对应的使用说明。

{/* truncate */}

AMMDS（Adult Media Metadata Database System）是一套**私有化部署的影视媒体数据中心**：扫描本地视频文件、识别番号、从多个数据源刮削元数据，再把整理好的结果同步到 Jellyfin / Emby 等媒体服务器。数据全部保存在你自己的机器上，不依赖任何云端账号。

:::warning[使用前提]
本软件为离线产品，数据由用户手动录入与维护。请遵守你所在地区的法律法规，不要在中国境内推广本产品；必要交流时请使用缩写 `AMMDS`。
:::

:::note[网络说明]
元数据刮削、订阅检索、通知推送等能力依赖外网访问。启用任一集成插件即视为你已同意程序按配置访问对应网络服务。
:::

<img src="/img/ammds-social-card.png" alt="AMMDS" style={{ borderRadius: "2em" }} />

## 它解决什么问题

| 痛点 | AMMDS 的做法 |
| --- | --- |
| 文件名混乱、番号写法不统一 | 按识别规则提取番号并归一，同一部片子的多种写法合并为一条记录 |
| 手动整理海报、简介、演员工作量大 | 多数据源自动刮削，缺失字段可按优先级回填补全 |
| 不同媒体服务器元数据格式不一致 | 统一元数据模型，再按 Jellyfin / Emby 的字段规范写入 |
| 资源检索、下载、入库相互割裂 | 订阅 → 检索 → 推送下载器 → 入库 → 同步媒体服务器，全链路串联 |
| 长期运行缺乏可观测性 | 任务记录、运行日志、系统检查与网络连通性诊断 |

## 核心能力

### 媒体库

- **影视**：识别番号、刮削元数据、管理海报/剧照、收藏与标签
- **剧集**：季与集结构、剧集文件匹配、NFO 生成
- **演员**：演员资料库、作品关联、头像与别名
- **系列 / 厂牌**：按系列聚合作品，厂牌规则与别名归并
- **漫画 / 小说**：章节与阅读进度管理，支持压缩包导入
- **标签库**：类型、标签、用户分类三层组织

### 任务管理

- 扫描任务：按目录识别媒体文件，支持定时与目录监听
- 刮削任务：按番号匹配数据源并写回元数据、图片与 NFO
- 任务配置、任务记录与失败重试
- 定时任务（Cron）统一调度

### 订阅检索

- 站点检索：M-Team、Rousi、FSM、NexusPHP、Prowlarr 等
- 磁力检索：BitMagnet
- 订阅管理：按番号订阅、自动匹配、失败重试
- 下载推送：qBittorrent、Transmission，辅种由 IYUU 完成

### 集成应用

按用途分为六类：元数据、站点资源、下载器、推送通知、媒体服务器、辅助工具，共 30+ 个集成项。每个插件都有独立的配置页与连通性测试。

### 前台站点

后台维护的数据会在前台以访客界面呈现，二者共用同一套账号与内容：

- **浏览**：影视、剧集、演员、漫画、小说、资讯的列表与详情
- **阅读**：漫画与小说内置阅读器，记录阅读进度
- **互动**：收藏、订阅、分享页（可带提取码）、用户公共主页
- **商店**：官方商城的商品、购物车、结算与订单查询

详见[前台站点导览](/docs/site/overview)。

### 信息管理

- RSS 订阅与热门 RSS 榜单
- 系统消息与官方通告
- 实例互通（好友、资源共享）
- 分享链接（带提取码与有效期）

### 系统管理

系统配置、系统检查、存储管理、备份恢复、运行日志、登录日志、密钥管理、许可证。

### 开放能力

- **开放 API**：`/api/v1/**`，API Key 鉴权，供第三方程序调用
- **Mihon 接入**：为第三方漫画阅读器提供标准接口
- **Telegram Bot**：通过指令完成检索、订阅、下载与系统控制

## 版本与授权

| 项目 | 说明 |
| --- | --- |
| 当前版本 | 2.0.0 |
| 技术栈 | Java 21、Spring Boot 4、H2/PostgreSQL、Vue 3、TypeScript |
| 部署形态 | Docker、Windows/Linux 原生 JAR、NAS 应用包、GraalVM 原生镜像 |
| 授权 | 专有软件（Proprietary License），非开源 |

:::info[能力边界]
文档只描述当前版本已经实现的功能。规划中的能力（如部分数据源、Plex 同步）不会以"已支持"的口径出现；如果你在界面中找不到文档提到的入口，通常是版本不一致，请先核对版本号。
:::

## 文档怎么读

文档按产品结构分为五块：**快速开始**、**后台功能**、**插件集成**、**前台站点**、**常见问题**。

| 你的目标 | 建议阅读顺序 |
| --- | --- |
| 第一次部署 | [部署方式总览](/docs/getting-started/overview) → [首次登录](/docs/getting-started/first-login) |
| 先熟悉界面 | [后台功能总览](/docs/backend) → [仪表盘](/docs/backend/dashboard/overview) → [前台站点导览](/docs/site/overview) |
| 想先把媒体库跑起来 | [影视](/docs/backend/media/movie) → [扫描任务](/docs/backend/task/scan) → [刮削任务](/docs/backend/task/scrape) |
| 想接入站点与下载器 | [插件总览](/docs/integration/overview) → [M-Team](/docs/integration/indexer/m-team) → [qBittorrent](/docs/integration/downloader/qbittorrent) |
| 想把媒体库开放给家人 | [前台站点导览](/docs/site/overview) → [分享](/docs/site/share) → [用户主页](/docs/site/user) |
| 排查故障 | [系统检查](/docs/backend/system/system-check) → [网络连通性](/docs/backend/dashboard/network) → [常见问题](/docs/faq) |
| 对接第三方程序 | [开发平台](/open-api/getting-started/overview) |

:::tip[文档结构与界面一致]
- **后台功能** 对应登录后的后台菜单：仪表盘、任务、媒体、订阅检索、信息、集成应用、工具箱、系统管理、官方商城。
- **插件集成** 单独成章，因为集成项有 30 多个，且每项都有自己的配置与测试方式。
- **前台站点** 介绍未登录/已登录访客看到的页面，包括分享页与用户主页。
:::

## 加入社区

- [官方网站](https://ammds.lifebus.top/)
- [GitHub 仓库](https://github.com/QYG2297248353/AMMDS-Docker)
- Telegram 频道：[t.me/ammds_official](https://t.me/ammds_official)
- Telegram 群组：[t.me/+9bvCp3LqLUo1N2Q1](https://t.me/+9bvCp3LqLUo1N2Q1)
- Discord：[discord.gg/sxkpPZzPeJ](https://discord.gg/sxkpPZzPeJ)
- QQ 群：[443266144](https://qm.qq.com/q/ZTXsLnEAM4)

## 支持项目

如果你觉得 AMMDS 有帮助，可以通过官方商城购买会员或订阅服务支持持续开发。会员权益与许可证的对应关系见[许可证](/docs/backend/system/license)。
