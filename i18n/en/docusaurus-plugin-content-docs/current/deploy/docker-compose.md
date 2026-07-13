---
sidebar_position: 2
sidebar_label: "Docker Compose"
---

# Docker Compose

Docker Compose is a "one-click launch tool." If you need to start several containers that work together, typing out a bunch of commands is tedious. Compose lets you put all your configuration in one file, and from then on you just run one command to get everything up and running.

<!-- truncate -->

## Create Service

### Create Application Directory

First, create a folder called `ammds` to store related files:

```bash
mkdir ammds && cd ammds
```

### Create Configuration File

Create a `docker-compose.yml` file in the `ammds` folder and copy the content below into it:

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # AMMDS's "installer package" address
    container_name: AMMDS  # Give the container a name
    ports:
      - "8080:80"  # "Connect" your server's port 8080 to AMMDS (port 80), access via 8080
    volumes:
      - ./data:/ammds/data  # Share the ./data folder with AMMDS for storing data
      - ./db:/ammds/db  # Share the ./db folder with AMMDS for storing the database
      - ./download:/ammds/download  # Share the ./download folder with AMMDS for downloads
      - ./media:/media  # Share the ./media folder with AMMDS for movie files
    restart: always  # Auto-restart on failure, hassle-free
    environment:
      - TZ=Asia/Shanghai  # Set timezone to UTC+8 (Beijing time)
    networks:
      - ammds-network  # Join a custom network

networks:
  ammds-network:  # Custom network, lets multiple containers talk to each other
    driver: bridge  # Uses Docker's default network mode
```

:::note
Please mount your local media directory to the container yourself. Do not use `/ammds` as the media mount directory prefix to avoid data loss.

**Example:** If your host directory is `/mnt/movie`, the recommended mount format is `- /mnt/movie:/mnt/movie`
:::

## Special Configuration for Cloud Drive Users

If you use cloud drive mounting like CloudDrive, adjust the configuration slightly:

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest
    container_name: AMMDS
    ports:
      - "8080:80"
    volumes:
      - ./data:/ammds/data
      - ./db:/ammds/db
      - ./download:/ammds/download
      - /media:/media:rw,rshared
    restart: always
    environment:
      - TZ=Asia/Shanghai
    cap_add:
      - SYS_ADMIN
    devices:
      - "/dev/fuse:/dev/fuse"
    security_opt:
      - apparmor:unconfined
    networks:
      - ammds-network

networks:
  ammds-network:
    driver: bridge
```

### Special Notes for Cloud Drive Users

- `:rw,rshared`: Read and write capable, and "shares" the folder across multiple containers
- `cap_add: - SYS_ADMIN`: Gives the container some system admin privileges so cloud drives work properly
- `devices: - "/dev/fuse:/dev/fuse"`: Allows the container to access the FUSE device (a "bridge" needed for cloud drive mounting)
- `security_opt: - apparmor:unconfined`: Relaxes security restrictions so cloud drive mounting doesn't error out

:::warning
This setup doesn't work with "cloud drive mounting + directory monitoring." Please use "scheduled scanning" instead.
:::

## Start Service

Run the following command in the `ammds` folder to start all services:

```bash
docker compose up -d
```

## Stop Service

To stop and remove the services, use this command:

```bash
docker compose down
```

## Access Service

Open your browser and enter:

```
http://127.0.0.1:8080
```

If you're deploying on a server, just replace `127.0.0.1` with your server's IP address.

## Default Credentials

- **Username**: `ammds`
- **Password**: `ammds`

:::tip
If you can't see the text clearly, switch to light mode.
:::
