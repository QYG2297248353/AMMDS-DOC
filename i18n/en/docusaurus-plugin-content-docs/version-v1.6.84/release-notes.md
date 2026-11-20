---
title: What's in this version (v1.6.84)
sidebar_position: 0
sidebar_label: Release notes
---

# What's in this version (v1.6.84)

A plain-language summary of what changed in v1.6.84. **This is an archived older version.** If you are on the current release, use the version dropdown at the top right and switch to "latest".

## What's new

### One more place to look up film information (TMDB)

TMDB is a public film and TV database. Once connected, AMMDS can look up titles, descriptions, cast and posters by the film's ID number, and fill the results into your library automatically.

Open **Integrations → TMDB**, turn it on, paste the access token the website gives you, and press **Test** to check that it works.

> **Access token**: a long string of characters the website gives you to prove the request is yours. You get it after registering on TMDB. No technical knowledge needed.

### Fill in the gaps without rearranging anything

Previously, an organizing task would re-sort your files. This version adds a **"fill in the gaps"** mode:

- Folder and file names are **left exactly as they are**.
- Only missing covers, backdrops, stills and the small information files are added.
- Existing images are replaced only when a clearly better one is found.
- Existing information files get missing fields added; anything you edited by hand is kept.

> **Information file (NFO)**: a small text file stored next to the video. Players such as Emby and Jellyfin read it to show the title, cast and description. You never need to open it yourself.

### More interfaces for other programs

New public endpoints were added for tags, actors, news, novels, online search and system checks. If you only use the web page or the mobile app, you can skip this.

## What was fixed

- The standalone version that needs no Java installed (the single-file Windows / Linux build) sometimes showed blank pages or just `{}`. Fixed.
- A batch of unused old files was removed, making the program smaller.

## Where to get it

| Device | How |
| --- | --- |
| FnOS | Offline package from the app store |
| Windows 10 / 11 | Windows offline installer (AMMDS Launcher) |
| QNAP | Offline package from the App Center |
| Docker | Update the image as usual |

## Before you upgrade

- **No data format changes.** Replace the program the way you normally do; your library, accounts and settings stay intact.
- After upgrading, open **System → System Check** once to confirm everything looks fine.
- If the page still looks like the old one, hard-refresh your browser with `Ctrl` + `F5`.
