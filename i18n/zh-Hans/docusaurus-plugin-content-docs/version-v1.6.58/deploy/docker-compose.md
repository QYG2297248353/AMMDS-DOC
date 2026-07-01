---
sidebar_position: 2
sidebar_label: "Docker Compose"
---

# Docker Compose 

Docker Compose 是一个用于定义和运行多容器 Docker 应用程序的工具。通过单个 YAML 文件（docker-compose.yml），您可以配置应用程序的所有服务，然后只需一个命令即可启动所有服务。它非常适合在开发、测试和 staging 环境中快速部署和管理应用程序。

<!-- truncate -->

## 创建服务

### 创建应用目录

首先，创建一个名为 `ammds` 的目录来存储相关文件：

```bash
mkdir ammds && cd ammds
```

### 创建配置文件

在 `ammds` 目录中创建并编辑 `docker-compose.yml` 文件。将以下内容粘贴到文件中：

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # Docker 镜像名称和版本标签
    container_name: AMMDS  # 容器名称
    ports:
      - "8080:80"  # 端口映射：主机端口 8080 映射到容器端口 80
    volumes:
      - ./data:/ammds/data  # 将当前目录的 data 文件夹挂载到容器的 /ammds/data
      - ./db:/ammds/db  # 将当前目录的 db 文件夹挂载到容器的 /ammds/db
      - ./download:/ammds/download  # 将当前目录的 download 文件夹挂载到容器的 /ammds/download
      - ./media:/media  # 将当前目录的 media 文件夹挂载到容器的 /media
    restart: always  # 设置容器在失败时总是自动重启
    environment:
      - TZ=Asia/Shanghai  # 设置时区为 Asia/Shanghai
    networks:
      - ammds-network  # 使用自定义网络

networks:
  ammds-network:  # 自定义网络配置
    driver: bridge  # 使用 Docker 的默认 bridge 网络驱动
```

:::note
请自行将本地媒体目录挂载到容器中。不要使用 `/ammds` 作为媒体挂载目录前缀，以避免数据丢失。

**示例：** 如果您的主机目录是 `/mnt/movie`，推荐的挂载格式是 `- /mnt/movie:/mnt/movie`
:::

## 云盘用户的特殊配置

如果您使用像 CloudDrive 这样的云盘挂载，请在 `docker-compose.yml` 文件中使用以下配置：

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest
    container_name: AMMDS
    ports:
      - "8080:80"
    volumes:
      - ./data:/ammds/data
      - ./db:/ammds/db
      - ./download:/ammds/download
      - /media:/media:rw,rshared
    restart: always
    environment:
      - TZ=Asia/Shanghai
    cap_add:
      - SYS_ADMIN
    devices:
      - "/dev/fuse:/dev/fuse"
    security_opt:
      - apparmor:unconfined
    networks:
      - ammds-network

networks:
  ammds-network:
    driver: bridge
```

### 云盘用户特别说明

- `:rw,rshared`：除了基本的读写权限外，`rshared` 还能在容器之间保持共享传播
- `cap_add: - SYS_ADMIN`：允许容器访问系统资源
- `devices: - "/dev/fuse:/dev/fuse"`：允许容器访问 FUSE 设备
- `security_opt: - apparmor:unconfined`：允许容器使用不受限制的 AppArmor 配置

:::warning
此部署方案不适用于 "云盘挂载 + 目录监控" 方案。请使用 "定时扫描" 代替 "目录监控"。
:::

## 启动服务

使用以下命令启动服务。这将在后台运行 AMMDS 容器并应用 docker-compose.yml 文件中的所有配置：

```bash
docker compose up -d
```

## 停止服务

如果您需要停止并移除服务，可以使用以下命令：

```bash
docker compose down
```

## 访问服务

您可以通过浏览器访问服务：

```
http://127.0.0.1:8080
```

访问 URL 格式：`主机 IP 地址 + 服务端口`

## 默认凭据

- **用户名**：`ammds`
- **密码**：`ammds`

:::tip
如果您无法清晰看到凭据，请切换到浅色模式。
:::