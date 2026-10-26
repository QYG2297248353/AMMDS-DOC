---
sidebar_position: 1
title: "Mihon 阅读器接入"
description: "把 AMMDS 漫画库接入 Mihon / Tachiyomi：授权码创建、鉴权方式、完整接口清单与响应结构。"
keywords: [AMMDS, Mihon, Tachiyomi, 漫画, 阅读器, 授权码]
tags: [api]
---

# Mihon 阅读器接入

AMMDS 为 Mihon / Tachiyomi 类阅读器提供独立协议，把漫画库以标准接口暴露出去。该协议与开放 API 使用**不同的鉴权域**，互不通用。

{/* truncate */}

## 鉴权

### 方式一：Mihon 授权码（推荐）

1. 进入 **系统 → 密钥管理**
2. 创建密钥，类型选择 **Mihon 扩展**（`secret_mihon`）
3. 复制授权码，填入阅读器的「服务器地址 / 授权码」配置

请求头：

```
Authorization: Bearer <Mihon 授权码>
```

该授权码**只能**用于 `/api/mihon/**`，不能调用 `/api/v1`。

### 方式二：账户密码登录

```http
POST /api/mihon/auth/login
Content-Type: application/json

{ "username": "ammds", "password": "******" }
```

```json
{ "token": "<JWT>", "expiresAt": "2025-10-16T12:30:00Z" }
```

换取的 JWT 有效期为 2 小时，过期需重新登录。长期使用建议改用授权码，便于单独撤销。

:::note[鉴权失败返回真实 HTTP 状态码]
与业务接口不同，Mihon 协议按 REST 语义返回 `401` / `404`，阅读器据此区分「未授权 / 资源不存在」，而不会把业务错误当作漫画内容解析。
:::

## 接口清单

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/mihon/health` | 连通性探测（免鉴权），返回 `{"status":"ok"}` |
| POST | `/api/mihon/auth/login` | 账户密码登录（免鉴权） |
| GET | `/api/mihon/auth/me` | 当前用户 |
| GET | `/api/mihon/manga` | 漫画库分页列表 |
| GET | `/api/mihon/manga/search` | 漫画检索 |
| GET | `/api/mihon/manga/{id}` | 漫画详情 |
| GET | `/api/mihon/manga/{id}/chapters` | 章节列表 |
| GET | `/api/mihon/manga/{id}/cover` | 封面图片（字节流） |
| GET | `/api/mihon/chapter/{id}/pages` | 章节页面列表 |
| GET | `/api/mihon/page/{id}/image` | 章节页图片（字节流） |

## 漫画列表

`GET /api/mihon/manga`

| 参数 | 说明 | 默认 |
| --- | --- | --- |
| `page` | 页码，从 1 开始 | 1 |
| `pageSize` | 每页条数 | 服务端默认 |
| `sort` | 排序字段：`updatedAt` / `createdAt` / `title` / `pageCount` | `updatedAt` |
| `order` | 排序方向：`asc` / `desc` | `desc` |

```json
{
  "items": [
    {
      "id": "uuid",
      "title": "示例漫画",
      "author": "作者",
      "description": "简介",
      "genre": "分类",
      "series": "系列",
      "cover": "https://...",
      "pageCount": 128,
      "episodeCount": 12,
      "fullChapter": true,
      "updatedAt": "2025-10-16 20:30:00"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 135
}
```

## 漫画检索

`GET /api/mihon/manga/search?q=关键词&page=1&pageSize=20`

匹配标题、作者、系列、分类与标签，返回结构与列表接口一致。

## 漫画详情

`GET /api/mihon/manga/{id}`

字段与列表条目相同；不存在时返回 `404`。

## 章节列表

`GET /api/mihon/manga/{id}/chapters`

```json
{
  "items": [
    {
      "id": "chapter-uuid",
      "title": "第 1 话",
      "number": 1,
      "pageCount": 24,
      "description": "",
      "publishedAt": "2025-10-01 10:00:00"
    }
  ]
}
```

:::tip[序号一定严格递增]
章节的 `number` 优先使用库中维护的序号；当数据缺失或重复时，服务端按列表顺序下发 `1..N`，避免阅读器的「下一章」错乱。
:::

## 章节页面与图片

**页面列表**：`GET /api/mihon/chapter/{id}/pages`

```json
{
  "items": [
    { "id": "page-uuid", "page": 1, "url": "/api/mihon/page/page-uuid/image" }
  ]
}
```

**页图片**：`GET /api/mihon/page/{id}/image`，返回图片字节流，缓存策略为私有缓存（需携带授权码）。

**封面**：`GET /api/mihon/manga/{id}/cover`，仅服务仓库内的封面文件；若漫画详情中的 `cover` 已是远端地址，阅读器应直接加载该地址，此时本接口返回 `404`。

## 在阅读器中配置

1. 安装 AMMDS 提供的 Mihon 扩展（或使用支持自定义服务器的替代方案）
2. 服务器地址填 `http://<你的地址>:8080`
3. 授权码填上一步创建的 Mihon 授权码
4. 保存后先访问一次漫画库，确认能拉到列表

## 排查

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 提示未授权（401） | 授权码类型不是「Mihon 扩展」，或已删除 | 重新创建 Mihon 类型授权码 |
| 列表为空 | 漫画库没有相册，或章节未导入 | 先在后台导入漫画 |
| 封面不显示 | 封面是远端地址 | 属正常行为，阅读器应直接加载远端 URL |
| 图片 404 | 章节页文件缺失 | 检查数据目录中的漫画文件是否完整 |
