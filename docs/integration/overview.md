---
title: 插件总览
description: 介绍 AMMDS 集成应用的六类分组、插件启用与配置保存流程，以及连接测试、检索测试和密钥类配置的安全注意事项。
keywords: [插件集成, 元数据源, 连接测试, 检索测试, 配置保存]
tags: []
sidebar_position: 1
---

# 插件总览

AMMDS 的「集成应用」集中管理所有外部服务：元数据源、站点资源、下载器、媒体服务器、推送通知与辅助工具。每个插件都有独立的配置页，开关、凭据与连通性测试互不影响，可以按需逐个接入。

{/* truncate */}

元数据类插件默认关闭。仅有配置项不会让插件参与业务，必须打开「启用状态」并保存；部分插件还有影视检索、剧集搜索、榜单采集一类的子开关，需要一并打开。

## 六类分组

侧边栏按用途分为六类，共 30 余个集成项：

| 分组 | 用途 | 包含 |
| --- | --- | --- |
| 元数据 | 为影视、剧集、演员提供标题、简介、演职员、图片等元数据 | MetaTube、TMDB、TheTVDB、Bangumi、ThePornDB、TheJavDB、R18.dev、FANZA DMM、麻豆 |
| 站点资源 | 从 PT 站与索引器检索种子、辅助订阅与下载 | M-Team、NexusPHP、Rousi、Prowlarr、BitMagnet、FSM |
| 下载器 | 把订阅与手动选择的种子推送到 BT 客户端 | qBittorrent、Transmission |
| 推送通知 | 任务完成、订阅命中、账号异常等事件的通知渠道 | IYUU、Bark、Telegram、Webhook |
| 媒体服务器 | 把整理好的媒体库同步到播放端 | Jellyfin、Emby |
| 辅助工具 | 转码、解压、反爬、检索、翻译等外部能力 | FFmpeg、WinRAR、FlareSolverr、MeiliSearch、DeepSeek、VibeVoice、翻译、高德地图 |

:::note[补充分组]
除上述六类，侧边栏还有「云端同步」分组（WebDAV / S3），用于备份与对象存储，不参与元数据刮削链路。
:::

元数据源是本站文档的重点。M-Team 的 DMM 元数据能力挂在「站点资源 → M-Team」页面内，不在「元数据」分组，但同样参与影视检索与导入，单独在 [M-Team DMM 元数据](/docs/integration/metadata/m-team-dmm) 中说明。

## 打开与启用

1. 进入 **集成应用**，展开左侧分组，点击要接入的插件。
2. 在「配置信息」卡片中填写地址、凭据等参数，打开或关闭「启用状态」。
3. 点击右上角 **保存配置**。页面提示保存成功后，配置才会写入系统配置并生效。
4. 若插件还有子开关（如「影视检索」「剧集搜索」「元数据检索」），按用途一并打开。
5. 使用「连接测试」确认网络与凭据，再用「资源检索 / 搜索测试 / 番号检索」做一次端到端验证。

:::tip[生效时机]
配置保存后立即对后续任务生效，但不会回补已经执行过的扫描或刮削。修改优先级、语言、图片地址后，需要重新执行[刮削任务](/docs/task/scrape)才能看到新结果。
:::

## 配置的保存与回填

配置表单由后端下发的配置项定义动态生成，控件类型与配置键一一对应：

| 控件 | 含义 | 示例 |
| --- | --- | --- |
| 开关 | 布尔值，保存为 `true` / `false` | 启用状态、开启鉴权 |
| 输入框 | 字符串或数字 | 服务地址、API 密钥、请求间隔 |
| 多选 | 列表，多个值以英文逗号拼接保存 | MetaTube 的数据源优先级 |
| 下拉 | 单选，候选项来自配置项的默认值 | MetaTube 的翻译服务 |

- **刷新配置**：丢弃未保存的修改，重新从后端读取当前值。
- **保存配置**：逐项提交表单中的全部配置，全部成功后提示「配置保存成功」。
- 配置保存在系统配置表中，首次使用且从未保存时按默认值运行；页面上看到的是当前值。

:::note[默认值的写法]
本文各页的配置表按后端定义列出「存储值」，因此布尔项写作 `false` / `true`，而不是界面上的「关闭 / 开启」。多值项与下拉项的候选清单给出的是枚举中的完整默认串。
:::

