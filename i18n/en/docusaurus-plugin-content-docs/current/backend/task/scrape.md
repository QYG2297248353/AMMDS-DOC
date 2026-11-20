---
title: "Scraping: filling in film details"
sidebar_label: Metadata Scraping
description: Add covers, descriptions, cast and tags to scanned films, generate info files and images, and file everything by your format — including gap fill and every scraping setting.
sidebar_position: 2
---

# Scraping: filling in film details

Scanning only registers files. Scraping is what makes AMMDS work out "which film is this". It then adds the cover, description, cast and tags, generates info files and images, and puts files where your format says. This page covers how to start, where the data comes from, what files appear, and what to do when it stalls. It also covers gap fill and every scraping setting.

## Before you start

> **Scraping**: the app looks up a film's cover, description and cast on a data site and fills them in for you.

> **Metadata**: a film's cover, description, cast, tags and similar descriptive info.

> **ID number（番号 / 识别码）**: a film's identification code, usually in the filename. The app uses it to recognise the film.

> **NFO**: a small info file kept beside the video that records the title, cast and so on. Players read it too.

> **Scraper**: one source that can look up film data — a data site, or data already stored on your machine. Tick several and the app queries them together.

> **Concurrency**: several jobs running at the same time. Scrapers are queried together, so one stalling doesn't block the others.

> **Placeholder**: a marker wrapped in `{}` inside a format string, replaced with real content such as an actor name, ID number or title.

## Step by step

### 1. Get ready first

1. Enable at least one data-source plugin and tick it under 任务管理 → 任务配置 → 影视刮削规则 → 刮削器（Task management → Task config → Film scrape rules → Scrapers）.
2. Confirm scanning has registered the target files in 刮削入库（Scrape & file）and their paths are reachable; see [Scanning: let AMMDS find your files](./scan.md).
3. If you want automatic organising, confirm the target folder exists and is writable.
4. If you want NFO files and images, confirm the matching switches and fields are configured.

Scraping **doesn't depend on a downloader**. Downloaders only affect subscriptions and manual pushes, not metadata matching.

:::note[Only one at a time]
Only one scraping task runs at a time. Submitting again while one is running is refused with 重复执行 - 刮削任务运行中（"duplicate execution — scraping task running"）.
:::

### 2. Pick how to trigger it

Go to 任务管理 → 刮削入库 → 影视刮削（Task management → Scrape & file → Film scrape）(series use 剧集刮削（Series scrape）). You can choose:

| Entry | Scope | What it does |
| --- | --- | --- |
| 刮削整理（Scrape & organise） | All films awaiting scraping | Scraping plus file organising |
| 仅刮削（Scrape only） | All films awaiting scraping | Matches data and generates NFO and images only; no moving or renaming video |
| 选择整理（Organise selected） | The media you tick | Batch processing, at most 120 items per run |
| 自动刮削（Auto scrape） | At the configured interval | Films and series each have their own switch and interval; once on it checks the queue every 3 minutes by default |
| 查漏补缺（Gap fill） | A chosen task's source folder | After scanning, only fills in missing images and NFO, leaving folder structure alone; see its own section below |

### 3. Where the data comes from

刮削器（Scrapers）is a multi-select list. It offers these by default: `本地(默认)` (Local), `MetaTube(插件)` (MetaTube plugin), `ThePornDB(插件)`, `Stash(插件)`, `FANZA_DMM(插件)`, `M-Team_DMM(插件)`, `TheJavDB(插件)`, `R18Dev(插件)`, `TMDB(插件)`.

What actually happens:

1. Ticked scrapers search **concurrently**; one failing or timing out does not hold up the others.
2. Each source writes its matches into the local film library. The system then reads those local matches back.
3. When reading back, a ticked and enabled TMDB result is preferred. Otherwise JAV IDs go to MetaTube and Western IDs to ThePornDB.
4. Stash, FANZA_DMM, M-Team_DMM, TheJavDB and R18Dev are supplementary sources. Their hits also land in the local library, and the read-back step then finds records by ID number or file fingerprint.
5. If no ID-based source matched and TMDB is available, it tries one ordinary film match by "title + year".

:::tip[Use "local data first" for an already tidy library]
With 本地数据优先（Local data first）on, media that already has a binding is reused directly without going online. This only holds while the bound film still exists; a broken binding triggers a new search. It is good when you just want to fill missing fields without rerunning everything.
:::

:::warning[Sources have preferences too]
MetaTube doesn't support Western ID numbers; for those, enable ThePornDB or TMDB. Whether a source works also depends on the plugin being enabled, the site account being valid, and network connectivity.
:::

### 4. What gets filled in

After a match, the app writes the source's fields into the film record and adds derived info per your settings:

