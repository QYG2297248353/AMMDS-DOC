---
title: 常用接口速查
sidebar_label: 接口速查表
description: 一张表列出常用开放接口的地址、用途、要什么参数、返回什么，并附上请求示例和字段说明。
sidebar_position: 2
---

# 常用接口速查

这一页把常用的开放接口收成一张表：地址、干什么用、要什么参数、返回什么。地址和参数都是当前版本真实存在的。

通用规则（返回包长什么样、错误码、时间格式）看[请求和返回怎么读](./conventions.md)。

## 先说清楚

> **接口 / API**：AMMDS 对外开的一扇门。一个地址就是一个接口。

> **请求**：发给 AMMDS 的一句「我要什么」。

> **响应**：AMMDS 回答回来的一包内容。

> **JSON**：内容的排版格式，由「字段名」和「值」组成。

## 速查表

下面所有地址都要在前面拼上 `http://<主机>:<端口>`，并且请求头带 `x-api-key`（除了第一条）。

| 方法 | 地址 | 干什么用 | 要什么参数 | 返回什么 |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/health/check` | 看看服务还活着吗 | 无，也不用钥匙 | `data` 恒为 `true` |
| POST | `/api/v1/movie/import` | 导入影片，图片用文件方式上传 | 表单字段，语义同快捷导入；多值字段用数组的字符串形式 | `data` 为 `true` 或 `false` |
| POST | `/api/v1/movie/import/quick` | 快捷导入，图片用链接 | `uniqueid`、`originalTitle` 必填，其余见下表 | `data` 为 `true` 或 `false` |
| POST | `/api/v1/movie/import/from-source` | 按来源和来源里的编号直接导入 | `source`、`id` 必填，`provider` 选填 | `data` 为导入后的影片 ID |
| GET | `/api/v1/movie/{id}` | 取一部影片的详情 | 路径里的 `id` 是影片主键 | 完整资料；不存在时提示「影片不存在」 |
| GET | `/api/v1/movie/count` | 取影片总数 | 无 | `data` 为数字，例如 `1286` |
| POST | `/api/v1/movie/lookup` | 按编号或文件指纹匹配本地影片 | `number`、`pHash`、`osHash` 至少填一个 | 命中时 `data` 为影片 ID，没命中是 `null` |
| POST | `/api/v1/movie/search` | 多来源检索 | `keyword` 必填，`waitTime` 选填 | `data` 为资料列表 |
| POST | `/api/v1/translate/language/identify` | 判断一段文字是什么语言 | `text` 必填 | `data` 为语言代码和名称 |
| POST | `/api/v1/translate/text` | 把一段文字翻译成别的语言 | `text`、`target` 必填，`source`、`provider` 选填 | `data` 含原文、译文和引擎 |

:::note[漫画接口不在这张表里]
给漫画阅读器用的接口是另一套地址，开头是 `/api/mihon`，钥匙类型也不一样。那一套在「用漫画阅读器看你的漫画」里讲。
:::

## 健康检查

不用钥匙，用来确认程序在不在。

```bash
curl -s http://127.0.0.1:8080/api/v1/health/check
```

```json
{
  "code": 200,
  "message": "success",
  "data": true,
  "timestamp": 1753958400000
}
```

它只证明程序在跑，不检查数据库、磁盘和外部服务。探活间隔建议 30 到 60 秒。

## 快捷导入

`POST /api/v1/movie/import/quick`，请求头写 `Content-Type: application/json`。

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `uniqueid` | 是 | 编号，作为唯一识别码；重复导入不会产生两条记录 |
| `originalTitle` | 是 | 原始标题 |
| `numbers` | 否 | 这个编号的其他写法 |
| `titleCn` | 否 | 中文标题 |
| `plot` / `plotCn` | 否 | 简介 / 中文简介 |
| `rating` | 否 | 评分，10 分制 |
| `premiered` | 否 | 发行日期，写成 `yyyy-MM-dd` |
| `runtime` | 否 | 时长，单位分钟 |
| `language` / `country` | 否 | 语言 / 国家 |
| `mosaic` | 否 | 马赛克标记 |
| `posterUrl` / `fanartUrl` / `thumbUrl` / `extrafanartUrl` | 否 | 封面 / 背景 / 缩略图 / 剧照的链接 |
| `genres` / `tags` | 否 | 类型 / 标签 |
| `studio` / `issueStudio` | 否 | 制作商 / 发行商 |
| `director` | 否 | 导演 |
| `favorite` / `subscribe` | 否 | 是否收藏 / 订阅，不填就是 `false` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/import/quick \
  -H "x-api-key: <你的密钥>" \
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

```json
{ "code": 200, "message": "success", "data": true, "timestamp": 1753958400000 }
```

导入失败时 `code` 是 `500`、`message` 是「导入失败」、`data` 是 `false`。

表单导入 `/api/v1/movie/import` 的字段含义跟上面完全一样，区别只有两点：图片以**文件**方式上传而不是填链接，多值字段要提交数组的字符串形式。手里已经有本地图片、不想用外链时用这个。

## 按来源导入

`POST /api/v1/movie/import/from-source`。

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `source` | 是 | 来源，取值见下面的来源表 |
| `id` | 是 | 该来源里的影片 ID |
| `provider` | 否 | 来源下的分类标识，例如 `metatube` 的供应商 ID、`theporndb` 的 `jav`、`scene`、`movie` 之一 |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/import/from-source \
  -H "x-api-key: <你的密钥>" \
  -H "Content-Type: application/json" \
  -d '{"source":"metatube","id":"12345","provider":"jav"}'
```

