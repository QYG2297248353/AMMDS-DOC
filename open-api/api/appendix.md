---
sidebar_position: 4
title: "附录：状态码与字段字典"
description: "AMMDS 开放 API 的状态码、语言代码与影视字段字典，方便对照实现。"
keywords: [AMMDS, 状态码, 字段字典, 语言代码]
tags: [api]
---

# 附录：状态码与字段字典

本页汇总跨接口复用的枚举与字段含义，便于实现时对照。

{/* truncate */}

## 业务状态码

| `code` | 名称 | 典型场景 |
| --- | --- | --- |
| `200` | SUCCESS | 请求成功 |
| `400` | REQUEST_ERROR | 参数校验失败、必填项缺失 |
| `401` | UNAUTHORIZED | API Key 缺失/无效、开放 API 未开启 |
| `403` | FORBIDDEN | 权限不足 |
| `404` | NOT_FOUND | 资源不存在 |
| `500` | FAIL | 服务异常、业务失败 |

## 数据源标识

`source` 字段的取值由已启用的插件决定：

| 取值 | 对应插件 |
| --- | --- |
| `metatube` | MetaTube |
| `theporndb` | ThePornDB |
| `stashbox` | ThePornDB（StashBox 模式） |
| `fanzadmm` | FANZA DMM |
| `mteamdmm` | M-Team DMM |
| `tmdb` | TMDB |
| `tvdb` | TheTVDB |

:::note[以实际返回为准]
检索接口只会返回**已开启**的数据源结果；未启用的数据源不会出现在 `source` 中。
:::

## 影视字段字典

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | String | 数据源内的影视 ID |
| `provider` | String | 供应商，用于区分同一数据源下的子类型 |
| `source` | String | 数据源标识，见上表 |
| `number` | String | 番号 |
| `title` | String | 标题 |
| `summary` | String | 简介 |
| `url` | String | 数据源详情页 |
| `cover` | String | 封面图 |
| `thumb` | String | 缩略图 |
| `previewImages` | String[] | 剧照 |
| `trailerUrl` | String | 预告片 |
| `actors` | String[] | 演员 |
| `director` | String | 导演 |
| `genres` | String[] | 类型 |
| `tags` | String[] | 标签 |
| `studio` | String | 制作公司 |
| `label` | String | 厂牌 |
| `series` | String | 系列 |
| `score` | Double | 评分（10 分制） |
| `runtime` | Integer | 时长（分钟） |
| `release` | Date | 发行日期 |
| `mosaic` | String | `有码` / `无码` |
| `extras` | Map | 数据源特有字段 |

## 语言代码

| 代码 | 语言 |
| --- | --- |
| `zh` | 简体中文 |
| `zh-TW` | 繁体中文 |
| `en` | 英语 |
| `ja` | 日语 |
| `ko` | 韩语 |

代码与引擎能力相关，未列出的语言以翻译引擎支持范围为准。

## 请求头

| 名称 | 值 | 作用域 |
| --- | --- | --- |
| `x-api-key` | 密钥 | 仅 `/api/v1/**` |
| `Authorization` | `Bearer <Mihon 授权码或 JWT>` | 仅 `/api/mihon/**` |
| `Content-Type` | `application/json` / `multipart/form-data` | 按接口要求 |

## 相关文档

- [请求与响应约定](/open-api/getting-started/conventions)
- [影视接口](/open-api/api/movie)
- [翻译接口](/open-api/api/translate)
- [Mihon 阅读器接入](/open-api/mihon/overview)
