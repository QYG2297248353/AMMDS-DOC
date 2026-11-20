---
title: "Scanning: let AMMDS find your files"
sidebar_label: File Scan
description: Create a scan task, tell AMMDS which folders to look in, which files to skip, where to put them, and how to run it on a schedule.
sidebar_position: 1
---

# Scanning: let AMMDS find your files

The first step with a folder full of videos is a scan: AMMDS sees which files exist and records them, so it can add information and tidy them up later. This page covers creating a scan task, choosing which files count, deciding where files go, running it automatically, and where to see the results.

## Before you start

> **Scanning**: the app walks through a folder you name and records every video file that fits the rules. It only registers files; it doesn't look up film information yet.

> **Scraping**: the app looks up a film's cover, description and cast on a data site and fills them in. It comes after scanning.

> **ID number（番号 / 识别码）**: a film's identification code, usually in the filename. Search boxes call it 番号. Detail and edit pages call it 识别码. Both mean the same thing.

> **Metadata**: a film's cover, description, cast, tags and similar descriptive info.

> **NFO**: a small text file kept beside the video that records the title, cast and so on. Players read it, and AMMDS can restore data from it.

> **Cron**: a short string of numbers and symbols saying "when to run", such as a daily time or an interval in hours.

> **Whitelist**: an "only these" list. Anything not on it is skipped.

> **Concurrency**: several jobs running at the same time.

> **Placeholder**: a marker wrapped in `{}` inside a format string, replaced with real content when used, such as a title, ID number or actor name.

:::tip[Scanning and scraping are separate]
A scan only records filenames and media info. It **doesn't recognise ID numbers or fill in film data**. To get covers, descriptions and cast, see [Scraping: filling in film details](./scrape.md).
:::

## Step by step

### 1. Create a scan task

Go to 任务管理 → 任务配置（Task management → Task config）. It opens on the 任务列表（Task list）tab. Click the 点击创建扫描任务（Create scan task）card to open the dialog. Existing cards offer 编辑（Edit）, 记录（Records）, 删除（Delete）, plus a main action button.

Fields to fill in:

| Field | Meaning |
| --- | --- |
| 任务名称（Task name） | Required; identifies the task in the list and logs |
| 分类（Category） | 影视（Film）or 剧集（Series）. Series uses its own recognition and scraping flow |
| 媒体类型（Media type） | Only for films: the region/category, e.g. Japanese AV, Western, domestic, FC2 PPV |
| 剧集分区（Series category） | Replaces Media type for series: 全部（All）, 番剧（Anime）, 日剧（Japanese drama）and so on |
| 整理模式（Organise mode） | How files are moved; see the next section |
| 扫描目录（Scan folder） | Required; pick from the server file tree, folders only, never a single file |
| 整理目录（Target folder） | Required except for in-place and gap-fill modes; in-place modes follow the scan folder automatically |
| 重命名规则（Rename rule） | 原文件名（Original name）or 标准化文件名（Standard name） |
| 重复文件处理规则（Duplicate rule） | Which copy to keep when the target already has a duplicate |
| 目录监控（Folder watch） | Can only be set when creating; fires scans on file changes |
| 加入收藏（Add to favourites） | Adds films to favourites after scan + scrape; films only |
| 计划任务（Schedule） | Shown only when folder watch is off; a six-field Cron expression |

:::note[Check permissions before picking folders]
Scan folder and target folder are both picked from the server file tree, and subfolders load as you expand. Make sure the account running AMMDS can read the scan folder. It must also be able to write to the target folder, or organising will fail later.
:::

A task card shows the task name, with system and task type tags (film / series / unknown). It also shows the media type or series category, the scan and target folders, the organise mode, the naming and duplicate rules, and the schedule (未启用 / Not enabled when off).

### 2. Choose how files are moved (organise mode)

