---
sidebar_position: 3
title: "请求与响应约定"
description: "AMMDS 开放 API 的通用约定：Base URL、统一响应体、业务状态码、时间与编码格式、列表字段的序列化方式。"
keywords: [AMMDS, 统一响应体, 错误码, 时间格式, 编码]
tags: [api]
---

# 请求与响应约定

所有开放接口遵循同一套约定。先读这一页，可以避免大部分解析与判断错误。

{/* truncate */}

## 基础信息

| 项目 | 说明 |
| --- | --- |
| Base URL | `http://{host}:{port}`，默认端口 `8080` |
| 字符编码 | UTF-8 |
| 请求/响应格式 | `application/json`（上传接口为 `multipart/form-data`） |
| 鉴权 | 请求头 `x-api-key`（详见[申请与鉴权](/open-api/getting-started/api-key)） |

## 统一响应体

成功与失败都返回同一结构 `ResponseTemplate<T>`：

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": 1753958400000
}
```

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `code` | Integer | 业务状态码 |
| `message` | String | 业务提示，失败时可直接展示给用户 |
| `data` | Object | 业务数据；失败时通常为 `null` |
| `timestamp` | Long | 服务端响应时间戳（毫秒） |

:::warning[不要只看 HTTP 状态码]
除 Mihon 协议外，业务失败通常仍返回 **HTTP 200**，真正的结果要看响应体里的 `code`。判断成功的标准是 `200 <= code < 300`。
:::

## 业务状态码

| `code` | 含义 | 说明 |
| --- | --- | --- |
| `200` | 成功 | `data` 为业务结果 |
| `400` | 请求参数错误 | 校验失败、必填项缺失 |
| `401` | 未授权 | 密钥缺失/无效，或开放 API 未开启 |
| `403` | 禁止访问 | 权限不足 |
| `404` | 资源不存在 | 路径或对象不存在 |
| `500` | 服务异常 | 服务端内部错误，`message` 为原因摘要 |

:::note[个别接口用 data 表达失败]
部分接口（如影视导入）在失败时返回 `code=500` 且 `data=false`，便于调用方在一个字段里同时拿到结果。以各接口说明为准。
:::

## 时间格式

| 场景 | 格式 | 示例 |
| --- | --- | --- |
| JSON 响应中的日期时间 | `yyyy-MM-dd HH:mm:ss`（Asia/Shanghai） | `2025-10-16 20:30:00` |
| 请求中的日期 | `yyyy-MM-dd` | `2025-10-16` |
| 时间戳 | 毫秒 | `1753958400000` |

## 列表字段

影视元数据里的「番号、海报、类型、标签、导演、制作公司」等是**多值字段**。

- **读取时**：接口返回标准 JSON 数组，例如 `"actors": ["演员A", "演员B"]`
- **写入时**：快捷导入接口接受数组；表单上传接口（`multipart/form-data`）接受 JSON 数组字符串

## 分页

当前 `/api/v1` 的影视接口不分页（检索结果一次性返回）。漫画协议（Mihon）使用 `page` / `pageSize` 分页，从 1 开始。

## 幂等与重复调用

- **检索、详情、总数、匹配**：只读，可安全重试
- **导入**：按唯一识别码判重，重复导入不会产生两条记录
- **翻译**：无副作用

## 超时建议

| 接口类型 | 建议超时 |
| --- | --- |
| 健康检查、计数 | 5 s |
| 详情、匹配 | 10 s |
| 多源检索 | 60 s 以上（`waitTime` 可调） |
| 翻译（第三方通道） | 30 s |

## 错误处理模板

```js
const res = await fetch(url, { headers: { 'x-api-key': key } });
const body = await res.json();
if (body.code < 200 || body.code >= 300) {
  throw new Error(`[${body.code}] ${body.message}`);
}
return body.data;
```
