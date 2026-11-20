---
sidebar_position: 4
sidebar_label: "Prowlarr"
title: "Prowlarr"
description: "Prowlarr is an indexer management tool designed for media automation, unifying BT tracker sites and Usenet indexers, with seamless sync to Sonarr, Radarr, and other apps."
keywords: [Prowlarr, indexer, BT, Usenet, Sonarr]
tags: [plugin, site-search]
---

# Prowlarr

Prowlarr is an indexer manager built for media automation, using .NET/React. It serves as a central hub for managing hundreds of Torrent trackers and Usenet indexers, and can seamlessly sync with Sonarr, Radarr, Lidarr, Readarr, and more.

Official Site: [https://prowlarr.com/](https://prowlarr.com/)

## Plugin Configuration

![Prowlarr Plugin Configuration](/img/plugin/prowlarr-01.png)

### Basic Configuration

- **Enable Status**: Controls whether to enable the plugin.
- **Service Address**: The access address of the Prowlarr service.
- **Authentication Key**: The authentication key for Prowlarr, used for identity verification.

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
