---
sidebar_position: 5
sidebar_label: "Bitmagnet"
title: "Bitmagnet"
description: "Bitmagnet은 자체 호스팅 BitTorrent DHT 크롤러, 콘텐츠 분류기 및 토렌트 검색 엔진입니다."
keywords: [Bitmagnet, 자체 호스팅, DHT, BitTorrent, 토렌트 검색, 인덱서, Torznab]
tags: [plugin, site-search]
---

# Bitmagnet

Bitmagnet 是一个自托管的 BitTorrent DHT 爬虫、内容分类器和种子搜索引擎，使用 Go 语言开发。它通过爬取 DHT 网络自动发现种子，对内容进行分类和元数据增强，并提供 Web UI、GraphQL API 以及 Torznab 兼容接口，可与 Sonarr、Radarr 等 Servarr 套件无缝集成。

官网：[https://bitmagnet.io/](https://bitmagnet.io/)

## 插件配置

![插件配置](/img/plugin/bitmagnet-01.png)

### 基本配置

- **启用状态**：控制是否启用该插件。
- **服务地址**：Bitmagnet 服务的访问地址。应用需要自建一个 Bitmagnet 服务才能使用该插件。
