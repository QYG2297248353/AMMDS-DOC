---
title: qBittorrent
description: 把 qBittorrent 接入 AMMDS 作为下载执行端：配置 WebUI 地址与凭据，理解保存路径、标签与订阅下载、IYUU 辅种之间的关系。
keywords: [qBittorrent, 下载器, 订阅下载, 保存路径, 辅种]
tags: []
sidebar_position: 1
---

# qBittorrent

qBittorrent 是 AMMDS 的下载执行端。订阅匹配到资源后，种子由它落盘；IYUU 辅种补下的种子同样交给它。可以说**下载链路的终点都在这里**。

{/* truncate */}

## 连接方式

| 项目 | 说明 |
| --- | --- |
| 页面入口 | **集成应用 → 下载器 → qBittorrent** |
| 集成版本 | 页面顶部标注 `5.0.4+`，类型为「下载器」 |
| 通信协议 | qBittorrent WebUI API（HTTP） |
| 服务地址 | 下载器 WebUI 地址，默认 `http://127.0.0.1:8080` |
| 鉴权 | WebUI 登录用户名与密码 |

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `qbittorrent_enabled` | 启用状态 | 布尔 | `false` | 关闭后所有下载相关接口返回「qBittorrent 未启用」 |
| `qbittorrent_service_url` | 服务地址 | 字符串 | `http://127.0.0.1:8080` | WebUI 地址，需带协议；容器部署请用宿主地址或服务名 |
| `qbittorrent_rpc_path` | 接入点 RPC | 字符串 | `/` | WebUI 反向代理前缀，直连时保持 `/` |
| `qbittorrent_username` | 用户名 | 字符串 | `admin` | WebUI 登录用户名 |
| `qbittorrent_password` | 密码 | 字符串 | 空 | WebUI 登录密码 |

:::warning[反向代理前缀]
如果 qBittorrent 挂在 `/qbittorrent` 这类子路径下，「接入点 RPC」必须与之匹配，否则登录请求会 404，表现为「测试连接通过、获取信息失败」。
:::

## 连接测试

配置页「连接测试」卡片有两个按钮：

| 按钮 | 输出 |
| --- | --- |
| 测试连接 | 对服务地址做连通性探测 |
| 获取应用信息 | 拉取用户名、URL、默认保存路径、API 版本、App 版本、种子数量 |

「获取应用信息」是验证凭据最直接的方式：能拿到默认保存路径与种子数量，说明登录成功且接口版本兼容。

## 保存路径与分类

| 项目 | 行为 |
| --- | --- |
| 保存路径 | 优先取订阅配置中的**下载目录**；未配置时回退到 qBittorrent 的默认保存路径 |
| 分类 | 添加种子接口支持传入分类，订阅推送默认不指定分类 |
| 标签 | 订阅推送会打上 `AMMDS订阅` 加来源站点标签；需要事后暂停的种子会追加 `AMMDS暂停` 标记 |
| 路径归属 | 保存路径是**下载器所在主机**的路径，不是 AMMDS 容器的路径 |

:::tip[路径怎么写]
如果 AMMDS 与 qBittorrent 在不同容器里，请填 qBittorrent 视角的路径（例如 `/downloads`），而不是 AMMDS 里映射前的路径。
:::

## 与订阅、辅种的关系

1. **订阅检索**在站点侧匹配到资源。
2. **推送下载**：用换到的种子地址调用 qBittorrent 添加种子，带上保存路径与订阅标签。
3. **回查状态**：系统按标签回查任务，任务完成则标记订阅完成并推送通知；任务消失则记为失败。
4. **辅种**：IYUU 补下的种子同样由 qBittorrent 承接，当前版本自动辅种仅支持 qBittorrent 客户端。

订阅侧的完整链路见[订阅下载](/docs/backend/subscribe/downloader)，辅种配置见[IYUU](/docs/integration/downloader/iyuu)。

## 种子管理

日常的暂停、开始、删除、批量操作在 **工具箱 → 下载器 → 任务管理** 中进行；**插件信息**页展示 App 版本、Web API 版本、默认保存路径与种子数量。

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 提示 qBittorrent 未启用 | 插件开关关闭 | 打开「启用状态」并保存 |
| 测试连接成功但获取信息失败 | 用户名密码错误，或 RPC 路径不符 | 核对凭据与「接入点 RPC」 |
| 添加种子失败 | 保存路径在下载器主机上不存在 | 改用下载器视角的有效路径 |
| 订阅一直不完成 | 标签被改动，回查匹配不到任务 | 不要手动改 `AMMDS订阅` 标签 |
| 下载完成但没有入库 | 扫描目录与保存路径不一致 | 检查扫描任务目录配置 |

## 相关页面

- [插件集成总览](/docs/integration/overview)
- [Transmission](/docs/integration/downloader/transmission)｜[IYUU](/docs/integration/downloader/iyuu)
- [订阅下载](/docs/backend/subscribe/downloader)｜[订阅管理](/docs/backend/subscribe/manage)
- [M-Team](/docs/integration/indexer/m-team)｜[Prowlarr](/docs/integration/indexer/prowlarr)
