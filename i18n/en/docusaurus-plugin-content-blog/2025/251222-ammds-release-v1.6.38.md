---
slug: ammds-release-v1.6.38
title: Release AMMDS v1.6.38 — ThePornDB Rankings and Stash Search
authors: [ms]
tags: [ammds, release, feature]
date: 2025-12-22
---

# Release AMMDS v1.6.38 — ThePornDB Rankings and Stash Search

AMMDS v1.6.38 adds ThePornDB rankings integration, Stash media library search and image proxy support, further enriching the toolchain of the Western film ecosystem.

{/* truncate */}

## ThePornDB Rankings

A new **ThePornDB rankings** integration has been added, providing users with ranking information for Western film and TV content:

- **Trending**: shows the current rankings of popular Western film and TV content
- **Category rankings**: subdivided rankings by category to help users discover specific types of content
- **Regular updates**: automatically syncs the latest ranking data from ThePornDB
- **Ranking details**: clicking a ranking entry takes you directly to the corresponding film or TV detail page to view the full metadata

## Stash Search

Support for searching the **Stash** media library has been added, opening up the data channel between AMMDS and Stash:

- **Stash film and TV search**: directly search film and TV resources in the Stash media library
- **Stash actor search**: search related works in Stash by actor name
- **Cross-library integration**: merges Stash search results with results from AMMDS's own data sources for a one-stop search experience

## Image Proxy

**Image proxy** support has been added:

- Solves display issues caused by hotlink protection on some sites
- Supports configuring a custom image proxy address
- Automatically falls back to a placeholder image when loading fails, avoiding broken page layouts
- Improves the loading stability of media library covers and thumbnails

## Bug Fixes

- Fixed delayed updates of ThePornDB ranking data in certain time zones
- Fixed some Stash search results not displaying correctly
- Fixed image proxy settings not taking effect
- General stability improvements and performance optimizations

---

## Keep reading

- [Release AMMDS v1.6.36 — Jav and Western Multimedia Search](../2025/251218-ammds-release-v1.6.36.md)
- [AMMDS vs Stash: A Comprehensive Comparison of Content Management Tools](/blog/ammds-vs-stash)
