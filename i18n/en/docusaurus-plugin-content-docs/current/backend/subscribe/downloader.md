---
title: Downloading and filing
sidebar_label: Download & Import
description: "What happens after a resource is pushed to the downloader: which directory it lands in, what tags it carries, where to watch progress, and how to add, pause or delete tasks."
sidebar_position: 2
---

# Downloading and filing

This page is about **what happens after a resource leaves the search page**: which tool downloads it, where the file ends up, where you watch progress, and what else you need to do before it appears in your library.

## First, the words

> **Downloader**: the program that actually downloads (here, qBittorrent). AMMDS only hands it the task; the download itself is done by the downloader.

> **Category / tag**: labels the downloader puts on a task. With them you can spot the tasks AMMDS submitted among dozens of others.

> **Seeding**: continuing to share the file after you've downloaded it. Don't delete the file while seeding, or the sharing stops.

> **Cross-seeding**: putting the same file on other sites too, without downloading it again.

## Step by step

### Check the connection

Open **Toolbox → Downloader → Plugin Info** to see the downloader's address, account, default save path, versions and current task count. If the plugin isn't enabled the page just says so and doesn't try to connect.

### Submit a task

All three routes end up in the same task list:

| Route | Where | Marks written |
| --- | --- | --- |
| Push from Site Search | Downloader button on a search result | Category `AMMDS` |
| Push from Magnet Search | Downloader button on a search result | Category `AMMDS` |
| Subscription auto-download | Submitted automatically when a subscription matches | Tags `AMMDS订阅` and `subscribe-<subscription ID>`, saved to the directory set in the subscription rules |

You can also add one by hand: click **New task** and switch between the two modes at the top of the dialog.

| Mode | What you enter |
| --- | --- |
| Magnet download | Paste magnet links into the link box, one per line |
| Torrent file | Upload one or more `.torrent` files |

### Watch progress

Open **Toolbox → Downloader → Task Management**. The list refreshes every 5 seconds, and polling pauses when the tab is not visible.

| Column | Meaning |
| --- | --- |
| File name | Torrent name, with the save path on a second line |
| State | The downloader's state in plain words, e.g. downloading, uploading, fetching metadata, queued, paused, checking, moving files, missing files, error |
| Speed | Download and upload speed |
| Size | Total size of the task |
| Category / Tags | The marks written when it was submitted |
| Progress | A progress bar, 100% when finished |

### Batch actions

Tick the tasks first, then use the buttons at the top:

| Button | What it does |
| --- | --- |
| Start | Resumes the selected tasks |
| Pause | Pauses the selected tasks |
| Delete | Asks for confirmation, then offers "delete files" or "delete task only" |

:::warning[Deleting files can't be undone]
In the delete dialog the confirm button is **delete files** and the cancel button is **delete task only**. Confirming removes the downloaded data as well. Before deleting a seeding or cross-seeding task, make sure those flows have stopped.
:::

### After the download

The downloader only puts files on disk. It does **not** file them into your library. To make AMMDS notice the new files, run a scan task (in the Task Management section) or drop them into a directory with monitoring enabled.

## Settings

When adding a task by hand you can fill these three. All are optional:

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| Category | The category name shown in the downloader | No category; the task sits in the default one |
| Tags | Press Enter to confirm each tag; several are joined with commas | No tags |
| Save path | Which directory the files go to | The downloader's default save path |

## How this relates to cross-seeding

Downloader tasks and cross-seeding tasks are two separate records — don't read them as one:

- **Downloader tasks** show download and seeding progress.
- **Cross-seeding** is done by **Toolbox → PT Cross-seeding** through other sites. It has its own plan, site config and records. The cross-seeding plan can pick either downloader, which is a different setting from the push target on the search pages.
- After downloading, the file keeps seeding from the downloader. At the same time, cross-seeding creates new torrent tasks on other sites that point at the same file. Before deleting files, make sure both kinds of task have stopped.

## If something goes wrong

- **Push fails**: the downloader isn't enabled, or the address or account is wrong. Test the connection on the downloader plugin page.
- **Push succeeded but no task in the list**: go to page one and clear filters, or check directly in the downloader.
- **Stuck on "fetching metadata"**: the magnet has no available seeders. Try a torrent file instead.
- **"Missing files"**: the save path was moved or the files were deleted. Put them back and re-check, or delete the task and download again.
- **A subscription never finishes**: the task was removed from the downloader or progress couldn't be read back. Resubmit it in Subscription Management.

To change search or subscription settings, see [Finding resources and subscriptions](./search.md).