| Mode | What it does |
| --- | --- |
| 原地整理（In place） | Files stay put; only renamed and given data from scraping |
| 标准化整理（移动）（Standard, move） | Moves files into the target folder using the folder and filename formats |
| 标准化整理（复制）（Standard, copy） | Copies into the target folder, keeping the source |
| 标准化整理（软连接）（Standard, symlink） | Creates a shortcut in the target folder pointing at the source, using no extra space |
| 标准化整理（硬连接）（Standard, hardlink） | Creates another name for the same data; source and target must be on the same filesystem |
| 查漏补缺（Gap fill） | No folder or filename changes; only fills in missing images and NFO |

> **Symlink / hardlink（软连接 / 硬连接）**: both add a link in the target folder without moving the original. A symlink is like a shortcut and breaks if the source is deleted. A hardlink is another name for the same data and requires both folders on the same disk.

原地整理（In place）and 查漏补缺（Gap fill）need no separate target folder — switching to either fills it in with the scan folder automatically.

### 3. Set rename and duplicate rules

Only two rename rules:

- **原文件名（Original name）**: keep the name found by the scan.
- **标准化文件名（Standard name）**: generate a new name from 影视刮削规则 → 整理文件名格式（Film scrape rules → Filename format）.

The duplicate rule decides which copy survives when the target already has a file of the same name:

| Rule | What's kept |
| --- | --- |
| 保留（Keep） | The existing file; no re-pick by size, date or resolution |
| 大文件 / 小文件（Larger / Smaller） | The bigger or smaller one |
| 新文件 / 旧文件（Newer / Older） | The newer or older one |
| 高分辨率 / 低分辨率（Higher / Lower resolution） | The higher or lower resolution one |

### 4. Choose which files count

Scanning reads the global rules in 任务配置 → 扫描规则配置（Task config → Scan rules）. Films and series share one tab, but series tasks read the keys with a `tv` prefix:

| Rule | Film | Series |
| --- | --- | --- |
| Video format limit | `scanning_video_format` | Same key reused |
| Ignore folders | `scanning_ignore_dir` | `scanning_tv_ignore_dir` |
| Ignore files | `scanning_ignore_file` | `scanning_tv_ignore_file` |
| Minimum video size (MB) | `scanning_min_size` | `scanning_tv_min_size` |
| Segmentation markers | `scanning_video_segmentation` | Not used |
| Subtitle formats | `scanning_subtitle_format` | Same key reused |
| Read local NFO | `scanning_read_nfo` | `scanning_tv_read_nfo` |

Series has three extra rules that parse filenames into seasons and episodes. They are 特别篇关键词（special-episode keywords）, 集号缺失默认季（default season when the episode number is missing）and 绝对编号识别（absolute numbering）. **Changing rules only affects later scans; already-filed records are not rewritten.**

The scan itself runs in this order:

1. Recursively collect files from the scan folder, filtered by the video extension whitelist.
2. Skip whole subtrees matching "ignore folders", and files whose names contain "ignore file" keywords.
3. Apply the minimum video size filter on a full scan; a single-file scan triggered by folder watch skips this filter.
4. Read file and media info: type, resolution, size, video/audio codec, bitrate and so on.
5. Check for a same-named subtitle file in the same folder and record its type.
6. Use segmentation markers to spot multi-part files such as `cd1`, `part2`.
7. If "read local NFO" is on and an NFO sits beside the file, parse it and add it to the step record.
8. A path already in the library is not created again. Its record is simply re-bound to this scan task.

### 5. Let it run on its own

| Way | When it appears | What it does |
| --- | --- | --- |
| 立即扫描（Scan now） | Tasks without folder watch | The card's main button; submits and runs in the background |
| 初始化（Initialise） | Folder watch on, state still 创建（Created） | One full scan first, then registers the folder watch |
| 监控中（Watching） | Folder watch on and initialised | The button no longer triggers a scan; it only means watching is active |
| 定时扫描（Scheduled） | Folder watch off and Cron filled in | The scheduler triggers it by the expression; see [Scheduled runs, task history and retries](./automation.md) |

