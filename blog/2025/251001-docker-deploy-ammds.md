---
slug: docker-deploy-ammds
title: Docker 部署 AMMDS 完整指南
authors: [ms]
tags: [tutorial, ammds]
date: 2025-10-01
---

## 概述

AMMDS（Advanced Multimedia Data Management System）是一个功能强大的私人数据管理平台，支持元数据刮削、站点认证、资源检索、榜单管理等功能。本文将详细介绍如何使用 Docker 部署 AMMDS，涵盖 Docker Compose 配置、环境变量说明、目录挂载建议以及常见问题排查。

{/* truncate */}

## 前置条件

在开始部署之前，请确保你的环境中已安装以下软件：

- **Docker Engine**：版本 20.10 及以上
- **Docker Compose**：版本 2.x 及以上（或 Docker Compose Plugin）
- **操作系统**：Linux（推荐 Ubuntu 20.04+ / Debian 11+）、Windows Server 2019+、macOS 或群晖 DSM / 飞牛 FnOS 等 NAS 系统
- **硬件要求**：最低 2 核 CPU、4GB 内存、20GB 可用磁盘空间

验证环境：

```bash
docker --version
docker compose version
```

## Docker Compose 部署（推荐）

### 第一步：创建部署目录

```bash
mkdir -p /opt/ammds
cd /opt/ammds
```

### 第二步：编写 docker-compose.yml

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'

services:
  ammds:
    image: qyg2297248353/ammds:latest
    container_name: ammds
    restart: unless-stopped
    ports:
      - "7000:7000"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
      - /path/to/your/media:/media:ro
      - /path/to/your/downloads:/downloads:ro
    environment:
      - TZ=Asia/Shanghai
      - SERVER_PORT=7000        # SpringBoot 应用监听端口
      - SPRING_PROFILES_ACTIVE=prod
      - AMMDS_HOME=/app/data
    networks:
      - ammds-network

networks:
  ammds-network:
    driver: bridge
```

### 第三步：启动服务

```bash
docker compose up -d
```

等待镜像拉取和容器启动。首次启动可能需要几分钟（取决于网络速度）。

### 第四步：验证部署

```bash
docker compose logs -f ammds
```

查看日志，确认服务启动成功。然后在浏览器中访问 `http://<你的服务器IP>:7000`。

## 环境变量说明

AMMDS 支持通过环境变量进行配置，以下是主要的环境变量：

| 变量名 | 说明 | 默认值 | 是否必填 |
|:-------|:-----|:-------|:---------|
| `TZ` | 时区设置 | `Asia/Shanghai` | 推荐配置 |
| `SERVER_PORT` | 服务监听端口 | `7000` | 推荐配置 |
| `SPRING_PROFILES_ACTIVE` | SpringBoot 激活配置文件 | `prod` | 否 |
| `AMMDS_HOME` | 数据目录路径 | `/app/data` | 否 |
| `AMMDS_LOG_LEVEL` | 日志级别 | `INFO` | 否 |
| `AMMDS_ENABLE_HTTPS` | 是否启用 HTTPS | `false` | 否 |

### 高级配置示例

```yaml
environment:
  - TZ=Asia/Shanghai
  - SERVER_PORT=7000
  - AMMDS_LOG_LEVEL=DEBUG
  - AMMDS_ENABLE_HTTPS=false
  - AMMDS_MAX_CONCURRENT_SCRAPES=5
```

## 目录挂载建议

合理的目录挂载可以确保数据持久化和性能优化：

| 容器内路径 | 建议宿主机路径 | 说明 |
|:-----------|:--------------|:-----|
| `/app/data` | `./data` | 数据库文件、用户数据持久化存储 |
| `/app/config` | `./config` | 配置文件持久化存储 |
| `/media` | `/path/to/media` | 媒体文件目录（建议挂载为只读 `:ro`） |
| `/downloads` | `/path/to/downloads` | 下载目录（用于监控自动刮削） |

### 群晖 NAS 挂载示例

```yaml
volumes:
  - /volume1/docker/ammds/data:/app/data
  - /volume1/docker/ammds/config:/app/config
  - /volume1/video:/media:ro
  - /volume1/downloads:/downloads:ro
```

