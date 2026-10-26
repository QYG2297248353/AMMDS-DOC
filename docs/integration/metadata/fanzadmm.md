---
title: FANZA DMM
description: 配置 FANZA DMM 的启用状态、榜单采集与影视检索开关，了解固定 GraphQL 端点、榜单类型与检索能力。
keywords: [FANZA, DMM, GraphQL, 榜单采集, 影视检索]
tags: []
sidebar_position: 8
---

# FANZA DMM

FANZA（DMM）通过 GraphQL 接口提供影片检索与榜单数据。AMMDS 的 FANZA DMM 插件不需要账号或密钥，只按开关决定是否采集榜单、是否参与影视检索。

{/* truncate */}

## 打开方式

进入 **集成应用 → 元数据 → FANZA DMM**。页面只有「配置信息」与「连接测试」两个卡片，没有单独的检索测试区。

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `fanza_dmm_enabled` | 启用状态 | 布尔 | `false` | 插件总开关 |
| `fanza_dmm_ranking_enabled` | 榜单采集 | 布尔 | `false` | 控制定时采集 FANZA DMM 榜单 |
| `fanza_dmm_movie_search` | 影视检索 | 布尔 | `false` | 开启后才参与影视检索与自动刮削 |

:::note[三个开关的分工]
「启用状态」是总闸；「榜单采集」只影响榜单任务；「影视检索」只影响按关键词 / 番号的检索与刮削。只开总闸不会自动采集榜单，也不会参与检索。
:::

## GraphQL 端点

后端默认请求：

```text
https://api.video.dmm.co.jp/graphql
```

该地址**不在页面上配置**。如需指向自建网关或镜像，可通过部署属性 `ammds.plugin.fanza.dmm.endpoint` 覆盖（写入配置文件或对应的环境变量），修改后重启服务生效。

:::warning[端点覆盖的影响]
自定义端点必须兼容 DMM 的 GraphQL 查询与响应结构，否则榜单与检索都会返回空结果。改回官方地址时删除该属性即可。
:::

## 能力范围

| 能力 | 说明 |
| --- | --- |
| 关键词检索 | 用关键词或番号查询影片，结果写入本地缓存，减少重复请求 |
| 日期检索 | 按指定日期翻页拉取当天影片，榜单采集会使用该能力 |
| 在线聚合检索 | 开启「影视检索」后参与统一在线检索，结果可导入影视库 |
| 榜单采集 | 定时采集「今日新作」，并补采未来 3 天的「即将上映」 |

榜单任务按自然日幂等：当天已采集过的榜单不会重复请求上游；「即将上映」只补采尚不存在的日期。

## 连接测试

点击「测试连接」会请求 FANZA 的固定站点地址 `https://api.video.dmm.co.jp`，用于判断当前网络能否访问该服务。它不校验任何凭据，也不代表 GraphQL 端点一定可用。

:::tip[连接成功但检索为空]
先确认「启用状态」与「影视检索」都已打开并保存，再检查关键词是否能归一为 DMM 支持的番号；部分内容受地区限制，必要时在[系统配置](/docs/backend/system/config)中配置代理。
:::

## 相关页面

[插件总览](/docs/integration/overview) · [TheJavDB](/docs/integration/metadata/thejavdb) · [R18.dev](/docs/integration/metadata/r18dev) · [刮削任务](/docs/backend/task/scrape) · [常见问题](/docs/faq)
