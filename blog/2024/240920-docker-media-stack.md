---
slug: docker-media-stack
title: Docker 搭建完整媒体栈：从零开始的自托管指南
authors: [ms]
tags: [docker, tutorial, guide]
date: 2024-09-20
---

# Docker 搭建完整媒体栈：从零开始的自托管指南

本文将手把手教你如何使用 Docker 和 Docker Compose 搭建一整套自托管媒体栈，涵盖资源获取、下载管理、元数据刮削和媒体串流的完整流程。

{/* truncate */}

## Docker 与 Docker Compose 基础

在开始之前，确保你已经安装了 Docker Engine 和 Docker Compose。绝大多数 NAS 系统（Unraid、TrueNAS Scale、群晖 DSM 7.x+）和 Linux 发行版都支持 Docker 部署。

核心概念：
- **镜像（Image）**：应用的打包文件，包含运行所需的一切
- **容器（Container）**：镜像的运行实例，相互隔离
- **卷（Volume）**：持久化存储，容器删除后数据不丢失
- **Docker Compose**：通过 YAML 文件定义和运行多容器应用

## 媒体栈架构

本教程搭建的媒体栈包含以下组件：

```
┌─────────────────────────────────────────┐
│              反向代理 (Nginx Proxy)        │
│            SSL / 域名 / 访问控制           │
└────────────┬───────────────────────────┘
             │
    ┌────────┴────────┐
    │  Jellyfin 媒体服务器 │
    │  串流 / 转码 / 管理  │
    └────────┬────────┘
             │
    ┌────────┴────────┐
    │  元数据刮削 & 管理   │
    │  (AMMDS / Metatube) │
    └──────────────────┘
             │
    ┌────────┴────────┐        ┌──────────────┐
    │  Sonarr (剧集管理) │        │ Radarr (电影管理)│
    │  订阅 / 自动下载    │        │ 订阅 / 自动下载   │
    └────────┬────────┘        └───────┬──────┘
             │                         │
    ┌────────┴─────────────────────────┴────────┐
    │         qBittorrent (下载客户端)              │
    │           种子 / 磁力链接下载                   │
    └────────────────┬───────────────────────────┘
                     │
    ┌────────────────┴───────────────────────────┐
    │           Prowlarr (索引器管理)                │
    │          站点搜索 / 索引器聚合                  │
    └────────────────────────────────────────────┘
```

## docker-compose.yml 示例

### 基础配置

```yaml
version: "3.8"

services:
  # --- 下载客户端 ---
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
      - WEBUI_PORT=8080
    volumes:
      - ./qbittorrent/config:/config
      - ./data/downloads:/downloads
    ports:
      - 8080:8080
      - 6881:6881
      - 6881:6881/udp
    restart: unless-stopped

  # --- 剧集管理 ---
  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
    volumes:
      - ./sonarr/config:/config
      - ./data/tv:/tv
      - ./data/downloads:/downloads
    ports:
      - 8989:8989
    restart: unless-stopped

  # --- 电影管理 ---
  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
    volumes:
      - ./radarr/config:/config
      - ./data/movies:/movies
      - ./data/downloads:/downloads
    ports:
      - 7878:7878
    restart: unless-stopped

  # --- 索引器管理 ---
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
    volumes:
      - ./prowlarr/config:/config
    ports:
      - 9696:9696
    restart: unless-stopped

  # --- 媒体服务器 ---
  jellyfin:
    image: lscr.io/linuxserver/jellyfin:latest
    container_name: jellyfin
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
    volumes:
      - ./jellyfin/config:/config
      - ./data/tv:/data/tv
      - ./data/movies:/data/movies
    ports:
      - 8096:8096
    devices:
      - /dev/dri:/dev/dri  # Intel QuickSync 硬件转码
    restart: unless-stopped
```

## 硬件转码配置（Intel QuickSync）

要让 Jellyfin 使用 Intel 核显进行硬件转码，需要做两件事：

1. **宿主机配置**：确保 Intel 核显驱动已加载（通常 Linux 内核已包含）
2. **容器配置**：将 `/dev/dri` 设备直通给容器

验证转码是否生效：在 Jellyfin 管理后台 → 播放 → 转码 → 勾选硬件加速相关选项 → 播放视频时观察 Dashboard 的转码状态。

## 反向代理与 SSL 配置

为了安全地远程访问你的媒体栈，建议配置反向代理。

### 使用 Nginx Proxy Manager

```yaml
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    container_name: nginx-proxy-manager
    volumes:
      - ./nginx/data:/data
      - ./nginx/letsencrypt:/etc/letsencrypt
    ports:
      - 80:80
      - 443:443
      - 81:81  # 管理面板
    restart: unless-stopped
```

通过 Nginx Proxy Manager 的 Web 界面，你可以：
- 为每个服务配置独立的域名或子路径
- 自动申请和续期 Let's Encrypt SSL 证书
- 配置 IP 白名单、基本认证等访问控制

## 自动化工作流

完整媒体栈的自动化流程如下：

1. **Sonarr/Radarr** 订阅你感兴趣的剧集或电影
2. **Prowlarr** 自动在配置的 PT/BT 站点中搜索资源
3. 找到的种子推送到 **qBittorrent** 开始下载
4. 下载完成后，Sonarr/Radarr 自动整理文件并重命名
5. **Jellyfin** 自动扫描新文件并更新媒体库
6. 你可以通过 **AMMDS** 统一管理元数据刮削和质量控制

这套自动化流程一旦配置完成，你只需要负责订阅想看的内容，剩下的工作系统会自动完成。

## 注意事项

- **权限问题**：确保所有容器的 `PUID`/`PGID` 一致，避免文件权限冲突
- **网络模式**：所有服务建议放在同一个 Docker 网络中，通过容器名互相访问
- **存储规划**：下载目录和媒体库目录分离，方便 Sonarr/Radarr 进行文件整理
- **资源监控**：建议部署 Portainer 或 Grafana 监控容器资源使用情况

通过本文的指南，你应该能够搭建起一套功能完善、高度自动化的自托管媒体栈。如果需要更强大的元数据管理和多源刮削功能，别忘了集成 AMMDS 来完善你的工具链。
