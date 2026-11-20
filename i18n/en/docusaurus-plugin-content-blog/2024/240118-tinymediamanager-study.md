---
slug: tinymediamanager-study
title: "Learning from TinyMediaManager: What a Mature Scraping Tool Gets Right"
authors: [studio]
tags: [ammds, comparison, feature]
date: 2024-01-18
---

When researching similar tools at the project's inception, TinyMediaManager (TMM for short) was one we studied repeatedly. It's a free, open-source media management tool written in Java that runs cross-platform on Windows, Linux and macOS. It's not our competitor — it's an excellent "textbook".

{/* truncate */}

## What it actually does

TMM's core positioning is: **help you organize your local media library and prepare the metadata, covers and file structure** for media centers such as Kodi, Plex, Emby and Jellyfin. In other words, it sits at the same layer of the ecosystem as AMMDS — both are about "organizing", not "playing".

Judging by its public feature list, several things are done very solidly:

- **Multi-source scraping**: supports multiple metadata sources including IMDb, TheMovieDB, TVDb, OFDb, Moviemeter and Trakt;
- **Artwork downloading**: posters, backdrops, logos, and fan art from FanArt.tv;
- **Subtitles**: scraped from OpenSubtitles.org;
- **Technical information**: uses the MediaInfo library to extract encoding, runtime, resolution and more, writing them into the NFO;
- **Batch renaming**: automatically organizes filenames and directories according to user-defined formats;
- **NFO output**: all information is automatically written into Kodi-compatible NFO files;
- **Two interfaces**: both a graphical interface and a command-line interface.

## Three things worth learning from

### First, data isn't locked into the software

TMM writes everything into NFO files rather than locking it in its own proprietary database. We strongly agree with this — **user data must be portable**. This is the fundamental reason AMMDS insists on standard NFOs and standard backup packages.

### Second, multiple sources + manual correction

It supports multiple metadata sources while allowing users to manually edit any field. This combination is key: automatic scraping handles efficiency, manual correction handles accuracy. When we later built the [priority rule engine](/blog/plugin-architecture), we followed the same line of thinking.

### Third, cross-platform comes from the JVM

TMM is a Java application that depends on the Java runtime (at least JRE 8), so it's naturally cross-platform. This confirms our judgment in the [tech stack decision](/blog/tech-stack-decision) to value the Java ecosystem — except we chose to bundle the runtime with GraalVM as well, so users don't even need to install a JRE.

## How we differ from it

TMM is a desktop application, whereas AMMDS has been **self-hosted with a web panel** from the start, running on a NAS or always-on device and accessed through a browser. That's a difference in product positioning, not a matter of better or worse — if you just want to organize a folder on your own machine, TMM is a great fit; if you want every device in the household to manage the media library at any time, you need a service like AMMDS.

Standing on the shoulders of giants is how we avoid detours. Many practices validated by TMM are reflected in AMMDS's design today.

> Note: The feature descriptions in this article are compiled from TinyMediaManager's public project documentation; for specific features and licensing, refer to the official project.

---

## Keep reading

- [The Story of Three Mainstream Media Servers: Plex, Emby and Jellyfin](/blog/media-server-landscape)
- [What Exactly Is an NFO File?](/blog/nfo-files-explained)
- [Tech stack decision: why we ended up with Java SpringBoot + Vue3](/blog/tech-stack-decision)