:::warning[Folder watch and manual scans are mutually exclusive]
With folder watch on, manual scans are not supported; you must initialise first. Folder watch and Cron are also either/or. While watching is on, Cron is not saved. Only when watching is off is a scheduled task registered from Cron. Filling in both on one task is pointless.
:::

Folder watch uses filesystem events, not a periodic sweep:

- It registers the scan folder and all its subfolders. New subfolders get registered recursively.
- It fires only when a **new video file** appears, and only if its extension is on the format whitelist.
- It handles just the file from that event, never a whole-folder rescan.
- Deleting a folder unregisters its watch. After a restart, watches are re-registered from the task config.

:::warning[Deep folder trees cost resources]
Folder watch uses up the system's file-watch slots. Very deep trees or frequent changes cost more. On Linux, running out of inotify slots stops the watch service from starting. Reduce watched folders or raise the system limit.
:::

On a task card, 记录（Records）jumps to the scan log filtered to that task. 编辑（Edit）opens the edit dialog, where **the folder-watch switch cannot be changed**. 删除（Delete）needs confirmation, and a task that is scanning cannot be deleted.

### 6. Where to see the results

| Place | What you see |
| --- | --- |
| 任务管理 → 扫描日志（Task management → Scan log） | Run type, start time, duration, state, and recognised / added / updated counts; running tasks can be cancelled |
| 任务管理 → 刮削入库 → 影视刮削（Task management → Scrape & file → Film scrape） | Registered video files, ID numbers, media info, scrape/organise state; bind, unbind, delete, edit the ID by hand |
| 任务管理 → 刮削入库 → 剧集刮削（Task management → Scrape & file → Series scrape） | Series files grouped by title for confirmation; merge, split, ignore, confirm |

Finishing a scan **doesn't start scraping automatically**, unless 自动刮削（Auto scrape）is on or the task mode is 查漏补缺（Gap fill）.

## When the ID number appears

A scan only records filenames and media info. The 识别番号（Recognised ID）column gets a value only after scraping matches something. ID recognition is done during scraping, by 识别码规则（ID rules）and 番号补全规则（ID completion rules）.

One exception is a local NFO: with 读取本地 NFO（Read local NFO）on, a scan can restore metadata and the ID straight from the NFO. If recognition fails or is wrong, go to 任务管理 → 刮削入库 → 影视刮削（Task management → Scrape & file → Film scrape）and click the ID tag to edit it by hand.

## Other rule panels

The lower half of 任务配置（Task config）is rule tabs. Tasks decide "which folders to scan"; rules decide "how to recognise, scrape and organise".

| Tab | Roughly what it controls |
| --- | --- |
| 扫描规则配置（Scan rules） | Video formats, ignore folders / files, minimum size, segmentation markers, subtitles, read NFO, and series-only scan items |
| 影视刮削规则（Film scrape rules） | Data sources, folder / filename formats, NFO fields, images, tags, translation, thread counts; see [Scraping: filling in film details](./scrape.md) |
| 剧集刮削规则（Series scrape rules） | Series scrapers, match threshold and weights, folder / filename formats, season poster naming, NFO fields; see [Scraping: filling in film details](./scrape.md) |
| 番号补全规则（ID completion rules） | Completing partial ID numbers from filenames |
| 识别码规则（ID rules） | Extracting the ID from filenames |
| CID 转换规则（CID conversion rules） | Turning an ID into another code format |
| 订阅规则配置（Subscription rules） | Chinese subtitles first, search order, download folder |
| 漫画整理配置（Comic arrange） | Formats, folder, naming, chapter generation, cover / back cover / contents keywords |
| 小说整理配置（Novel arrange） | Formats, folder, naming, whether to generate by chapter |

> **Scraper（刮削器）**: one source that can look up film data — a data site or your existing local data. Tick several when scraping and the app queries them together.

> **Thread**: a "worker" that lets a batch of jobs run several at once. More threads are faster, but too many strain your machine and the sites.

