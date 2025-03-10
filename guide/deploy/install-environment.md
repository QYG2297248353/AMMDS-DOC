---
outline: deep
---

# 环境变量

部署时，支持环境变量快捷部署。


## 已经支持的配置

| 变量名称                   | 默认值     | 描述                              |
| -------------------------- | :--------- | :-------------------------------- |
| NGINX_PORT                 | 80         | Nginx 服务端口 (适用于Host网络)   |
| AMMDS_SERVER_PORT          | 8080       | AMMDS 服务器端口 (适用于Host网络) |
| ADMIN_USER                 | ammds      | 管理员用户名 (禁止修改)           |
| ADMIN_PASS                 | ammds      | 管理员密码 (仅首次安装生效)       |
| AMMDS_SCHEDULER_ENABLE     | true       | 启用定时任务                      |
| AMMDS_MONITOR_ENABLE       | true       | 启用目录监控                      |
| AMMDS_NETWORK_TIMEOUT      | 60         | 网络请求超时时间 (单位: 秒)       |
| AMMDS_IYUU_TOKEN           | (无默认值) | 【插件】IYUU 服务的Token          |
| AMMDS_METATUBE_TOKEN       | (无默认值) | 【插件】MetaTube 服务的Token      |
| AMMDS_METATUBE_URL         | (无默认值) | 【插件】MetaTube 服务的URL        |
| AMMDS_PROWLARR_TOKEN       | (无默认值) | 【插件】Prowlarr 服务的Token      |
| AMMDS_PROWLARR_URL         | (无默认值) | 【插件】Prowlarr 服务的URL        |
| AMMDS_QBITTORRENT_PASSWORD | (无默认值) | 【插件】qBittorrent 密码          |
| AMMDS_QBITTORRENT_URL      | (无默认值) | 【插件】qBittorrent 的URL         |
| AMMDS_QBITTORRENT_USERNAME | (无默认值) | 【插件】qBittorrent 用户名        |

::: tip 提示
关于URL配置，末尾均不要携带 `/` 作为结束符号。

环境变量**优先**于WebUI配置。
::: 