---
sidebar_position: 2
sidebar_label: "Quick Start"
title: "Quick Start"
description: "Quickly learn about the various deployment methods for AMMDS, including Windows, FnOS, QNAP NAS, and Docker deployment."
keywords: [AMMDS, quick start, deployment guide, Docker, installation]
tags: [tutorial, deploy]
---

# Quick Start

:::info
Welcome to AMMDS! Follow this guide to deploy AMMDS using Windows, FnOS, QNAP, or Docker.
:::

## 🚀 Deployment Methods

### Windows Deployment

:::note
**Package Type**: EXE Setup
:::

For Windows users, we provide a simple setup package:

1. Download the latest `ammds-setup.exe` from the [AMMDS Launcher releases page](https://github.com/QYG2297248353/AMMDS-Launcher/releases)
2. Locate the downloaded `ammds-setup.exe` file
3. Right-click and select **Run as administrator**
4. Follow the installation wizard step by step
5. After installation, the service will start automatically

---

### FnOS Deployment

:::note
**Package Type**: FPK (FnOS Package)
:::

For FnOS users, we provide an FPK package that can be directly imported into the FnOS App Store:

1. Download the latest `AMMDS-Offline-FnNas.fpk` from the [FnOS releases page](https://github.com/QYG2297248353/AMMDS-Offline-FnNas/releases)
2. Log into your FnOS management interface
3. Open the **FnOS App Store**
4. Select **Import Local Package** and locate the downloaded FPK file
5. Follow the prompts to complete installation
6. You can manage the service in the FnOS App Store afterwards

---

### QNAP Deployment

:::note
**Package Type**: QKPG (QNAP Package)
:::

For QNAP users, we provide a QKPG package that can be directly imported into the QNAP App Store:

1. Download the latest `AMMDS_x86.qkpg` or `AMMDS_arm.qkpg` from the [QNAP releases page](https://github.com/QYG2297248353/AMMDS-Offline-QNAP/releases)
2. Log into your QNAP management interface
3. Open the **QNAP App Store**
4. Select **Import Local Package** and locate the downloaded QKPG file
5. Follow the prompts to complete installation
6. You can manage the service in the QNAP App Store afterwards

---

### Docker Deployment

:::note
**Package Type**: Docker Image
:::

Already have Docker installed? Deploy AMMDS with a single command:

```bash showLineNumbers title="Docker Command"
docker run -itd \
   --name AMMDS \
   -p 8080:80 \
   -v $(pwd)/data:/ammds/data \
   -v $(pwd)/db:/ammds/db \
   --restart always \
   qyg2297248353/ammds:latest
```

#### Command Parameters

| Option | Description |
|--------|-------------|
| `-itd` | Run container in the background, doesn't occupy your terminal |
| `--name AMMDS` | Name the container "AMMDS" for easy management |
| `-p 8080:80` | Map local port 8080 to container port 80 (web interface) |
| `-v $(pwd)/data:/ammds/data` | Store data locally so it's not lost when the container is deleted |
| `-v $(pwd)/db:/ammds/db` | Store the database locally so it's not lost when the container is deleted |
| `--restart always` | Auto-restart the container if it crashes unexpectedly |
| `qyg2297248353/ammds:latest` | Use the latest AMMDS Docker image |

---

## 🌐 Accessing the Service

After deployment, open your browser to access AMMDS:

1. Open your preferred browser
2. Go to `http://localhost:8080` (if remote, replace `localhost` with your server's IP)
3. You'll see the AMMDS login page

### 📝 Default Credentials

| Credential | Default Value |
|------------|--------------|
| **Username** | `ammds` |
| **Password** | `ammds` |

### 💡 First Login Tips

:::warning
If the login page doesn't appear immediately, don't worry. The system may be downloading and initializing resources in the background. Depending on your network speed, this may take a few minutes.
:::

- After logging in, **change the default password in Settings immediately**
- Browse around the main interface to get familiar with AMMDS features
- Check the system status in the bottom right corner to make sure all services are running

## 📋 Next Steps

1. **Check the Docs**: Review the [Introduction](/docs/intro) for detailed instructions
2. **Adjust Settings**: Customize your preferences in the Settings menu
3. **Add Media Sources**: Connect your media library and start using AMMDS
4. **Explore Features**: Try out various tools and features available

---

Enjoy using AMMDS! 🎉
