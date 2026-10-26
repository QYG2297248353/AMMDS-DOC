---
sidebar_position: 1
title: "健康检查"
description: "AMMDS 开放 API 的健康检查接口说明：路径、鉴权要求与响应结构。"
keywords: [AMMDS, 健康检查, health, 探活]
tags: [api]
---

# 健康检查

用于监控与负载均衡探活，不访问数据库或外部依赖。本接口**无需鉴权**。

{/* truncate */}

## 接口

| 项目 | 值 |
| --- | --- |
| 路径 | `/api/v1/health/check` |
| 方法 | `GET` / `POST`（未限定方法） |
| 鉴权 | 不需要 |
| Content-Type | `application/json` |

## 请求示例

```bash
curl -s http://127.0.0.1:8080/api/v1/health/check
```

## 响应

```json
{
  "code": 200,
  "message": "success",
  "data": true,
  "timestamp": 1753958400000
}
```

| 字段 | 说明 |
| --- | --- |
| `code` | 固定 `200` |
| `data` | 固定 `true` |

:::note[它不检查什么]
健康检查只证明进程在运行。数据库、磁盘、外部服务与插件状态请使用 **系统 → 系统检查**，或参考[系统检查](/docs/backend/system/system-check)。
:::

## 使用建议

- 探活间隔建议 30–60 s，超时 5 s
- 不要把它当作业务可用性指标：插件全部不可用时它仍然返回 `true`
- 反向代理层可对 `/api/v1/health/check` 关闭鉴权与限流
