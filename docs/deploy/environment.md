---
sidebar_position: 99
sidebar_label: "环境变量"
---

# 环境变量

**环境变量** 可以理解成你给 AMMDS 递的一张"小纸条"——
在启动容器的时候顺便塞给它，告诉它一些配置信息，比如"用哪个端口""时区设成几点""管理员密码是多少"等等。
不用打开网页去设置，启动时就一次性配好。

## 支持的配置

下面这些环境变量都可以用来定制 AMMDS：

| 变量名称 | 默认值 | 描述 |
|---------|--------|------|
| `NGINX_PORT` | `80` | Nginx 服务端口（用 Host 网络模式时生效） |
| `PUID` | `0` | AMMDS 的用户 ID（用来控制文件权限） |
| `PGID` | `0` | AMMDS 的用户组 ID（默认跟用户 ID 一样） |
| `UMASK` | `022` | 新建文件的权限掩码（默认 022 表示文件有读写权限） |
| `AMMDS_SERVER_PORT` | `8080` | AMMDS 服务端口（用 Host 网络模式时生效） |
| `ADMIN_USER` | `ammds` | 管理员用户名（**不能修改**） |
| `ADMIN_PASS` | `ammds` | 管理员密码（只在第一次安装时生效，之后改没用） |
| `AMMDS_SYSTEM_MODE` | `full` | 运行模式：`full`（完整模式，啥功能都有），`backend`（仅后端），`api`（仅 API） |
| `AMMDS_SERVICE_ADDRESS` | (无默认值) | AMMDS 的实际访问地址（比如 `http://你的IP:8080`） |
| `AMMDS_SCHEDULER_ENABLE` | `true` | 是否开启定时任务（比如定时扫描新电影） |
| `AMMDS_MONITOR_ENABLE` | `true` | 是否开启目录监控（实时盯着文件夹有没有新文件） |
| `AMMDS_NETWORK_TIMEOUT` | `60` | 网络请求超时时间（单位：秒，到时间没响应就放弃） |
| `AMMDS_MAX_FILE_SIZE` | `10MB` | 单个上传文件的大小限制（可以写 KB、MB、GB） |
| `AMMDS_MAX_REQUEST_SIZE` | `100MB` | 单次请求的大小限制（比上面那个更大，包含多个文件的情况） |
| `AMMDS_IYUU_TOKEN` | (无默认值) | [插件] IYUU 的授权码 |
| `AMMDS_METATUBE_URL` | (无默认值) | [插件] MetaTube 插件的服务地址 |
| `AMMDS_METATUBE_TOKEN` | (无默认值) | [插件] MetaTube 的授权码 |
| `AMMDS_PROWLARR_URL` | (无默认值) | [插件] Prowlarr 的服务地址 |
| `AMMDS_PROWLARR_TOKEN` | (无默认值) | [插件] Prowlarr 的授权码 |
| `AMMDS_QBITTORRENT_URL` | (无默认值) | [插件] qBittorrent 下载工具的服务地址 |
| `AMMDS_QBITTORRENT_USERNAME` | (无默认值) | [插件] qBittorrent 的用户名 |
| `AMMDS_QBITTORRENT_PASSWORD` | (无默认值) | [插件] qBittorrent 的密码 |
| `AMMDS_TELEGRAM_BOT_TOKEN` | (无默认值) | [插件] Telegram 机器人的授权码 |
| `AMMDS_TELEGRAM_CHAT_ID` | (无默认值) | [插件] Telegram 的聊天 ID |

:::warning
- **URL 结尾不要加 `/`**，比如 `http://192.168.1.100:8080` 是对的，`http://192.168.1.100:8080/` 就不行
- **环境变量优先于网页设置**，也就是说你同时在环境变量和网页里配了同一个东西，环境变量的值会覆盖网页上的
:::
