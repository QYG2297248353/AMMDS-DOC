---
sidebar_position: 6
sidebar_label: "Baota Panel"
title: "Baota Panel"
description: "Learn how to deploy AMMDS on Baota Panel (bt.cn) via Docker management, including container creation, mount directory, and port configuration."
keywords: [AMMDS, Baota Panel, Docker, server management, deployment]
tags: [deploy]
---

# Baota Panel

Baota Panel (bt.cn) is a server management tool that turns complex command-line operations into buttons and switches on a web page. Just click around to manage websites, databases, SSL certificates, and more — no need to memorize a bunch of commands.

## Prerequisites

Before you start, make sure you have these two things ready:

1. **Baota Panel installed** — if you haven't installed it yet, go to [bt.cn](https://bt.cn) and follow the guide
2. **Docker installed in Baota** — open Baota Panel, go to the Software Store on the left, search for "Docker", and install it

## Deploy AMMDS with Baota's Docker

### Step 1: Open Docker Management

Find **Docker** in the left sidebar of Baota Panel and click it.

### Step 2: Create the Container

1. On the Docker management page, click **Containers** → **Create Container**
2. Fill in the information as follows:

| Setting | Value | Explanation |
|---------|-------|-------------|
| **Image Name** | `qyg2297248353/ammds:latest` | This is the AMMDS "installer" — fill this in and it'll auto-download |
| **Container Name** | `AMMDS` | Give your AMMDS a name so you can identify it easily |
| **Port Mapping** | Host port `8080` → Container port `80` | Assign port 8080 on your server to AMMDS, access it via `http://your-ip:8080` |
| **Mount Directory** | See below | "Share" server folders with the container so your movie files don't get lost if the container restarts |

### Step 3: Set Mount Directories (Important!)

Mount directories "lend" folders from your server to AMMDS. At minimum, you need to mount the following:

- **Data directory**: Mount a server folder (e.g., `./data`) to the container's `/ammds/data`
- **Database directory**: Mount a server folder (e.g., `./db`) to the container's `/ammds/db`
- **Download directory**: Mount a server folder (e.g., `./download`) to the container's `/ammds/download`
- **Media directory**: Mount your movie/TV show folder (e.g., `./media`) to the container's `/media`

:::note
**Note:** Do **not** mount your media folders to a path starting with `/ammds`, otherwise data may be lost.

**For example:** If your movies are in `/mnt/movie` on the server, mount it like this: `/mnt/movie:/mnt/movie`
:::

### Step 4: Set Auto-restart

On the container creation page, find **Restart Policy** and select **"Always Restart"**. This way, even if your server reboots, AMMDS will start back up automatically.

### Step 5: Start the Container

After filling in all the information above, click "Confirm" to create. Baota will automatically pull the image and start the container.

### Step 6: Access AMMDS

Open your browser and enter:

```
http://your-server-ip:8080
```

For example, if your server IP is `192.168.1.100`, enter `http://192.168.1.100:8080`.

### Default Credentials

- **Username**: `ammds`
- **Password**: `ammds`

:::tip
If you can't see the text clearly, switch to light mode.
:::

## Notes

- **Firewall**: If you can't open the page, check if your server's firewall has port 8080 open. You can add port rules in Baota Panel's Security page.
- **Data Persistence**: Mount directories are very important! Without them, all your configuration and data will be lost if the container is deleted.
- **Timezone**: If you need to change the timezone, add the environment variable `TZ=Asia/Shanghai` (Beijing time) when creating the container.
