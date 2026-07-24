---
sidebar_position: 4
title: "翻译 API"
description: "AMMDS 翻译服务 API 接口，包括语言识别和文本翻译功能。"
keywords: [AMMDS, 翻译API, 语言识别, 文本翻译]
tags: [api]
---

# 翻译 API

本文介绍 AMMDS 翻译服务 API 接口，包括语言识别和文本翻译功能。

{/* truncate */}

## 语言识别

识别输入文本的语言，返回语言代码和语言名称。

| 项目 | 说明 |
|------|------|
| **接口路径** | `/api/v1/translate/language/identify` |
| **请求方式** | `POST` |
| **鉴权** | 是（`x-api-key`） |
| **Content-Type** | `application/json` |

### 请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `text` | String | **是** | 待识别的文本内容 |

### 请求示例

```bash
curl -X POST "http://localhost:8080/api/v1/translate/language/identify" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key-here" \
  -d '{
    "text": "这是一段中文文本"
  }'
```

### 响应参数

| 字段 | 类型 | 说明 |
|------|------|------|
| `data.code` | String | 语言代码（如 `zh`）；无法识别时返回 `unknown` |
| `data.name` | String | 语言名称（如 `简体中文`） |

### 成功响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "code": "zh",
    "name": "简体中文"
  },
  "timestamp": 1753958400000
}
```

### 无法识别时

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "code": "unknown",
    "name": "unknown"
  },
  "timestamp": 1753958400000
}
```

---

## 文本翻译

翻译文本内容，支持自动识别源语言或指定源语言，返回翻译结果及翻译引擎信息。

| 项目 | 说明 |
|------|------|
| **接口路径** | `/api/v1/translate/text` |
| **请求方式** | `POST` |
| **鉴权** | 是（`x-api-key`） |
| **Content-Type** | `application/json` |

### 请求参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `text` | String | **是** | 待翻译的文本内容 |
| `target` | String | **是** | 目标语言代码，取值见附录 A |
| `source` | String | 否 | 源语言代码，留空时自动识别。取值见附录 A（不含 `auto`） |
| `provider` | String | 否 | 指定翻译器 ID；留空时自动选择最合适的翻译器 |

### 请求示例

```bash
# 自动识别源语言翻译为中文
curl -X POST "http://localhost:8080/api/v1/translate/text" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key-here" \
  -d '{
    "text": "Hello, world!",
    "target": "zh"
  }'

# 指定源语言翻译为英文
curl -X POST "http://localhost:8080/api/v1/translate/text" \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key-here" \
  -d '{
    "text": "こんにちは世界",
    "source": "ja",
    "target": "en"
  }'
```

### 响应参数

| 字段 | 类型 | 说明 |
|------|------|------|
| `data.originalText` | String | 原始文本 |
| `data.originalLanguage` | String | 源语言名称 |
| `data.originalLanguageCode` | String | 源语言代码 |
| `data.translateText` | String | 翻译后文本 |
| `data.translateLanguage` | String | 目标语言名称 |
| `data.translateLanguageCode` | String | 目标语言代码 |
| `data.translateEngine` | String | 翻译引擎名称（如 `百度翻译`） |

### 成功响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "originalText": "Hello, world!",
    "originalLanguage": "英语",
    "originalLanguageCode": "en",
    "translateText": "你好，世界！",
    "translateLanguage": "简体中文",
    "translateLanguageCode": "zh",
    "translateEngine": "百度翻译"
  },
  "timestamp": 1753958400000
}
```

### 错误码

| 状态码 | 说明 |
|--------|------|
| `400` | `text` 或 `target` 为空 |
| `500` | 翻译失败（翻译器返回错误），`message` 中包含具体错误信息 |
| `500` | 指定的 `provider` 翻译器不存在 |
