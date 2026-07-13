---
sidebar_position: 1
sidebar_label: "Docker"
---

# Docker

Docker is like a "lightweight virtual machine." It packages the software you need and its runtime environment into a "container," so no matter which machine you move to, it just works out of the box — no need to reconfigure a bunch of stuff.

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

| Parameter | Explanation |
|-----------|-------------|
| `-itd` | Combined options: `-i` (keep input channel open) + `-t` (allocate terminal) + `-d` (run in background) — lets the container run quietly in the background without taking over your command window |
| `--name AMMDS` | Give your container a name so you can manage it (start/stop) using that name |
| `-p 8080:80` | Map host port 8080 to container port 80 — "connect" port 8080 on your server to AMMDS, access it via `http://server-ip:8080` in your browser |
| `-v $(pwd)/data:/ammds/data` | Mount a local folder to the container — "share" your `./data` folder with AMMDS so data isn't lost |
| `-v $(pwd)/db:/ammds/db` | Mount a local folder to the container — share your `./db` folder with AMMDS for database storage |
| `-v $(pwd)/download:/ammds/download` | Mount a local folder to the container — share your `./download` folder with AMMDS for downloads |
| `-v $(pwd)/media:/media` | Mount a local folder to the container — share your movie folder with AMMDS, good for media directories |
| `--restart always` | Auto-restart the container if it exits — if something goes wrong or the server reboots, AMMDS will come back up automatically |
| `qyg2297248353/ammds:latest` | Docker image name and tag — this is AMMDS's "installer package," `latest` means the newest version |

## Cloud Drive Users

If you use cloud drive mounting like CloudDrive, use the following command:

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

- `:rw,rshared`: Read and write capable, and "shares" the folder across multiple containers
- `--cap-add=SYS_ADMIN`: Gives the container some system admin privileges so cloud drives work properly
- `--device /dev/fuse`: Allows the container to access the FUSE device (a "bridge" needed for cloud drive mounting)
- `--security-opt apparmor:unconfined`: Relaxes security restrictions so cloud drive mounting doesn't error out

:::warning
This setup doesn't work with "cloud drive mounting + directory monitoring." Please use "scheduled scanning" instead.
:::

## Access Service

Open your browser and enter the following address:

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
