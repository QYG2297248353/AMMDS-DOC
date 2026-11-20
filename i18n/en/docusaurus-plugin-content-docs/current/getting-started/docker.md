---
title: Install with Docker
sidebar_label: Docker Install
description: Install AMMDS from the official image — choosing an image, mapping ports, mounting directories, confirming startup and upgrading later.
sidebar_position: 2
---

# Install with Docker

This is the most common install. One container runs the web server and the backend, so pages and API share a single port. Below are two commands you can copy, plus what to do about folders and permissions.

The container runs the same GraalVM Native Image binary as the release package. So there is no Java install inside it, and no JAR or WAR file to manage.

Before you start: Docker is installed, and you know which folder your films live in. If you haven't chosen a method yet, read [Choose an install method](./overview.md) first.

> **Image**: the packaged software file, like an installer disc. It looks like `qyg2297248353/ammds:latest`; the part after the colon is the version tag.

> **Container**: the running copy made from an image.

> **Mount**: linking a real folder on your machine to a path inside the container, written as `host:container`.

## Which image to use

| Image | Notes |
| --- | --- |
| `qyg2297248353/ammds:latest` | Latest version; recommended |
| `qyg2297248353/ammds:version` | Pinned version, for when you want to control upgrades |
| `qyg2297248353/ammds:latest-ol8` | Variant for older systems; use it when the standard image won't start on older hardware |
| `ghcr.io/qyg2297248353/ammds:latest` | An alternative registry if pulling is unreliable |

Images are published for both 64-bit x86 and ARM, and the right one is picked automatically.

## One command

```bash title="docker run"
docker run -d \
  --name AMMDS \
  -p 8080:80 \
  -v /opt/ammds/data:/ammds/data \
  -v /opt/ammds/db:/ammds/db \
  -v /opt/ammds/download:/ammds/download \
  -v /mnt/media:/mnt/media \
  -e TZ=Asia/Shanghai \
  -e PUID=1000 \
  -e PGID=1000 \
  --restart always \
  qyg2297248353/ammds:latest
```

Then browse to `http://host:8080`. If 8080 is already taken, change only the host side of the mapping, e.g. `8090:80`.

## With a Compose file (recommended long term)

Save this as `docker-compose.yml` in the folder where you want your data kept.

```yaml title="docker-compose.yml"
services:
  ammds:
    image: qyg2297248353/ammds:latest
    container_name: AMMDS
    ports:
      - "8080:80"          # pages and API
      - "47823:47823/udp"  # LAN discovery (optional)
      - "47824:47824/udp"  # LAN broadcast (optional)
    volumes:
      - ./data:/ammds/data
      - ./db:/ammds/db
      - ./download:/ammds/download
      - /mnt/media:/mnt/media
    environment:
      TZ: Asia/Shanghai
      PUID: "1000"
      PGID: "1000"
      UMASK: "022"
    restart: always
```

Then run:

```bash
docker compose up -d
```

:::note[Do you need the two UDP ports?]
The web server only forwards TCP. If you don't need phones or clients to find the service automatically, delete those two lines and type the address manually in the client.
:::

## What each port does

| Port | Purpose | Map it? |
| --- | --- | --- |
| `80` | Web server inside the container, serving pages and API | Yes, map to any host port |
| `8080` | Backend inside the container, only forwarded internally | No |
| `47823/udp` | Lets clients probe for the service | Only for auto-discovery |
| `47824/udp` | The service announcing itself | Only for auto-discovery |

## Which directories to mount

| Path in container | What it holds | Advice |
| --- | --- | --- |
| `/ammds/data` | Images, cache, subtitles, logs, dependencies, recovery key | Must be persistent |
| `/ammds/db` | The database file | Must be persistent and backed up |
| `/ammds/download` | Reserved download directory, usually shared with the downloader | Recommended |
| Your media directory | The films to scan and organise | Keep host and container paths identical |

:::warning[Don't put films under /ammds]
`/ammds` is the root for the program and its data. Mount media separately (e.g. `/mnt/media:/mnt/media`), or it may be deleted when you clean up or recreate the container.
:::

## Permissions: read this if you see "write failed"

By default the container runs as the highest-privilege user. Set `PUID` and `PGID` to non-zero values, and the startup script switches to that user. New files then get the `UMASK` you set (default `022`).

If a mounted host folder gives "write failed" or "permission denied", set `PUID` / `PGID` to the user that owns that folder on the host.

## How to tell it started

```bash
docker logs -f AMMDS
```

When the log says the service has started, both the web server and the backend are ready. If the page says the service is still starting, the web server is up but the backend is still getting ready. Wait a moment and refresh.

:::tip[The first start takes longer]
The first start downloads FFmpeg and other dependencies, so how long it takes depends on your network. Confirm they're ready item by item in **System check** in the avatar menu.
:::

## Settings

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| Access port (host side; `NGINX_PORT` inside) | The port you browse to | The container default applies; without a mapping you can't reach it | Yes (recreate) |
| Time zone (`TZ`) | Which zone log times and scheduled tasks use | Default zone; task times may not match your day | Yes |
| Run-as user (`PUID` / `PGID`) | Which user reads and writes files | Runs as the default user; mismatch with the host directory causes permission errors | Yes |
| New file permissions (`UMASK`) | The default permission on created files | Default applies; rarely needs changing | Yes |
| Upload limits (`AMMDS_MAX_FILE_SIZE` / `AMMDS_MAX_REQUEST_SIZE`) | Maximum single file and per-request sizes | Defaults apply; raise them when large uploads fail | Yes |
| Discovery switch and ports (`AMMDS_DISCOVERY_ENABLED` / `AMMDS_DISCOVERY_PORT` / `AMMDS_DISCOVERY_ANNOUNCE_ENABLED` / `AMMDS_DISCOVERY_ANNOUNCE_PORT`) | Whether clients can find the service, and over which two UDP ports | On by default; without the UDP mappings discovery fails and you type the address manually | Yes |
| Memory ceiling (`AMMDS_MAX_HEAP`) | How much memory the app may use | Calculated from the container limit; set it explicitly if usage looks high | Yes |

More startup settings: [Change the port or upload limit](./settings.md).

## Upgrading

1. Back up the mounted `db/` and `data/` directories.
2. Pull the new image: `docker compose pull` (or `docker pull qyg2297248353/ammds:latest`).
3. Recreate the container: `docker compose up -d` (or remove the old container and `docker run` again).
4. Open the page and confirm the version and the system check results.

Data lives in the mounted directories, so recreating the container doesn't lose it — but keep a database copy before a major version jump anyway.

## If something goes wrong

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Container exits immediately | Architecture mismatch, or no write permission on a directory | `docker logs AMMDS` to see the error; on ARM confirm you pulled the arm64 image |
| Page returns 502 or says the service is starting | The backend is still starting up | Wait and read the log; check for a port clash or damaged database |
| Can't write to the media directory | Container user doesn't own the host directory | Adjust `PUID` / `PGID`, or fix directory permissions |
| Clients can't find the service | Only the TCP port was mapped | Add the two UDP mappings, or type the address manually |

- **None of those fit**: read `docker logs AMMDS` first, then look up your symptom in [Common questions](../faq.md).
- **Want to confirm a setting took effect**: the listening address and version are on the System info card of the dashboard. Plugin reachability is under **System check** in the avatar menu.

## Next

- [First launch: sign in and basic setup](./first-login.md)
- [Change the port or upload limit](./settings.md)
- [Organise your first films in ten minutes](./first-library.md)
