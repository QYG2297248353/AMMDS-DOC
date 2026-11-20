---
title: Change the port or upload limit
sidebar_label: Environment Variables
description: Every AMMDS startup setting explained — port, upload size, cache directory, log verbosity, scheduler switches, LAN discovery, admin account, external services and container-only options, with defaults and whether a restart is needed.
sidebar_position: 9
---

# Change the port or upload limit

AMMDS has a set of **startup settings** for things you can't change on a page, like the port and upload limits. This page lists them one by one. For each one it says what happens if you leave it out, and whether you need to restart.

The defaults work, so most people **never change a single one**. Come back here when you actually hit a port clash, a failed large upload, or logs that aren't detailed enough.

> **Environment variable**: settings handed to the program before it starts. In Docker it goes in the `environment` block of the config file. When running directly, it goes in front of the executable's start command. A misspelt name is ignored and the default applies.

> **Port**: the number that tells services apart on one machine: the `8080` in `http://host:8080`.

## How to change them

Three scenarios, written as follows:

| How you installed | How to change |
| --- | --- |
| Docker / Compose | Add it to the `environment` block, then recreate the container |
| Running from a command line | Put it in front of the executable's start command, e.g. `AMMDS_SERVER_PORT=9090 ./ammds` (`ammds.exe` on Windows) |
| Managed by a system service | Add the variable to the service configuration, then restart the service |

:::warning[Always restart afterwards]
Startup settings are read **at startup**, so nothing takes effect until you restart. Settings you change on the system config pages usually apply immediately. They aren't covered here.
:::

## Service and network

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| Server port (`AMMDS_SERVER_PORT`) | The port you browse to | The default `8080` is used | Yes |
| Listen address (`AMMDS_SERVER_HOST`) | Which devices may connect; by default all | Default applies; restricting it to localhost blocks other devices | Yes |
| External service address (`AMMDS_SERVICE_ADDRESS`) | The address the app reports for itself, used by API docs and discovery | Default applies; on sign-in the current address is written in automatically | Yes |
| Connection timeout (`AMMDS_CONNECTION_TIMEOUT`) | How long a single connection may wait, in milliseconds | Default applies; rarely needs changing | Yes |
| Upload cache directory (`AMMDS_CACHE_PATH`) | Where uploads are staged temporarily | Uses `data/cache`; a full disk makes uploads fail | Yes |
| Single file size limit (`AMMDS_MAX_FILE_SIZE`) | How large one uploaded file may be | Default applies; raise it when large uploads are rejected | Yes |
| Per-request size limit (`AMMDS_MAX_REQUEST_SIZE`) | How large one request (possibly several files) may be | Default applies; raise it together with the one above and never below it | Yes |
| Log detail (`AMMDS_DEBUG`) | How verbose the logs are | Default level; turn it up to `DEBUG` while troubleshooting, then set it back | Yes |

:::note[The upload-size gotcha]
The Docker image's built-in web server has its own body limit (about 10G). If you push the two settings above higher, the request may be rejected before it reaches the app. Raise that limit too. The same applies to any reverse proxy (a server that forwards outside requests to your box) in front.
:::

## Feature switches

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| Scheduled task master switch (`AMMDS_SCHEDULER_ENABLE`) | Whether timed tasks run at all | On by default; off also blocks running them manually | Yes |
| Directory monitor switch (`AMMDS_MONITOR_ENABLE`) | Whether file changes trigger a scan | On by default; off means scheduled scans only | Yes |
| Run mode (`AMMDS_SYSTEM_MODE`) | Full / backend-only / API-only | Full mode; values outside the allowed set are ignored | Yes |
| External request timeout (`AMMDS_NETWORK_TIMEOUT`) | How many seconds to wait for an external site | Default (around a minute); raise it on very slow links | Yes |
| Per-batch scrape limit (`AMMDS_SCRAPE_LIMIT`) | How many items one bulk fill handles | Default applies; larger sets are handled in batches, so run it again | Yes |
| Disk warning threshold (`AMMDS_DISK_THRESHOLD`) | Warn when free space drops below this many bytes | Default applies; lower it if you want fewer warnings | Yes |
| Disk warning ratio (`AMMDS_DISK_RATIO`) | Warn when the free-space ratio drops below this | Default applies; works alongside the one above | Yes |

## LAN discovery

This group lets the desktop client find AMMDS automatically on the same network.

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| Discovery switch (`AMMDS_DISCOVERY_ENABLED`) | Whether auto-discovery is on | On by default; off means typing the address manually | Yes |
| Probe port (`AMMDS_DISCOVERY_PORT`) | The port clients use to find the service, `47823` by default | Default port; changing it means updating firewall and mappings too | Yes |
| Announce switch (`AMMDS_DISCOVERY_ANNOUNCE_ENABLED`) | Whether to announce itself periodically | On by default | Yes |
| Announce port (`AMMDS_DISCOVERY_ANNOUNCE_PORT`) | The port used for announcements, `47824` by default | Default port | Yes |
| Announce interval (`AMMDS_DISCOVERY_ANNOUNCE_INTERVAL_SECONDS`) | How often to announce, 15 seconds by default | Default interval; 0 or a negative value falls back to 15 | Yes |
| Announce targets (`AMMDS_DISCOVERY_ANNOUNCE_TARGETS`) | Who to announce to, comma separated | Empty means broadcast addresses and each interface automatically; wrong values mean clients never hear it | Yes |

