---
slug: subtitle-formats-explained
title: "SRT, ASS or Muxed: A Thorough Guide to Subtitle Formats"
authors: [studio]
tags: [ammds, feature, guide]
date: 2024-05-22
---

Subtitles seem like a minor issue — until a file won't load, Chinese text turns into question marks, or all styling is lost. These problems almost all come down to one thing: different subtitle formats differ greatly in capability. This article lays out the common formats once and for all.

{/* truncate */}

## Three text subtitle formats

| Format | Full name / origin | Features | Best for |
| :--- | :--- | :--- | :--- |
| SRT | SubRip Text | The most universal; plain text with sequence number + timecode + text; virtually no styling support | General distribution, translation exchange, when you don't know the other party's player |
| WebVTT | W3C web standard | Structure close to SRT, with periods in timestamps; supports positioning and simple styling | HTML5 web playback, streaming platforms |
| ASS / SSA | Advanced SubStation Alpha | The most capable: fonts, colors, outlines, positioning, karaoke, animation | Fansubbing groups, subtitles needing typographic effects |

The reason SRT works "almost everywhere" is precisely its simplicity — just timings and text. It uses a comma to separate milliseconds (`00:00:01,500`), while WebVTT uses a period (`00:00:01.500`) and the file must begin with a `WEBVTT` line. This comma-versus-period difference is the most common source of conversion errors.

ASS is powerful, but the price is compatibility: it depends on the fonts being present and the player having a complete implementation. VLC, mpv and MPC-HC support it well; many web players don't recognize it at all. When converting ASS to SRT, all colors, positioning and animation are lost — only the text remains.

## Three ways subtitles can exist

Easier to overlook than the format is "where the subtitles live":

- **Sidecar**: a separate `.srt` / `.ass` file placed beside the video and loaded by the player at playback. The advantage is you can toggle it on/off and switch languages; the downside is the file has to travel with the video;
- **Muxed**: subtitles are remuxed into the MKV / MP4 container as a track. They travel with the file, can still be switched and turned off, and don't require re-encoding the video;
- **Burned-in (hard subtitles)**: subtitles are burned directly into the picture's pixels. Everyone can see them, but they **can't be turned off, changed or translated**, and require re-encoding.

Unless it's a social platform that autoplays muted, avoid hard subtitles — keep subtitles as a separate or muxed track so viewers have a choice.

## Two common pitfalls

**Encoding**: Chinese text or accented characters turning into question marks is almost always because the file was saved in an old encoding such as Windows-1252. Save everything as UTF-8, preferably without a BOM — a BOM at the start of an SRT will make some players refuse to load the first subtitle.

**Renaming**: sidecar subtitles usually need the same name as the video to be recognized automatically — `Film.mkv` goes with `Film.srt`. During batch organizing, keeping the subtitle files' renaming rules consistent with the video is the key to avoiding "missing subtitles".

## The relationship with AMMDS

When AMMDS organizes a media library, the naming, encoding and storage method of subtitles all affect whether the media server can match them correctly. Understanding these formats shows why we emphasize a standardized directory structure — it's not just for looks; it lets players automatically find the matching subtitles.

> Note: The format details in this article are compiled from publicly available subtitle format guides; for specific compatibility, refer to the player you use.

---

## Keep reading

- [What Exactly Is an NFO File?](/blog/nfo-files-explained)
- [Hard Links: One File, Two Names, No Double Storage](/blog/hardlinks-explained)
- [Docs: Organizing your media library](/docs/backend/media/organize)
