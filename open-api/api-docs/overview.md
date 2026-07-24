---
sidebar_position: 1
title: "API 概述"
description: "AMMDS 开放 API 的基础信息，包括 Base URL、鉴权方式、统一响应格式和通用错误码说明。"
keywords: [AMMDS, API, 开放接口, RESTful, 鉴权]
tags: [api]
---

# API 概述

本文介绍 AMMDS 开放 API 的基础信息，涵盖 Base URL、鉴权方式、统一响应格式和通用错误码。

{/* truncate */}

## 基础信息

| 项目 | 说明 |
|------|------|
| Base URL | `http://{host}:{port}` |
| 字符编码 | UTF-8 |
| 响应格式 | JSON |

## 鉴权说明

AMMDS 开放 API（`/api/v1/**`）采用 **API Key** 鉴权机制。

- **鉴权方式**：在请求头中携带 `x-api-key` 字段
- **前置条件**：系统全局配置 `GLOBAL_OPEN_API` 必须已开启
- **公开接口**：`/api/v1/health` 相关接口无需鉴权，可直接访问

**请求头示例：**

```
x-api-key: your-api-key-here
```

**鉴权失败响应：**

```json
{
  "code": 401,
  "message": "您的登录已过期，请重新登录",
  "data": null,
  "timestamp": 1753958400000
}
```

> **注意**：API Key 需在系统管理后台生成并分配给对应的用户。请联系系统管理员获取。

## 统一响应格式

所有接口均使用 `ResponseTemplate<T>` 作为统一响应体：

```json
{
  "code": 200,
  "message": "成功",
  "data": {},
  "timestamp": 1753958400000
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `code` | Integer | 业务状态码，详见通用错误码 |
| `message` | String | 状态描述信息 |
| `data` | Object | 返回数据，具体结构见各接口定义；失败时为 `null` |
| `timestamp` | Long | 响应时间戳（毫秒） |

## 通用错误码

| 状态码 | 枚举值 | 说明 |
|--------|--------|------|
| `200` | `SUCCESS` | 请求成功 |
| `400` | `REQUEST_ERROR` | 请求参数错误 |
| `401` | `UNAUTHORIZED` | 未授权（API Key 无效或缺失） |
| `403` | `FORBIDDEN` | 禁止访问 |
| `404` | `NOT_FOUND` | 资源不存在 |
| `500` | `FAIL` | 服务端内部错误 |