:::note[Docker users]
The web server in the container only forwards TCP. For auto-discovery you must map both UDP ports separately, or clients won't find the service.
:::

## Admin account

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| Admin username (`ADMIN_USER`) | Username used to create the admin at startup. It must be set together with `ADMIN_PASS` | If empty, the setup wizard creates the admin. Setting only one of the two creates nothing, and the wizard stays pending | Yes |
| Initial admin password (`ADMIN_PASS`) | Password used to create the admin at startup. It must be set together with `ADMIN_USER` | If empty, the setup wizard creates the admin. Changing it after an admin already exists **has no effect**; change it in your profile | Yes (and only for the first database creation) |

## External services

If you fill these in, the program writes them into the matching service configuration and switches that service on at every startup. Useful for bulk deployments. For one or two services, it is clearer to fill them in on the page and run the connectivity test.

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| MetaTube address and token (`AMMDS_METATUBE_URL` / `AMMDS_METATUBE_TOKEN`) | Address and token for a film data service | Not enabled; wrong values mean no connection and no data | Yes |
| Prowlarr address and key (`AMMDS_PROWLARR_URL` / `AMMDS_PROWLARR_TOKEN`) | Address and key for a resource search service | Same as above | Yes |
| IYUU token (`AMMDS_IYUU_TOKEN`) | Token for the cross-seeding service | Not enabled | Yes |
| qBittorrent address and account (`AMMDS_QBITTORRENT_URL` / `AMMDS_QBITTORRENT_USERNAME` / `AMMDS_QBITTORRENT_PASSWORD`) | Downloader address and login | Not enabled; wrong values mean pushes go nowhere | Yes |
| Telegram bot (`AMMDS_TELEGRAM_BOT_TOKEN` / `AMMDS_TELEGRAM_CHAT_ID`) | Bot credential and chat for Telegram messages | Not enabled; wrong values mean no messages | Yes |

:::tip[These override what you set on the page]
This group is **written again at every startup**. If you change the same service on a page, the value here wins after a restart. Remove the variables if you don't want that.
:::

## Container-only

Only relevant for Docker deployments.

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| Time zone (`TZ`) | Which zone log times and scheduled tasks use | Default zone; task times may not match your day | Yes |
| Run-as user (`PUID` / `PGID`) | Which user reads and writes files | Runs as the default user; mismatch with the host directory causes permission errors | Yes |
| New file permissions (`UMASK`) | Default permission on created files | Default applies; rarely needs changing | Yes |
| Web port in container (`NGINX_PORT`) | The port the container's web server listens on | `80` is used; changing it means updating the mapping too | Yes |
| Memory ceiling (`AMMDS_MAX_HEAP`) | How much memory the app may use | Calculated from the container limit; set it explicitly if usage looks high | Yes |

## Advanced (leave alone)

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| Extraction tool path (`AMMDS_RAR_TOOL`) | Where an external extraction program lives | The bundled version is preferred; this is the fallback | Yes |
| Development debug switch (`AMMDS_DEVELOP_DEBUG`) | Skips some runtime checks, for local development | Stays off by default; turning it on in production causes unpredictable problems | Yes |

## How to confirm a change took effect

| What you want to check | Where to look |
| --- | --- |
| Current port | The listening address in the details of the System info card on the dashboard |
| Version and runtime | The System info card on the dashboard |
| Whether external services are reachable | The plugin items under avatar menu → **System check** |
| Proxy and network | System config → Network, plus a fresh system check |
| Whether the memory ceiling applies | The heap ceiling shown on the resources page |

## If something goes wrong

- **Changed the port but the page won't open**: browse to the new port; make sure it isn't taken by another program and that the firewall allows it.
- **Raised the upload limits but uploads still fail**: raise both, keeping the request limit at or above the file limit; on Docker also check the built-in web server's limit.
- **The setting seems to do nothing**: check the name is spelled right (a typo is silently ignored), then check you restarted the process or recreated the container.
- **It won't start after a change**: remove that setting to return to the default, then add them back one at a time. Never touch the username one.
- **Still wrong**: look up your symptom in [Common questions](../faq.md), or bring the version and log lines to GitHub: https://github.com/QYG2297248353/AMMDS-Docker/issues/new

## Next

- [Licence: available keys and activation](./license.md)
- [Install with Docker](./docker.md)
- [Run it directly on Windows or Linux](./native.md)
- [First launch: sign in and basic setup](./first-login.md)