> **Regular expression**: a rule written with symbols that describes what text to match, used to pull the code out of a filename.

Each rule panel shows the controls it needs: text boxes, number boxes, switches, or dropdowns where you can create options. After editing, click 保存配置（Save config）to submit your changes. 刷新配置（Refresh config）discards unsaved changes and reloads.

### ID completion rules

Each rule needs a set of details. 备注（note）tells rules apart, and 规则类型（rule type）says how to read the match string. 匹配规则（match rule）says which part of the filename to locate, and 模板（template）is used to build the ID. 番号长度（ID length）takes `0` for auto-complete, or a value above 0 to pad to that many digits. 自动补全（auto-complete）decides whether to apply automatically, and 启用状态（enabled）turns the rule on or off.

### ID rules and CID conversion

识别码规则（ID rules）extracts the ID from a filename or path. There are four match types: regex, prefix, contains and suffix. You can also set an output template (`{num}`, `{match}`, `{group1}` and so on), the film type, whether it is censored, a required prefix, the enabled state and a note. The panel offers 识别测试（ID test）. Enter a filename or full path, and it returns the ID, whether it matched, the matched rule and the completed number.

CID 转换规则（CID conversion rules）turns a correct ID into a CID. Match types are the same. The output template supports `{brand}`, `{num}`, `{num2}` through `{num8}` (zero-padded), `{match}`, `{group1}` and more. It also has a conversion test.

:::tip[Recognise first, convert second]
CID conversion depends on a correct ID. If the result looks wrong, use 识别测试（ID test）to confirm the ID itself first, then change the CID template.
:::

ID rules and CID conversion rules can both be drag-sorted — **higher up means higher priority** — and, like ID completion rules, support add, edit, delete, enable / disable.

### Subscription, comic and novel rules

These three aren't mixed with film scan tasks; each has its own tab:

| Tab | What to fill in |
| --- | --- |
| 订阅规则配置（Subscription rules） | 中字优先（Chinese subs first — this version only stores the preference, it doesn't affect automatic download ordering）, 搜索顺序（search order — a list of site keywords deciding which site is tried first; aggregator sources are always last）, 下载目录（download folder — empty uses the downloader's default path） |
| 漫画整理配置（Comic arrange） | Format (folder, CBZ, CBR, CB7, PDF, EPUB), default folder, folder / file naming, generate by chapter, cover / back cover / contents keywords |
| 小说整理配置（Novel arrange） | Format (EPUB, TXT), default folder, folder / file naming, generate by chapter |

Comic and novel naming supports placeholders like `${title}`, `${author}`, `${chapter}`, `${index}`; follow the panel's own notes.

Rules are global: changes affect tasks created or run afterwards and don't rewrite already-filed metadata. Task-level fields (folders, organise mode, Cron, folder watch) are maintained on the task card, not in the rule panels.

## Settings explained

### When creating a task

| Setting | What to enter | If you leave it out or get it wrong |
| --- | --- | --- |
| 任务名称（Task name） | A recognisable name | Required; the task can't be created without it |
| 分类（Category） | Film or series | Wrong choice uses the wrong recognition flow; series takes a separate one |
| 媒体类型 / 剧集分区（Media type / Series category） | Films pick a region category; series pick a category (All, Anime, Japanese drama...) | Only the one matching your category shows; the other is hidden |
| 整理模式（Organise mode） | One of the six ways to move files | Required; In place and Gap fill set the target folder equal to the scan folder |
| 扫描目录（Scan folder） | A folder picked from the server file tree | Required, folders only, not a file; without read permission nothing is found |
| 整理目录（Target folder） | Required except for in-place modes, and needs write permission | Required; without write permission organising fails |
| 重命名规则（Rename rule） | Original name or Standard name | Standard name renames using the filename format in scrape rules |
| 重复文件处理规则（Duplicate rule） | Keep / Larger / Smaller / Newer / Older / Higher resolution / Lower resolution | "Keep" won't re-pick by size, date or resolution |
| 目录监控（Folder watch） | On or off, only when creating | Can't be changed while editing; on means no manual scans and no Cron saved |
| 加入收藏（Add to favourites） | On or off, films only | Off adds nothing; on a series task it has no effect |
| 计划任务（Schedule） | A six-field Cron expression, shown only when folder watch is off | Empty means manual runs only; wrong syntax or timezone means it never fires |

