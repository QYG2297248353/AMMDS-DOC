---
sidebar_position: 2
title: "系统 API"
description: "AMMDS 系统相关 API 接口，包括服务健康检查等操作。"
keywords: [AMMDS, 系统API, 健康检查]
tags: [api]
---

# 系统 API

本文介绍 AMMDS 系统相关 API 接口，包括服务健康检查等操作。

{/* truncate */}

## 健康检查

检查服务运行状态。

| 项目 | 说明 |
|------|------|
| **接口路径** | `/api/v1/health/check` |
| **请求方式** | `GET` / `POST` |
| **鉴权** | 否（公开接口） |
| **Content-Type** | 无 |

### 请求参数

无。

### 请求示例

```bash
curl -X GET "http://localhost:8080/api/v1/health/check"
```

### 响应参数

| 字段 | 类型 | 说明 |
|------|------|------|
| `data` | Boolean | 固定返回 `true`，表示服务正常运行 |

### 成功响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": true,
  "timestamp": 1753958400000
}
```
