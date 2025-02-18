---
outline: deep
---

# Docker Compose

**Docker Compose** 是一个用于定义和运行多容器 Docker 应用程序的工具。通过一个 YAML 文件 (`docker-compose.yml`) 来配置应用程序的服务，然后只需一个命令即可启动所有服务。它非常适合开发、测试和登台环境中的快速部署和管理。

## 创建服务

### 创建应用目录

首先，创建一个名为 `ammds` 的目录用于存放相关文件：

```bash
mkdir ammds && cd ammds
```

### 创建配置文件

在 `ammds` 目录下创建并编辑 `docker-compose.yml` 文件。将以下内容粘贴到文件中：

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # 使用的镜像名称及版本标签
    container_name: AMMDS  # 容器名称
    ports:
      - "8080:80"  # 端口映射：主机端口8080映射到容器内的80端口
    volumes:
      - ./data:/ammds/data  # 将当前目录下的data文件夹挂载到容器内的/ammds/data路径
      - ./db:/ammds/db  # 将当前目录下的db文件夹挂载到容器内的/ammds/db路径
      - ./download:/ammds/download  # 将当前目录下的download文件夹挂载到容器内的/ammds/download路径
      - ./media:/media  # 将当前目录下的media文件夹挂载到容器内的/media路径
    restart: always  # 设置容器异常时总是自动重启
    environment:
      - TZ=Asia/Shanghai  # 设置时区为亚洲/上海
    networks:
      - ammds-network  # 使用自定义网络

networks:
  ammds-network:  # 自定义网络配置
    driver: bridge  # 使用Docker默认的bridge网络驱动
```

## 启动服务

使用以下命令来启动服务。这将在后台运行 AMMDS 容器，并应用 `docker-compose.yml` 中的所有配置：

```bash
docker compose up -d
```

## 停止服务

如果需要停止并移除服务，可以使用以下命令：

```bash
docker compose down
```

## 开始享受

通过浏览器访问 `<主机IP>:8080` ，开始体验您的 AMMDS 应用🥳~ 

例如，如果您在本地运行，可以通过访问 `http://localhost:8080` 来查看应用。 

🎉 现在您可以开始享受 AMMDS 提供的功能了！


<!--@include: ../snippets/copyright.md-->