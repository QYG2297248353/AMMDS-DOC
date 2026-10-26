---
title: M-Team
description: 在 AMMDS 中接入 M-Team（馒头）：配置存取令牌与 PassKey，验证连通性，并让站点资源进入订阅检索与元数据检索链路。
keywords: [M-Team, 馒头, PT 站点, 订阅检索, API Token]
tags: []
sidebar_position: 1
---

# M-Team

M-Team（馒头）是综合类 PT 站。接入后它同时承担两件事：作为**站点索引**参与订阅检索并换取下载地址；通过站点自带的 DMM 接口提供**影视元数据**，参与在线聚合搜索与刮削识别。

{/* truncate */}

## 站点定位

| 项目 | 说明 |
| --- | --- |
| 站点类型 | 综合 PT 站，需要邀请注册 |
| 页面入口 | **集成应用 → 站点资源 → M-Team** |
| 集成版本 | 页面顶部标注 `1.0.0+`，类型为「PT站点」 |
| 主要用途 | 订阅检索与下载、DMM 元数据检索 |

:::note[网络要求]
M-Team 使用独立域名提供 API，与站点网页域名不同。启用前建议先在[网络与连通性](/docs/backend/dashboard/network)中确认 `M-Team` 与 `M-Team API` 均显示可访问。
:::

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `m_team_enabled` | 启用状态 | 布尔 | `false` | 关闭后不参与站点检索、元数据检索与账户保护检查 |
| `m_team_api_url` | 服务地址 | 字符串 | `https://api.m-team.io/api` | API 根地址，可改为 `https://api.m-team.cc/api` 或 `https://api2.m-team.cc/api` |
| `m_team_passkey` | 密钥 (PassKey) | 字符串 | 空 | 用于构造种子下载链接；系统检查中属于启用后的必填项 |
| `m_team_token` | 存取令牌 (控制台 >>> 实验室) | 字符串 | 空 | 调用站点 OpenAPI 的鉴权令牌，站点检索与 DMM 元数据检索都依赖它 |
| `m_team_authorization` | 临时授权码 (请求头 >>> Authorization) | 字符串 | 空 | 需要临时授权的接口使用，随请求头 `Authorization` 提交 |
| `m_team_account_protection` | 账户保护通知 | 布尔 | `false` | 定时检查登录状态并推送提醒；站点对长期未登录账号会做封号注销处理 |
| `m_team_metadata_search` | 元数据检索 | 布尔 | `false` | 开启后 DMM 接口参与在线聚合搜索、刮削识别与手动搜索测试 |

## 凭据从哪来

### PassKey

1. 登录 M-Team 站点，进入 **控制台 → 設置 → 主頁**。
2. 找到「密匙」区域，点击发送至邮箱。
3. 在邮箱中复制 PassKey，回填到配置页并保存。

### 存取令牌

1. 进入 **控制台 → 設置 → 實驗室**。
2. 在「存取令牌」中创建令牌并复制。
3. 粘贴到「存取令牌」配置项。令牌只显示一次，请当场保存。

:::warning[两个凭据不能互相替代]
存取令牌用于**检索**（请求头 `x-api-key`），PassKey 用于**构造下载链接**。只填其中一个会出现「能搜到但下载失败」或「能下载但搜不到」。
:::

## 连接测试

| 方式 | 位置 | 判定标准 |
| --- | --- | --- |
| 测试连接 | 配置页「连接测试」卡片 | 对「服务地址」发起健康检测，能拿到任意 HTTP 响应即视为连通 |
| 搜索测试 | 配置页「搜索测试」卡片 | 需先开启「元数据检索」，可选按 `DMM 元数据`、`女优 / 企划`、`合集`、`关键词` 检索 |

「测试连接」只验证网络可达，不校验凭据。凭据是否正确，用「搜索测试」检索一个番号即可确认；DMM 结果支持直接导入影视库。

## 在订阅检索中的作用

- **优先级最高**：订阅配置的搜索顺序默认为 `M-Team,NexusPHP,Rousi,Prowlarr`，M-Team 命中结果优先提交下载。
- **检索实现**：以 `x-api-key` 调用 `/torrent/search`，限定成人分区、每页 20 条，结果按关键字写入本地缓存，短时间内重复检索直接回放缓存。
- **下载链接**：检索结果不直接带直链，提交下载前用 PassKey 换取种子地址；因此 PassKey 缺失时检索正常、下载失败。
- **元数据检索**：开启「元数据检索」后，M-Team 的 DMM 接口会加入在线聚合搜索与刮削识别，可用于补齐元数据或在搜索测试中导入影片。

:::tip[与刮削的关系]
元数据检索只影响「识别与刮削」链路，不影响站点资源检索；关闭它不会让订阅下载失效。
:::

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 搜索测试提示未开启元数据检索 | `m_team_metadata_search` 为关闭 | 打开开关并保存后重试 |
| 能检索到资源但下载失败 | PassKey 为空或失效 | 重新获取 PassKey 并保存 |
| 提示配置丢失 | 服务地址或存取令牌为空 | 补齐后保存，再执行一次检索 |
| 账户保护通知频繁提醒 | 站点对未登录账号有封禁策略 | 用浏览器登录一次站点，必要时关闭提醒 |

更多排查思路见[常见问题](/docs/faq)，订阅侧的检索行为见[订阅检索](/docs/backend/subscribe/search)。

## 相关页面

- [插件集成总览](/docs/integration/overview)
- [KamePT](/docs/integration/indexer/kamept)｜[Rousi](/docs/integration/indexer/rousi)｜[NexusPHP](/docs/integration/indexer/nexusphp)
- [Prowlarr](/docs/integration/indexer/prowlarr)｜[BitMagnet](/docs/integration/indexer/bitmagnet)
- [qBittorrent](/docs/integration/downloader/qbittorrent)｜[IYUU](/docs/integration/downloader/iyuu)
- [订阅检索](/docs/backend/subscribe/search)｜[订阅下载](/docs/backend/subscribe/downloader)