| Category | Content |
| --- | --- |
| Basic fields | Title, original title, description, release date, runtime, rating, director, studio, series |
| Cast | Actor names, aliases, portraits and film links; turn off 演员刮削（Actor scraping）to skip |
| Tags / categories | Per 自动标签（Auto tags）and 自动分类标签（Auto category tags）: resolution, studio, ID, release date, actors, mosaic, Chinese subtitles, cracked, and so on |
| Images | Poster, background, thumbnail, stills; optional high-res cover |
| Translation | With 字段翻译（Field translation）on, translates title / description and similar using the system translation setup |
| ID number | The ID and the completed number can be mixed in the output to suit different sites' naming |

NFO 字段（NFO fields）decides which tags are written into the NFO. By default it includes most fields, including the ID `num`. You can remove tags you do not need from the config.

### 5. Folder and filename after organising

Two format strings in 影视刮削规则（Film scrape rules）decide where files go and what they're called:

| Setting | Default | Meaning |
| --- | --- | --- |
| 整理目录格式（Folder format） | `${actor}/${number}` | Each `/` becomes one folder level |
| 整理文件名格式（Filename format） | `${number}` | Just the name body, no extension |

Placeholders include actor, ID number, title, date, year, month, day, mosaic, resolution, director, studio and more. Variants ending in `_safe` replace path separators with spaces. Click 帮助（Help）at the top of the panel for the placeholder list.

:::warning[Long names get cut]
Filenames over 200 bytes are truncated, and a relative folder path over 3600 bytes aborts organising. Piling too many placeholders into a format string hits this easily.
:::

### 6. What extra files appear

After scraping, the target folder may gain:

| File | Meaning |
| --- | --- |
| `<filename>.nfo` | Built from the NFO field config, named after the video |
| `<filename>-poster.jpg` | Cover; censored films aim for a portrait 2:3 |
| `<filename>-fanart.jpg` | Background; censored films aim for landscape |
| `<filename>-thumb.jpg` | Thumbnail; censored films aim for landscape |
| `<filename>.srt` | External subtitle; not overwritten if one already exists |
| `extrafanart/fanart1.jpg`… | Written when 刮削剧照（Scrape stills）is on; the folder name is configurable |

Whether a failed image download aborts organising is controlled by 允许图片下载失败（Allow image download failure）. With high-res covers on, high-res images are preferred. If a censored film's cover and background come out with swapped orientation, the app tries swapping the two files. If that still does not fit, fix it by hand with 海报裁剪（Poster crop）in the toolbox.

### 7. See how far each step got

查看步骤（View steps）in the 刮削入库（Scrape & file）list opens a timeline. It shows each round's steps, state, duration and error messages. Main steps: `文件校验` (file check), `番号识别` (ID recognition), `数据源检索` (source search), `元数据匹配` (metadata match), `演员刮削` (actor scraping) and `文件移动` (file move). During organising you also see `海报下载` (poster download), `背景图下载` (background download), `缩略图下载` (thumbnail download) and `NFO生成` (NFO generation). There are also special steps: `读取本地 NFO` (read local NFO), `手工绑定` (manual bind) and `查漏补缺` (gap fill).

The timeline is the authority on order. One film can have several rounds. Switch historical rounds at the top of the drawer, which shows the newest by default.

## Gap fill: only top up what's missing, don't touch the video

查漏补缺（Gap fill）is for when the data is basically complete and only a few images or the NFO are missing. It **doesn't change the folder structure or filenames and doesn't move video files** — it only fills in missing images and NFO.

Two common uses:

- The scan task's 整理模式（Organise mode）is set to 查漏补缺（Gap fill）: it tops things up right after scanning; see [Scanning: let AMMDS find your files](./scan.md).
- A previously scraped film is missing images or NFO: run 查漏补缺（Gap fill）on the task in 刮削入库（Scrape & file）to add only the side files.

Films that failed scraping stay 待刮削（awaiting scraping）and are never marked done automatically, so anything that still needs a retry has to be retried after the gap is filled.

## Every scraping setting

The rule panels are in 任务管理 → 任务配置（Task management → Task config）, split into 影视刮削规则（Film scrape rules）and 剧集刮削规则（Series scrape rules）. After editing, click 保存配置（Save config）to submit your changes. 刷新配置（Refresh config）discards unsaved changes and reloads. Each panel shows the fields it needs: text boxes, number boxes, switches or dropdowns.

### Film scrape rules

| Group | Settings |
| --- | --- |
| Data sources | Scrapers, local data first, brand prefix filter |
| Organising | Folder format, filename format |
| Metadata | Auto tags, auto category tags, field translation, ID mixing, actor scraping |
| NFO | NFO fields (which tags go into the NFO) |
| Images | High-res cover, scrape stills, stills folder, allow image download failure |
| Subtitles | External subtitle search |
| Performance | Multi-thread execution, max scraping threads |

