---
slug: fnos-integration-guide
title: 飞牛 NAS（FnOS）上部署 AMMDS 完整指南
authors: [ms]
tags: [nas, docker, tutorial, guide]
date: 2026-08-10
---

## 飞牛 NAS（FnOS）简介

飞牛 NAS（FnOS）是由飞牛互联网科技开发的一款国产 NAS 操作系统，基于 Linux 内核深度定制，专为家庭和小型企业用户设计。FnOS 以简洁易用的 Web 管理界面、丰富的应用生态和优秀的性能表现，在短时间内吸引了大量用户。

FnOS 内置了应用商店，用户可以通过商店安装各类 NAS 应用。同时，FnOS 也支持 Docker 容器化部署，提供了较为完善的 Docker 管理界面。

AMMDS 在 v1.6.40 版本开始正式支持 FnOS 平台，目前提供了两种安装方式：**FPK 包安装**和**Docker 部署**。本文将详细介绍这两种方式的操作步骤。

{/* truncate */}

## 方式一：FPK 包安装（推荐）

FPK（FnOS Package）是飞牛 NAS 原生的应用包格式，通过应用商店安装，体验最接近原生应用。

### 前提条件

- 飞牛 NAS 已升级至 FnOS 最新版本（建议 v0.8.x 或更高）
- NAS 存储空间充足（建议至少 20GB 可用空间用于 AMMDS 数据存储）
- 已开启 FnOS 应用商店功能

### 下载 FPK 安装包

AMMDS 的 FPK 安装包可从以下渠道获取：

