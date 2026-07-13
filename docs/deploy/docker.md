---
sidebar_position: 1
sidebar_label: "Docker"
---

# Docker

Docker 就像一个"轻量级虚拟机"。它能把你需要的软件和它的运行环境打包成一个"容器"，不管你换到哪台机器上，拿出来就能直接用，不用再重新配置一堆东西。

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

| 参数 | 说明 | 大白话解释 |
|------|------|-----------|
| `-itd` | 组合选项：`-i`（保持输入通道打开）+ `-t`（分配终端）+ `-d`（后台运行） | 让容器在后台安静地运行，不占你的命令行窗口 |
| `--name AMMDS` | 指定容器名称为 AMMDS | 给你的容器起个名字，以后管理（启动/停止）直接用这个名字叫它 |
| `-p 8080:80` | 将主机的 8080 端口映射到容器的 80 端口 | 把服务器的 8080 端口"接通"到 AMMDS 上，你在浏览器输 `http://服务器IP:8080` 就能访问 |
| `-v $(pwd)/data:/ammds/data` | 挂载本机文件夹到容器内 | 把服务器上的 `./data` 文件夹"共享"给 AMMDS 用，这样数据不会丢 |
| `-v $(pwd)/db:/ammds/db` | 挂载本机文件夹到容器内 | 把服务器上的 `./db` 文件夹共享给 AMMDS，用来存数据库 |
| `-v $(pwd)/download:/ammds/download` | 挂载本机文件夹到容器内 | 把服务器上的 `./download` 文件夹共享给 AMMDS，下载的东西就放在这 |
| `-v $(pwd)/media:/media` | 挂载本机文件夹到容器内 | 把你存电影的文件夹共享给 AMMDS，适合挂载媒体目录 |
| `--restart always` | 容器退出时自动重启 | 万一容器出错了，或者服务器重启了，AMMDS 会自动再跑起来，不用你操心 |
| `qyg2297248353/ammds:latest` | Docker 镜像名称和标签 | 这是 AMMDS 的"安装包"，`latest` 表示最新版本 |

## 云盘用户

如果用的是 CloudDrive 这类云盘挂载，需要用下面的命令：

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

- `:rw,rshared`：不光能读写，还能在多个容器之间"共享"这个文件夹
- `--cap-add=SYS_ADMIN`：给容器一些系统管理权限，让云盘能正常工作
- `--device /dev/fuse`：允许容器访问 FUSE 设备（云盘挂载需要用到的"桥梁"）
- `--security-opt apparmor:unconfined`：放开安全限制，让云盘挂载不报错

:::warning
这套方案不能用"云盘挂载 + 目录监控"的功能，请改用"定时扫描"。
:::

## 访问服务

打开浏览器输入下面的地址就能用了：

```
http://127.0.0.1:8080
```

如果你是在服务器上部署的，把 `127.0.0.1` 换成服务器的 IP 地址就行。

## 默认账号密码

- **用户名**：`ammds`
- **密码**：`ammds`

:::tip
如果看不清文字，可以切换到浅色模式。
:::
