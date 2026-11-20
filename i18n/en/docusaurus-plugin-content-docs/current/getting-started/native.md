---
title: Run it directly on Windows or Linux
sidebar_label: Local Install
description: Run the AMMDS binary program without Docker — downloading the release package for your system, start commands, working directory and data locations, changing the port, setting memory limits and upgrading.
sidebar_position: 3
---

# Run it directly on Windows or Linux

No Docker, or you'd rather manage one process yourself? Use this method. Run the executable from the release package, and it serves both pages and API on port `8080` by default.

First **download the release package for your system**. No Java install, no other runtime to prepare. If you haven't chosen a method yet, read [Choose an install method](./overview.md) first.

> **Binary program**: also called an executable. It ends in `.exe` on Windows and has no extension on Linux. GraalVM Native Image builds the program into one such file ahead of time. So there is no Java to install and no JAR or WAR files to manage.

## Requirements

| Item | Requirement |
| --- | --- |
| System | 64-bit Windows or 64-bit Linux. Executables are compiled per system, so download the one matching yours |
| Runtime | No Java and no other runtime needed |
| Disk | Leave space for `data/` and `db/` on top of your media, plus dependencies downloaded on first start |
| Network | Filling in information and finding resources need internet access |

## Getting the program file

Download the release package for your system from the official releases page. Unpack it and you get a single executable. It is usually called `ammds` on Linux and `ammds.exe` on Windows. The version number in the filename matches the release. The exact name follows whatever you downloaded.

:::note[There's also an installer for Windows]
An offline Windows installer is published too. If you'd like an install wizard and autostart, have a look at the releases page: https://github.com/QYG2297248353/AMMDS-Launcher/releases
:::

## On Windows

1. Put the executable in a fixed folder, e.g. `C:\AMMDS\`.
2. Open PowerShell or Command Prompt and **go into that folder**.
3. Start it:

```powershell
cd C:\AMMDS
.\ammds.exe
```

4. Open `http://127.0.0.1:8080` in a browser.

Closing the window stops the service. To keep it running, put the command in a batch script and run it at sign-in with Task Scheduler. You can also hand it to any process supervisor.

## On Linux

```bash
mkdir -p /opt/ammds
cd /opt/ammds
chmod +x ./ammds
./ammds
```

:::note[If it says permission denied]
A freshly downloaded file on Linux has no execute permission by default. Run `chmod +x ./ammds` once before starting.
:::

To start it automatically at boot, hand it to a system service. Here's a reference unit:

```ini title="/etc/systemd/system/ammds.service"
[Unit]
Description=AMMDS
After=network-online.target

[Service]
WorkingDirectory=/opt/ammds
ExecStart=/opt/ammds/ammds
Restart=on-failure
User=ammds

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable --now ammds
journalctl -u ammds -f
```

:::note[About the user in that unit]
`User=ammds` requires that account to exist on the host. Otherwise use your real runtime account, or create the user and give it ownership of `/opt/ammds`.
:::

## Working directory and data

AMMDS reads relative paths like `data/` and `db/` from **the folder it was started in**. Always enter the program folder before starting. With a system service, set the working directory.

| Path | What's inside |
| --- | --- |
| `data/` | Images, cache, subtitles, logs, the recovery key, and downloaded dependencies such as FFmpeg |
| `data/logs/` | Run logs, rotated daily, plus a separate error-only log |
| `db/` | The database file holding films, tasks and settings — all your business data |
| `download/` | Optional download folder; keep it identical to the downloader's if they share one |

:::warning[Don't start from a temporary folder]
If you drop the executable into a temp folder or your downloads folder and double-click it, the working directory ends up somewhere unexpected and your data gets scattered. Make a dedicated folder and start there.
:::

## The first start downloads dependencies

On startup it downloads FFmpeg and other dependencies as needed into the matching subfolders of `data/`. The log shows progress on the first start; on a slow network, be patient. Confirm each one is ready in **System check** in the avatar menu.

## Settings

These are set through environment variables before startup. **Always restart** after changing one.

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| Server port (`AMMDS_SERVER_PORT`) | The port you browse to | The default `8080` is used | Yes |
| Listen address (`AMMDS_SERVER_HOST`) | Which devices may connect; by default all | Default applies; restricting it to localhost blocks other devices | Yes |
| Upload limits (`AMMDS_MAX_FILE_SIZE` / `AMMDS_MAX_REQUEST_SIZE`) | Maximum single file and per-request sizes | Defaults apply; raise them together when large uploads fail | Yes |
| Cache directory (`AMMDS_CACHE_PATH`) | Where uploads are staged temporarily | Uses `data/cache`; a full disk makes uploads fail | Yes |
| Log detail (`AMMDS_DEBUG`) | How verbose the logs are | Default level; turn it up while troubleshooting | Yes |
| Discovery switch and ports (`AMMDS_DISCOVERY_ENABLED` / `AMMDS_DISCOVERY_PORT` / `AMMDS_DISCOVERY_ANNOUNCE_ENABLED` / `AMMDS_DISCOVERY_ANNOUNCE_PORT`) | Whether clients can find the service, and over which two UDP ports | On by default; off means typing the address manually | Yes |
| Scheduled task master switch (`AMMDS_SCHEDULER_ENABLE`) | Whether timed tasks run at all | On by default; off also blocks running them manually | Yes |
| Directory monitor switch (`AMMDS_MONITOR_ENABLE`) | Whether file changes trigger a scan | On by default; off means scheduled scans only | Yes |
| Memory ceiling (`-Xmx`, or `AMMDS_MAX_HEAP` in Docker) | How much memory the app may use | The built-in ceiling applies; set one if usage looks high | Yes |

Changing the port:

```bash
# Linux
AMMDS_SERVER_PORT=9090 ./ammds

# Windows PowerShell
$env:AMMDS_SERVER_PORT = "9090"
.\ammds.exe
```

:::tip[Memory usage looks high?]
By default the program reserves a ceiling based on machine memory. So usage can stay high after a scan or scrape finishes. Set an explicit ceiling, e.g. `./ammds -Xmx2g`. On Linux, also set `MALLOC_ARENA_MAX=2`; it makes a clear difference. The resources page shows the value currently in effect.
:::

The full startup table is on [Change the port or upload limit](./settings.md).

## Upgrading

1. Stop the program (`systemctl stop ammds`, or close the console window).
2. Back up `db/` and `data/`.
3. Replace the old executable with the new one.
4. Start again and confirm the version on the page and the system check results.

The database structure updates automatically, so a normal upgrade needs no manual work. Keep a copy of the database before a major version jump.

## If something goes wrong

- **Double-clicking does nothing, or says it isn't an executable program**: you probably downloaded the release package for another system (Windows and Linux aren't interchangeable). Download the one matching your system again; on Linux also make sure you ran `chmod +x ./ammds`.
- **It says the CPU instruction set is unsupported right at startup**: check that the package matches your machine. On older hardware, use a release built for older CPUs, or switch to the Docker image with the `ol8` tag.
- **Page won't open**: confirm the process is running, the port isn't taken by something else, and the firewall allows it. First start also waits for dependencies.
- **Starts but behaves oddly**: read the run log under `data/logs/` and run system check once.
- **Data "disappeared"**: you started from a different folder, so fresh data folders were created elsewhere. Start again from the original one.
- **Still stuck**: look up your symptom in [Common questions](../faq.md).

## Next

- [First launch: sign in and basic setup](./first-login.md)
- [Change the port or upload limit](./settings.md)
- [Organise your first films in ten minutes](./first-library.md)
