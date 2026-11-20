---
title: Overview
sidebar_label: Overview
description: A plain-language explanation of what AMMDS does, what it doesn't do, and where to start.
sidebar_position: 0
---

# Overview

AMMDS is a **film library you keep on your own device**. Point it at a drive full of messily named videos, and it works out which film each one is. Then it adds the cover, description, cast and tags. The result is one library you can browse and search.

Everything stays on your own machine. You don't need a cloud account.

:::warning[Before you use it]
AMMDS is an offline product. You add and maintain the data yourself. Please follow the laws of your region. Do not promote this product within mainland China, and use the abbreviation `AMMDS` when you discuss it.
:::

:::note[About internet access]
The app opens fine without internet. Three things do need it: looking up film information, searching for resources and sending notifications. When you switch on an external service, you agree to let the app contact that website in the way you configured.
:::

## What it does for you

| The problem | What AMMDS does |
| --- | --- |
| Messy filenames, one film written several ways | Reads the ID number and merges them into one record |
| Finding covers and writing descriptions by hand | Fills in covers, descriptions, cast and tags for you |
| Want a tidy poster wall on the TV | Sends the finished data to players like Jellyfin and Emby |
| Searching, downloading and filing live in different apps | One flow: search, subscribe, send to the downloader, put it in the library |
| Comics and novels to manage too | Built-in reader that remembers your place |
| Something breaks after weeks of running | Task history, logs and both checks are all in one place |

## What it doesn't do

These limits matter more than any sales pitch:

- **It doesn't supply your video files.** You put the files on the disk; it recognises and organises them.
- **It isn't a player.** For playback on a TV you still need Jellyfin, Emby or similar.
- **It doesn't upload your files to someone else's server.** Data stays local. Only the external services you switch on are contacted.
- **The docs only describe features that exist.** If a button mentioned here is missing, check which version you are running first.

## Who it's for

**A good fit**: you already have a pile of film or comic files and want them organised long term. You don't mind ten minutes of setup.

**Probably not**: you just want to click a file and watch it, or you don't want to configure anything. Even so, three first steps are unavoidable: choose an install method, sign in, and tell the app where your files live.

## Start in three steps

1. **Install it**: pick the method that suits your device in [Choose an install method](./getting-started/overview.md).
2. **Open it for the first time**: follow [First launch: sign in and basic setup](./getting-started/first-login.md).
3. **Organise your first batch**: walk through [Organise your first films in ten minutes](./getting-started/first-library.md).

Any unfamiliar word is explained in [Words you might not know](./glossary.md). If something goes wrong, start with [Common questions](./faq.md). To ask other users for help, the community links are at the bottom of this page.

## How the docs are arranged

| What you want | Where to look |
| --- | --- |
| Haven't installed it yet | Quick Start |
| Understand every menu in the admin area | Admin |
| Connect a data site, downloader or player | Integrations |
| Let family and friends browse your library | Public Site |
| Let another program read your data | Open Platform |
| Change the port, upload size and other startup settings | Quick Start → Environment Variables |
| Upgrading from an older version | Upgrade Guide |
| Look up what a term means | Glossary |
| Something looks wrong | FAQ |

Admin and Integrations follow the app's menus. That means the names on screen are almost always the chapter names in the docs.

## Words you'll see a lot

> **Scraping**: a scraper looks up a film's cover, description and cast on a data site, then fills them in for you.

> **ID number**: the film's identification code, usually in the filename. The app uses it to recognise the film.

> **Library**: the tidy, searchable list of films you end up with.

> **Setting**: something you fill in or switch on. Every one comes with an explanation.

The full list is in [Words you might not know](./glossary.md). Every page that asks you to fill something in also has a settings table.

## Community and feedback

- Website: https://ammds.lifebus.top/
- GitHub: https://github.com/QYG2297248353/AMMDS-Docker
- Telegram channel: https://t.me/ammds_official
- Telegram group: https://t.me/+9bvCp3LqLUo1N2Q1
- Discord: https://discord.gg/sxkpPZzPeJ
- QQ group: https://qm.qq.com/q/ZTXsLnEAM4

Report issues and suggestions on GitHub: https://github.com/QYG2297248353/AMMDS-Docker/issues/new
