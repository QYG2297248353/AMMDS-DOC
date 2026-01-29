---
sidebar_position: 4
sidebar_label: "Prowlarr"
---

# Prowlarr

Prowlarr 是一款专为影音自动化设计的强大索引器管理器和代理工具，基于 .NET/React 技术栈构建。它作为集中式中心，统一管理数百个 Torrent 跟踪器和 Usenet 索引器，并与 Sonarr、Radarr、Lidarr、Readarr 等应用无缝同步

官网：[https://prowlarr.com/](https://prowlarr.com/)

<!-- truncate -->

## 插件配置

![Prowlarr 插件配置](./img/plugin/prowlarr-01.png)

启用状态：是否启用该插件

服务地址：Prowlarr 服务的地址。

鉴权密钥：Prowlarr 服务的鉴权密钥。

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