1. **GitHub Releases**：[AMMDS Releases 页面](https://github.com/mengshou/ammds/releases) 下载名为 `ammds-{version}.fpk` 的文件
2. **AMMDS 官网**：访问 AMMDS 下载页面，选择"FnOS 安装包"下载
3. **社区分享**：部分 FnOS 社区用户也会分享最新版本的安装包

### 导入安装

**步骤一**：登录飞牛 NAS 管理面板，进入"应用商店"。

**步骤二**：点击页面右上角的"手动安装"按钮（或类似功能的入口）。

**步骤三**：在弹出的文件选择对话框中，选择下载好的 `ammds-{version}.fpk` 文件。

**步骤四**：系统会自动解析安装包信息，确认后点击"安装"开始安装。安装过程通常需要 1-3 分钟。

**步骤五**：安装完成后，AMMDS 会出现在"已安装应用"列表中，点击图标即可进入管理界面。

### 配置建议

FPK 安装完成后，建议立即进行以下基础配置：

1. **数据目录**：在 FnOS 文件管理器中创建专用的媒体目录（如 `/vol1/1000/Media`），并在 AMMDS 设置中配置该路径
2. **端口设置**：默认端口为 3100，如与其他应用冲突可在设置中修改
3. **存储位置**：AMMDS 的应用数据默认存储在 FnOS 的应用数据目录中，如需迁移到特定存储池，可在安装时选择安装位置

## 方式二：Docker 部署

对于已经熟悉 Docker 的用户，或者需要更灵活配置的场景，可以选择 Docker Compose 部署。

### 通过 FnOS Docker 管理界面部署

**步骤一**：在 FnOS 应用商店中安装"Container Manager"应用（如果尚未安装）。

**步骤二**：打开 Container Manager，进入"项目"标签页，点击"创建项目"。

**步骤三**：在配置编辑器中粘贴以下 Docker Compose 配置：

```yaml
version: '3.8'

services:
  ammds:
    image: ghcr.io/mengshou/ammds:latest  # 国内用户可替换为 qyg2297248353/ammds:latest（Docker Hub）
    container_name: ammds
    restart: unless-stopped
    ports:
      - "3100:3100"
    volumes:
      # AMMDS 数据目录（配置文件、数据库、日志等）
      - ./ammds-data:/app/data
      # 媒体资源目录（根据实际情况修改路径）
      - /vol1/1000/Media:/media:ro
      # NFO 文件输出目录
      - /vol1/1000/Media/nfo:/app/nfo
    environment:
      - TZ=Asia/Shanghai
      - AMMDS_PORT=3100
      - AMMDS_DATA_DIR=/app/data
```

**步骤四**：根据实际的 NAS 存储路径修改 volumes 中的路径映射，然后点击"部署"。

**步骤五**：部署完成后，通过 `http://{NAS_IP}:3100` 访问 AMMDS 管理界面。

### 通过 SSH 命令行部署

对于习惯命令行的用户，也可以通过 SSH 登录 FnOS 后直接执行：

```bash
# 创建目录
mkdir -p /docker/ammds

# 创建 docker-compose.yml
cat > /docker/ammds/docker-compose.yml << 'EOF'
version: '3.8'
services:
  ammds:
    image: ghcr.io/mengshou/ammds:latest
    container_name: ammds
    restart: unless-stopped
    ports:
      - "3100:3100"
    volumes:
      - ./ammds-data:/app/data
      - /vol1/1000/Media:/media:ro
      - /vol1/1000/Media/nfo:/app/nfo
    environment:
      - TZ=Asia/Shanghai
EOF

# 启动容器
cd /docker/ammds
docker compose up -d
```

## 两种方式的对比

| 对比维度 | FPK 安装 | Docker 部署 |
|:--------|:---------|:-----------|
| 安装复杂度 | 简单，通过应用商店操作 | 中等，需要配置 Compose 文件 |
| 自动更新 | 应用商店推送更新 | 手动拉取最新镜像 |
| 资源隔离 | 系统级管理 | 容器级隔离，更安全 |
| 路径配置 | 自动处理，路径直观 | 需手动配置 volume 映射 |
| 与 FnOS 集成度 | 高，支持应用商店管理 | 低，独立运行 |
| 升级便利性 | 应用商店一键升级 | 手动操作 docker compose |

## 性能调优建议

### 1. 存储配置

- 将 AMMDS 的数据目录存放在 SSD 存储池中，提升数据库读写性能
- 媒体资源目录可以存放在 HDD 存储池中，不影响刮削性能
- 建议为 NFO 输出目录单独分配空间

### 2. 内存分配

FnOS 默认的 Docker 容器内存限制可能无法满足大规模刮削场景的需求。建议通过 Container Manager 将 AMMDS 容器的内存限制调整为：

| 场景 | 推荐内存 |
|:----|:---------|
| 个人使用（< 1000 部） | 1GB |
| 家庭使用（1000-5000 部） | 2GB |
| 大型媒体库（> 5000 部） | 4GB 或以上 |

### 3. 并发设置

在 AMMDS 管理面板中，根据 NAS 的 CPU 核心数调整刮削并发数：

- 2 核 CPU：建议设置为 2-3 个并发
- 4 核 CPU：建议设置为 4-6 个并发
- 8 核及以上：可以设置为 8-10 个并发

### 4. 定时任务优化

建议将批量刮削任务安排在 NAS 闲置时段执行，例如凌晨 2:00-6:00。在 AMMDS 管理面板的"任务管理"中可以设置定时计划。

## 常见问题

### Q：FPK 安装失败怎么办？

A：首先确认 FnOS 版本是否满足最低要求。如仍安装失败，尝试以下方法：
1. 检查是否已安装运行 AMMDS 所需的依赖包
2. 尝试通过 SSH 执行 `sudo systemctl restart app商店` 重启应用商店服务
3. 如问题依旧，建议改用 Docker 部署方式

### Q：如何更新 AMMDS？

A：FPK 用户可在应用商店中查看更新推送，点击"更新"即可。Docker 用户需要手动拉取最新镜像并重启容器。

### Q：AMMDS 的访问地址是多少？

A：默认地址为 `http://{NAS_IP}:3100`。如需更改端口，请修改 Docker Compose 中的端口映射配置。

### Q：如何配置反向代理和 SSL？

A：AMMDS 支持通过 Nginx 反向代理实现 HTTPS 访问。以下是一个简单的 Nginx 配置示例：

```nginx
server {
    listen 443 ssl;
    server_name ammds.yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:3100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Q：媒体目录权限不足怎么办？

A：确保 Docker 容器或 FPK 应用有权限访问媒体目录。在 FnOS 文件管理器中，检查媒体目录的权限设置，确保 `ammds` 用户或 `docker` 组具有读取权限。

## 结语

在飞牛 NAS 上部署 AMMDS 是一项相当简单直接的操作，无论是通过 FPK 安装还是 Docker 部署，都能在几分钟内完成。FnOS 优秀的生态集成能力和 AMMDS 强大的元数据管理功能相结合，为用户打造了一个完整的私人影音管理方案。

如果你在部署过程中遇到任何问题，欢迎在 AMMDS GitHub Issues 或 FnOS 社区论坛中寻求帮助。
