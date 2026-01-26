---
sidebar_position: 99
sidebar_label: "Environment"
---

# Environment Variables

When deploying, quick deployment using environment variables is supported.

<!-- truncate -->

## Supported Configurations

The following environment variables are supported for customizing your AMMDS deployment:

| Variable Name | Default Value | Description |
|---------------|---------------|-------------|
| `NGINX_PORT` | `80` | Nginx service port (for Host network) |
| `AMMDS_SERVER_PORT` | `8080` | AMMDS server port (for Host network) |
| `ADMIN_USER` | `ammds` | Administrator username (prohibited from modification) |
| `ADMIN_PASS` | `ammds` | Administrator password (only takes effect during first installation) |
| `AMMDS_SYSTEM_MODE` | `full` | System running mode: full mode (`full`), backend-only mode (`backend`), API mode (`api`) |
| `AMMDS_SERVICE_ADDRESS` | (no default) | Actual access address of the system |
| `AMMDS_SCHEDULER_ENABLE` | `true` | Enable scheduled tasks |
| `AMMDS_MONITOR_ENABLE` | `true` | Enable directory monitoring |
| `AMMDS_NETWORK_TIMEOUT` | `60` | Network request timeout (unit: seconds) |
| `AMMDS_MAX_FILE_SIZE` | `10MB` | Maximum file size in a single request |
| `AMMDS_MAX_REQUEST_SIZE` | `100MB` | Maximum request body size |
| `AMMDS_IYUU_TOKEN` | (no default) | [Plugin] IYUU authorization code |
| `AMMDS_METATUBE_URL` | (no default) | [Plugin] MetaTube plugin service address |
| `AMMDS_METATUBE_TOKEN` | (no default) | [Plugin] MetaTube authorization code |
| `AMMDS_PROWLARR_URL` | (no default) | [Plugin] Prowlarr plugin service address |
| `AMMDS_PROWLARR_TOKEN` | (no default) | [Plugin] Prowlarr authorization code |
| `AMMDS_QBITTORRENT_URL` | (no default) | [Plugin] qBittorrent plugin service address |
| `AMMDS_QBITTORRENT_USERNAME` | (no default) | [Plugin] qBittorrent username |
| `AMMDS_QBITTORRENT_PASSWORD` | (no default) | [Plugin] qBittorrent password |
| `AMMDS_TELEGRAM_BOT_TOKEN` | (no default) | [Plugin] Telegram Bot authorization code |
| `AMMDS_TELEGRAM_CHAT_ID` | (no default) | [Plugin] Telegram Chat ID |

:::warning
Regarding URL configuration, do not carry `/` as an ending symbol at the end. 

Environment variables take precedence over WebUI configuration.
:::