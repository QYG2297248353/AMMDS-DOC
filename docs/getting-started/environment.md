---
title: 环境变量与启动参数
description: 列出 AMMDS 支持的 AMMDS_* 环境变量、Docker 专用变量与管理员变量，说明默认值、作用与覆盖规则。
keywords: [环境变量, 启动参数, 端口, 上传限制, 插件配置, Docker]
tags: []
sidebar_position: 5
---

# 环境变量与启动参数

AMMDS 的配置集中在 `application.yml`，几乎所有条目都可以用环境变量覆盖，适合在 Docker Compose、systemd 或 NAS 应用包中一次性设定。本页按用途列出实际支持的变量、默认值与作用。

{/* truncate */}

## 覆盖规则

- 环境变量**优先于** `application.yml` 中的默认值。
- 大部分插件配置保存在数据库里，可以登录后在「集成」页面修改；但下表中的插件环境变量会在**每次启动时**重新写入并自动启用对应插件，因此适合「零配置接入」，也会覆盖界面上的改动。
- 修改环境变量后需要重启进程或重建容器才会生效。

## 服务与网络

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `AMMDS_SERVER_HOST` | `0.0.0.0` | 后端监听地址，改为 `127.0.0.1` 可只允许本机访问 |
| `AMMDS_SERVER_PORT` | `8080` | 后端 HTTP 端口（Docker 中由 Nginx 反代，不需要对外映射） |
| `AMMDS_CONNECTION_TIMEOUT` | `1800000` | Tomcat 连接超时，单位毫秒 |
| `AMMDS_CACHE_PATH` | `./data/cache` | 上传文件的临时落盘目录（multipart location） |
| `AMMDS_MAX_FILE_SIZE` | `20GB` | 单个上传文件大小上限 |
| `AMMDS_MAX_REQUEST_SIZE` | `5GB` | 单次请求总大小上限（多文件场景） |
| `AMMDS_DEBUG` | `INFO` | `top.lifebus.ammds` 包的日志级别，排查问题时可设为 `DEBUG` |

:::note[上传大小]
Docker 镜像内 Nginx 的 `client_max_body_size` 为 10G；若把 `AMMDS_MAX_FILE_SIZE` 调得更大，请求仍可能先被 Nginx 拒绝，需要同时调整反向代理配置。
:::

## 功能开关

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `AMMDS_SCHEDULER_ENABLE` | `true` | 定时任务总开关；关闭后手动执行计划任务也会被拒绝 |
| `AMMDS_MONITOR_ENABLE` | `true` | 目录监控开关，关闭后只能使用定时扫描 |
| `AMMDS_SYSTEM_MODE` | `full,backend,api`（全部模式） | 限定运行模式：`full` 完整、`backend` 纯后台、`api` 仅 API，其他值会被忽略；切换后需重启 |
| `AMMDS_SERVICE_ADDRESS` | `http://127.0.0.1:8080` | 系统配置中的「服务地址」，用于 OpenAPI 文档与服务发现等对外地址；登录成功时也会自动回写为当前访问地址 |
| `AMMDS_NETWORK_TIMEOUT` | `60` | 外网请求超时（秒），站点检索与通用网络请求客户端共用 |
| `AMMDS_SCRAPE_LIMIT` | `60` | 单次批量刮削取出的媒体条数上限 |
| `AMMDS_DISK_THRESHOLD` | `10737418240` | 磁盘空间告警阈值（字节，默认 10GB） |
| `AMMDS_DISK_RATIO` | `0.1` | 磁盘剩余占比告警阈值，与上一项同时生效 |

## 局域网服务发现

桌面客户端依赖 UDP 发现服务自动找到 AMMDS，Docker 部署需要额外映射对应端口。

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `AMMDS_DISCOVERY_ENABLED` | `true` | 是否启用发现服务 |
| `AMMDS_DISCOVERY_PORT` | `47823` | 探测端口（客户端发、服务端收） |
| `AMMDS_DISCOVERY_ANNOUNCE_ENABLED` | `true` | 是否周期广播 |
| `AMMDS_DISCOVERY_ANNOUNCE_PORT` | `47824` | 广播端口（服务端发、客户端收） |
| `AMMDS_DISCOVERY_ANNOUNCE_INTERVAL_SECONDS` | `15` | 广播间隔（秒），小于等于 0 时回落到 15 |
| `AMMDS_DISCOVERY_ANNOUNCE_TARGETS` | 空 | 广播目标地址，逗号分隔；留空表示自动使用受限广播、回环与各网卡广播地址 |

## 管理员账号

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `ADMIN_USER` | `ammds` | 管理员用户名，**固定为 `ammds`**；改成其他值会导致启动失败 |
| `ADMIN_PASS` | `ammds` | 首次创建管理员时使用的密码；数据库里已有管理员后不再生效，改密码请到个人中心 |

## 集成插件

以下变量非空时，启动阶段会写入对应插件配置并打开插件开关。

| 变量 | 作用 |
| --- | --- |
| `AMMDS_METATUBE_URL` / `AMMDS_METATUBE_TOKEN` | MetaTube 服务地址与授权码（填写授权码会同时打开鉴权） |
| `AMMDS_PROWLARR_URL` / `AMMDS_PROWLARR_TOKEN` | Prowlarr 服务地址与 API Key |
| `AMMDS_IYUU_TOKEN` | IYUU 授权码 |
| `AMMDS_QBITTORRENT_URL` / `AMMDS_QBITTORRENT_USERNAME` / `AMMDS_QBITTORRENT_PASSWORD` | qBittorrent 地址与账号 |
| `AMMDS_TELEGRAM_BOT_TOKEN` / `AMMDS_TELEGRAM_CHAT_ID` | Telegram Bot 通知 |

:::tip[优先用界面配置]
这些变量适合批量部署。只配置一两个插件时，直接在「集成」页面填写并测试连接更直观，也能避免每次重启覆盖界面上的调整。
:::

## Docker 专用变量

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `TZ` | `Asia/Shanghai` | 容器时区 |
| `PUID` / `PGID` | `0` | 运行后端的用户 / 用户组 ID；非 0 时切换到 `ammds` 用户运行 |
| `UMASK` | `022` | 新建文件权限掩码 |
| `NGINX_PORT` | `80` | 容器内 Nginx 监听端口，修改后端口映射也要同步调整 |

## 高级与开发用变量

| 变量 | 默认值 | 作用 |
| --- | --- | --- |
| `AMMDS_RAR_TOOL` | 空 | 外部 WinRAR 可执行文件路径；查找时优先使用 `data/winrar` 下的内置版本，找不到才回落到该变量 |
| `AMMDS_PLUGIN_IYUU_VERSION` | `8.2.0` | IYUU 插件下载使用的版本号 |
| `AMMDS_DEVELOP_DEBUG` | `false` | 本地开发用。为 `true` 时跳过部分运行时检查与随机休眠，不要在生产环境开启 |

## 确认配置是否生效

| 检查项 | 位置 |
| --- | --- |
| 当前端口 | 工作台「系统信息」卡片详情中的「监听地址」 |
| 版本与运行环境 | 工作台「系统信息」卡片 |
| 插件连通性 | 头像菜单 → **系统检查** 中的插件检查项 |
| 代理与网络 | 「系统配置 → 网络配置」，以及[网络与连通性](/docs/backend/dashboard/network) |
