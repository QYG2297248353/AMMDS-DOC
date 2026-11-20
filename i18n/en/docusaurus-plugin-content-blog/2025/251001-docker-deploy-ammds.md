---
slug: docker-deploy-ammds
title: Complete Guide to Deploying AMMDS with Docker
authors: [ms]
tags: [tutorial, guide, docker, ammds]
date: 2025-10-01
---

## Overview

AMMDS (Advanced Multimedia Data Management System) is a powerful private data management platform supporting metadata scraping, site authentication, resource search, rankings management and more. This article explains in detail how to deploy AMMDS with Docker, covering Docker Compose configuration, environment variable descriptions, directory mount recommendations and common troubleshooting.

{/* truncate */}

## Prerequisites

Before you begin deployment, make sure the following software is installed in your environment:

- **Docker Engine**: version 20.10 or later
- **Docker Compose**: version 2.x or later (or the Docker Compose Plugin)
- **Operating system**: Linux (Ubuntu 20.04+ / Debian 11+ recommended), Windows Server 2019+, macOS, or a NAS system such as Synology DSM / FnOS
- **Hardware requirements**: at minimum a 2-core CPU, 4 GB of RAM and 20 GB of free disk space

Verify the environment:

```bash
docker --version
docker compose version
```

## Docker Compose Deployment (Recommended)

### Step 1: Create the Deployment Directory

```bash
mkdir -p /opt/ammds
cd /opt/ammds
```

### Step 2: Write docker-compose.yml

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  ammds:
    image: qyg2297248353/ammds:latest
    container_name: ammds
    restart: unless-stopped
    ports:
      - "7000:7000"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
      - /path/to/your/media:/media:ro
      - /path/to/your/downloads:/downloads:ro
    environment:
      - TZ=Asia/Shanghai
      - SERVER_PORT=7000        # Port the SpringBoot application listens on
      - SPRING_PROFILES_ACTIVE=prod
      - AMMDS_HOME=/app/data
    networks:
      - ammds-network

networks:
  ammds-network:
    driver: bridge
```

### Step 3: Start the Service

```bash
docker compose up -d
```

Wait for the image to be pulled and the container to start. The first start may take a few minutes (depending on network speed).

### Step 4: Verify the Deployment

```bash
docker compose logs -f ammds
```

Check the logs to confirm the service started successfully, then visit `http://<your-server-ip>:7000` in a browser.

## Environment Variables

AMMDS can be configured via environment variables. The main environment variables are:

| Variable | Description | Default value | Required |
|:-------|:-----|:-------|:---------|
| `TZ` | Time zone setting | `Asia/Shanghai` | Recommended |
| `SERVER_PORT` | Service listening port | `7000` | Recommended |
| `SPRING_PROFILES_ACTIVE` | Active SpringBoot profile | `prod` | No |
| `AMMDS_HOME` | Data directory path | `/app/data` | No |
| `AMMDS_LOG_LEVEL` | Log level | `INFO` | No |
| `AMMDS_ENABLE_HTTPS` | Whether to enable HTTPS | `false` | No |

### Advanced Configuration Example

```yaml
environment:
  - TZ=Asia/Shanghai
  - SERVER_PORT=7000
  - AMMDS_LOG_LEVEL=DEBUG
  - AMMDS_ENABLE_HTTPS=false
  - AMMDS_MAX_CONCURRENT_SCRAPES=5
```

## Directory Mount Recommendations

Proper directory mounts ensure data persistence and optimized performance:

| Path in container | Recommended host path | Notes |
|:-----------|:--------------|:-----|
| `/app/data` | `./data` | Persistent storage for database files and user data |
| `/app/config` | `./config` | Persistent storage for configuration files |
| `/media` | `/path/to/media` | Media file directory (recommended to mount read-only with `:ro`) |
| `/downloads` | `/path/to/downloads` | Download directory (for monitoring automatic scraping) |

### Synology NAS Mount Example

```yaml
volumes:
  - /volume1/docker/ammds/data:/app/data
  - /volume1/docker/ammds/config:/app/config
  - /volume1/video:/media:ro
  - /volume1/downloads:/downloads:ro
```

