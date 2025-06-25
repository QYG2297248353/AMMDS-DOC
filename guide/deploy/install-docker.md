---
outline: deep
---

# Docker

**Docker** 是一个开源的平台，用于自动化应用程序的部署、扩展和管理。它通过容器化技术让开发者可以打包应用程序及其依赖环境到一个独立的容器中，从而确保该应用在任何环境中都能一致地运行。容器是轻量级且可移植的，这使得它们非常适合微服务架构和持续集成/持续交付（CI/CD）流程。

## 一键运行

```sh [docker-cli]
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

::: tip 提示
请自行挂载`本地媒体目录`到容器中，请勿使用前缀为 `/ammds` 作为媒体挂载目录使用。避免造成数据丢失。
假如宿主机目录为：`/mnt/movie` 推荐挂载格式：`-v /mnt/movie:/mnt/movie`
:::

::: details 命令解释
| 参数                                     | 解释                                                                                                                                                                                                                                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-itd` 或 `--interactive --tty --detach` | 组合选项：<ul><li>`-i` 或 `--interactive`: 保持 STDIN 开启，即使没有附加也保持容器的标准输入打开。</li><li>`-t` 或 `--tty`: 分配一个伪TTY（终端），用于模拟物理TTY，让您可以像在本地终端一样与容器交互。</li><li>`-d` 或 `--detach`: 在后台运行容器，使其作为一个守护进程启动。</li></ul> |
| `--name AMMDS`                           | 指定容器的名称为 `AMMDS`。                                                                                                                                                                                                                                                                |
| `-p 8080:80`                             | 将主机的8080端口映射到容器内的80端口，格式为 `-p <主机端口>:<容器端口>`。                                                                                                                                                                                                                 |
| `-v $(pwd)/data:/ammds/data`             | 将当前工作目录下的 `./data` 文件夹挂载到容器内的 `/ammds/data` 路径，实现数据持久化。                                                                                                                                                                                                     |
| `-v $(pwd)/db:/ammds/db`                 | 将当前工作目录下的 `./db` 文件夹挂载到容器内的 `/ammds/db` 路径，用于存储数据库文件。                                                                                                                                                                                                     |
| `-v $(pwd)/download:/ammds/download`     | 将当前工作目录下的 `./download` 文件夹挂载到容器内的 `/ammds/download` 路径，用于下载内容的存储。                                                                                                                                                                                         |
| `-v $(pwd)/media:/media`                 | 将当前工作目录下的 `./media` 文件夹挂载到容器内的 `/media` 路径，适，用于挂载媒体目录，用户请自行选择挂载路径。                                                                                                                                                                           |
| `--restart always`                       | 设置容器总是自动重启，确保容器在任何情况下（包括系统重启）都能自动启动。                                                                                                                                                                                                                  |
| `qyg2297248353/ammds:latest`             | 使用的 Docker 镜像名称及标签，指定要运行哪个镜像。                                                                                                                                                                                                                                        |
:::


::: details 云盘用户须知
如果您使用 CloudDrive 等云盘挂载媒体目录的方式，请注意以下几点：

```sh [docker-cli]
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

特别注意：
+ `:rw,rshared` 除了基本的读写权限外，`rshared` 让容器之间保持共享传播。
+ `--cap-add=SYS_ADMIN` 允许容器访问系统资源。
+ `--device /dev/fuse` 允许容器访问 FUSE 设备。
+ `--security-opt apparmor:unconfined` 允许容器使用不受限制的 AppArmor 配置。

该部署方案不适用于 `云盘挂载` + `目录监控` 的方案，请使用 `定时扫描` 代替  `目录监控`。
:::


<!--@include: ../../snippets/setup-finish.md-->

<!--@include: ../../snippets/copyright.md-->