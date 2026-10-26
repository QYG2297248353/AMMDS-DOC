---
title: Transmission
description: 在 AMMDS 中登记 Transmission 下载器：配置 RPC 地址与登录凭据，做连通性验证，并了解当前版本中它与订阅推送、辅种的分工。
keywords: [Transmission, 下载器, RPC, 订阅下载, 端口]
tags: []
sidebar_position: 2
---

# Transmission

Transmission 是跨平台的 BitTorrent 客户端，后端轻量、界面简洁。AMMDS 通过它的 RPC 接口登记下载器实例并验证连通性，同时把它纳入系统检查的插件体检清单。

{/* truncate */}

## 连接方式

| 项目 | 说明 |
| --- | --- |
| 页面入口 | **集成应用 → 下载器 → Transmission** |
| 集成版本 | 页面顶部标注 `4.0.6+`，类型为「下载器」 |
| 通信协议 | Transmission RPC（HTTP） |
| RPC 接入点 | 默认 `/transmission/rpc`，需与下载器配置一致 |
| 鉴权 | RPC 用户名与密码（若启用了认证） |

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `transmission_enabled` | 启用状态 | 布尔 | `false` | 关闭后不参与系统检查中的插件体检 |
| `transmission_service_url` | 服务地址 | 字符串 | `http://127.0.0.1:8080` | RPC 服务地址。默认值与 qBittorrent 相同，**请按实际端口修改** |
| `transmission_rpc_path` | 接入点 RPC | 字符串 | `/transmission/rpc` | RPC 路径，反代改写过路径时需同步修改 |
| `transmission_username` | 用户名 | 字符串 | `admin` | RPC 认证用户名 |
| `transmission_password` | 密码 | 字符串 | 空 | RPC 认证密码 |

:::warning[默认端口要改]
Transmission 常用端口是 `9091`，而这里的默认值是 `8080`（与 qBittorrent 默认端口一致）。两个下载器同时部署时，务必把「服务地址」改成 Transmission 的真实端口，否则测试连接会连到 qBittorrent。
:::

## 连接测试

配置页「连接测试」按钮对「服务地址」发起探测，能拿到任意 HTTP 响应即视为连通。

需要注意：Transmission 的 RPC 在未携带 `X-Transmission-Session-Id` 时会返回 409。**409 也属于「有响应」**，因此测试连接通过只代表地址与端口正确，不代表凭据正确。

## 当前版本的分工

| 能力 | 承载方 |
| --- | --- |
| 订阅自动下载推送 | qBittorrent |
| IYUU 自动辅种 | qBittorrent |
| 下载器登记与连通性验证 | 两个下载器均支持 |
| 系统检查中的插件体检 | 两个下载器均支持 |

也就是说，Transmission 目前用于**登记下载器实例并参与体检**；订阅推送与辅种仍走 qBittorrent。如果你只有 Transmission，订阅自动下载不会由它执行。

:::info[系统检查怎么用它]
系统检查会读取本插件的「启用状态」与「服务地址」：启用后若地址为空或不可访问，会在插件体检中标记异常，并提示受影响功能为「种子下载推送」。
:::

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 测试连接连到了别的下载器 | 只改了端口但没改地址，或地址仍是 `8080` | 改成 Transmission 实际地址与端口 |
| 测试连接返回 409 | RPC 要求会话 ID | 属于正常响应，不代表失败 |
| 订阅没有走 Transmission | 当前版本订阅推送固定使用 qBittorrent | 需要自动下载请配置 qBittorrent |
| 系统检查报插件异常 | 已启用但地址为空或不可达 | 补齐地址并确认端口放通 |

## 相关页面

- [插件集成总览](/docs/integration/overview)
- [qBittorrent](/docs/integration/downloader/qbittorrent)｜[IYUU](/docs/integration/downloader/iyuu)
- [订阅下载](/docs/subscribe/downloader)｜[订阅管理](/docs/subscribe/manage)
- [网络与连通性](/docs/dashboard/network)｜[常见问题](/docs/faq)
