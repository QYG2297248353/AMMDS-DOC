---
sidebar_position: 99
sidebar_label: "环境变量"
---

# 环境变量

部署时支持使用环境变量进行快速部署。

<!-- truncate -->

## 支持的配置

以下环境变量可用于自定义您的 AMMDS 部署：

| 变量名称 | 默认值 | 描述 |
|---------|--------|------|
| `NGINX_PORT` | `80` | Nginx 服务端口（适用于 Host 网络） |
| `AMMDS_SERVER_PORT` | `8080` | AMMDS 服务器端口（适用于 Host 网络） |
| `ADMIN_USER` | `ammds` | 管理员用户名（禁止修改） |
| `ADMIN_PASS` | `ammds` | 管理员密码（仅在首次安装时生效） |
| `AMMDS_SYSTEM_MODE` | `full` | 系统运行模式：完整模式 (`full`)，仅后端模式 (`backend`)，API 模式 (`api`) |
| `AMMDS_SERVICE_ADDRESS` | (无默认值) | 系统的实际访问地址 |
| `AMMDS_SCHEDULER_ENABLE` | `true` | 启用定时任务 |
| `AMMDS_MONITOR_ENABLE` | `true` | 启用目录监控 |
| `AMMDS_NETWORK_TIMEOUT` | `60` | 网络请求超时时间（单位：秒） |
| `AMMDS_MAX_FILE_SIZE` | `10MB` | 单个请求中的最大文件大小 |
| `AMMDS_MAX_REQUEST_SIZE` | `100MB` | 最大请求体大小 |
| `AMMDS_IYUU_TOKEN` | (无默认值) | [插件] IYUU 授权码 |
| `AMMDS_METATUBE_URL` | (无默认值) | [插件] MetaTube 插件服务地址 |
| `AMMDS_METATUBE_TOKEN` | (无默认值) | [插件] MetaTube 授权码 |
| `AMMDS_PROWLARR_URL` | (无默认值) | [插件] Prowlarr 插件服务地址 |
| `AMMDS_PROWLARR_TOKEN` | (无默认值) | [插件] Prowlarr 授权码 |
| `AMMDS_QBITTORRENT_URL` | (无默认值) | [插件] qBittorrent 插件服务地址 |
| `AMMDS_QBITTORRENT_USERNAME` | (无默认值) | [插件] qBittorrent 用户名 |
| `AMMDS_QBITTORRENT_PASSWORD` | (无默认值) | [插件] qBittorrent 密码 |
| `AMMDS_TELEGRAM_BOT_TOKEN` | (无默认值) | [插件] Telegram Bot 授权码 |
| `AMMDS_TELEGRAM_CHAT_ID` | (无默认值) | [插件] Telegram Chat ID |

:::warning
关于 URL 配置，末尾不要携带 `/` 作为结束符号。

环境变量的优先级高于 WebUI 配置。
:::