---
sidebar_position: 4
sidebar_label: Prowlarr
title: Prowlarr
description: Prowlarr is an indexer management tool designed for media automation, unifying BT tracker and Usenet indexer management with seamless synchronization to Sonarr, Radarr, and other apps.
keywords: [Prowlarr, indexer, BT, Usenet, Sonarr]
tags: [plugin, site-search]
---
# Prowlarr

Prowlarr is a powerful indexer manager and proxy tool specifically designed for media automation, built on the .NET/React technology stack. It serves as a centralized hub that unifies the management of hundreds of Torrent trackers and Usenet indexers, seamlessly synchronizing with applications like Sonarr, Radarr, Lidarr, and Readarr.

Official website: [https://prowlarr.com/](https://prowlarr.com/)

## Plugin Configuration

![Prowlarr Plugin Configuration](/img/plugin/prowlarr-01.png)

### Basic Configuration

- **Enable Status**锛欳ontrols whether to enable the plugin.
- **Service Address**锛歍he access address of the Prowlarr service.
- **Authentication Key**锛歍he authentication key for the Prowlarr service, used for identity verification.

## Self-deployment

### Docker-Cli

```bash
docker run -d \
  --name=prowlarr \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -p 9696:9696 \
  -v /path/to/prowlarr/data:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/prowlarr:latest
```

### Docker-Compose

```yaml
---
services:
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
    volumes:
      - /path/to/prowlarr/data:/config
    ports:
      - 9696:9696
    restart: unless-stopped
```
