---
sidebar_position: 1
sidebar_label: "Metatube"
---

# Metatube

MetaTube是一款专为Jellyfin、Emby和Plex设计的开源媒体元数据刮削插件后端，主要用于自动获取影片信息（海报、简介、演员、Studio、评分等）。它能有效解决中文资源识别率低的问题，通过自建API实现高精度的“海报墙”管理。

<!-- truncate -->

## 自部署

官网：https://metatube-community.github.io/

### Docker 部署

```bash
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

#### 升级

```bash
docker stop metatube
docker rm metatube
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

### Docker Compose 部署

创建 `docker-compose.yml` 文件

```bash
vi docker-compose.yml
```

```yaml
services:
  metatube-server:
    image: ghcr.io/metatube-community/metatube-server:latest
    container_name: metatube
    restart: always
    network_mode: bridge
    ports:
      - 8080:8080
    env_file:
      - ${GLOBAL_ENV_FILE:-/etc/1panel/envs/global.env}
      - ${ENV_FILE:-/etc/1panel/envs/default.env}
    environment:
      - HTTP_PROXY=${HTTP_PROXY:-}
      - HTTPS_PROXY=${HTTPS_PROXY:-}
      - DB_AUTO_MIGRATE=true
      - PORT=8080
```

启动容器
```bash
docker-compose up -d
```

升级容器
```bash
docker-compose up -d --force-recreate
```


## Koyeb 部署


官网：https://www.koyeb.com/

首先需要注册账户，一个免费账户即可。

### 创建应用

#### 快捷方式

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=metatube-ms&type=docker&image=ghcr.io/metatube-community/metatube-server:latest&instance_type=free&regions=was&instances_min=0&autoscaling_sleep_idle_delay=300&env[MT_PROVIDER_MADOUQU__PRIORITY]=1000&env[MT_PROVIDER_MODELMEDIAASIA__PRIORITY]=1000&env[PORT]=3000&ports=3000;http;/&hc_protocol[3000]=tcp&hc_grace_period[3000]=5&hc_interval[3000]=30&hc_restart_limit[3000]=3&hc_timeout[3000]=5&hc_path[3000]=/&hc_method[3000]=get)

必须先登录 Koyeb 账户，然后点击上面的按钮即可创建应用。

在 Environment variables and files 中新增环境变量：

TOKEN 作为访问权限，建议随机生成一个 32 位字符串。

点击部署按钮，等待应用部署完成。

#### 创建服务

在左侧点击 Create service 按钮，创建一个新的服务。

选择 Web service 类型， 服务类型选择 Docker

镜像：ghcr.io/metatube-community/metatube-server:latest


