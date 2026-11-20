---
slug: first-prototype
title: "The First Prototype: From a Single Scraping Script to Something That Runs"
authors: [studio]
tags: [studio, ammds, feature]
date: 2023-12-28
---

In the last week of 2023, the first working prototype of AMMDS was born. Viewed from today, it was so crude that we're almost embarrassed to talk about it — but it was this prototype that confirmed the most important thing: this path works.

{/* truncate */}

## The prototype did only three things

Back then AMMDS had no interface, no plugin marketplace and none of today's fancy features. It could only do three things:

1. Scrape the torrent list from a single site;
2. Parse the metadata in the torrents;
3. Generate the most basic NFO files.

Just these three steps. But they ran an entire pipeline from start to finish — from "a messily named file on the drive" to "a record a media server can recognize".

## Why start with the simplest pipeline

During the prototype stage, we deliberately suppressed the urge to "build everything". The reasons were practical:

- **Validate the core hypothesis**: if even the most basic pipeline of fetching data from a site, parsing it and writing NFO didn't work, all the grand plans that followed would be castles in the air.
- **Expose unknowns early**: site page structures, metadata fields and NFO format details are problems that only surface when you actually write code — the sooner you meet them, the better.
- **Give the architecture a proving ground**: the plugin engine, pipeline-style data processing and virtual-thread-based scheduling — designs we kept using later — were first forced out in this prototype.

## The code that got rewritten

Looking back today, much of the prototype's code has been rewritten several times over:

| Prototype stage | Current approach |
| :--- | :--- |
| Hardcoded parsing for a single site | Pluggable site adapters |
| One-off processing flow | Pipeline-style data processing |
| Synchronous sequential execution | Virtual thread scheduling |
| Fixed NFO template | Automatic adaptation to multiple formats |

The code was replaced, but **the direction of the architecture didn't change**. That's the most valuable thing the prototype left us — it let us confirm our technology choices were right before investing more resources.

## How it felt when it finally worked

The night the prototype ran through completely for the first time, we stared at the NFO file generated on the screen for a long time. It wasn't perfect — fields were still missing and the layout was hardly pretty. But it was a program we wrote ourselves, recognizing a film out of a pile of messy data and organizing it into structured information.

At that moment we were sure: this was worth continuing.

Everything that followed — from the architectural refinements of 2024 to the v1.0.0 release in 2025 — began with this unassuming prototype.

---

## Keep reading

- [AMMDS: From Concept to Reality — The Birth of a Product](/blog/ammds-concept-to-reality)
- [How the Plugin Architecture Was Designed](/blog/plugin-architecture)
- [Why We Insist on a Web Panel First](/blog/web-panel-first)
