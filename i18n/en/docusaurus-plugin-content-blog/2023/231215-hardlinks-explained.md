---
slug: hardlinks-explained
title: "Hard Links: One File, Two Names, No Double Storage"
authors: [studio]
tags: [ammds, nas, guide]
date: 2023-12-15
---

Self-hosted media libraries have a trap almost everyone has fallen into: you need to keep the original files in the download directory for seeding, while wanting clean, standardized names in the media library. So the same 40 GB film gets stored twice, and 80 GB simply disappears. Hard links were born to solve this problem.

{/* truncate */}

## Why copying is wrong

First, let's be clear about where the conflict comes from:

- **Downloaders** (such as qBittorrent) need the original filenames and directory structure to remain unchanged in order to keep seeding;
- **Media servers** (Jellyfin, Emby, etc.) need standardized naming, such as `Film Title (Year)/Film Title (Year).mkv`, to correctly identify films and match metadata.

If you **copy** a file from the download directory into the media library, a 40 GB 4K film instantly becomes 80 GB. Besides eating space, copying also requires a full read/write pass over the disk, so large files take a long time.

## How hard links solve it

A file in a file system actually has two parts: the **data blocks** that truly store the data, and the **directory entry** pointing to them (you can think of this as the "name").

A normal copy creates new data plus a new name. A hard link simply **adds another name pointing to the same data**:

- **No extra space**: Both paths see the same bytes; the film is stored only once;
- **Instant**: Whether the file is 100 GB or 1 GB, creating a link just registers a new name — a matter of milliseconds;
- **Rename on either side**: Renaming to a standardized name in the media library doesn't affect the original file or seeding in the download directory;
- **Safe to delete**: Data is only actually freed when the last name is deleted. Delete the seeding file, and the copy in the media library remains.

## A key prerequisite: the same file system

Hard links are a file-system-level capability, with one hard limitation: **they can only be created within the same partition / volume**.

This limitation most often causes trouble in container environments. Many people mount `/downloads` and `/media` as two separate paths for Sonarr and Radarr — on the host they may be on the same disk, but inside the container they are different mount points, so the kernel treats them as cross-device, the `link()` call fails (with `EXDEV`), and the software **silently falls back to copying**. You see nothing unusual in the interface; the disk just fills up rapidly.

The correct approach is to have all containers see the same directory tree, for example a unified `/data`:

```text
/data
├── torrents/     ← downloaders put files here
└── media/        ← media library goes here
```

In Sonarr / Radarr, also confirm that this setting is enabled: `Settings → Media Management → Importing → Use Hardlinks instead of Copy` (enabled by default).

## The relationship with AMMDS

AMMDS handles the latter half of the chain: "search → subscribe → push to downloader → organize into the library." Understanding hard links lets you connect the whole chain without wasting space: the downloader stays put and keeps seeding, while AMMDS produces a standardized media library, with both sharing the same data. This isn't a feature unique to AMMDS — it's a fundamental skill of the self-hosted media library toolkit.

> Note: The technical details in this article are compiled from publicly available media server deployment guides (TRaSH Guides and others); the exact behavior of hard links depends on the file system and container configuration you use.

---

## Keep reading

- [Why We Stick with Self-Hosting: Keeping Your Data in Your Own Hands](/blog/why-self-hosted)
- [Docs: Subscriptions and downloaders](/docs/integration/downloader)
- [Docs: Deploying on NAS](/docs/getting-started/nas)