### Global scan rules

| Setting | What to enter | If you leave it out or get it wrong |
| --- | --- | --- |
| Video format limit `scanning_video_format` | Which video extensions are allowed | Formats not on the list aren't scanned; folder watch also only accepts new files on the list |
| Ignore folders `scanning_ignore_dir` / `scanning_tv_ignore_dir` | Whole folders to skip | A match skips the entire subtree |
| Ignore files `scanning_ignore_file` / `scanning_tv_ignore_file` | Filename keywords to skip | Too broad a keyword skips real films too |
| Minimum video size `scanning_min_size` / `scanning_tv_min_size` (MB) | Files smaller than this aren't treated as video | Only full scans filter it; single-file scans from folder watch don't |
| Segmentation markers `scanning_video_segmentation` | Multi-part markers such as `cd1`, `part2` | Series doesn't use it; wrong values split one film into parts |
| Subtitle formats `scanning_subtitle_format` | Which extensions in the same folder count as subtitles | Films and series share this key |
| Read local NFO `scanning_read_nfo` / `scanning_tv_read_nfo` | Whether to read the NFO beside the file | Only when on can metadata and the ID be restored from an NFO |
| 特别篇关键词 / 集号缺失默认季 / 绝对编号识别（Special keywords / default season / absolute numbering） | Series-only, parsing filenames into seasons and episodes | Only series tasks read them; empty falls back to default parsing |

### ID completion, ID rules and others

| Setting | What to enter | If you leave it out or get it wrong |
| --- | --- | --- |
| ID completion match rule / template | Which part of the filename to locate and the template to build the ID from | A wrong rule builds a wrong ID, so scraping matches the wrong film |
| ID length | `0` for auto-complete, above 0 pads to that many digits | Wrong length adds or drops zeros |
| ID rule match type and template | Regex / prefix / contains / suffix, output template like `{num}`, `{match}`, `{group1}` | No ID extracted means scraping can't match anything; verify with 识别测试（ID test）first |
| CID conversion output template | `{brand}`, `{num}`, `{num2}` to `{num8}`, `{match}`, `{group1}` and so on | If the ID itself is wrong, conversion will be wrong too — fix the ID first |
| Enabled state / ordering | Rule switches and drag-sort | Disabled rules don't take part; order is priority |
| Search order (subscription rules) | Comma-separated site keywords | A wrong keyword keeps that site at the back |
| Download folder (subscription rules) | Where subscription downloads are saved | Empty uses the downloader's default path |
| 保存配置 / 刷新配置（Save config / Refresh config） | Click Save config to submit each change | Not clicking Save means no effect; Refresh config discards unsaved changes |

## When something goes wrong

- **No files found at all**: check the scan folder, whether the AMMDS account has read permission, then the video format whitelist and the ignore folder / file rules.
- **One file treated as several films or parts**: check the segmentation markers and ID rules; try one filename in 识别测试（ID test）first.
- **Folder watch on but nothing happens**: confirm the task was initialised — the 监控中（Watching）button isn't meant to trigger a scan. For very deep trees or exhausted watch slots, reduce watched folders or raise the system limit.
- **It never fires on schedule**: check the Cron syntax and the app timezone, and confirm the global scheduler switch is on; see [Scheduled runs, task history and retries](./automation.md).
- **Organising fails**: usually the target folder lacks write permission, or you picked a hardlink while source and target are on different disks.
- **Changed rules but old records didn't change**: rules only affect later scans, not already-filed records — rescan or re-scrape.

## Next

- [Scraping: filling in film details](./scrape.md)
- [Scheduled runs, task history and retries](./automation.md)
