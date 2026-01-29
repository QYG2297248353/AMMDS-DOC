---
sidebar_position: 1
sidebar_label: "Docker"
---

# Docker

Docker is an open-source platform for automating the deployment, scaling, and management of applications. It uses containerization technology to package applications and their dependencies into independent containers, ensuring consistent operation across any environment. Containers are lightweight and portable, making them ideal for microservices architectures and CI/CD workflows.

<!-- truncate -->

## One-click Run

```bash
docker run -itd \
  --name AMMDS \
  -p 8080:80 \
  -v $(pwd)/data:/ammds/data \
  -v $(pwd)/db:/ammds/db \
  -v $(pwd)/download:/ammds/download \
  -v $(pwd)/media:/media \
  --restart always \
  qyg2297248353/ammds:latest
```

:::note
Please mount your local media directory to the container yourself. Do not use `/ammds` as the media mount directory prefix to avoid data loss.

**Example:** If your host directory is `/mnt/movie`, the recommended mount format is `-v /mnt/movie:/mnt/movie`
:::

## Parameter Explanation

| Parameter | Description |
|-----------|-------------|
| `-itd` or `--interactive --tty --detach` | Combined options:<br />- `-i` or `--interactive`: Keep STDIN open even if not attached<br />- `-t` or `--tty`: Allocate a pseudo-TTY (terminal) for container interaction<br />- `-d` or `--detach`: Run the container in the background as a daemon |
| `--name AMMDS` | Specify the container name as AMMDS |
| `-p 8080:80` | Map port 8080 on the host to port 80 in the container, format: `-p <host port>:<container port>` |
| `-v $(pwd)/data:/ammds/data` | Mount the current directory's `./data` folder to `/ammds/data` in the container for data persistence |
| `-v $(pwd)/db:/ammds/db` | Mount the current directory's `./db` folder to `/ammds/db` in the container for database file storage |
| `-v $(pwd)/download:/ammds/download` | Mount the current directory's `./download` folder to `/ammds/download` in the container for download storage |
| `-v $(pwd)/media:/media` | Mount the current directory's `./media` folder to `/media` in the container, suitable for mounting media directories |
| `--restart always` | Set the container to always restart automatically, ensuring it starts automatically in any situation (including system restart) |
| `qyg2297248353/ammds:latest` | Docker image name and tag, specifying which image to run |

## Cloud Drive Users

If you use cloud drive mounting like CloudDrive, please use the following command:

```bash
docker run -itd \
  --name AMMDS \
  -p 8080:80 \
  -v $(pwd)/data:/ammds/data \
  -v $(pwd)/db:/ammds/db \
  -v $(pwd)/download:/ammds/download \
  -v /media:/media:rw,rshared \
  --cap-add=SYS_ADMIN \
  --device /dev/fuse \
  --security-opt apparmor:unconfined \
  --restart always \
  qyg2297248353/ammds:latest
```

### Special Notes for Cloud Drive Users

- `:rw,rshared`: In addition to basic read-write permissions, `rshared` maintains shared propagation between containers
- `--cap-add=SYS_ADMIN`: Allows the container to access system resources
- `--device /dev/fuse`: Allows the container to access FUSE devices
- `--security-opt apparmor:unconfined`: Allows the container to use unrestricted AppArmor configuration

:::warning
This deployment solution is not suitable for "cloud drive mounting + directory monitoring" scheme. Please use "scheduled scanning" instead of "directory monitoring".
:::

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