---
sidebar_position: 2
sidebar_label: "Docker Compose"
---

# Docker Compose 

Docker Compose 就是一个"一键启动工具"。如果你需要启动好几个容器配合工作，手打一堆命令太麻烦，Compse 让你把所有配置写在一个文件里，以后只需要敲一行命令就能全部搞定。

<!-- truncate -->

## 创建服务

### 创建应用目录

先新建一个叫 `ammds` 的文件夹，用来放相关文件：

```bash
mkdir ammds && cd ammds
```

### 创建配置文件

在 `ammds` 文件夹里新建一个 `docker-compose.yml` 文件，把下面的内容复制进去：

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # AMMDS 的"安装包"地址
    container_name: AMMDS  # 给容器起个名字
    ports:
      - "8080:80"  # 把服务器的 8080 端口"接通"到 AMMDS（80 端口），访问时用 8080
    volumes:
      - ./data:/ammds/data  # 把 ./data 文件夹共享给 AMMDS，用来存数据
      - ./db:/ammds/db  # 把 ./db 文件夹共享给 AMMDS，用来存数据库
      - ./download:/ammds/download  # 把 ./download 文件夹共享给 AMMDS，用来存下载文件
      - ./media:/media  # 把 ./media 文件夹共享给 AMMDS，用来放电影文件
    restart: always  # 出错了自动重启，省心
    environment:
      - TZ=Asia/Shanghai  # 设置时区为东八区（北京时间）
    networks:
      - ammds-network  # 加入自定义网络

networks:
  ammds-network:  # 自定义网络，让多个容器能互相通信
    driver: bridge  # 使用 Docker 默认的网络模式
```

:::note
请自行将本地媒体目录挂载到容器中。不要使用 `/ammds` 作为媒体挂载目录前缀，以避免数据丢失。

**示例：** 如果您的主机目录是 `/mnt/movie`，推荐的挂载格式是 `- /mnt/movie:/mnt/movie`
:::

## 云盘用户的特殊配置

如果你用的是 CloudDrive 这类云盘挂载，配置文件要稍微改一下：

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

- `:rw,rshared`：不光能读写，还能在多个容器之间"共享"这个文件夹
- `cap_add: - SYS_ADMIN`：给容器一些系统管理权限，让云盘能正常工作
- `devices: - "/dev/fuse:/dev/fuse"`：允许容器访问 FUSE 设备（云盘挂载需要用的"桥梁"）
- `security_opt: - apparmor:unconfined`：放开安全限制，让云盘挂载不报错

:::warning
这套方案不能用"云盘挂载 + 目录监控"的功能，请改用"定时扫描"。
:::

## 启动服务

在 `ammds` 文件夹里执行下面的命令，就能启动所有服务了：

```bash
docker compose up -d
```

## 停止服务

要停掉并移除服务，用这个命令：

```bash
docker compose down
```

## 访问服务

打开浏览器输入：

```
http://127.0.0.1:8080
```

如果你是部署在服务器上，把 `127.0.0.1` 换成服务器的 IP 地址就行。

## 默认账号密码

- **用户名**：`ammds`
- **密码**：`ammds`

:::tip
如果看不清文字，可以切换到浅色模式。
:::