部分页面在配置卡片之外还有专属操作区，例如 MetaTube 的内置服务启停、ThePornDB 的 Stash 客户端、R18.dev 的数据包导入与统计。这些能力在各自页面说明。

## 测试模块

插件页通常包含两类测试，职责不同：

| 模块 | 作用 | 常见按钮 |
| --- | --- | --- |
| 连接测试 | 验证服务地址是否可达，部分插件还会校验密钥、拉取账户信息 | 测试连接、测试连通性、校验密钥、校验 API 密钥、获取账户信息 |
| 检索测试 | 走完整业务链路，确认能取到数据并写入本地库 | 影视检索、演员检索、番号检索、搜索测试、导入 |

:::warning[「可访问」不等于「可用」]
多数健康检查只要收到目标服务器的任意 HTTP 响应就判定成功，401、403、404 也算网络可达。若连接测试通过但检索为空，应继续检查密钥、配额、子开关与关键词，而不是继续排查网络。域名级连通性可在[网络与连通性](/docs/dashboard/network)中查看。
:::

## 密钥类配置的安全提示

以下配置属于凭据，泄露后可能被他人消耗配额或以你的身份访问站点：

| 插件 | 凭据 |
| --- | --- |
| MetaTube | `meta_tube_token`、各翻译服务的 API Key |
| TMDB | `tmdb_token` |
| TheTVDB | `tvdb_api_key`、`tvdb_pin` |
| Bangumi | `bangumi_access_token`、`bangumi_refresh_token` |
| ThePornDB | `theporndb_api_key`、Stash 客户端密钥 |
| M-Team | `m_team_passkey`、`m_team_token`、`m_team_authorization` |
| 其它 | R18.dev、TheJavDB、FANZA DMM、麻豆仅需服务地址，不含凭据 |

- 凭据以系统配置形式保存在数据库中，配置页会回填当前值。请限制后台账号与数据库的访问权限，并妥善保护备份文件。
- 通过 HTTPS 反向代理暴露后台，不要把管理端口直接开到公网。
- 不要在截图、Issue、群聊或日志中粘贴明文密钥；怀疑泄露时先到对应站点吊销，再生成新凭据回填。
- 遵循最小权限：只申请需要的接口权限；长期不用的插件建议关闭并清空密钥。
- TMDB 的 OAuth 授权完成后，后端只回传账户 ID 与令牌末 4 位掩码，不返回令牌明文；Bangumi 的授权令牌由回调自动写入，无需手工复制。

## 排查顺序

| 现象 | 优先检查 |
| --- | --- |
| 保存后插件仍不参与刮削 | 「启用状态」与影视 / 剧集 / 元数据检索子开关是否都已打开并保存 |
| 连接测试失败 | 服务地址协议与端口、容器网络、DNS、代理；参见[网络与连通性](/docs/dashboard/network) |
| 连接测试成功但检索为空 | 密钥是否有效、配额是否耗尽、关键词是否为该源支持的番号格式 |
| 返回 401 / 403 | 令牌过期、权限不足，或站点要求 User-Agent / 鉴权头 |
| 返回 429 或频繁超时 | 触发站点限速，调大请求间隔并降低并发 |
| 图片无法显示 | 图片基础地址被网络阻断，或站点有防盗链 |

更完整的配置项与系统级开关见[系统配置](/docs/system/config)；仍无法定位时查阅[常见问题](/docs/faq)。

## 相关页面

- 元数据源：[MetaTube](/docs/integration/metadata/metatube)、[TMDB](/docs/integration/metadata/tmdb)、[TheTVDB](/docs/integration/metadata/tvdb)、[Bangumi](/docs/integration/metadata/bangumi)
- 更多元数据源：[ThePornDB / StashBox](/docs/integration/metadata/theporndb)、[TheJavDB](/docs/integration/metadata/thejavdb)、[R18.dev](/docs/integration/metadata/r18dev)、[FANZA DMM](/docs/integration/metadata/fanzadmm)、[麻豆](/docs/integration/metadata/madou)、[M-Team DMM 元数据](/docs/integration/metadata/m-team-dmm)
- 站点接入：[M-Team](/docs/integration/indexer/m-team)
- 使用链路：[扫描任务](/docs/task/scan) → [刮削任务](/docs/task/scrape) → [影视](/docs/media/movie)
