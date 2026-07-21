---
slug: nas-media-server-guide
title: 用 NAS 搭建私人影音库：从入门到进阶
authors: [ms]
tags: [tutorial, guide, nas, feature]
date: 2025-08-20
---

## 前言

拥有一台 NAS（网络附加存储）后，搭建私人影音库几乎是每个 NAS 用户的"标配"玩法。但很多人买回 NAS 后，面对复杂的配置流程常常不知从何下手。本文将带你一步步从零开始，用 NAS 搭建一个专业的私人影音库。

{/* truncate */}

## 第一步：硬件选型

搭建影音库的 NAS 选型，核心关注三个维度：**盘位数量**、**CPU 核显性能**、**内存扩展能力**。

### 推荐机型

**入门级：群晖 DS423+**
- 4 盘位，支持最大 72TB 存储
- Intel Celeron J4125，集成 UHD 600 核显
- 支持 4K 实时硬件转码
- 适合 2-3 人家庭使用

**进阶级：群晖 DS920+**
- 4 盘位，支持 NVMe 缓存加速
- Intel Celeron J4125，集成 UHD 600 核显
- 可扩展至 8GB 内存
- 支持 Docker，可运行 Jellyfin/Emby 等容器
- 适合 3-5 人家庭使用

**高阶选择：自组 NAS**
- 可选 Intel 10/11 代 i3/i5，UHD 730/750 核显性能更强
- 无盘位限制，按需扩展
- 支持更多 Docker 服务同时运行

### 硬盘推荐

| 用途 | 推荐型号 | 容量建议 |
|:----|:---------|:---------|
| 系统盘 | WD Red Plus / Seagate IronWolf | 4TB×2 RAID1 |
| 影音盘 | WD Red Pro / Seagate IronWolf Pro | 8TB/12TB/16TB SHR |
| 缓存 | Samsung 980 EVO NVMe | 256GB/512GB |

### 网络环境

搭建影音库，有线网络是必选项：
- NAS 本体：建议千兆有线连接（至少）
- 播放设备：4K 原盘播放建议千兆有线或 WiFi 6
- 路由器：建议千兆端口以上

## 第二步：系统安装与基础配置

### 群晖 DSM 安装

1. 插入硬盘，开机
2. 访问 find.synology.com 或在路由器后台查找 NAS IP
3. 安装 DSM 7.x 系统
4. 配置存储池（建议 SHR 阵列模式）
5. 创建共享文件夹 `/video` `/downloads` `/metadata`

### 系统关键配置

```
控制面板 → 文件服务 → 启用 SMB/AFP/NFS
控制面板 → 共享文件夹 → 创建映射权限
套件中心 → 安装 Container Manager（Docker）
套件中心 → 安装 File Station
```

## 第三步：Docker 安装媒体服务器

### 方案一：安装 Jellyfin（完全免费）

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    environment:
      - PUID=1026
      - PGID=100
      - TZ=Asia/Shanghai
    volumes:
      - /volume1/docker/jellyfin/config:/config
      - /volume1/docker/jellyfin/cache:/cache
      - /volume1/video:/media
    ports:
      - 8096:8096
      - 8920:8920
    devices:
      - /dev/dri:/dev/dri  # 硬件转码
    restart: unless-stopped
```

### 方案二：安装 Emby

```yaml
version: '3.8'

services:
  emby:
    image: emby/embyserver:latest
    container_name: emby
    environment:
      - PUID=1026
      - PGID=100
      - TZ=Asia/Shanghai
    volumes:
      - /volume1/docker/emby/config:/config
      - /volume1/video:/media
    ports:
      - 8096:8096
      - 8920:8920
    devices:
      - /dev/dri:/dev/dri
    restart: unless-stopped
```

**重要**：`PUID` 和 `PGID` 需要在 NAS 上执行 `id admin` 查看，确保与 NAS 用户权限一致，否则文件权限会有问题。

## 第四步：文件目录规划

一个清晰的目录结构是良好体验的基础。推荐方案：

```
/video
  ├── Movies/           # 电影
  │   ├── Avatar (2009)/
  │   │   └── avatar.2009.1080p.bluray.x264.mkv
  │   └── ...
  ├── TV Shows/         # 剧集
  │   ├── Breaking Bad (2008)/
  │   │   ├── Season 01/
  │   │   └── Season 02/
  │   └── ...
  ├── Anime/            # 动漫
  │   └── ...
  ├── Documentary/      # 纪录片
  │   └── ...
  └── Music/            # 音乐
      └── ...
