---
slug: media-server-landscape
title: "The Story of Three Mainstream Media Servers: Plex, Emby and Jellyfin"
authors: [studio]
tags: [ammds, comparison, feature]
date: 2023-10-08
---

While building AMMDS, we were repeatedly asked one question: "How are you different from Plex, Emby and Jellyfin?" To answer it, we first need to explain where these three products came from — their divergence is really a microcosm of open source versus commercialization.

{/* truncate */}

## One origin, three different paths

Many people don't know that these three media servers are, by lineage, one family:

- **Plex** originated around 2008 as a fork of XBMC (which later became Kodi), taking a commercial route;
- **Emby** began as MediaBrowser and operated for a long time as an open-source project, but around 2018 shifted to a commercial-first model;
- **Jellyfin** was forked by the community in December 2018, based on the last open-source release of Emby (version 3.5.2).

The reason for the fork was straightforward: when Emby closed its source code and moved features such as hardware transcoding into the paid Emby Premiere tier, some community members felt this had departed from the original intent, so they took over the last open-source codebase and started fresh.

## Three business models

| Product | Model | Key features |
| :--- | :--- | :--- |
| Plex | Commercial software (free + Plex Pass subscription) | Extremely wide client coverage, polished experience; some advanced features are paid, with a strong reliance on official services |
| Emby | Hybrid model (limited open source + Emby Premiere subscription) | Somewhere in between, with richer server-side settings |
| Jellyfin | Fully free and open source (GPL) | No paywall, no account, no telemetry; hardware transcoding and more are all free |

Jellyfin's website sums its one-line summary up clearly: "Your media, your server, your way." It runs no central server that collects data about users, and does not require account registration.

## What this means for AMMDS

Understanding this history explains why AMMDS lists all three as sync targets rather than picking just one:

- They are the **playback and display** layer — responsible for putting the poster wall on your TV;
- AMMDS is the **organizing and data** layer — responsible for recognizing films, filling in metadata, and generating a standardized file structure.

The two are partners, not replacements. One handles display, the other handles organizing. And precisely because Jellyfin is fully open source and has no account system, it has become the default choice for many self-hosted users — which is why we place "sync to Jellyfin" at the core.

> Note: The product positioning above is compiled from publicly available information about each project; features and licensing models may change between versions, so refer to each official website.

---

## Keep reading

- [Before the project began: what problem were we really trying to solve](/blog/project-inception)
- [Tech stack decision: why we ended up with Java SpringBoot + Vue3](/blog/tech-stack-decision)
- [Docs: Integrating media servers](/docs/integration/media-server)
