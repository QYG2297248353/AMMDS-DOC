---
sidebar_position: 5
sidebar_label: "Bitmagnet"
title: "Bitmagnet"
description: "Bitmagnet is a self-hosted BitTorrent DHT crawler, content classifier, and torrent search engine, providing Web UI, GraphQL API, and Servarr integration."
keywords: [Bitmagnet, self-hosted, DHT, BitTorrent, torrent search, indexer, Torznab]
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

## 自部署

### Docker-Cli

```bash
docker run -d \
  --name=bitmagnet \
  -p 3333:3333 \
  -p 3334:3334/tcp \
  -p 3334:3334/udp \
  -e POSTGRES_HOST=db \
  -e POSTGRES_PASSWORD=change_me \
  -e POSTGRES_DB=bitmagnet \
  --restart unless-stopped \
  ghcr.io/bitmagnet-io/bitmagnet:latest \
  worker run --keys=http_server --keys=queue_server --keys=dht_crawler
```

### Docker-Compose

```yaml
---
services:
  bitmagnet:
    image: ghcr.io/bitmagnet-io/bitmagnet:latest
    container_name: bitmagnet
    ports:
      - 3333:3333     # Web UI 和 API
      - 3334:3334/tcp # BitTorrent DHT (TCP)
      - 3334:3334/udp # BitTorrent DHT (UDP)
    environment:
      - POSTGRES_HOST=db
      - POSTGRES_PASSWORD=change_me
      - POSTGRES_DB=bitmagnet
    command:
      - worker
      - run
      - --keys=http_server
      - --keys=queue_server
      - --keys=dht_crawler
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    container_name: bitmagnet-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: change_me
      POSTGRES_DB: bitmagnet
    volumes:
      - bitmagnet-db:/var/lib/postgresql/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  bitmagnet-db:
```
