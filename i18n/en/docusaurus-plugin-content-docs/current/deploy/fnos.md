---
sidebar_position: 3
sidebar_label: "FnOS"
---

# FnOS Deployment Guide

FnOS is a NAS (home storage server) system built by a team of veteran enthusiasts, featuring built-in local AI models for easy data management at home or in the office. Here's how to deploy AMMDS on FnOS.

## Deployment Methods

AMMDS offers two installation methods on FnOS:

- **FPK Offline App Installation**: Manual installation through the FnOS App Center, suitable for most users
- **Docker Installation**: Deployment via Docker containers, suitable for users familiar with containers

## FPK Offline App Installation

### Download

![AMMDS FPK Download Page](/img/deploy/install-fnos-fpk-00.png)

#### Official Release Address

[AMMDS Offline FnNas GitHub Releases](https://github.com/QYG2297248353/AMMDS-Offline-FnNas/releases)

#### Available Installation Packages

| File Name                  | Type | Description                              |
| -------------------------- | ---- | ---------------------------------------- |
| `AMMDS-Offline-FnNas.fpk`  | FPK  | AMMDS offline installation package for FnOS system |

#### Download Methods

![AMMDS FPK Download Options](/img/deploy/install-fnos-fpk-01.png)

You can download the package to your local computer or directly on your FnOS device.

### Installation Steps

![AMMDS FPK Installation Interface](/img/deploy/install-fnos-fpk-02.png)

1. **Start Installation**

   Open the App Center, click **Manual Install** in the bottom left corner, select the downloaded FPK file, and click **Install**.

![AMMDS FPK Installation Prompt](/img/deploy/install-fnos-fpk-03.png)

2. **Confirm Installation**

   On the installation prompt, click **Agree** to proceed.

![AMMDS FPK License Description](/img/deploy/install-fnos-fpk-04.png)

3. **Read License**

   Read the installation license to understand the terms.

![AMMDS FPK Select Installation Location](/img/deploy/install-fnos-fpk-05.png)

4. **Select Installation Location**

   Choose a disk with enough space.

![AMMDS FPK Set Admin Password](/img/deploy/install-fnos-fpk-06.png)

5. **Set Admin Password**

   Set the login password for the AMMDS management interface. A strong password is recommended.

![AMMDS FPK Set Access Port](/img/deploy/install-fnos-fpk-07.png)

6. **Set Access Port**

   Set the access port for AMMDS, default is 9523.
   Read the service terms and click **Agree**.

![AMMDS FPK Start Installation](/img/deploy/install-fnos-fpk-08.png)

7. **Start Installation**

   On the final prompt, click **Confirm** to start the installation.

![AMMDS FPK Installation Progress](/img/deploy/install-fnos-fpk-09.png)

8. **Wait for Installation to Complete**

   A progress bar will be shown — just wait a bit. If an error appears, follow the prompts, or try an older version of the FPK package.

![AMMDS FPK Installation Complete](/img/deploy/install-fnos-fpk-10.png)

9. **Confirm Success**

   After installation, you'll find AMMDS in the installed apps list.

### Installation Directory

![AMMDS Installation Directory](/img/deploy/install-fnos-fpk-11.png)

In File Management → App Files, you can find the AMMDS installation directory.

## Docker Installation

### Image Download

![AMMDS Docker Image Search](/img/deploy/install-fnos-docker-00.png)

1. **Search for Image**

   Open the Docker app, complete initialization, click **Image Repository** in the left menu, and search for the AMMDS image.

2. **Select Image**

   Pick the one with the most downloads. The full image name is `qyg2297248353/ammds`.

![AMMDS Docker Image Version Selection](/img/deploy/install-fnos-docker-01.png)

3. **Select Version**

   The default version is `latest`. If your device is older and doesn't support the `latest` version, choose a version with the tag ending in `ol8`.

![AMMDS Docker Image Download Complete](/img/deploy/install-fnos-docker-02.png)

4. **Wait for Download to Complete**

   Check the download progress in Local Images. After it's done, you'll see the Run button.

### Container Creation and Configuration

![AMMDS Docker Container Creation](/img/deploy/install-fnos-docker-03.png)

1. **Create Container**

   Click the **Run** button to start deployment.
   Customize the container name, e.g., `ammds`.
   Allocate resources based on your device's performance.
   You can enable **Auto-start on boot**.

![AMMDS Docker Port Settings](/img/deploy/install-fnos-docker-04.png)

2. **Port Settings**

   In Advanced Settings, configure port mapping:
   - Default container port is 80 (TCP)
   - Change the access port to 9523 (or another available port)

![AMMDS Docker Storage Settings](/img/deploy/install-fnos-docker-05.png)

3. **Storage Settings**

   It's recommended to mount local directories to the container so data isn't lost:
   - By default, FnOS creates a temporary storage directory, but this can be cleaned up by the system
   - It's better to manually create the corresponding directories and mount them to the container

![AMMDS Docker Information Confirmation](/img/deploy/install-fnos-docker-06.png)

4. **Confirm Configuration**

   After confirming everything is correct, check **Start after creation**.

### Running and Management

![AMMDS Docker Container Running Status](/img/deploy/install-fnos-docker-07.png)

1. **Check Running Status**

   You can see AMMDS running in the container list. The three dots on the right provide quick actions.

![AMMDS Docker App Details](/img/deploy/install-fnos-docker-08.png)

2. **View App Details**

   Click on the container to see detailed information.

![AMMDS Docker Running Logs](/img/deploy/install-fnos-docker-09.png)

3. **View Running Logs**

   Click **View Logs** to check the running status and download progress.

   :::info First Startup Note
   On the first install, the system will automatically download necessary resource files, which takes a bit of time. Download progress will be shown in the logs.
   :::

## Installation Complete

![AMMDS Installation Complete](/img/deploy/install-fnos-finish.png)

After installation, you can access the AMMDS management interface through a browser and start using it.

## Advanced Attempts

![AMMDS Docker Compose Deployment](/img/deploy/install-fnos-compose.png)

If you're familiar with Docker Compose (container orchestration tool), you can use a Compose file to deploy AMMDS for more flexible configuration.

## Warnings and Precautions

### Security Warnings

:::danger Important Security Tips

- **Official Sources**: Only download AMMDS packages from the official GitHub Releases page, don't use third-party sources
- **Password Security**: Set strong passwords and change them regularly
- **Port Security**: Change the default port to reduce the risk of attacks

:::

### System Requirements

:::info System Configuration Requirements

#### Minimum Configuration

- Operating System: Latest version of FnOS
- Processor: Intel Core i3 or equivalent
- Memory: 4GB RAM
- Disk Space: At least 10GB available
- Network: Broadband internet connection

#### Recommended Configuration

- Operating System: Latest version of FnOS
- Processor: Intel Core i5 or equivalent
- Memory: 8GB RAM or more
- Disk Space: 20GB available
- Network: Stable broadband internet connection

:::

### Usage Precautions

- **Data Backup**: Regularly back up configuration files and important data
- **Resource Management**: Keep an eye on disk space and clean up unnecessary files
- **Network Connection**: Ensure a stable network when downloading resources and updates
- **System Maintenance**: Regularly update FnOS

### Troubleshooting

#### Common Issues

- **Installation Failure**: Check disk space and network connection
- **Startup Issues**: Check running logs for error information
- **Access Failure**: Check port configuration and firewall settings
- **Upgrade Failure**: Try uninstalling the old version first, then install the new version

#### Contact Information

If you encounter issues you can't resolve, submit an Issue on the official GitHub repository.

## Best Practices

- **Regular Updates**: Keep AMMDS up to date
- **Reasonable Configuration**: Set parameters based on your device's performance
- **Safe Usage**: Follow the official documentation and don't modify core configuration files
- **Community Participation**: Join the community, share experiences, and report issues
