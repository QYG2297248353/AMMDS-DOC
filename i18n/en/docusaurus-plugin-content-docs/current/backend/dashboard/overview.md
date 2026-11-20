---
title: "Your home screen: what you see when you open AMMDS"
sidebar_label: Dashboard
description: What each card on the first screen shows, where its numbers come from, and what the three leaderboards are for.
sidebar_position: 1
---

# Your home screen: what you see when you open AMMDS

Signing in lands you on 工作台（Home）. One screen shows disk space, media counts, weather, network and version info. Below it are three leaderboards: your viewing history, new releases and site accounts. This page explains what each number means and what to check first when something looks wrong.

## Before you start

> **Home screen**: the page that opens by default after sign-in. It puts the things you check often on one screen.

> **Leaderboard**: a ranking or set of figures worked out by one rule. The three here use different data and don't affect each other.

> **Silent refresh**: the page fetches fresh numbers by itself every so often; there is nothing for you to click.

The cards always come in the same order: storage, media counts, weather, network info, system info, AMMDS service status and support. On a narrow screen they stack into full-width rows.

## Reading the cards

### Storage

A ring on the left, two figures on the right.

| What you see | What it means |
| --- | --- |
| Total space | Total disk capacity of the machine running AMMDS. Linux and containers count the filesystem holding the data folder; Windows adds up every drive |
| Film space | Combined size of every film already in the library. Excludes comics, novels and files still downloading |
| Used / free | How much of the disk is used and how much is left — the two segments of the ring |

Refreshes on its own every 10 seconds.

### Media counts

Five numbers in a row: favourite films, favourite actors, film subscriptions, comics (album count), novels. Also refreshed every 10 seconds. A 0 doesn't mean something broke; it just means there is no such data yet.

### Weather

Icon, temperature, conditions, wind direction and force, province and city.

- The city comes first from the code you set in 集成应用 → 高德地图（Integrations → Amap）: `adcode`, a 3–6 digit number identifying a city.
- If unset, the app looks up its public IP and converts it into a city.
- If you haven't enabled your own Amap setup, it uses a built-in key and weather still works.

> **Proxy**: instead of connecting to a site directly, the app asks another server to fetch it. When a direct connection fails, it switches to the proxy automatically.

On failure the card shows 天气信息加载失败（Weather failed to load）and a 重试（Retry）button.

:::note[Weather needs internet]
Weather relies on the Amap service. If a direct connection fails, the backend forwards the request; only when both routes fail does it show an error. In that case start with [No internet? Start here](./network.md).
:::

### Network info

This card shows the public address as seen from the server, the kind of connection in use, the location and whether a proxy is set. Its popup also has a 连通性（Connectivity）tab. That tab tests each public site the app uses, one by one. The rules and troubleshooting have their own page: [No internet? Start here](./network.md).

### System info

Four lines by default, so you can check versions at a glance.

| Line | What it says |
| --- | --- |
| Java version, Spring Boot | Versions of the underlying runtime the app depends on; ignore these day to day |
| AMMDS core version | AMMDS's own version — this is the one to check for updates |
| OS | Operating system and architecture; inside a container it shows `Docker` |

> **Container**: a way of running the app bundled with everything it needs inside an isolated box. Inside it, the OS is always recorded as `Docker`.

Click anywhere on the card to open 系统信息详情（System info details）. It has two parts:

- **Server info**: app name and description, the three versions, runtime and vendor, OS and architecture, processor cores, memory in use, uptime, server time and timezone, listening address, developer and website, contact email.
- **Browser info**: browser identifier, platform, language, timezone, screen and window size, pixel ratio, logical cores, device memory, network status, Cookie support and current address.

This is fetched once, when you open the home screen, and reused in the popup. These four lines do not refresh on a timer.

### AMMDS service status

Six numbers, all covering the last 24 hours:

| Metric | Meaning |
| --- | --- |
| Online users | Visitors online right now |
| Page views | Page views in the last 24 hours |
| Unique visitors | Unique visitors in the last 24 hours |
| Visits | Visits in the last 24 hours |
| Bounce rate | Bounce rate in the last 24 hours |
| Average visit time | Total visit time divided by visits, shown in days / hours / minutes / seconds |

