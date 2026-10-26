---
sidebar_position: 4
title: "快速开始"
description: "用三条命令验证 AMMDS 开放接口：健康检查、创建密钥后的鉴权调用、以及一次影视检索。"
keywords: [AMMDS, 快速开始, curl, API 调用示例]
tags: [api]
---

# 快速开始

本文用最少步骤验证你的实例可以正常调用开放接口，并给出 JavaScript 与 Python 的最小封装。

{/* truncate */}

## 准备

| 项目 | 说明 |
| --- | --- |
| 实例地址 | 例如 `http://192.168.1.10:8080` |
| API Key | 在 **系统 → 密钥管理** 创建 X-API-KEY 类型密钥 |
| 开放 API 开关 | **系统 → 系统配置** 中开启 `GLOBAL_OPEN_API` |

## 第一步：健康检查（无需密钥）

```bash
curl -s http://192.168.1.10:8080/api/v1/health/check
```

```json
{
  "code": 200,
  "message": "success",
  "data": true,
  "timestamp": 1753958400000
}
```

返回 `data = true` 说明服务在运行，且该路径不支持匿名以外的鉴权方式。

## 第二步：带密钥调用

```bash
curl -s -H "x-api-key: $AMMDS_API_KEY" \
  http://192.168.1.10:8080/api/v1/movie/count
```

```json
{ "code": 200, "message": "success", "data": 1286, "timestamp": 1753958400000 }
```

若返回 `code=401`，请对照[申请与鉴权](/open-api/getting-started/api-key)逐项检查。

## 第三步：检索一部影片

```bash
curl -s -X POST http://192.168.1.10:8080/api/v1/movie/search \
  -H "x-api-key: $AMMDS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"keyword":"ABC-123","waitTime":30}'
```

返回统一的影视模型数组，只包含**已开启**数据源的结果：

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "source": "metatube",
      "provider": "jav",
      "number": "ABC-123",
      "title": "示例标题",
      "summary": "示例简介",
      "cover": "https://example.com/cover.jpg",
      "actors": ["演员A"],
      "genres": ["类型A"],
      "score": 8.6,
      "runtime": 120,
      "release": "2025-10-16 00:00:00",
      "extras": {}
    }
  ],
  "timestamp": 1753958400000
}
```

## 把结果导入影视库

拿到 `source` 与 `id` 后即可导入：

```bash
curl -s -X POST http://192.168.1.10:8080/api/v1/movie/import/from-source \
  -H "x-api-key: $AMMDS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"source":"metatube","id":"12345","provider":"jav"}'
```

`data` 为导入后的影片 ID。

## JavaScript 封装

```js
const BASE = 'http://192.168.1.10:8080';
const KEY = process.env.AMMDS_API_KEY;

async function call(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'x-api-key': KEY,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const body = await res.json();
  if (body.code < 200 || body.code >= 300) {
    throw new Error(`[${body.code}] ${body.message}`);
  }
  return body.data;
}

const count = await call('/api/v1/movie/count');
const movies = await call('/api/v1/movie/search', {
  method: 'POST',
  body: JSON.stringify({ keyword: 'ABC-123', waitTime: 30 }),
});
```

## Python 封装

```python
import os
import requests

BASE = "http://192.168.1.10:8080"
HEADERS = {"x-api-key": os.environ["AMMDS_API_KEY"]}

def call(path, method="GET", **kwargs):
    resp = requests.request(method, f"{BASE}{path}", headers=HEADERS, timeout=60, **kwargs)
    body = resp.json()
    if not 200 <= body.get("code", 0) < 300:
        raise RuntimeError(f"[{body['code']}] {body.get('message')}")
    return body.get("data")

print(call("/api/v1/movie/count"))
print(call("/api/v1/movie/search", method="POST", json={"keyword": "ABC-123", "waitTime": 30}))
```

## 下一步

| 目标 | 阅读 |
| --- | --- |
| 了解全部影视接口 | [影视接口](/open-api/api/movie) |
| 调用翻译与语言识别 | [翻译接口](/open-api/api/translate) |
| 接入漫画阅读器 | [Mihon 阅读器接入](/open-api/mihon/overview) |
| 生成或解析备份包 | [备份包规范](/open-api/backup-restore/overview) |
