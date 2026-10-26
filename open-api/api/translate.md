---
sidebar_position: 3
title: "翻译接口"
description: "AMMDS 翻译接口参考：语言识别与文本翻译，支持自动识别源语言、指定翻译器，返回原文、译文与引擎信息。"
keywords: [AMMDS, 翻译 API, 语言识别, 文本翻译]
tags: [api]
---

# 翻译接口

提供语言识别与文本翻译，返回结构与常见翻译服务保持一致，便于第三方项目直接对接。

{/* truncate */}

## 接口总览

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/v1/translate/language/identify` | 识别文本语言 |
| POST | `/api/v1/translate/text` | 文本翻译 |

## 语言识别

`POST /api/v1/translate/language/identify`

### 请求

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `text` | String | 是 | 待识别文本 |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/translate/language/identify \
  -H "x-api-key: $AMMDS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World"}'
```

### 响应

```json
{
  "code": 200,
  "message": "success",
  "data": { "code": "en", "name": "英语" },
  "timestamp": 1753958400000
}
```

无法确定语言时返回 `code = "unknown"`，`name` 同为 `unknown`。

## 文本翻译

`POST /api/v1/translate/text`

### 请求

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `text` | String | 是 | 待翻译文本 |
| `target` | String | 是 | 目标语言代码，如 `zh`、`en`、`ja` |
| `source` | String | 否 | 源语言代码；不填则自动识别 |
| `provider` | String | 否 | 指定翻译器 ID；不填则按系统配置自动选择 |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/translate/text \
  -H "x-api-key: $AMMDS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World", "target": "zh"}'
```

### 响应

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

| 字段 | 说明 |
| --- | --- |
| `originalText` | 原始文本 |
| `originalLanguage` / `originalLanguageCode` | 源语言名称 / 代码 |
| `translateText` | 译文 |
| `translateLanguage` / `translateLanguageCode` | 目标语言名称 / 代码 |
| `translateEngine` | 实际使用的翻译引擎 |

## 翻译器选择规则

1. 指定了 `provider`：先校验翻译器是否存在，不存在直接返回「翻译器不存在」
2. 未指定 `provider`：由系统按当前配置的翻译通道自动选择
3. `source` 为空时先识别源语言，再翻译
4. `source` / `provider` 为空白字符串时按未指定处理

:::note[翻译器由谁提供]
可用翻译器来自「翻译服务」插件与你在 **插件集成 → 辅助工具 → 翻译服务** 中添加的翻译器，详见[翻译服务](/docs/integration/auxiliary/translation)。
:::

## 语言代码

语言代码采用常见的两字母代码（如 `zh`、`en`、`ja`、`ko`）。具体支持范围取决于当前翻译引擎的能力；引擎不支持时会返回失败，`message` 中给出原因。

## 失败场景

| 现象 | 原因 |
| --- | --- |
| `message="翻译器不存在"` | `provider` 传了不存在的翻译器 ID |
| 返回失败且提示额度 | 第三方翻译引擎配额用尽或密钥失效 |
| 译文为空 | 目标语言不受当前引擎支持 |
