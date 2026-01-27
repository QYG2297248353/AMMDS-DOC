---
sidebar_position: 2
sidebar_label: "Docker Compose"
---

# Docker Compose 

Docker Compose is a tool for defining and running multi-container Docker applications. With a single YAML file (docker-compose.yml), you can configure all the services of your application, and then start all services with just one command. It's ideal for quick deployment and management in development, testing, and staging environments.

<!-- truncate -->

## Create Service

### Create Application Directory

First, create a directory named `ammds` to store related files:

```bash
mkdir ammds && cd ammds
```

### Create Configuration File

Create and edit a `docker-compose.yml` file in the `ammds` directory. Paste the following content into the file:

```yaml
services:
  ammds:
    image: qyg2297248353/ammds:latest  # Docker image name and version tag
    container_name: AMMDS  # Container name
    ports:
      - "8080:80"  # Port mapping: host port 8080 maps to container port 80
    volumes:
      - ./data:/ammds/data  # Mount current directory's data folder to /ammds/data in container
      - ./db:/ammds/db  # Mount current directory's db folder to /ammds/db in container
      - ./download:/ammds/download  # Mount current directory's download folder to /ammds/download in container
      - ./media:/media  # Mount current directory's media folder to /media in container
    restart: always  # Set container to always restart automatically on failure
    environment:
      - TZ=Asia/Shanghai  # Set timezone to Asia/Shanghai
    networks:
      - ammds-network  # Use custom network

networks:
  ammds-network:  # Custom network configuration
    driver: bridge  # Use Docker's default bridge network driver
```

:::note
Please mount your local media directory to the container yourself. Do not use `/ammds` as the media mount directory prefix to avoid data loss.

**Example:** If your host directory is `/mnt/movie`, the recommended mount format is `- /mnt/movie:/mnt/movie`
:::

## Special Configuration for Cloud Drive Users

If you use cloud drive mounting like CloudDrive, use the following configuration in your `docker-compose.yml` file:

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

- `:rw,rshared`: In addition to basic read-write permissions, `rshared` maintains shared propagation between containers
- `cap_add: - SYS_ADMIN`: Allows the container to access system resources
- `devices: - "/dev/fuse:/dev/fuse"`: Allows the container to access FUSE devices
- `security_opt: - apparmor:unconfined`: Allows the container to use unrestricted AppArmor configuration

:::warning
This deployment solution is not suitable for "cloud drive mounting + directory monitoring" scheme. Please use "scheduled scanning" instead of "directory monitoring".
:::

## Start Service

Use the following command to start the service. This will run the AMMDS container in the background and apply all configurations from the docker-compose.yml file:

```bash
docker compose up -d
```

## Stop Service

If you need to stop and remove the service, you can use the following command:

```bash
docker compose down
```

## Access Service

You can access the service through a browser:

```
http://127.0.0.1:8080
```

Access URL format: `Host IP Address + Service Port`

## Default Credentials

- **Username**: `ammds`
- **Password**: `ammds`

:::tip
If you can't see the credentials clearly, please switch to light mode.
:::