:::warning[This isn't your machine]
These come from AMMDS's official stats service and describe traffic on the **official website**, not your own AMMDS. They refresh every 10 seconds and may all show 0 if the stats service is unreachable. For your machine's CPU, memory, disk, database connection and plugin status, use 系统检查（System check）; for its ports, versions and listening address, see the 系统信息（System info）card above.
:::

### Support

A clickable image that opens the official store in a new tab. It isn't counted anywhere and affects nothing.

## Three leaderboards, three jobs

All three sit under the dashboard, use completely different data, and you can enable only some of them.

### Want to see how much you've watched — 巅峰榜单（Peak chart）

> **Media server**: software like Jellyfin or Emby that holds your files and streams them to TVs and phones.

Play history comes from the Jellyfin and Emby integrations. Once the plugin is on and a user is bound, AMMDS copies play history into local storage every 5 minutes. The chart counts only the **bound user**; it does not read the media server's own reports.

| Area | Content |
| --- | --- |
| Top stats | Play count, total watch time (minutes), daily average (min / day), days covered |
| Play trend / watch time | Bar and line charts of per-client watch time and totals by day |
| Play source split | Pie chart of watch time grouped by client |
| Monthly calendar | Each day's heat this month; darker means more watched |

The 7 天 / 14 天 / 30 天（7 / 14 / 30 days）buttons at the top right change both the top stats and the trend chart. The default is 14 days.

Easy-to-misread rules:

- Days are grouped by a record's **start time**, written as `yyyy-MM-dd`.
- A record with no end time counts as unfinished and is left out of daily stats.
- Days with no records still appear (value 0), so "days covered" equals the range you picked.
- The top "play count" is converted from watch time: one per full 10 minutes, rounded up. It is not the number of records.
- The play count inside the monthly calendar is the number of records, a different measure; hovering shows both.

:::note[Blank? Check the binding first]
If the page is empty, go to 集成应用 → Jellyfin / Emby（Integrations → Jellyfin / Emby）and confirm the plugin is on, the address and key connect, and a user is bound. 系统检查（System check）also shows whether the plugin is enabled and configured.
:::

### Want recent new releases — 电影榜单（Film chart）

> **Metadata**: a film's cover, description, cast, tags and similar descriptive info.

> **ID number**: the identification code usually in the filename; the app uses it to recognise a film.

A background timer collects data from integration plugins into local storage. The page only reads local data; it never fetches from the source sites when you open it.

| Source | Where it comes from | What must be on to collect |
| --- | --- | --- |
| ThePornDB | ThePornDB's "recently updated" feed | 启用状态（Enabled）and 榜单采集（Chart collection）both on, with the service address and API Key filled in |
| Fanza DMM | FANZA DMM's dated chart | 启用状态（Enabled）and 榜单采集（Chart collection）both on |

Collection runs in the background, so you do not click anything:

- ThePornDB: first run about 8 minutes after startup, then every 6 h 10 min; at most 10 pages of 20 items per run, deduplicated by "upstream ID + chart type" so nothing enters twice.
- Fanza DMM today's new releases: first run about 10 minutes after startup, then every 6 h 15 min; a day that already has data is skipped.
- Fanza DMM coming soon: first run about 10 minutes after startup, then every 13 h 30 min; it only fills dates in the next 3 days that have no records yet.

How to use the page:

1. Pick the source at the top: **ThePornDB** or **Fanza DMM**.
2. Pick a category: ThePornDB has Jav即将上映（JAV coming soon）and 欧美即将上映（Western coming soon）; Fanza DMM has 今日上新（Today's new）and 即将上映（Coming soon）.
3. Cards are newest-first by release date, at most 30. Each has a cover, ID number, release date, title, cast and still count.
4. The button at the top right of each card shows its state:

| Button | Meaning |
| --- | --- |
| 完成（Done） | This ID is already in the library; the button can't be clicked |
| 订阅（Subscribe） | Not subscribed yet; clicking submits a subscription and the backend fills in the film info |
| 已订阅（Subscribed） | A subscription already exists; the button can't be clicked |

:::tip[After you subscribe]
Subscribing creates a subscription record and fills in the film info in the background. The subscription and download flow then looks for matching resources. If nothing moves for a long time, check the downloader plugin and site settings first, then the subscription status.
:::

### Want site account status — PT 站点榜单（PT site chart）

> **PT site**: a resource site that needs an account and scores you by upload and download volume.

> **Seeding（做种）**: keeping a finished download open so others can get the file from you.

> **Ratio（分享率）**: uploads divided by downloads; sites usually require it to stay above a minimum.

> **Bonus points（魔力值）**: points a site awards for contributions such as seeding.

Data comes from the PT site accounts you have configured. It is pulled by site framework: M-Team, Rousi, FSM and NexusPHP-based sites. You do not need 站点认证（site authentication）first. As long as a site is configured and has synced data, it shows up.

| Metric | How it's counted |
| --- | --- |
| Total sites | Sites that have data |
| Total upload / download | Sum of each site's uploaded and downloaded bytes |
| Total seeding / downloading | Sum of each site's seeding and download tasks |
| Average ratio | Average across sites that have a ratio only |
| Total bonus points | Sum of each site's bonus points |
| Active sites | Sites with a login in the last 30 days |

Each site card shows a logo, name and framework tag. It also lists ratio, bonus points, upload, download, seeding count, download count, seeding time, download time, username and avatar. Warning / leech / level tags, registration date and last login appear too. Two buttons sit at the top right: 刷新（Refresh）for this site only, and 打开主页（Open homepage）. Refresh asks that site directly for fresh data; NexusPHP sites update by site ID.

Two more actions at the top:

| Button | What it does |
| --- | --- |
| 刷新数据（Refresh data） | Re-reads site data already stored locally; doesn't call the sites |
| 更新所有站点（Update all sites） | Makes the backend pull fresh data from every site one by one; slow |

The banner at the top shows when this page last refreshed or updated. It is just a timestamp in the page, not the time the server actually updated the data.

:::warning[Don't keep hitting update]
Clicking 更新所有站点（Update all sites）again and again sends request after request to each site and may get you flagged or temporarily banned. Unless you need live data, leave the default rhythm alone.
:::

### Which chart to use

| What you want | Chart |
| --- | --- |
| Your own watch time, habits and device split | 巅峰榜单（Peak chart） |
| Which new films are out, and whether they're in the library | 电影榜单（Film chart） |
| Ratio, bonus points and seeding across PT sites | PT 站点榜单（PT site chart） |

Watching stats need the media server plugin. New releases need metadata plugins. Site data needs site settings. The three are independent, so enabling just one works fine.

## Settings explained

| Setting | What to enter | If you leave it out or get it wrong |
| --- | --- | --- |
| Weather city code (`adcode`) | A 3–6 digit city number, set in 集成应用 → 高德地图（Integrations → Amap） | Unset: the city is guessed from your public IP. Wrong: weather shows another place |
| Custom Amap setup | Whether to use your own Amap configuration | Off: the app uses its built-in key and weather still works |
| Bound user (media server) | Pick the user to count in the Jellyfin / Emby integration | Missing or wrong: 巅峰榜单（Peak chart）has no data or wrong data |
| Time range (7 / 14 / 30 days) | Pick the range at the top right of 巅峰榜单（Peak chart）; default 14 days | Only affects top stats and the trend; a wrong pick won't damage data |
| Chart collection switch | In the film chart's plugin, turn on both 启用状态（Enabled）and 榜单采集（Chart collection） | If either is off, that source collects nothing and the page shows no new data |
| Service address, API Key | Both needed to collect ThePornDB chart data | Missing either: no ThePornDB chart collection |
| 订阅（Subscribe）button | Click it on a card that isn't subscribed | 完成（Done）and 已订阅（Subscribed）can't be clicked anyway; after subscribing, wait for the backend to fill in info |

## When something goes wrong

- Storage here disagrees with 存储管理（Storage management）because they measure different things. This card counts the whole disk plus the film files. Storage management splits first-level folders under `data/` and `db/`.
- Media counts stuck at 0: check whether you actually have favourites, subscriptions, comics or novels. On a fresh install, 0 is normal.
- Wrong weather city: set the right city code in 集成应用 → 高德地图（Integrations → Amap）, or turn off the custom city and let it locate by public IP.
- AMMDS service status all 0: the official stats service is unreachable. It has nothing to do with your own machine — no action needed.
- A blank chart: check the bound user for 巅峰榜单（Peak chart）, the collection switch and plugin settings for 电影榜单（Film chart）, and whether the site is configured and synced for PT 站点榜单（PT site chart）.

## Next

- [No internet? Start here](./network.md)
