---
title: Rousi
description: 在 AMMDS 中接入 Rousi（肉丝）：分别配置 RSS 与 API 服务地址、PassKey 与临时授权码，验证两条链路并参与订阅检索。
keywords: [Rousi, 肉丝, PT 站点, PassKey, 订阅检索]
tags: []
sidebar_position: 3
---

# Rousi

Rousi（肉丝）是综合类 PT 站。插件把它的 **RSS 服务**与 **API 服务**拆成两个地址分别配置，因为两者可能指向不同域名；检索与下载分别依赖 PassKey 和临时授权码。

{/* truncate */}

## 站点定位

| 项目 | 说明 |
| --- | --- |
| 站点类型 | 综合站点，需要邀请注册 |
| 页面入口 | **集成应用 → 站点资源 → Rousi** |
| 集成版本 | 页面顶部标注 `1.0.0+`，类型为「PT站点」 |
| 主要用途 | 订阅检索、种子详情补全、下载链接换取 |
| 默认域名 | RSS `https://rousi.pro`，API `https://rousi.pro/api` |

:::note[站群域名差异]
系统内登记了两个 Rousi 站点条目：`rousi.pro`（PtYes 架构）与 `rousi.zip`（NexusPHP 架构，站点公告为即将闭站）。本插件默认指向 `rousi.pro`；如果你实际使用的是另一个域名，请按站点现状修改两个服务地址。
:::

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `rousi_enabled` | 启用状态 | 布尔 | `false` | 关闭后不参与检索、下载与账户保护检查 |
| `rousi_site_url` | RSS服务地址 | 字符串 | `https://rousi.pro` | 站点主域名，用于 RSS 链路与拼接封面等相对路径 |
| `rousi_api_url` | API服务地址 | 字符串 | `https://rousi.pro/api` | API 根地址，检索接口为 `{API服务地址}/v1/search` |
| `rousi_passkey` | 密钥 (PassKey) | 字符串 | 空 | 检索时作为 `Bearer` 令牌，同时用于构造下载链接；系统检查中的必填项 |
| `rousi_authorization` | 临时授权码 (请求头 >>> Authorization) | 字符串 | 空 | 需要临时授权的接口使用，随请求头 `Authorization` 提交 |
| `rousi_account_protection` | 账户保护通知 | 布尔 | `false` | 定时检查登录状态并推送提醒；站点对长期未登录账号会做封号注销处理 |

## 获取凭据

### PassKey

1. 登录 Rousi，点右上角头像。
2. 进入 **账户设置 → Passkey**。
3. 复制密钥并回填到「密钥 (PassKey)」。

### 临时授权码

部分接口需要额外的临时授权码。按站点当前提示在账号安全相关页面获取，填入「临时授权码」；不需要时留空即可，检索主链路只依赖 PassKey。

## 连接测试

配置页提供两个按钮，分别验证两条链路：

| 按钮 | 验证对象 | 适用场景 |
| --- | --- | --- |
| 测试RSS连接 | 「RSS服务地址」 | 判断站点主域名是否可达，通常用于 RSS 相关功能 |
| 测试API连接 | 「API服务地址」 | 判断检索接口是否可达，订阅检索依赖它 |

两个按钮都只做连通性探测，不校验 PassKey。凭据是否正确，最直接的方式是在[订阅检索](/docs/backend/subscribe/search)中用番号试搜一次。

## 在订阅检索中的作用

- **平台标识**：结果标记为 `Rousi`，订阅配置的默认搜索顺序 `M-Team,NexusPHP,Rousi,Prowlarr` 中排第三。
- **检索实现**：以 `Bearer {PassKey}` 调用 `/v1/search`，每页 20 条，只有结果非空时才写缓存，避免缓存空结果导致后续不再请求。
- **详情补全**：部分条目只返回摘要，命中 `uuid` 时会再查一次详情接口，补齐标题、演员、分类等信息。
- **封面处理**：封面可能是相对路径，系统会用「RSS服务地址」拼接成完整 URL；该地址填错会导致封面裂图。
- **下载链接**：提交下载前按检索结果换取种子地址，PassKey 缺失时检索正常、下载失败。

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 测试RSS连接失败、测试API连接正常 | RSS 服务地址域名不可用 | 按站点现状改用可用域名 |
| 检索结果封面不显示 | RSS服务地址与站点实际域名不一致 | 修正后重新检索 |
| 检索为空且日志提示配置丢失 | 服务地址或 PassKey 为空 | 补齐配置并保存 |
| 提示账户长期未登录 | 开启了账户保护通知 | 用浏览器登录一次站点 |

## 相关页面

- [插件集成总览](/docs/integration/overview)
- [M-Team](/docs/integration/indexer/m-team)｜[KamePT](/docs/integration/indexer/kamept)｜[NexusPHP](/docs/integration/indexer/nexusphp)
- [订阅检索](/docs/backend/subscribe/search)｜[订阅下载](/docs/backend/subscribe/downloader)
- [qBittorrent](/docs/integration/downloader/qbittorrent)｜[IYUU](/docs/integration/downloader/iyuu)
