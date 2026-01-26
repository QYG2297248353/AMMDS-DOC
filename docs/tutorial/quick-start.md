---
sidebar_position: 2
sidebar_label: "Quick Start"
---

# Quick Start

:::info
Welcome to AMMDS! This guide will help you deploy AMMDS using one of the supported methods: Windows, Feiniu Nas, or Docker.
:::

## 🚀 Deployment Methods

### Windows Deployment

:::note
**Package Type**: EXE Setup Package
:::

For Windows users, we provide a straightforward executable setup package:

1. Download the latest `ammds-setup.exe` from the [AMMDS Launcher releases page](https://github.com/QYG2297248353/AMMDS-Launcher/releases)
2. Locate the downloaded `ammds-setup.exe` file
3. Right-click and select **Run as administrator**
4. Follow the intuitive on-screen wizard to complete the installation
5. The service will start automatically after installation completes

---

### Feiniu Nas Deployment

:::note
**Package Type**: FPK (Feiniu Package)
:::

For Feiniu Nas users, we offer an FPK package designed for direct import into the Feiniu App Store:

1. Download the latest `AMMDS.offline.fpk` from the [Feiniu Nas releases page](https://github.com/QYG2297248353/AMMDS-Offline-FnNas/releases)
2. Access your Feiniu Nas dashboard
3. Open the **Feiniu App Store**
4. Select **Import Local Package** and locate the downloaded FPK file
5. Follow the prompts to complete the installation
6. The service will be managed through the Feiniu Nas App Store interface

---

### Docker Deployment

:::note
**Package Type**: Docker Image
:::

For users with Docker installed, deploy AMMDS with a single command:

```bash
docker run -itd \
   --name AMMDS \
   -p 8080:80 \
   -v $(pwd)/data:/ammds/data \
   -v $(pwd)/db:/ammds/db \
   --restart always \
   qyg2297248353/ammds:latest
```

#### Docker Command Breakdown

| Option | Description |
|--------|-------------|
| `-itd` | Run container in interactive mode with pseudo-TTY, detached from terminal |
| `--name AMMDS` | Assigns the name "AMMDS" for easy container management |
| `-p 8080:80` | Maps host port 8080 to container port 80 (web interface) |
| `-v $(pwd)/data:/ammds/data` | Persistent storage for application data |
| `-v $(pwd)/db:/ammds/db` | Persistent storage for database files |
| `--restart always` | Automatically restarts the container if it stops unexpectedly |
| `qyg2297248353/ammds:latest` | Uses the latest AMMDS Docker image |

---

## 🌐 Accessing the Service

After successful deployment, access AMMDS through your web browser:

1. Open your preferred web browser
2. Navigate to `http://localhost:8080` (replace `localhost` with your server's IP if deploying remotely)
3. You will see the AMMDS login page

### 📝 Default Credentials

| Credential | Value |
|------------|-------|
| **Username** | `ammds` |
| **Password** | `ammds` |

### 💡 First Time Access Tips

:::warning
If you don't see the login page immediately, please be patient. The system may still be downloading and initializing resources in the background. This process can take a few minutes depending on your network speed.
:::

- After logging in, **immediately change your default password** from the Settings menu
- Explore the intuitive dashboard to familiarize yourself with AMMDS features
- Check the system status in the bottom right corner to ensure all services are running

## 📋 Next Steps

1. **Check the Documentation**: Review the [Introduction](/docs/intro) for detailed usage instructions
2. **Configure Preferences**: Customize your experience in the Settings menu
3. **Add Media Sources**: Connect your media libraries to start using AMMDS
4. **Explore Features**: Try out the various tools and functionalities available

---

Enjoy using AMMDS! 🎉