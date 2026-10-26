---
title: BitMagnet
description: 接入自建的 BitMagnet 磁力索引服务：配置服务地址，查看 DHT/Postgres/TMDB 状态，并通过 GraphQL 完成磁力检索与文件树查看。
keywords: [BitMagnet, 磁力检索, DHT, GraphQL, 磁力库]
tags: []
sidebar_position: 7
---

# BitMagnet

BitMagnet 是开源、可自托管的 BitTorrent 搜索引擎：通过 DHT 爬虫持续发现种子并分类。AMMDS 接入它之后，可以在磁力检索里查全网种子，而不只限于已配置的 PT 站。

{/* truncate */}

## 站点定位

| 项目 | 说明 |
| --- | --- |
| 页面入口 | **集成应用 → 站点资源 → BitMagnet** |
| 集成版本 | 页面顶部标注 `0.10.0+`，类型为「磁力库」 |
| 部署形态 | 必须自建 BitMagnet 服务，AMMDS 不内置 DHT 爬虫 |
| 主要用途 | 磁力搜索、种子文件列表与目录树 |
| 与 PT 插件的关系 | 不参与订阅的站点搜索顺序，独立服务于磁力检索 |

## 配置项

| 配置键 | 界面名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `bitmagnet_enabled` | 启用状态 | 布尔 | `false` | 关闭后检索与文件查询接口直接返回「BitMagnet 集成插件未启用」，不再请求服务端 |
| `bitmagnet_service_url` | 服务地址 | 字符串 | `http://127.0.0.1:3333` | BitMagnet Web 与 API 的地址；容器部署时不要填 `127.0.0.1` |

:::warning[服务地址的坑]
Docker 部署 AMMDS 时，`127.0.0.1` 指向容器自身。请改填宿主地址或容器服务名，例如 `http://bitmagnet:3333`。
:::

## 自建提示

BitMagnet 至少需要 Web 端口 `3333` 与 DHT 端口 `3334`（TCP/UDP），并依赖一个 PostgreSQL 实例。部署完成后先用浏览器打开 `http://主机:3333` 确认 Web UI 可访问，再回到 AMMDS 配置。

## 连接测试

配置页有两个按钮，用途不同：

| 按钮 | 检查内容 |
| --- | --- |
| 测试连接 | 只对「服务地址」做连通性探测 |
| 获取应用状态 | 请求状态接口，返回「基本信息」与「服务状态」两个页签 |

「应用状态」中的信息包括：

- **基本信息**：应用名称、应用版本、总体状态（健康 / 异常）。
- **服务状态**：DHT 服务、PostgreSQL、TMDB 三个组件的健康状态。

:::tip[先看状态再排查]
检索为空时先点「获取应用状态」。如果 DHT 显示异常，说明爬虫没有在发现种子，问题在 BitMagnet 侧而不是 AMMDS。
:::

## 在磁力检索中的作用

- **检索实现**：向 `/graphql` 提交 `torrentContent.search` 查询，参数为关键词、页码、每页条数与排序字段（默认按相关度倒序）。
- **结果字段**：包含命中总数与当前页条目，条目可继续查看文件列表与目录树。
- **文件查看**：按 info hash 查询 `torrent.files`，支持分页列表与不分页目录树，用于判断资源内容与体积。
- **下载衔接**：磁力结果可直接推送到下载器，具体操作见[磁力检索](/docs/subscribe/magnet)。

:::info[不参与订阅排序]
BitMagnet 不在订阅配置的「搜索顺序」里，订阅自动下载不会走它。它服务的是磁力检索页面，适合按关键词找冷门资源。
:::

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 测试连接失败 | 服务未启动、端口未映射或地址指向容器自身 | 用宿主地址重测，确认 `3333` 可访问 |
| 状态显示 DHT 异常 | 爬虫未运行或 `3334` 端口未放通 | 检查 BitMagnet 启动参数与端口映射 |
| 检索有结果但内容很少 | 爬虫刚启动，索引尚未积累 | 等待一段时间后再试 |
| 提示插件未启用 | 「启用状态」为关闭 | 打开开关并保存 |

## 相关页面

- [插件集成总览](/docs/integration/overview)
- [Prowlarr](/docs/integration/indexer/prowlarr)｜[NexusPHP](/docs/integration/indexer/nexusphp)｜[M-Team](/docs/integration/indexer/m-team)
- [磁力检索](/docs/subscribe/magnet)｜[订阅检索](/docs/subscribe/search)
- [qBittorrent](/docs/integration/downloader/qbittorrent)｜[网络与连通性](/docs/dashboard/network)