```json
{ "code": 200, "message": "success", "data": "movie-uuid", "timestamp": 1753958400000 }
```

失败时 `message` 是「导入失败，请检查数据源和参数」。

:::warning[来源必须先启用]
这个接口要调用对应插件的能力。来源没在插件配置里启用、或者插件缺钥匙，会直接导入失败。
:::

## 影片详情与总数

`GET /api/v1/movie/{id}` 取一部影片的完整资料，路径里的 `id` 是影片主键（字符串）。不存在时会提示「影片不存在」。

`GET /api/v1/movie/count` 取总数：

```json
{ "code": 200, "message": "success", "data": 1286, "timestamp": 1753958400000 }
```

`/count` 是固定地址，优先级比 `/{id}` 高，不会被当成影片 ID。

## 本地匹配

`POST /api/v1/movie/lookup`，用编号或文件指纹查库里已有的影片。

| 字段 | 说明 |
| --- | --- |
| `number` | 编号 |
| `pHash` | 图像感知哈希 |
| `osHash` | 文件 OsHash |

三者至少填一个，否则直接返回失败。命中时 `data` 是影片 ID，没命中是 `null`。

## 多来源检索

`POST /api/v1/movie/search`。

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `keyword` | 是 | 编号或标题关键词 |
| `waitTime` | 否 | 等各个来源多少秒，默认 `60` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/search \
  -H "x-api-key: <你的密钥>" \
  -H "Content-Type: application/json" \
  -d '{"keyword":"ABC-123","waitTime":30}'
```

返回的 `data` 是资料列表，每条里常见的字段有：

| 字段 | 说明 |
| --- | --- |
| `source` / `provider` | 来源和分类，可直接拿去调 `import/from-source` |
| `id` | 该来源里的影片 ID |
| `number` / `title` / `summary` | 编号、标题、简介 |
| `cover` / `thumb` / `previewImages` | 封面、缩略图、剧照 |
| `actors` / `director` / `genres` / `tags` | 演员、导演、类型、标签 |
| `studio` / `label` / `series` | 制作公司、厂牌、系列 |
| `score` / `runtime` / `release` / `mosaic` | 评分、时长、发行日期、马赛克状态 |
| `extras` | 这个来源独有的额外字段 |

:::note[字段可能是空的]
不同来源能给的资料不一样，给不出就返回空值，别把空值当异常。
:::

## 翻译

识别语言：

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/translate/language/identify \
  -H "x-api-key: <你的密钥>" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World"}'
```

