---
title: FSM
description: 在 AMMDS 中接入 FSM（飞天拉面神教）：配置 API 与 RSS 地址、PassKey 与 API TOKEN，并说明它在订阅检索中的位置。
keywords: [FSM, 飞天拉面神教, PT 站点, API TOKEN, 订阅检索]
tags: []
sidebar_position: 4
---

# FSM

FSM（飞天拉面神教）是自研框架的成人向 PT 站。它的接口与 RSS 分属两个域名，检索用 **API TOKEN** 做鉴权，下载链接用 **PassKey** 换取。

{/* truncate */}

## 站点定位

| 项目 | 说明 |
| --- | --- |
| 站点类型 | 纯成人站点，自研框架（不属于 NexusPHP） |
| 页面入口 | **集成应用 → 站点资源 → FSM** |
| 集成版本 | 页面顶部标注 `1.0.0+`，类型为「PT站点」 |
| 主要用途 | 订阅检索与下载 |
| 站点认证 | 不参与站点认证流程，只用插件配置 |

:::info[两套地址各有用途]
「API 服务地址」用于检索与站点接口，「RSS 服务地址」用于 RSS 相关能力。只填其中一个会导致对应功能不可用，连接测试也分成了两个按钮。
:::

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `fsm_enabled` | 启用状态 | 布尔 | `false` | 关闭后不参与检索与下载 |
| `fsm_api_url` | API 服务地址 | 字符串 | `https://fsm.name/api` | 检索接口根地址，检索路径为 `{API服务地址}/Torrents/listTorrents` |
| `fsm_rss_url` | RSS 服务地址 | 字符串 | `https://api.fsm.name` | RSS 链路地址，与 API 地址不同域 |
| `fsm_passkey` | 密钥 (PassKey) | 字符串 | 空 | 用于换取种子下载链接；系统检查中的必填项 |
| `fsm_api_token` | 授权码 (API TOKEN) | 字符串 | 空 | 检索时的鉴权令牌，随请求头 `APITOKEN` 提交 |

## 获取凭据

1. 登录 FSM，在账号设置中查看 **PassKey**，填入「密钥 (PassKey)」。
2. 在同一区域生成或查看 **API TOKEN**，填入「授权码 (API TOKEN)」。
3. 保存后先点「测试连接 API」，再在订阅检索中试搜一次确认凭据有效。

:::warning[PassKey 与 API TOKEN 的角色]
API TOKEN 决定能不能检索，PassKey 决定能不能下载。两个都填对，检索与下载链路才是完整的。
:::

## 连接测试

| 按钮 | 验证对象 | 说明 |
| --- | --- | --- |
| 测试连接 RSS | 「RSS 服务地址」 | 只验证域名可达，不校验凭据 |
| 测试连接 API | 「API 服务地址」 | 只验证域名可达，不校验 API TOKEN |

两个测试都只做连通性探测。凭据是否有效，以订阅检索的实际结果为准。

## 在订阅检索中的作用

- **平台标识**：结果标记为 `FSM`，与 M-Team、NexusPHP、Rousi、Prowlarr 并列参与汇总。
- **检索实现**：以 `APITOKEN` 请求头调用 `/Torrents/listTorrents`，取第 1 页结果，成功响应整体写入缓存。
- **下载链接**：检索结果中的条目需要按种子 ID 换取下载地址，这一步依赖 PassKey。
- **搜索顺序**：订阅配置的默认顺序是 `M-Team,NexusPHP,Rousi,Prowlarr`，其中没有 FSM。未列入顺序的平台不会被优先，但也不会被排除；如果你希望 FSM 结果优先，需要在订阅配置的搜索顺序中补上 `FSM`。

:::tip[排序的实际效果]
搜索顺序是一组「优先关键字」：命中越靠前越优先，未命中的平台排在命中平台之后。Prowlarr 是唯一的例外，它永远排在最后。
:::

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 测试连接 API 失败 | API 服务地址写成站点首页 | 改为 `https://fsm.name/api` 这类接口根地址 |
| 能检索到但下载失败 | PassKey 为空或失效 | 重新获取 PassKey 并保存 |
| 检索结果为空 | 插件未启用，或 API TOKEN 无效 | 开启插件后用订阅检索复测 |
| 日志提示配置丢失 | API 服务地址或 API TOKEN 为空 | 补齐后保存 |

## 相关页面

- [插件集成总览](/docs/integration/overview)
- [M-Team](/docs/integration/indexer/m-team)｜[NexusPHP](/docs/integration/indexer/nexusphp)｜[Rousi](/docs/integration/indexer/rousi)
- [订阅检索](/docs/subscribe/search)｜[订阅下载](/docs/subscribe/downloader)
- [qBittorrent](/docs/integration/downloader/qbittorrent)｜[IYUU](/docs/integration/downloader/iyuu)
