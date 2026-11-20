---
sidebar_position: 99
sidebar_label: "Environment Variables"
title: "Environment Variables"
description: "Learn about AMMDS's supported environment variable configuration, including port, user permissions, operation mode, and plugin address parameters."
keywords: [AMMDS, environment variables, configuration, Docker, parameter settings]
tags: [deploy, environment]
---

# Environment Variables

**Environment variables** are like little notes you pass to AMMDS — you give them when starting the container to tell it things like "use this port," "set this timezone," "here's the admin password," etc. No need to open the web UI to configure them; everything is set up at launch.

## Supported Configurations

The following environment variables can be used to customize AMMDS:

| Variable Name | Default Value | Description |
|---------------|---------------|-------------|
| `NGINX_PORT` | `80` | Nginx service port (takes effect in Host network mode) |
| `PUID` | `0` | AMMDS user ID (for controlling file permissions) |
| `PGID` | `0` | AMMDS group ID (defaults to the same as user ID) |
| `UMASK` | `022` | Permission mask for new files (022 means files have read/write permissions) |
| `AMMDS_SERVER_PORT` | `8080` | AMMDS server port (takes effect in Host network mode) |
| `ADMIN_USER` | `ammds` | Admin username (**cannot be changed**) |
| `ADMIN_PASS` | `ammds` | Admin password (only takes effect on first install, changing it later does nothing) |
| `AMMDS_SYSTEM_MODE` | `full` | Running mode: `full` (everything enabled), `backend` (backend only), `api` (API only) |
| `AMMDS_SERVICE_ADDRESS` | (no default) | AMMDS actual access address (e.g., `http://your-ip:8080`) |
| `AMMDS_SCHEDULER_ENABLE` | `true` | Enable scheduled tasks (e.g., periodic scanning for new movies) |
| `AMMDS_MONITOR_ENABLE` | `true` | Enable directory monitoring (real-time file watching) |
| `AMMDS_NETWORK_TIMEOUT` | `60` | Network request timeout (in seconds) |
| `AMMDS_MAX_FILE_SIZE` | `10MB` | Max size for a single file upload (supports KB, MB, GB) |
| `AMMDS_MAX_REQUEST_SIZE` | `100MB` | Max size for a single request (larger than above, for multi-file scenarios) |
| `AMMDS_IYUU_TOKEN` | (no default) | [Plugin] IYUU authorization token |
| `AMMDS_METATUBE_URL` | (no default) | [Plugin] MetaTube plugin service address |
| `AMMDS_METATUBE_TOKEN` | (no default) | [Plugin] MetaTube authorization token |
| `AMMDS_PROWLARR_URL` | (no default) | [Plugin] Prowlarr service address |
| `AMMDS_PROWLARR_TOKEN` | (no default) | [Plugin] Prowlarr authorization token |
| `AMMDS_QBITTORRENT_URL` | (no default) | [Plugin] qBittorrent download tool service address |
| `AMMDS_QBITTORRENT_USERNAME` | (no default) | [Plugin] qBittorrent username |
| `AMMDS_QBITTORRENT_PASSWORD` | (no default) | [Plugin] qBittorrent password |
| `AMMDS_TELEGRAM_BOT_TOKEN` | (no default) | [Plugin] Telegram bot token |
| `AMMDS_TELEGRAM_CHAT_ID` | (no default) | [Plugin] Telegram chat ID |

:::warning
- **URLs should NOT end with `/`**, e.g., `http://192.168.1.100:8080` is correct, `http://192.168.1.100:8080/` is not.
- **Environment variables take precedence over web UI settings** — if you set the same thing in both, the environment variable value will override the web UI setting.
:::
