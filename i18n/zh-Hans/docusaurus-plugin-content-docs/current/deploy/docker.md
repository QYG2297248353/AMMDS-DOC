---
sidebar_position: 1
sidebar_label: "Docker"
---

# Docker

Docker 是一个开源平台，用于自动化应用程序的部署、扩展和管理。它使用容器化技术将应用程序及其依赖项打包到独立的容器中，确保在任何环境中一致运行。容器轻量且可移植，非常适合微服务架构和 CI/CD 工作流程。

<!-- truncate -->

## 一键运行

```bash
docker run -itd \
  --name AMMDS \
  -p 8080:80 \
  -v $(pwd)/data:/ammds/data \
  -v $(pwd)/db:/ammds/db \
  -v $(pwd)/download:/ammds/download \
  -v $(pwd)/media:/media \
  --restart always \
  qyg2297248353/ammds:latest
```

:::note
请自行将本地媒体目录挂载到容器中。不要使用 `/ammds` 作为媒体挂载目录前缀，以避免数据丢失。

**示例：** 如果您的主机目录是 `/mnt/movie`，推荐的挂载格式是 `-v /mnt/movie:/mnt/movie`
:::

## 参数说明

| 参数 | 说明 |
|------|------|
| `-itd` 或 `--interactive --tty --detach` | 组合选项：<br>- `-i` 或 `--interactive`：即使未附加也保持 STDIN 打开<br>- `-t` 或 `--tty`：为容器交互分配伪终端<br>- `-d` 或 `--detach`：在后台以守护进程方式运行容器 |
| `--name AMMDS` | 指定容器名称为 AMMDS |
| `-p 8080:80` | 将主机的 8080 端口映射到容器的 80 端口，格式：`-p <主机端口>:<容器端口>` |
| `-v $(pwd)/data:/ammds/data` | 将当前目录的 `./data` 文件夹挂载到容器的 `/ammds/data`，用于数据持久化 |
| `-v $(pwd)/db:/ammds/db` | 将当前目录的 `./db` 文件夹挂载到容器的 `/ammds/db`，用于数据库文件存储 |
| `-v $(pwd)/download:/ammds/download` | 将当前目录的 `./download` 文件夹挂载到容器的 `/ammds/download`，用于下载存储 |
| `-v $(pwd)/media:/media` | 将当前目录的 `./media` 文件夹挂载到容器的 `/media`，适合挂载媒体目录 |
| `--restart always` | 设置容器总是自动重启，确保在任何情况下（包括系统重启）都能自动启动 |
| `qyg2297248353/ammds:latest` | Docker 镜像名称和标签，指定要运行的镜像 |

## 云盘用户

如果您使用像 CloudDrive 这样的云盘挂载，请使用以下命令：

```bash
docker run -itd \
  --name AMMDS \
  -p 8080:80 \
  -v $(pwd)/data:/ammds/data \
  -v $(pwd)/db:/ammds/db \
  -v $(pwd)/download:/ammds/download \
  -v /media:/media:rw,rshared \
  --cap-add=SYS_ADMIN \
  --device /dev/fuse \
  --security-opt apparmor:unconfined \
  --restart always \
  qyg2297248353/ammds:latest
```

### 云盘用户特别说明

- `:rw,rshared`：除了基本的读写权限外，`rshared` 还能在容器之间保持共享传播
- `--cap-add=SYS_ADMIN`：允许容器访问系统资源
- `--device /dev/fuse`：允许容器访问 FUSE 设备
- `--security-opt apparmor:unconfined`：允许容器使用不受限制的 AppArmor 配置

:::warning
此部署方案不适用于 "云盘挂载 + 目录监控" 方案。请使用 "定时扫描" 代替 "目录监控"。
:::

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