---
title: Prowlarr
description: Prowlarr 是一个专为影音自动化设计的索引器管理工具，统一管理 BT 种子站和 Usenet 索引器，并能与 Sonarr、Radarr 等应用无缝同步。
keywords: [Prowlarr, 索引器, BT, Usenet, Sonarr]
tags: [plugin, site-search]
sidebar_position: 4
sidebar_label: "Prowlarr"
---

# Prowlarr

本文介绍 Prowlarr 插件的配置方法，用于统一管理 BT 种子站和 Usenet 索引器，实现影音自动化搜索。

{/* truncate */}

Prowlarr 是一个专为影音自动化设计的索引器管理工具，用 .NET/React 技术做的。它可以当做一个集中管理平台，统一管理几百个 BT 种子站和 Usenet 索引器，并且能和 Sonarr、Radarr、Lidarr、Readarr 这些应用无缝同步。

官网：[https://prowlarr.com/](https://prowlarr.com/)

## 插件配置

![Prowlarr 插件配置](/img/plugin/prowlarr-01.png)

### 基本配置

- **启用状态**：控制是否启用该插件。
- **服务地址**：Prowlarr 服务的访问地址。
- **鉴权密钥**：Prowlarr 服务的认证密钥，用来验证身份。

## 自部署

### Docker-Cli

```bash
docker run -d \
  --name=prowlarr \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -p 9696:9696 \
  -v /path/to/prowlarr/data:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/prowlarr:latest
```

### Docker-Compose

```yaml
---
services:
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
    volumes:
      - /path/to/prowlarr/data:/config
    ports:
      - 9696:9696
    restart: unless-stopped
```