### FnOS Mount Example

```yaml
volumes:
  - /vol1/1000/docker/ammds/data:/app/data
  - /vol1/1000/docker/ammds/config:/app/config
  - /vol1/1000/video:/media:ro
  - /vol1/1000/downloads:/downloads:ro
```

## First-Start Configuration

### 1. Access the Management Interface

Open a browser and visit `http://<your-server-ip>:7000`; you will see the AMMDS login page.

### 2. Create an Administrator Account

On first access, you will be guided to create an administrator account. Set a secure username and password.

### 3. Configure Scraping Plugins

Go to the "Plugin Management" page and enable the data source plugins you need:

- **TMDB scraping**: recommended; the most comprehensive coverage of Western film and TV metadata
- **JavBus scraping**: suitable for Japanese film and TV resources
- **Metatube scraping**: provides an additional metadata source
- **FANZA DMM scraping**: a high-quality data source for Japanese films
- **ThePornDB scraping**: for R18 content

Each plugin may require an API key or cookie to be configured; follow the on-page instructions.

### 4. Add Site Authentication

Go to the "Site Management" page and add your PT site authentication information:

1. Click "Add Site"
2. Select the site type (M-Team, KamePT, Rousi, etc.)
3. Enter the site domain and authentication credentials (cookie or passkey)
4. Click "Verify" to confirm a successful connection

### 5. Configure Push Notifications

In "Notification Settings", configure the push method:

- **Telegram Bot**: push scraping results and system notifications via a bot
- **WebHook**: use a custom WebHook URL to receive notifications

## Common Troubleshooting

### Q1: The Container Exits Immediately After Starting

**Cause**: usually insufficient permissions on the data directory or the port is already in use.

**Solution**:

```bash
# Check port usage
netstat -tlnp | grep 7000

# Fix directory permissions
sudo chown -R 1000:1000 ./data ./config
sudo chmod -R 755 ./data ./config
```

### Q2: Cannot Access the Management Interface

**Cause**: firewall rules or a Docker network configuration issue.

**Solution**:

```bash
# Check whether the container is running
docker ps | grep ammds

# View container logs
docker compose logs ammds

# Check the firewall
sudo ufw status
# If needed, open the port
sudo ufw allow 7000
```

### Q3: Scraping Doesn't Work

**Cause**: usually an incorrectly configured API key or restricted network access.

**Solution**:

1. Check that the API key in the plugin configuration is correct
2. Confirm the server can access the external network normally (especially sites such as TMDB and JavBus)
3. Check the scraping error messages in the AMMDS logs

### Q4: Database Connection Error

**Cause**: a corrupted SQLite database file or a permissions issue.

**Solution**:

```bash
# Fix permissions
sudo chmod 644 ./data/ammds.db
sudo chown 1000:1000 ./data/ammds.db

# Back up and rebuild the database
docker compose down
mv ./data/ammds.db ./data/ammds.db.bak
docker compose up -d
```

### Q5: How to Update AMMDS

```bash
# Pull the latest image
docker compose pull

# Recreate the container
docker compose up -d

# Remove old images (optional)
docker image prune
```

### Q6: How to Back Up Data

```bash
# Back up the data directory
tar -czf ammds-backup-$(date +%Y%m%d).tar.gz ./data ./config

# Restore the backup
tar -xzf ammds-backup-20250101.tar.gz
docker compose restart
```

## Reverse Proxy Configuration

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name ammds.yourdomain.com;

    location / {
        proxy_pass http://localhost:7000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

It is recommended to configure an HTTPS certificate with Certbot or Nginx Proxy Manager to ensure secure data transmission.

## Summary

Deploying AMMDS with Docker is a relatively straightforward process; the key lies in proper directory mounts and environment variable configuration. Once deployment is complete, you will have a powerful private data management platform with multi-site authentication, intelligent metadata scraping, resource search and real-time push notifications.

If you run into other issues during deployment, feel free to open an issue in the project repository or join the community discussion for help.

---

## Keep reading

- [Documentation: Quick Start](/docs/getting-started/overview)
- [Complete Guide to Deploying AMMDS on FnOS NAS](/blog/fnos-integration-guide)
