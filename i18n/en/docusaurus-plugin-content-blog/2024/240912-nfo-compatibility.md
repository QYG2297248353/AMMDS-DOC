---
slug: nfo-compatibility
title: The Pitfalls of NFO Compatibility with Kodi, Jellyfin and Emby
authors: [studio]
tags: [ammds, feature, guide]
date: 2024-09-12
---

The NFO file is the "ID card" of a media library — players use it to recognize a film. But you may not know that Kodi, Jellyfin and Emby don't have exactly the same requirements for the NFO format. This article talks about the pitfalls we hit while working on compatibility.

{/* truncate */}

## Simple on the surface, different underneath

In an ideal world, NFO would be a single format that every player reads the same way. The reality is:

- The core fields of the three are broadly the same (title, synopsis, cast, release year, etc.);
- But there are subtle differences in field naming, date formats, nested structures and special-character escaping;
- Some players are tolerant of missing fields, others simply ignore the whole file.

For users with media libraries of tens of terabytes, inconsistent formats mean a lot of rework — the metadata you carefully scraped may display incompletely in another player.

## Our decision: be compatible with all mainstream formats at once

There's always been debate in the community about "whose NFO format to use". Our choice was not to take sides:

> Be compatible with all mainstream formats at once; users can pick the target format in settings and the system adapts automatically.

This required an abstraction layer at the data model level — the same metadata can be rendered into different NFO files using different templates. The cost was writing some extra conversion logic; the payoff is that users don't have to convert formats between tools.

## Three specific pitfalls

### Pitfall one: the structure of the cast field

The nested structure of cast information is written differently by each. Some accept a simple list of names, others require a full structure with role information. If you hardcode one of them, it may show up empty in the other.

### Pitfall two: date and ID formats

The way release dates are written and where the video ID is stored also follow different conventions. A format that's correct in A may be parsed as something else in B. Our approach is to offer formatting options on the outside while storing everything in a standard structure internally.

### Pitfall three: special-character escaping

Characters like `<` and `&` in a synopsis, if not escaped, will break the NFO's XML structure and invalidate the whole file. These are the hardest problems to track down, because on the surface the file is "right there" — the player just doesn't recognize it.

## Advice for users

If you use multiple players, here are two pieces of advice:

1. **First confirm the target format in settings**, then scrape in bulk, to avoid redoing everything afterward;
2. **After changing the format, run a small-scale check** — try a few films to confirm the new format displays properly in your usual player, then roll it out.

NFO compatibility is unglamorous but critical foundational work. It doesn't produce new features, yet it determines whether the material you organize can truly "come alive".

---

## Keep reading

- [AMMDS: From Concept to Reality — The Birth of a Product](/blog/ammds-concept-to-reality)
- [How the Plugin Architecture Was Designed](/blog/plugin-architecture)
- [Docs: Media Library and NFO Organizing](/docs/backend/media/organize)
