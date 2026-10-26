---
title: Docker 部署
description: 使用 AMMDS 官方镜像部署容器，说明镜像标签、端口映射、数据目录挂载、Compose 示例与升级步骤。
keywords: [Docker, 镜像, 容器部署, Compose, 端口映射, 数据挂载]
tags: []
sidebar_position: 2
---

# Docker 部署

Docker 镜像是 AMMDS 最常用的部署方式：一个容器内同时运行 Nginx 与后端，页面、接口和静态资源都由同一个端口提供。本页给出可直接使用的 `docker run` 与 Compose 配置，并说明目录、权限和升级方式。

{/* truncate */}

## 镜像与标签

| 镜像 | 说明 |
| --- | --- |
| `qyg2297248353/ammds:latest` | Docker Hub 上的最新版本，基于 Oracle Linux 9 构建，推荐使用 |
| `qyg2297248353/ammds:<版本号>` | 固定版本，适合需要可控升级的生产环境 |
| `qyg2297248353/ammds:latest-ol8` | 基于 Oracle Linux 8 的变体，用于较旧的系统环境（例如跑不起标准镜像的老设备） |
| `ghcr.io/qyg2297248353/ammds:latest` | 与 Docker Hub 同步的 GitHub Container Registry 副本，拉取不畅时可替换 |

镜像提供 `linux/amd64` 与 `linux/arm64` 两种架构，拉取时会自动匹配当前平台。

## 一步运行

```bash title="docker run"
docker run -d \
  --name AMMDS \
  -p 8080:80 \
  -v /opt/ammds/data:/ammds/data \
  -v /opt/ammds/db:/ammds/db \
  -v /opt/ammds/download:/ammds/download \
  -v /mnt/media:/mnt/media \
  -e TZ=Asia/Shanghai \
  -e PUID=1000 \
  -e PGID=1000 \
  --restart always \
  qyg2297248353/ammds:latest
```

启动后用 `http://主机IP:8080` 访问。若 8080 已被占用，只改冒号左侧的宿主机端口即可。

## Compose 示例

```yaml title="docker-compose.yml"
services:
  ammds:
    image: qyg2297248353/ammds:latest
    container_name: AMMDS
    ports:
      - "8080:80"          # 页面与接口
      - "47823:47823/udp"  # 局域网发现（可选）
      - "47824:47824/udp"  # 局域网广播（可选）
    volumes:
      - ./data:/ammds/data
      - ./db:/ammds/db
      - ./download:/ammds/download
      - /mnt/media:/mnt/media
    environment:
      TZ: Asia/Shanghai
      PUID: "1000"
      PGID: "1000"
      UMASK: "022"
    restart: always
```

```bash
docker compose up -d
```

:::note[UDP 端口]
Nginx 只代理 TCP。如果不需要桌面客户端自动发现，可以删除两条 UDP 映射，客户端改为手动填写服务地址即可。
:::

## 端口说明

| 端口 | 用途 | 是否映射到宿主机 |
| --- | --- | --- |
| `80` | 容器内 Nginx，提供页面、`/api/`、`/docs/`、`/swagger/`、`/actuator/` | 需要，按需改成其他宿主机端口 |
| `8080` | 容器内后端服务，只被本机 Nginx 反向代理 | 不需要 |
| `47823/udp` | 局域网服务发现探测 | 需要自动发现时映射 |
| `47824/udp` | 局域网服务广播 | 需要自动发现时映射 |

## 目录挂载

| 容器路径 | 作用 | 建议 |
| --- | --- | --- |
| `/ammds/data` | 图片、缓存、字幕、日志、依赖程序、恢复密钥 | 必须持久化 |
| `/ammds/db` | H2 数据库文件 | 必须持久化，并纳入备份 |
| `/ammds/download` | 镜像预留的数据卷，通常与下载器的保存目录共用 | 建议持久化 |
| 你的媒体目录 | 扫描与刮削的对象 | 宿主机路径与容器内路径保持一致 |

:::warning[不要把媒体放进 /ammds]
`/ammds` 是程序与数据的根目录。媒体目录请单独挂载（例如 `/mnt/media:/mnt/media`），否则清理数据或重装容器时容易误删。
:::

## 运行用户与文件权限

容器默认以 root 运行。设置 `PUID`、`PGID` 为非 0 后，入口脚本会把 `ammds` 用户的 UID/GID 改成这两个值，再以该用户执行后端，并按 `UMASK`（默认 `022`）设置新建文件权限。挂载宿主机目录出现「写入失败」「无权限」时，优先把 `PUID` / `PGID` 改成宿主机上拥有该目录的用户。

## 验证启动

```bash
docker logs -f AMMDS
```

日志出现 `[AMMDS] 服务已启动` 表示后端与 Nginx 都已就绪。若页面提示「服务正在启动，请耐心等待」，说明 Nginx 已起来但后端仍在初始化，稍后刷新即可。

:::tip[首次启动]
首次启动会下载 FFmpeg、MetaTube 等依赖资源，耗时取决于网络。可以在头像菜单的 **系统检查** 中确认这些依赖是否就绪。
:::

## 升级

1. 备份 `db/` 与 `data/` 目录。
2. 拉取新镜像：`docker compose pull`（或 `docker pull qyg2297248353/ammds:latest`）。
3. 重建容器：`docker compose up -d`（或删除旧容器后重新 `docker run`）。
4. 打开页面确认版本号与「系统检查」结果。

数据都在挂载目录里，重建容器不会丢失；但跨大版本升级前仍建议保留一份数据库副本。

## 常见问题

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| 容器启动后立即退出 | 宿主机架构与镜像不匹配，或目录无写权限 | `docker logs AMMDS` 查看报错；ARM 设备确认拉取的是 arm64 镜像 |
| 页面 502 / 「服务正在启动」 | 后端尚未完成初始化 | 等待并查看日志，确认没有端口占用或数据库损坏 |
| 无法写入媒体目录 | 容器内用户与宿主机目录属主不一致 | 调整 `PUID` / `PGID`，或修正目录权限 |
| 客户端发现不到服务 | 只映射了 TCP 端口 | 增加 `47823/udp`、`47824/udp` 映射，或手动填写地址 |

需要更细的连通性排查，见[网络与连通性](/docs/backend/dashboard/network)。