### 飞牛 FnOS 挂载示例

```yaml
volumes:
  - /vol1/1000/docker/ammds/data:/app/data
  - /vol1/1000/docker/ammds/config:/app/config
  - /vol1/1000/video:/media:ro
  - /vol1/1000/downloads:/downloads:ro
```

## 首次启动配置

### 1. 访问管理界面

打开浏览器，访问 `http://<你的服务器IP>:7000`，你将看到 AMMDS 的登录页面。

### 2. 创建管理员账户

首次访问会引导你创建管理员账户。请设置一个安全的用户名和密码。

### 3. 配置刮削插件

进入"插件管理"页面，启用你需要的数据源插件：

- **TMDB 刮削**：推荐，覆盖最全的欧美影视元数据
- **JavBus 刮削**：适合日本影视资源
- **Metatube 刮削**：提供额外的元数据源
- **FANZA DMM 刮削**：面向日本影视的高质量数据源
- **ThePornDB 刮削**：面向成人内容

每个插件可能需要配置 API Key 或 Cookie，请根据页面提示操作。

### 4. 添加站点认证

进入"站点管理"页面，添加你的 PT 站点认证信息：

1. 点击"添加站点"
2. 选择站点类型（M-Team、KamePT、Rousi 等）
3. 输入站点域名和认证凭据（Cookie 或 Passkey）
4. 点击"验证"确认连接成功

### 5. 配置推送通知

在"通知设置"中配置推送方式：

- **Telegram Bot**：通过机器人推送刮削结果和系统通知
- **WebHook**：自定义 WebHook URL 接收通知

## 常见问题排查

### Q1: 容器启动后立即退出

**原因**：通常是因为数据目录权限不足或端口被占用。

**解决方案**：
```bash
# 检查端口占用
netstat -tlnp | grep 7000

# 修复目录权限
sudo chown -R 1000:1000 ./data ./config
sudo chmod -R 755 ./data ./config
```

### Q2: 无法访问管理界面

**原因**：防火墙规则或 Docker 网络配置问题。

**解决方案**：

```bash
# 检查容器是否运行
docker ps | grep ammds

# 查看容器日志
docker compose logs ammds

# 检查防火墙
sudo ufw status
# 如需要，开放端口
sudo ufw allow 7000
```

### Q3: 刮削功能无法正常工作

**原因**：通常是 API Key 配置错误或网络访问受限。

**解决方案**：
1. 检查插件配置中的 API Key 是否正确
2. 确认服务器能正常访问外部网络（特别是 TMDB、JavBus 等站点）
3. 查看 AMMDS 日志中的刮削错误信息

### Q4: 数据库连接错误

**原因**：SQLite 数据库文件损坏或权限问题。

**解决方案**：

```bash
# 修复权限
sudo chmod 644 ./data/ammds.db
sudo chown 1000:1000 ./data/ammds.db

# 备份后重建数据库
docker compose down
mv ./data/ammds.db ./data/ammds.db.bak
docker compose up -d
```

### Q5: 如何更新 AMMDS

```bash
# 拉取最新镜像
docker compose pull

# 重新创建容器
docker compose up -d

# 清理旧镜像（可选）
docker image prune
```

### Q6: 如何备份数据

```bash
# 备份数据目录
tar -czf ammds-backup-$(date +%Y%m%d).tar.gz ./data ./config

# 恢复备份
tar -xzf ammds-backup-20250101.tar.gz
docker compose restart
```

## 反向代理配置

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name ammds.yourdomain.com;

    location / {
        proxy_pass http://localhost:7000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

建议搭配 Certbot 或 Nginx Proxy Manager 配置 HTTPS 证书，确保数据传输安全。

## 总结

通过 Docker 部署 AMMDS 是一个相对简单的过程，关键在于合理的目录挂载和环境变量配置。部署完成后，你将获得一个功能强大的私人数据管理平台，支持多站点认证、智能元数据刮削、资源检索和实时推送通知。

如果在部署过程中遇到其他问题，欢迎在项目仓库中提交 Issue，或加入社区讨论获取帮助。
