---
title: Install on a NAS
sidebar_label: NAS Install
description: Install AMMDS on FnOS, QNAP and similar NAS devices — choosing between the app package and Docker, install steps, directory planning and NAS-specific problems.
sidebar_position: 5
---

# Install on a NAS

Many people run AMMDS on a NAS. Besides Docker, FnOS and QNAP also offer an **app package**. The NAS's own app centre installs, stops, starts and updates it, so there is no container to maintain.

This page covers how to choose between the two routes, the install steps and how to plan your folders. The general Docker part is on [Install with Docker](./docker.md). The app package is just an entry point: the NAS uses it to install and manage the program for you. What's inside is the same program, built with GraalVM Native Image. It is not a different version.

> **NAS**: a network device built for storing files, such as FnOS or QNAP.

> **App package**: a NAS-specific install package handled by the NAS app centre.

## Choose a route first

| Route | Traits | Suits |
| --- | --- | --- |
| App package | Installed by the app centre, with password and port set in the wizard; start, stop and upgrade all happen there | You want minimal fuss and the NAS is your main device |
| Docker container | Full control over ports, directories and environment variables; upgrading means swapping the image | The NAS supports Docker and you're comfortable with containers |

Both use the same folders: `data/` holds images, cache, logs and dependencies, `db/` holds the database, and media files live separately in your storage.

:::warning[Only download from official sources]
Get install packages only from the official release pages. Third-party repackages may include extra scripts, or use a folder layout that doesn't match the current version. That loses data on upgrade.
:::

## FnOS

### Download

Get the latest package from the official releases page: https://github.com/QYG2297248353/AMMDS-Offline-FnNas/releases

Download it to your computer and upload it, or download it directly on the device.

### Install

1. Open the **app centre** and click **manual install** at the bottom left, then pick the package.
2. Click **install** and confirm on the prompt page.
3. Read and accept the licence.
4. Choose the install location: somewhere with enough space that **won't be cleaned up as a temporary directory**.
5. Set the admin password; use a strong one.
6. Set the access port and write it down — you'll use it after installing.
7. Confirm everything and wait for the progress bar.

### Afterwards

- Open `http://NAS_IP:the-port-you-set`.
- To scan media, first make sure AMMDS can read the media folder on the NAS, then add the folder inside AMMDS.
- Upgrade by installing the new package in the app centre; back up `db/` and `data/` from the install directory first.

## QNAP

### Download

Download the package matching your device architecture (x86 or ARM): https://github.com/QYG2297248353/AMMDS-Offline-QNAP/releases

### Install

1. Sign in to the QNAP interface and open **App Center**.
2. Choose manual install / import a local package and select the file.
3. Follow the wizard: pick the install volume and set the access port.
4. Start AMMDS from the app list afterwards.

If Container Station is installed, you can use Docker instead. Folders and ports follow the general Docker setup.

### Afterwards

- Open `http://NAS_IP:port`, using the port from the wizard.
- Keep the media folder in the same storage pool to avoid permission trouble across volumes.
- Back up `db/` and `data/` before upgrading, as always.

## Planning your directories

| Location | Advice |
| --- | --- |
| Program and data folders | Put them in a dedicated folder on the main volume. Not the system disk, and not a temp folder that gets cleaned |
| Media directory | A separate shared folder, with read (or read/write) permission granted to the account AMMDS runs as |
| Download directory | Share one directory with the downloader so both sides see the same path |
| Backups | Copy `db/` and `data/` to another disk or remote storage regularly |

:::tip[Make every app see the same path]
If a downloader or player also runs on the NAS, make them all see the media folder at **exactly the same path**, so AMMDS can find files after pushing a download.
:::

## Settings

| Setting | What it controls | If you leave it out | Restart needed |
| --- | --- | --- | --- |
| Access port | The port you browse to, set in the install wizard | No address to use; if you forget it, check the app centre settings | Yes |
| Admin password | The password for the admin pages, set in the wizard | The default password stays and anyone reaching the port can get in | No, change it after signing in |
| Install location | Which volume holds the program and data | A full or auto-cleaned volume causes install failure or data loss | Yes (reinstall) |
| Media directory and permissions | Where to look for files, and whether it may read them | Without permission nothing is scanned and the folder looks empty | No, takes effect immediately |
| Autostart | Whether the service comes back after a NAS reboot | Without it you start AMMDS manually after every reboot | Yes |

Startup settings you can still change after signing in are on [Change the port or upload limit](./settings.md).

## NAS-specific problems

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Install says there isn't enough space | The chosen volume is short on space | Pick another volume, or free some up |
| The page opens but nothing is scanned | The app account lacks shared folder permission | Grant it in the NAS shared folder permissions |
| The service isn't running after a NAS reboot | Autostart isn't enabled | Turn on autostart in the app centre |
| Data is empty after an upgrade | The new version went to a different directory, or the old one wasn't kept | Restore your `db/` and `data/` backup and check the install path |
| Phones or clients can't find the service | Broadcasts blocked on the NAS network, or UDP ports not allowed (Docker route) | Type the address manually in the client, or map the UDP ports as described in the Docker page |

## If something goes wrong

- **Install fails**: check the free space and whether you picked the right architecture (x86 or ARM).
- **Page won't open**: make sure the NAS firewall allows that port, and that you're using the right IP and port.
- **Nothing is scanned**: this is the most common NAS problem, and it is almost always shared folder permission. Grant it on the NAS and try again.
- **Trouble after an upgrade**: restore your `db/` and `data/` backup and check whether the install path changed. If nothing matches, look up your symptom in [Common questions](../faq.md).

## Next

- [First launch: sign in and basic setup](./first-login.md)
- [Organise your first films in ten minutes](./first-library.md)
- [Install with Docker](./docker.md)
