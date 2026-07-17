---
slug: nsfw-platform-comparison
title: NSFW 观影平台横向对比：SakuraMedia vs Stash vs AMMDS
authors: [ms]
tags: [comparison, feature]
date: 2025-09-20
---

NSFW 内容管理是一个需求旺盛但工具选择相对有限的赛道。长期以来，Stash 几乎是唯一被广泛认可的开源方案。但近两年，SakuraMedia 和 AMMDS 的崛起正在改变这一格局。本文将从多维度对这三款工具进行横向对比。

{/* truncate */}

## 参评工具简介

### Stash

[Stash](https://github.com/stashapp/stash) 是 NSFW 内容管理领域的元老级项目，使用 Go 语言开发，自 2020 年发布以来积累了最庞大的用户社区和插件生态。它以功能全面、可高度自定义著称。

### SakuraMedia

[SakuraMedia](https://github.com/tinypinglite/sakuramedia) 是 NSFW 领域的新玩家，最大的特色是使用 Flutter 构建的原生跨平台客户端。它将订阅、下载、观影、翻译整合为一体化体验，定位为"面向 NAS 用户的 NSFW 观影平台"。

### AMMDS

AMMDS 虽然定位为通用私人数据平台，但其影视管理——尤其是 NSFW 内容管理——是目前最成熟的功能模块。它通过插件化刮削引擎和站点联动能力，为 NSFW 内容管理提供了不同于前两者的技术路线。

## 对比维度

### 刮削能力

| 对比维度 | Stash | SakuraMedia | AMMDS |
|---------|-------|------------|-------|
| 默认刮削源 | StashDB | 内置基础刮削 | TMDB + 多插件 |
| 多源聚合 | 有限支持 | 有限支持 | 原生支持，可配置优先级 |
| 自定义刮削器 | YAML Scraper | 未开放 | 插件 SDK |
| 演员信息 | 面部识别匹配 | 基础信息 | 多源聚合 + 手动关联 |
| 批量刮削 | 支持 | 未明确 | 支持，并发控制精细 |
| NFO 输出 | 有限 | 无 | 完整 Emby/Jellyfin/Kodi 标准 |

**分析**：AMMDS 在刮削灵活性上领先，多源聚合和插件化为冷门资源的元数据获取提供了更高成功率。Stash 的 StashDB 内置数据库成熟度高。SakuraMedia 的刮削更偏向基础功能，其核心竞争力不在刮削本身，而是观影体验。

### 观影体验

| 对比维度 | Stash | SakuraMedia | AMMDS |
|---------|-------|------------|-------|
| 客户端类型 | Web 界面 | Flutter 原生应用 | Web 管理面板 |
| 平台覆盖 | 浏览器 | iOS/Android/Web/Desktop | 浏览器 |
| 播放器 | 内置 Web 播放器 | 原生播放器（硬件解码） | 外链或集成播放 |
| 字幕支持 | 基础 | 多格式字幕引擎 | 依赖外部播放器 |
| 播放进度同步 | ✅ | ✅ | ❌ 当前版本暂不支持 |

**分析**：SakuraMedia 在观影体验上具有压倒性优势——Flutter 原生客户端的流畅度和功能丰富度是 Web 界面无法比拟的。Stash 的 Web 播放器功能完整但体验有上限。AMMDS 的定位更偏向"管理工具"，观影并非其核心场景。

### 自动化流程

| 对比维度 | Stash | SakuraMedia | AMMDS |
|---------|-------|------------|-------|
| 订阅自动下载 | ❌ 无原生支持 | ✅ 内置订阅系统 | ⚠️ 通过站点联动 |
| 定时刮削 | ⚠️ 插件实现 | ❌ | ✅ 内置调度器 |
| 目录监控 | ✅ 支持 | ❌ | ✅ 两种监控模式 |
| 下载后自动处理 | ❌ | ✅ 订阅链路 | ✅ 通过站点联动 |

**分析**：SakuraMedia 的订阅+自动下载链路设计最贴近普通用户的"即订即看"需求。AMMDS 通过站点联动和定时调度实现了更深度的自动化。Stash 需要依赖第三方工具构建自动化链路。

### 部署与维护

| 对比维度 | Stash | SakuraMedia | AMMDS |
|---------|-------|------------|-------|
| 部署方式 | Docker | Docker | Docker / Windows Launcher |
| 数据库 | SQLite/MySQL | 未明确 | PostgreSQL |
| 系统资源 | 低（Go 单二进制） | 中等（Flutter + 后端） | 中等（Java + Vue3） |
| Windows 支持 | Docker Desktop | 原生 Windows 客户端 | AMS Launcher 原生体验 |
| 更新频率 | 月级 | 开发中 | 双周级 |

**分析**：Stash 的 Go 二进制部署最为轻量。AMMDS 提供 Windows Launcher 原生体验，对 Windows 用户最为友好。SakuraMedia 的 Windows 原生客户端目前在体验上最流畅。

### 社区与生态

| 对比维度 | Stash | SakuraMedia | AMMDS |
|---------|-------|------------|-------|
| 项目成熟度 | 成熟（2020 年起） | 早期 | 成长中（2025 年起） |
| 社区规模 | 大（几千 Star） | 小（新兴项目） | 中等（快速增长） |
| 插件/Scraper 数量 | 数百个 | N/A | 数十个，增长中 |
| 文档完善度 | 完善 | 初期 | 完善 |

**分析**：Stash 在社区生态上有深厚的积累。AMMDS 的文档和社区虽然在快速追赶，但插件生态的丰富度仍有差距。SakuraMedia 作为最新项目，生态尚处萌芽期。

## 选型建议

### 选 Stash，如果你

- 需要高度自定义的标签和刮削规则
- 依赖成熟的社区插件生态
- 对 UI 没有太高要求，重视功能的完整性和自由度
- 已经是 Stash 用户，没有迁移需求

### 选 SakuraMedia，如果你

- 最看重观影体验，希望在多设备上获得原生播放体验
- 需要订阅+自动下载的完整自动化链路
- 内容消费以 NSFW 为主，管理需求相对简单
- 使用 iOS/Android 设备观影

### 选 AMMDS，如果你

- 同时管理常规影视和 NSFW 内容，需要统一的平台
- 希望与 Emby/Jellyfin 媒体服务器无缝联动
- 需要 PT 站点认证和多站资源检索
- 追求从资源发现到刮削入库的端到端自动化
- 使用 Windows 系统，想要原生桌面体验

## 总结

三款工具代表了 NSFW 内容管理的三种不同路径：

- **Stash**：功能导向，极致自定义
- **SakuraMedia**：体验导向，观影为王
- **AMMDS**：生态导向，全链路整合

没有绝对的"最好"——只有最适合你当前需求的工具。Stash 适合喜欢折腾的重度用户，SakuraMedia 适合追求观影品质的消费型用户，AMMDS 适合希望建立完整媒体管理体系的一站式用户。
