---
title: "Toolbox: batch-processing files"
sidebar_label: Toolbox
description: "Eight toolbox tools in one line each: managing downloads, subtitling and converting video, cropping posters, organising files on the server, syncing data to your player."
sidebar_position: 1
---

# Toolbox: batch-processing files

The toolbox is a shelf of small tools for batch jobs. They are grouped below by purpose, and each has one line on what it does. Pick by the job in front of you.

## First, the words

> **Async task**: you click, it's submitted, and the work runs in the background. Close the page and come back later to see the result in the task list.

> **Output**: the file a tool produces (new video, subtitle, image). It is written to disk only and is **not filed into your library**. Run a scan task, or put it into a directory with monitoring enabled.

## 1. Downloading and cross-seeding

| Tool | In one line | Needs | Produces |
| --- | --- | --- | --- |
| Downloader | See the downloader's connection info and torrent tasks; add magnet or torrent tasks by hand; start, pause and delete in bulk | Downloader plugin enabled | Downloaded files |
| PT cross-seeding | Match files you already have onto other sites so you don't download them twice | Cross-seeding service enabled | New torrent tasks on other sites |

## 2. Working on video

| Tool | In one line | Needs | Produces |
| --- | --- | --- | --- |
| Subtitles | Listen to the audio track and generate subtitles, optionally bilingual | Speech recognition service reachable | `.srt` subtitle files |
| Transcode | Re-encode video to change format or codec, or shrink the size | Video processing program available | A new video file |
| Convert | Change only the wrapper (MKV to MP4, say) and copy the content as-is — fast and lossless | Video processing program available | A new video file |

> **Stream copy**: moving the audio and video into a new container untouched, without re-encoding. That is why it is much faster than transcoding and loses no quality. It only works when the target format supports it.

How to choose: if only the container is wrong and the target format appears in the detected list, use **Convert**. If you need a different codec, a smaller file, or the target isn't in the list, use **Transcode**.

## 3. Working on images

| Tool | In one line | Needs | Produces |
| --- | --- | --- | --- |
| Poster crop | Crop a landscape image into a portrait poster and generate the matching set in the same folder | No plugin | `-poster` / `-fanart` / `-thumb` images |

## 4. Managing files on the server

| Tool | In one line | Needs | Produces |
| --- | --- | --- | --- |
| File browser | Browse server folders in the browser: search, upload, download, copy, move, compress, extract, rename, delete, plus preview and crop | No plugin | Whatever you create |

> **NFO**: a plain-text info file kept next to a video, usually recording release details. You can open and edit it in the file browser.

## 5. Talking to your player

| Tool | In one line | Needs | Produces |
| --- | --- | --- | --- |
| Media server tools | Browse the player's libraries, films and actors; scan, change covers, edit data and bind them to local records | Player plugin enabled | Changes on the player side |

## Rules they all share

- **Choosing files**: always through the server file tree; a folder loads when you expand it, and unsupported file types are greyed out.
- **No waiting**: tasks run async; anything over the concurrency limit queues up.
- **Task list**: every tool offers details and cancel, and failed or cancelled tasks can be retried. Deleting often deletes the output too; your original file is never touched.
- **Auto refresh**: lists refresh on a timer and pause when the tab isn't visible.
- **No overwriting**: if the target file already exists, or the target path is identical to the source, the task is refused. To keep the original, choose "same folder with suffix" or "single output folder".

## Settings

### Transcode / Convert

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| Scope | One video, or a whole folder in batch | Batch processes every supported file in the folder — move out anything you don't want |
| Target format | MP4, MKV, MOV, WebM, AVI, TS, M4V, MPG, FLV, 3GP, OGV, WMV and others | If Convert finds no compatible format the list is empty; use Transcode instead |
| Lossless | Copy the content straight across when the codec and container are compatible | Greyed out when incompatible; you must re-encode |
| Video codec | With lossless off: the most compatible one, or the smaller one | A default codec is used |
| Encoding preset | Nine steps from fastest to slowest: faster means bigger, slower means smaller | A default step |
| Quality (CRF) | 0–51, default 23. Lower is better quality and a bigger file; 18–28 is the usual range | Default 23 |
| Output mode | Same name in source folder / add a suffix (`transcode` or `convert`) / one output folder | Refused if the target exists — nothing is overwritten |

> **CRF**: a number standing for quality, from 0 to 51. Lower means better quality and a bigger file; higher is the opposite.

### Subtitles

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| Scope | One video, or a whole folder in batch | Same as above |
| Recognition language | Auto-detect, or name the language | Auto-detect may pick the wrong language on mixed audio |
| Bilingual | On, and the recognised text is translated and shown on two lines | Single-language subtitles only |
| Target language | Required once bilingual is on | You can't submit the translation task |

A single video can be up to 12 hours long. One recognition request covers 60 minutes, and the rest is split automatically. Quality depends on how clear the audio is; several people talking or loud noise means more mistakes.

### PT cross-seeding

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| Enabled | Whether automatic cross-seeding runs | Only the manual **Cross-seed now** button |
| Schedule | A one-line expression saying how often to run | Nothing runs on a schedule |
| Client | Which downloader receives the torrents | Automatic cross-seeding won't run |
| Notify | Whether to push a notification when it finishes | No push; you have to check the records |

> **Cron**: one line describing when to run, such as "every day at 04:45" or "every 5 minutes". Leave it empty and nothing runs on a schedule.

Each site card has an enable switch and buttons for the credentials that site asks for (user ID, personal key, login cookie and so on). Buttons for filled-in values are highlighted, and the expression is checked before saving. The scheduler picks the plan up afterwards; it is not listed on the Scheduled Jobs page.

### File browser

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| Recursive | Whether searching also looks inside subfolders | Only the current folder is searched |
| Archive format | ZIP or 7Z | You can't compress |
| Archive name and path | What the archive is called and where it goes | Current folder by default |
| Extract target | Where to extract to | Current folder by default; only archives offer it |
| Remote download URL and filename | Let the server fetch a URL | The filename is derived from the URL |
| Display settings | Whether to show hidden files, and which of size / modified / type / actions columns are visible | All shown by default |

Deleting a folder in the file browser removes everything inside it, with **no recycle bin**. Everything runs with the permissions of the account running AMMDS, so missing permissions simply fail.

## If something goes wrong

- **The page only says "plugin not enabled"**: the service this tool depends on isn't on yet. Enable it and test the connection under Integrations.
- **Tasks keep queueing**: only so many run at once. Wait, or split the batch into smaller pieces.
- **A task failed**: open **Details** or expand the row for the error and recent output. Usual causes: damaged source file, no disk space, wrong program path.
- **Can't find the output**: it's in the output directory you chose. Check the output path in the task details, then run a scan so it enters the library.
- **Disk space dropped sharply**: transcoding and caching both eat disk. Look at the storage page under System Management to see who's using it and clean up from there.
