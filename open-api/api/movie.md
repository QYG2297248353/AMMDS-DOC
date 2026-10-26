---
sidebar_position: 2
title: "影视接口"
description: "AMMDS 影视接口参考：导入（表单/快捷/按数据源）、详情、总数、本地匹配与多源检索的请求参数、响应示例与注意事项。"
keywords: [AMMDS, 影视 API, 导入, 检索, 匹配, 番号]
tags: [api]
---

# 影视接口

影视接口是开放平台的主要能力，覆盖「检索 → 导入 → 查询 → 匹配」的完整链路。

{/* truncate */}

## 接口总览

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/v1/movie/import` | 导入影视（`multipart/form-data`，支持图片文件） |
| POST | `/api/v1/movie/import/quick` | 快捷导入（JSON，图片用链接） |
| POST | `/api/v1/movie/import/from-source` | 按数据源与数据源 ID 直接导入 |
| GET | `/api/v1/movie/{id}` | 影片详情 |
| GET | `/api/v1/movie/count` | 影片总数 |
| POST | `/api/v1/movie/lookup` | 按番号或哈希匹配本地影片 |
| POST | `/api/v1/movie/search` | 多数据源检索 |

所有接口均需请求头 `x-api-key`，统一响应体见[请求与响应约定](/open-api/getting-started/conventions)。

## 快捷导入

`POST /api/v1/movie/import/quick`，`Content-Type: application/json`。

### 请求字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `uniqueid` | String | 是 | 番号，作为唯一识别码，重复导入不会产生两条记录 |
| `numbers` | String[] | 否 | 其他番号写法 |
| `originalTitle` | String | 是 | 原始标题 |
| `titleCn` | String | 否 | 中文标题 |
| `plot` / `plotCn` | String | 否 | 简介 / 中文简介 |
| `rating` | Double | 否 | 评分（10 分制） |
| `premiered` | String | 否 | 发行日期 `yyyy-MM-dd` |
| `runtime` | Integer | 否 | 时长（分钟） |
| `language` / `country` | String | 否 | 语言 / 国家 |
| `mosaic` | Boolean | 否 | 马赛克标记 |
| `posterUrl` / `fanartUrl` / `thumbUrl` / `extrafanartUrl` | String[] | 否 | 封面 / 背景 / 缩略图 / 剧照链接 |
| `genres` / `tags` | String[] | 否 | 类型 / 标签 |
| `studio` / `issueStudio` | String[] | 否 | 制作商 / 发行商 |
| `director` | String[] | 否 | 导演 |
| `favorite` / `subscribe` | Boolean | 否 | 是否收藏 / 订阅，缺省 `false` |

### 请求示例

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/import/quick \
  -H "x-api-key: $AMMDS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "uniqueid": "ABC-123",
    "originalTitle": "示例标题",
    "titleCn": "示例标题（中文）",
    "plot": "简介",
    "rating": 8.5,
    "premiered": "2025-10-16",
    "runtime": 120,
    "posterUrl": ["https://example.com/poster.jpg"],
    "genres": ["剧情"],
    "tags": ["高清"],
    "studio": ["示例制作商"],
    "favorite": true
  }'
```

### 响应

```json
{ "code": 200, "message": "success", "data": true, "timestamp": 1753958400000 }
```

导入失败时 `code=500`、`message="导入失败"`、`data=false`。

## 表单导入

`POST /api/v1/movie/import`，`Content-Type: multipart/form-data`。

字段语义与快捷导入一致，区别是：

- 图片以**文件**方式上传，而不是链接
- 多值字段以 **JSON 数组字符串**提交，例如 `genres=["剧情","动作"]`
- 适合已有本地图片、需要避免外链失效的场景

## 按数据源导入

`POST /api/v1/movie/import/from-source`，`Content-Type: application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `source` | String | 是 | 数据源：`metatube` / `theporndb` / `stashbox` / `fanzadmm` / `mteamdmm` / `tmdb` / `tvdb` |
| `id` | String | 是 | 该数据源内的影视 ID |
| `provider` | String | 否 | 供应商标识（`metatube` 供应商 ID、`theporndb` 的 `jav|scene|movie`、`stashbox` 客户端 ID） |

```json
{ "code": 200, "message": "success", "data": "movie-uuid", "timestamp": 1753958400000 }
```

失败时 `code=500`、`message="导入失败，请检查数据源和参数"`。

:::warning[数据源必须已启用]
该接口调用对应插件的能力。若数据源未在插件配置中启用，或缺少 API Key，会直接导入失败。
:::

## 影片详情

`GET /api/v1/movie/{id}`

- `id` 为影片主键（字符串）
- 成功返回完整元数据；不存在时 `code=500`、`message="影片不存在"`

## 影片总数

`GET /api/v1/movie/count`

```json
{ "code": 200, "message": "success", "data": 1286, "timestamp": 1753958400000 }
```

:::tip[路径优先级]
`/count` 是固定路径，优先级高于 `/{id}`，不会被当成影片 ID。
:::

## 本地匹配

`POST /api/v1/movie/lookup`

通过番号或文件哈希查找本地已入库影片，适合本地文件与媒体库自动对齐。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `number` | String | 否 | 番号 |
| `pHash` | String | 否 | 图像感知哈希 |
| `osHash` | String | 否 | 文件 OsHash |

三者至少提供一个，否则直接返回失败。命中时 `data` 为影片 ID，未命中时 `data=null`。

## 多源检索

`POST /api/v1/movie/search`

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `keyword` | String | 是 | 番号或标题关键词 |
| `waitTime` | Integer | 否 | 数据源等待秒数，默认 `60` |

### 响应字段

| 字段 | 说明 |
| --- | --- |
| `source` / `provider` | 数据源与供应商，可直接用于 `import/from-source` |
| `id` | 数据源内的影视 ID |
| `number` / `title` / `summary` | 番号、标题、简介 |
| `cover` / `thumb` / `previewImages` | 封面、缩略图、剧照 |
| `actors` / `director` / `genres` / `tags` | 演员、导演、类型、标签 |
| `studio` / `label` / `series` | 制作公司、厂牌、系列 |
| `score` / `runtime` / `release` / `mosaic` | 评分、时长、发行日期、马赛克状态 |
| `extras` | 数据源特有字段（键值对） |

:::note[字段可能为 null]
不同数据源能力不同，不支持的字段返回 `null`。请按数据源判断可用字段，不要把空值当异常。
:::

## 常见问题

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 检索结果为空 | 没有启用任何元数据源 | 在插件配置中启用并测试连接 |
| 导入返回 `data=false` | 必填字段缺失或番号已存在 | 检查 `uniqueid` 与 `originalTitle` |
| 详情返回「影片不存在」 | ID 错误或影片已删除 | 先调用检索或列表接口确认 ID |
| 匹配始终为 `null` | 哈希未入库 | 哈希匹配依赖入库时记录的 pHash/osHash |
