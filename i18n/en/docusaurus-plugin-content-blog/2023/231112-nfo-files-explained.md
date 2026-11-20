---
slug: nfo-files-explained
title: What Exactly Is an NFO File?
authors: [studio]
tags: [ammds, feature, guide]
date: 2023-11-12
---

If you've used Kodi or Jellyfin, you've surely seen the `.nfo` files in your film directories that share the same name as the videos. They look utterly ordinary, yet they are the most crucial piece of a "common language" in the entire self-hosted media library ecosystem.

{/* truncate */}

## Name and nature

NFO is short for "Info" (information). It is not a proprietary format — at heart it's an **XML text file**, using pairs of tags to record the film's title, synopsis, cast, release year and other information.

The file itself doesn't "do" anything; it just stores information. But because it's plain text with a uniform structure, different software can all read it. Kodi's official Wiki defines it as "one way to import metadata into the library": during a scan, if a correctly named NFO file exists in the media directory, Kodi reads it first rather than scraping online.

## Three kinds of NFO

Many people assume there's only one kind of NFO, but by content they fall into three categories:

| Type | What it contains | Purpose |
| :--- | :--- | :--- |
| Metadata NFO | A complete set of film information tags | Most common; imports metadata directly |
| Resolver NFO | Just a URL pointing to a database entry | Tells the scraper "this is the one I want — don't get it wrong" |
| Hybrid NFO | URL + a few override fields | First scrapes by URL, then overrides a few fields such as title and runtime |

Resolver NFOs are especially useful. Say a film has dozens of same-titled versions on the same site and automatic matching keeps getting it wrong — dropping in an NFO containing only the correct URL forces the right match. This is the same class of problem we had to handle when building [manual matching](/blog/nfo-compatibility).

## A few easy-to-miss details

- **Encoding**: Always save NFO files as UTF-8. Windows Notepad may default to ANSI, which garbles non-English characters.
- **Naming**: It normally matches the video file's name (e.g. `Jumanji.mp4` goes with `Jumanji.nfo`); TV series use `tvshow.nfo`, and albums use `album.nfo`.
- **Refresh after changes**: After the library has been scanned once, the NFO steps back into a backup role. If you change the file's contents, you need to manually refresh that record for it to be read again.
- **Universality**: Not just Kodi — Plex, Emby, Jellyfin, TinyMediaManager and others can all recognize Kodi-format NFOs. That's exactly its value: one file, usable in many places.

## Why AMMDS cares about it

We built NFO compatibility because of exactly this "portability": the material a user organizes with AMMDS stays safe if they one day switch players or reinstall the system, as long as the NFO files remain. This is the same thinking behind our commitment to [self-hosting](/blog/why-self-hosted) and [standard backup packages](/docs/backend/system/backup-restore) — **your data must be able to leave with you**.

> Note: The definitions and categories of NFOs in this article are compiled from Kodi's official Wiki; for specific tags and naming rules, refer to Kodi's documentation.

---

## Keep reading

- [The Pitfalls of NFO Compatibility with Kodi, Jellyfin and Emby](/blog/nfo-compatibility)
- [The Story of Three Mainstream Media Servers: Plex, Emby and Jellyfin](/blog/media-server-landscape)
- [Docs: Organizing your media library](/docs/backend/media/organize)