### Series scrape rules

Series settings live on one tab: series scrapers (Local, TMDB, Bangumi, TheTVDB), auto-scrape interval, match threshold and weights, automatic season-mapping discovery, episodes per season, folder / filename formats, season poster naming, NFO fields, actor scraping, field translation, request interval and thread count.

## How series scraping differs

Series do not match by ID number. They match TMDB, Bangumi, TheTVDB and similar by title, year and season/episode structure. After scanning, confirm the groupings on the 剧集刮削（Series scrape）page first (merge, split, ignore). Only then is series metadata generated. On first use, confirm the grouping boundaries before adjusting the match threshold. Series folder and filename formats, season poster naming and NFO naming all live in 剧集刮削规则（Series scrape rules）.

## Settings explained

| Setting | What to enter | If you leave it out or get it wrong |
| --- | --- | --- |
| Scrapers (multi-select) | Tick at least one enabled data source | None ticked means no data found; a disabled plugin, invalid account or no connection does the same |
| Local data first | On or off | Off re-scrapes online even when a binding already exists |
| Brand prefix filter | Brand prefixes to filter as needed | A wrong value blocks valid IDs too, so nothing matches |
| Folder format | Default `${actor}/${number}`, built from placeholders | Empty or wrong values give you a folder layout you didn't want |
| Filename format | Default `${number}`, name body only | Wrong values produce wrong names; over 200 bytes truncates, a relative path over 3600 bytes aborts organising |
| Auto tags / Auto category tags | Whether to append resolution, studio, ID and similar tags | Off means those derived tags aren't added |
| Field translation | On or off, follows the system translation setup | Off means no translation; with translation unconfigured, on yields no translated text either |
| ID mixing | On or off | Off outputs only one ID spelling |
| Actor scraping | On or off | Off skips actor names, aliases and portraits |
| NFO fields | Which tags to write into the NFO | Removing a tag leaves it out of the NFO; the ID `num` is included by default |
| High-res cover / Scrape stills / Stills folder | Image switches and the stills folder name | Without high-res cover, ordinary images are used; without scrape stills, no `extrafanart` folder is written |
| Allow image download failure | Whether to keep organising when an image can't be downloaded | Off means one failed image can abort the whole run |
| External subtitle search | Whether to look for external subtitles | Off means no `<filename>.srt` is written; an existing same-named file is never overwritten |
| Multi-thread execution / Max scraping threads | Whether to use threads and how many run at once | Too many threads strain the machine and the sites; too few is slow |
| Auto scrape (separate switch and interval for films / series) | Turn on and set an interval; checks the queue every 3 minutes by default | Off means manual triggers only; too short an interval runs constantly |
| Organise selected | Tick the media to process | At most 120 items per run; split larger batches |
| Match threshold and weights (series) | How strict "same series" judging is, and each source's weight | Too strict matches nothing, too loose matches the wrong show; confirm grouping boundaries before tuning |
| Automatic season-mapping discovery / Episodes per season (series) | Whether mappings are discovered, and how many episodes per season | With discovery off you bind by hand; a wrong count breaks the season structure |
| Save config / Refresh config | Click Save config after editing | Not saving means no effect; Refresh config discards unsaved changes |

## When something goes wrong

- **"重复执行 - 刮削任务运行中"**: a scrape is already running. Wait for it or cancel it, then submit again.
- **Nothing filled in at all**: check that a scraper is ticked, the plugin is enabled and the site account is valid, then use the network check on the home screen to confirm the data sites are reachable.
- **Western films can't be found**: MetaTube doesn't support Western IDs — enable ThePornDB or TMDB instead.
- **ID recognised wrong**: click the ID tag in 刮削入库（Scrape & file）to edit it by hand, then scrape again.
- **No match, or images/NFO missing**: use 绑定（Bind）to search the library and bind by hand, then scrape; if only images or NFO are missing, use 查漏补缺（Gap fill）, which won't touch the video.
- **Organising stopped midway / names cut short**: filenames over 200 bytes are truncated and relative paths over 3600 bytes abort organising — use fewer placeholders in the format string.
- **Want to know which step failed**: open 查看步骤（View steps）and find whether it was file check, ID recognition, source search, or image/NFO generation. Step errors are usually more specific than the batch log.

For task states, logs and retries after a run, see [Scheduled runs, task history and retries](./automation.md).

## Next

- [Scanning: let AMMDS find your files](./scan.md)
- [Scheduled runs, task history and retries](./automation.md)