```json
{
  "code": 200,
  "message": "success",
  "data": { "code": "en", "name": "英语" },
  "timestamp": 1753958400000
}
```

认不出来时 `code` 是 `unknown`，`name` 同样是 `unknown`。

翻译文本：

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/translate/text \
  -H "x-api-key: <你的密钥>" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World", "target": "zh"}'
```

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "originalText": "Hello World",
    "originalLanguage": "英语",
    "originalLanguageCode": "en",
    "translateText": "你好世界",
    "translateLanguage": "简体中文",
    "translateLanguageCode": "zh",
    "translateEngine": "百度翻译"
  },
  "timestamp": 1753958400000
}
```

| `data` 里的字段 | 说明 |
| --- | --- |
| `originalText` | 原文 |
| `originalLanguage` / `originalLanguageCode` | 源语言的名称 / 代码 |
| `translateText` | 译文 |
| `translateLanguage` / `translateLanguageCode` | 目标语言的名称 / 代码 |
| `translateEngine` | 实际用的是哪个翻译引擎 |

翻译接口的 `text` 和 `target` 是必填；`source` 不填就自动识别源语言；`provider` 不填就按系统配置自动选翻译器。

## 来源标识

`source` 能填什么，取决于你启用了哪些插件：

| 取值 | 对应插件 |
| --- | --- |
| `metatube` | MetaTube |
| `theporndb` | ThePornDB |
| `stashbox` | ThePornDB（StashBox 模式） |
| `fanzadmm` | FANZA DMM |
| `mteamdmm` | M-Team DMM |
| `tmdb` | TMDB |
| `tvdb` | TheTVDB |

检索结果里只会出现**已经启用**的来源，没启用的不会出现。

## 语言代码

| 代码 | 语言 |
| --- | --- |
| `zh` | 简体中文 |
| `zh-TW` | 繁体中文 |
| `en` | 英语 |
| `ja` | 日语 |
| `ko` | 韩语 |

具体支持哪些语言，取决于你用的翻译引擎；引擎不支持时会返回失败，并在 `message` 里写原因。

## 设置项说明

| 设置项 | 要填什么 | 不填 / 填错会怎样 |
| --- | --- | --- |
| `x-api-key` | 系统里创建的 X-API-KEY 钥匙 | 不带或写错，返回 `code` 为 `401` |
| `Content-Type` | 快捷导入写 `application/json`；表单导入写 `multipart/form-data` | 写错的话服务端读不懂正文 |
| `uniqueid` / `originalTitle` | 快捷导入的两个必填项 | 缺一个就会导入失败 |
| `source` / `id` | 按来源导入时的来源名和来源内 ID | 来源没启用或 ID 不对，会导入失败 |
| `keyword` | 检索的编号或关键词 | 是必填项，不填判参数错误 |
| `number` / `pHash` / `osHash` | 本地匹配三选一 | 一个都不填直接返回失败 |
| `text` / `target` | 翻译的原文和目标语言代码 | 缺一个会判参数错误 |

## 出问题了怎么办

- **检索结果一直是空的**：一个来源都没启用。去插件配置里启用一个并测一下连接。
- **导入返回 `data` 为 `false`**：多半是必填字段缺失，或者这个编号已经存在。检查 `uniqueid` 和 `originalTitle`。
- **详情提示「影片不存在」**：ID 写错了，或者影片已被删除。先用检索或总数接口确认 ID。
- **本地匹配始终是 `null`**：指纹匹配依赖入库时记录的指纹，没记录过就匹配不到，改用 `number` 试试。
- **翻译提示「翻译器不存在」**：`provider` 填了一个不存在的翻译器 ID；留空让系统自动选就行。

## 接着看

- [请求和返回怎么读](./conventions.md)