```

**命名规范建议**：
- 电影：`片名 (年份).清晰度.来源.编码.后缀`
  - 示例：`Inception (2010).2160p.NF.WEB-DL.x265.mkv`
- 剧集：`剧名 (年份)/Season NN/剧名 - SNNENN.后缀`
  - 示例：`Game of Thrones (2011)/Season 01/Game of Thrones - S01E01.mkv`

## 第五步：元数据刮削配置

这是决定影音库品质的关键一步。元数据刮削的好坏直接影响海报墙的美观度和信息的准确性。

### 使用 Jellyfin/Emby 内置刮削

这是最简单的方案，但存在不足：
- 对非欧美影视匹配率较低
- 无法批量精细管理演员信息
- 刮削失败后手动修正麻烦

### 引入 AMMDS 独立刮削层（推荐）

AMMDS 作为独立的元数据管理平台，可以部署在 Docker 中：

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # 实际镜像名以官方为准
    container_name: ammds
    ports:
      - 7000:7000
    volumes:
      - /volume1/docker/ammds/data:/app/data
      - /volume1/video:/media:ro
      - /volume1/docker/ammds/config:/app/config
    environment:
      - TZ=Asia/Shanghai
    restart: unless-stopped
```

AMMDS 的优势在于：
1. **多源聚合**：同时从 TMDB、JavBus、FANZA DMM 等多个数据源获取元数据
2. **智能匹配**：基于文件名智能识别影片信息，匹配率远超内置刮削
3. **NFO 文件输出**：生成标准 NFO 文件，Jellyfin/Emby 直接读取
4. **演员管理**：自动抓取演员头像和作品列表
5. **增量监控**：新文件加入后自动触发刮削

## 第六步：远程访问方案

### 方案一：群晖 QuickConnect（最简单）

在 DSM 控制面板中启用 QuickConnect，即可通过 `quickconnect.to/你的ID` 远程访问。但仅限于 DSM 管理界面，无法直接访问 Jellyfin。

### 方案二：反向代理 + DDNS

**推荐使用 Cloudflare Tunnel 或 Nginx Proxy Manager**：

```
路由器 → 端口转发 → NAS → Nginx Proxy Manager → Jellyfin/Emby
```

配置 DDNS（动态 DNS）后，通过 `jellyfin.yourdomain.com` 访问。

### 方案三：Tailscale/WireGuard VPN

最安全的远程访问方案，通过 VPN 进入家庭网络再访问 NAS 服务。Tailscale 配置最为简单。

## 进阶技巧

### 1. 接入 PT 站点自动化下载

通过 AMMDS 的站点认证功能，绑定 M-Team、KamePT、Rousi 等 PT 站点。需要某部电影时，在 AMMDS 中检索各站资源，一键下载到 NAS，刮削和入库全自动完成。

### 2. 多用户共享

Jellyfin/Emby 都支持多用户管理，可以为家庭成员创建独立账户，设置不同的访问权限和播放限制（如家长控制）。

### 3. 转码优化

- 启用 Intel QuickSync 硬件转码
- 设置合理的转码缓存大小
- 为移动端设备开启较低质量的转码流

### 4. 备份元数据

定期备份 Jellyfin/Emby 的配置目录和 AMMDS 的数据目录，防止意外丢失。NFO 文件与媒体文件同目录存放是最安全的元数据备份策略。

## 总结

从 NAS 选型到 Docker 部署，从目录规划到元数据刮削，再到远程访问，搭建一个完整的私人影音库涉及多个环节。每个环节都有多种选择，但核心原则是：

1. **硬件够用就好**：J4125 级别的 NAS 就能满足大多数人的需求
2. **目录规划要前置**：开始下载前先想好目录结构，比后期整理容易得多
3. **元数据是灵魂**：引入 AMMDS 作为独立刮削层，是提升影音库品质最有效的投资
4. **远程访问安全第一**：优先考虑 VPN 方案，其次才是端口转发

希望这篇指南能帮助你在 NAS 上搭建出梦想中的影音库。如果遇到问题，欢迎在评论区交流讨论！
