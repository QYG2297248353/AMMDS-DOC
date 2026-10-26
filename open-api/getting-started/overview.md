---
sidebar_position: 1
title: "开发平台概览"
description: "AMMDS 开发平台提供 REST API、Mihon 阅读器协议与备份包规范，本文说明各类能力、鉴权方式与适用场景。"
keywords: [AMMDS, 开发平台, 开放 API, API Key, Mihon, 集成]
tags: [api]
---

# 开发平台概览

本文说明 AMMDS 对外提供的三类开发能力、各自的鉴权方式，以及如何选择接入方式。

{/* truncate */}

## 能接入什么

| 能力 | 入口 | 鉴权 | 适用场景 |
| --- | --- | --- | --- |
| 开放 API | `/api/v1/**` | `x-api-key` | 脚本、自动化工具、第三方服务调用影视导入与翻译 |
| Mihon 协议 | `/api/mihon/**` | `Authorization: Bearer <授权码>` | Mihon / Tachiyomi 漫画阅读器接入 |
| 备份包规范 | 无网络入口 | — | 生成或解析标准备份包，用于数据迁移与 AI 辅助处理 |

此外，界面上还有两类面向外部系统的能力：

- **WebHook 通知**：AMMDS 主动向你的地址推送事件，属于出站集成，配置见[WebHook](/docs/integration/notification/webhook)。
- **实例互通**：两个 AMMDS 实例之间互相添加好友、共享检索，属于实例间协议，配置见[实例互通](/docs/information/interop)。

## 开放 API 能力范围

当前 `/api/v1` 提供以下资源：

| 资源 | 路径 | 说明 |
| --- | --- | --- |
| 健康检查 | `/api/v1/health` | 无需鉴权，用于存活探测 |
| 影视 | `/api/v1/movie` | 导入、详情、总数、本地匹配、多源检索 |
| 翻译 | `/api/v1/translate` | 语言识别与文本翻译 |

接口清单与字段定义见[接口参考](/open-api/api/movie)。

:::info[鉴权是硬隔离]
`/api/v1` **只**接受 API Key，不接受登录 JWT；管理端接口 `/api/admin/**` 只接受登录 JWT，不接受 API Key。二者不会互相越权。
:::

## Mihon 协议能力范围

| 能力 | 路径 |
| --- | --- |
| 连通性探测 | `GET /api/mihon/health` |
| 账户密码登录换取 JWT | `POST /api/mihon/auth/login` |
| 当前用户 | `GET /api/mihon/auth/me` |
| 漫画列表 / 搜索 | `GET /api/mihon/manga`、`/manga/search` |
| 漫画详情 / 章节 | `GET /api/mihon/manga/{id}`、`/chapters` |
| 图片 | `GET /api/mihon/manga/{id}/cover`、`/page/{id}/image` |

详见[Mihon 阅读器接入](/open-api/mihon/overview)。

## 推荐接入路径

1. **先跑通健康检查**：确认地址与网络可达，见[快速开始](/open-api/getting-started/quickstart)。
2. **创建密钥并开启开放 API**：见[申请与鉴权](/open-api/getting-started/api-key)。
3. **按约定构造请求**：统一响应体、时间格式与错误码见[请求与响应约定](/open-api/getting-started/conventions)。
4. **阅读具体接口**：影视导入与检索见[影视接口](/open-api/api/movie)，翻译见[翻译接口](/open-api/api/translate)。

## 版本策略

- 接口前缀带版本号（`/api/v1`），不兼容变更会新增版本而非就地修改。
- 响应字段只增不减；客户端应对未知字段保持容忍。
- 各接口的字段取值依赖已启用的插件。例如检索接口只返回**已开启**数据源的结果，未开启的数据源不会出现在 `source` 中。

## 在线接口文档

实例自带 Swagger UI：

| 地址 | 内容 |
| --- | --- |
| `/swagger/swagger-ui.html` | 可视化调试界面 |
| `/swagger/swagger-api` | OpenAPI JSON |

:::note[范围]
Swagger 仅收录 `/api/v1`、前台站点与客户端接口，不包含管理端 `/api/admin/**`。管理端接口以界面行为为准。
:::
