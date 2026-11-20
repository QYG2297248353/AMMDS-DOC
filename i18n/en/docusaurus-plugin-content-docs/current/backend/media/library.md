---
title: Films, series and actors
sidebar_label: Media Library
description: How the film, series and actor libraries work — finding records, adding data, editing fields, managing images, merging and deleting, plus seasons and file binding for series.
sidebar_position: 1
---

# Films, series and actors

Once scanning and scraping have put entries in the library, day-to-day upkeep happens on three pages. The film library holds individual films. The series library holds a show's seasons and episodes. The actor library holds people and their film links. This page is organised by what you want to do: find, add, edit, delete. It also flags which actions cannot be undone.

## Before you start

> **ID number（番号 / 识别码）**: a film's identification code, usually in the filename. Search boxes call it 番号. Detail and edit pages call it 识别码. They are the same thing, and one film can have several.

> **Metadata**: a film's cover, description, cast, tags and similar descriptive info.

> **Scraping**: the app looks up a film's cover, description and cast on a data site and fills them in.

> **Site ID**: a number that sites like TMDB, Bangumi or IMDb give a show, used to match the same work across sites.

> **Binding**: linking a library record to a video file on disk (or another existing record), so it knows "this refers to that file / film".

> **Multi-value input**: one box that takes several values; press Enter to add each one, e.g. tags, categories or aliases.

## Find and read a record

All three libraries sit under 媒体管理（Media management）and look alike: filters on top, quick actions in the middle, and a table or cards below.

### Film library

Go to 媒体管理 → 影视库（Media management → Film library）:

| Area | Content |
| --- | --- |
| Filters | Title, ID number, actor, category, tag, series — six inputs, with 搜索（Search）and 重置（Reset）on the right |
| Quick actions | Left: 添加媒体（Add media）, 搜索影视（Search films）; ticking rows reveals 合并媒体（Merge media）and 删除媒体（Delete media）; right: a 来源（Source）dropdown |
| Table | Number, cover, info, tags, actors, actions, with paging and rows-per-page at the bottom |

| Filter | How it matches |
| --- | --- |
| Title | Fuzzy match on original and Chinese title |
| ID number | Match by ID |
| Actor | Match by actor name |
| Category | Multi-value, any hit counts (press Enter to add) |
| Tag | Multi-value, any hit counts |
| Series | Match by series name |

The 信息（Info）column shows the ID and Chinese title, falling back to the original title. Then come labels for **release date, runtime, rating certificate, score**, plus a line for the tagline when present. The 标签（Tags）and 演员（Actors）columns show that record's tags and actor names directly.

:::tip[Two different query entries]
Changing the 来源（Source）dropdown at the top right re-queries immediately. Changes in the filter area need a click on 搜索（Search）. 重置（Reset）only clears the form; it does not re-query.
:::

### Series library

Go to 媒体管理 → 剧集库（Media management → Series library）:

| Area | Content |
| --- | --- |
| Filters | Title, ID, actor, category (partition), tag, status, with 搜索（Search）and 重置（Reset） |
| Quick actions | 新建剧集（New series）, 搜索剧集（Search series）; ticking reveals 删除（Delete）; right: a 来源（Source）dropdown |
| Table | Number, cover, series info, partition, source, season / episode, updated time, actions |

| Filter | How it matches |
| --- | --- |
| Title | Matches show name, original name and Chinese name |
| ID | TMDB / Bangumi / IMDb and other site IDs |
| Actor | Match by actor name |
| Category | A partition; values come from the app |
| Tag | Multi-value, press Enter to add |
| Status | Ongoing / Finished |
| Source | Data source; choosing 全部（All）means no filter |

The 季 / 集（Season / Episode）column shows "N seasons" and "N episodes" on two lines. Each row offers **分享（Share）, 详情（Details）, 编辑（Edit）, 删除（Delete）** on the right. The filter's "类型" is actually the partition. The 来源（Source）options come from the app, not from a fixed list.

:::note[Playback isn't in the admin area]
Series file binding, availability checks and season mapping are only visible and editable in the admin area. The public series detail page shows metadata and the season/episode structure only. It has no file list and no player; use an external player or media server to watch.
:::

### Actor library

Go to 媒体管理 → 演员库（Media management → Actor library）:

| Area | Content |
| --- | --- |
| Filters | Name, gender, retired, deceased, tags, style, features, plus an age slider |
| Quick actions | 新增演员（Add actor）, 搜索演员（Search actors）; ticking reveals 合并演员（Merge actors）and 删除演员（Delete actors）; right: a 来源（Source）dropdown |
| Table | Number, name, agency, debut date, nationality, actions |

| Filter | Meaning |
| --- | --- |
| Name | Fuzzy match on actor name |
| Gender | Male / Female / Other |
| Retired | Retired / Not retired / All |
| Deceased | Deceased / Not deceased / All |
| Tags / Style / Features | Three independent tag dimensions, each multi-value |
| Age | Slider buckets: All, 20, 20–30, 30–40, 40 |

The 姓名（Name）column is the main one. A portrait sits on the left, with the name and labels on the right: gender, age, features, measurements and retired / deceased state. Other columns show agency, debut date and nationality. The last column has **分享（Share）, 详情（Details）, 删除（Delete）**. As in the film library, changing 来源（Source）re-queries immediately. Form filters need 搜索（Search）, and 重置（Reset）only clears the form.

## What recognises a film

One film can have several ID numbers, and the interface uses two names for them:

| Place | Meaning |
| --- | --- |
| Filter → 番号 | Search by ID |
| List → 信息 | The record's first ID is shown before the title |
| Detail drawer → 识别码 | All IDs, comma-separated if several |
| Advanced edit → 识别码 | A multi-value box; add, remove, or write your own |

During scanning, recognition rules pull IDs out of filenames and normalise them, so different spellings of one film end up as a single record. Those rules are configured in the task section. When you add a film by hand, you can type the ID yourself. Subscriptions use it to track later resources.

## Add a new record

### Films: Search films

Click 搜索影视（Search films）to open the online search dialog, type an ID or title and press Enter:

1. Up to 20 recent search terms are kept in your browser; click one to reuse it.
2. Result cards show the ID, release date, data source and title, with three buttons at the top right:

| Button | What it does |
| --- | --- |
| 导入（Import） | Writes into the film library, then refreshes the list and closes the dialog |
| 收藏（Favourite） | Imports first, then adds it to favourites |
| 订阅（Subscribe） | Imports first, then creates a subscription by ID for the subscription task to track |

3. With no results it shows the recent-search area, with the initial hint 搜索一下，试试看吧（"Try a search"）.

Favourites and subscriptions are per-user marks. Later states such as 暂停 / 恢复 / 退订（pause / resume / unsubscribe）belong to subscription management, not this page.

### Series: Search series

搜索剧集（Search series）adds a single show by hand:

1. Type a title keyword (e.g. `葬送的芙莉莲`) and press Enter; the keyword goes into local search history, up to 20 entries.
2. Candidate cards show a portrait poster, year, data source and a **match score** (three decimal places).
3. Clicking 导入（Import）opens a season-number box: leave it empty to import all seasons from that source, `0` means specials, and `1` to `99` imports just that season.
4. On success it says 导入成功，可在剧集详情中完善元数据与季集（"Imported; complete metadata and seasons in series details"）.

:::note[Import merges first]
If the same site ID already exists in the data source, it **merges into** the existing series instead of creating a duplicate. Importing only files the series. Seasons, episodes and files still need work on the detail page.
:::

### Actors: add and search

新增演员（Add actor）opens the edit page for manual entry. 搜索演员（Search actors）imports an actor after an online lookup. To type less, work in this order: import with 搜索演员（Search actors）, check the name and aliases on the edit page, then use 在线搜索补充元数据（Supplement metadata online）to fill in missing fields.

## View details and edit data

### Film detail drawer

Click a title in the list to open the 媒体详情（Media details）drawer:

| Block | Content |
| --- | --- |
| Left | Cover, with labels for runtime, certificate and score below |
| Description items | Title, ID, release date, runtime, score, certificate, director, actors, studio; empty values take no row |
| Plot | Outline and description, two blocks |
| Categories / Tags | Two sets of coloured labels |
| Cast & crew | Director and actors; actors may show "as role" |
| Galleries | Background, thumbnail and stills carousels |

High-res images are moved to the front of a gallery. Click any image for a full-screen preview, use the left and right arrow keys to move between images, and press `Esc` to close. Four buttons sit at the bottom: **编辑元数据（Edit metadata）, 在线搜索补充（Supplement online）, 高级编辑（Advanced edit）, 关闭（Close）**.

编辑元数据（Edit metadata）only touches common fields; saving refreshes both the list and the drawer:

1. Title (Chinese), original title, score (0–10, step 0.1).
2. Release date, runtime (minutes), certificate, language, country.
3. Tagline, categories, tags, studio, director.
4. Outline and description, two long-text blocks.
5. 绑定演员（Bind actors）lets you add rows of actor name + role; the role can be empty, and rows with an empty name aren't submitted.

The dialog loads the full record before filling in, and saves the whole record. So **fields not shown in the dialog are not cleared**.

When one record is missing fields, use 在线搜索补充（Supplement online）. Search by ID or title, then click 补充到当前影视（Supplement into this film）on a result card. The app files the candidate first, then **merges** it into the current entry and refreshes the list and drawer.

:::note[Merge and supplement aren't the same]
合并媒体（Merge media）joins two existing records by hand; 补充（Supplement）imports a candidate and merges automatically, suited to filling fields on one record.
:::

### Series detail and edit

Click 详情（Details）on a row to open the series detail page. Two buttons at the top, 重新刮削（Re-scrape）and 编辑元数据（Edit metadata）, then the body top to bottom:

| Block | Content |
| --- | --- |
| Header | Poster, title and original title, labels for year, first air date, status, score, vote count, rank, episode runtime, certificate, language, partition, source |
| Overview | Categories, tags, production company, country / region, director, writer, site IDs and plot |
| Cast | Name and role, two columns |
| Season list | Season number (specials marked separately), season name, first air date, episodes this season (filed / total) |
| Episode list | `SxxExx`, title, air date, runtime, score, type, and a "playable files" column |
| Season mapping | Local season number, data source, source entry ID, binding method, episode offset, source episode count, note |

重新刮削（Re-scrape）needs a data source, a source entry ID and a season number (`0` to `99`). The refresh **merges into this series** and does not create a second show.

Both 编辑（Edit）on a row and 编辑元数据（Edit metadata）on the detail page open the series edit page, where you can maintain:

- **Basic info**: title, original title, Chinese title, sort title, display title, status, score, first air date, year, episode runtime, certificate, language, country / region, partition, tagline, outline, description and Chinese description.
- **Categories**: categories and tags (from the series tag library).
- **Production**: company, country / region, director, writer, and four site IDs — TMDB / Bangumi / TVDB / IMDb.
- **Cast**: add or remove names and roles.
- **Series, seasons and episodes**: series membership, plus seasons (number, episode count, name, first air date, season description) and episodes (number, absolute number, title, air date, runtime, type, score and so on).
- **Images**: cover and background, with upload, delete and ordering.

Saving returns to the series list.

### Actor fields

新增演员（Add actor）and row 详情（Details）both open the actor detail/edit page, in six groups:

| Group | Fields |
| --- | --- |
| Basic | Name (required), gender (Male / Female / Other), aliases, birth date, age, nationality |
| Body | Height, weight, blood type, bust, waist, hips; women show cup size, men show length |
| Career | Debut date, score (0–10), agency, retired, deceased |
| Social links | Platform + link, add or remove rows |
| Feature tags | Tags, style and features, all from the actor tag library |
| Bio & extras | Long-text bio, custom key-value extras |

Two kinds of image on the right: portrait (2:3, single, re-upload, delete, click to preview) and poster wall (3:4, many, batch upload and delete). Gender changes body fields: Female shows cup size, Male shows length, and the fields appear only after you switch gender.

The drawer's left side shows the portrait, basic info, body, tags, style and bio; three buttons at the bottom: **在线搜索补充元数据（Supplement metadata online）, 编辑演员（Edit actor）, 关闭（Close）**.

## Manage images

### Film advanced edit

Images live on the 高级编辑（Advanced edit）page (添加媒体（Add media）and the detail's 高级编辑（Advanced edit）open the same page):

| Gallery | Recommended ratio | What you can do |
| --- | --- | --- |
| Cover | 2:3 | Click or drag to upload, crop, delete, move up/down to reorder |
| Background | 16:9 | Upload, delete, reorder |
| Thumbnail | 16:9 | Upload, delete, reorder |
| Stills | 16:9 | Upload, delete, reorder |

Order is display order. The list and detail page use the first cover by default, and a high-res cover takes priority. The crop button opens its own dialog and uploads the replacement as soon as you confirm.

The advanced edit page also holds basic info, categories, production info (including ID and mosaic), series info, actor info, source links, extra fields, a binding list, and a 媒体绑定列表（Media binding list）— you can bind video files from the server file tree to this record or unbind them, and the list marks each as 可用 / 失效（available / broken）with a clip title.

:::tip[A confirm box before saving]
Saving in advanced edit first opens the 数据共享计划（Data sharing plan）confirm box. There you can tick whether to **favourite** or **subscribe** to the film, and whether to join data sharing. Ticking adds those records. Not ticking does not cancel states that already exist.
:::

## Merge, delete, and their limits

| Action | How | Result |
| --- | --- | --- |
| 合并媒体（Merge media, films） | Tick **exactly two** rows, click Merge media | The first is kept, the second is merged in then deleted; any other count shows a hint |
| 合并演员（Merge actors） | Tick **exactly two**, click Merge actors | The first is kept, the second merged in then deleted; a wrong count shows a hint |
| 删除媒体（Delete media, films） | Tick rows, click Delete media; submitted one by one | Says 删除任务已提交（"delete task submitted"）; the list refreshes after a few seconds |
| 删除演员（Delete actors） | Row 删除（Delete）, or tick and use Delete actors | Both need a second confirmation |
| 删除剧集（Delete series） | 删除（Delete）on a row | Also removes its seasons, episodes, file bindings and season mappings |

:::warning[Deleting spares the video but not the relationships]
- Deleting a film removes only metadata and bindings, **not the video file on disk**. But metadata, favourites and subscriptions cannot be recovered, so back up first.
- Deleting a series doesn't delete video files, but seasons, episodes, file bindings and season mappings all go. Check what you ticked before bulk deleting.
- Merging can't be undone: it migrates linked data and deletes the merged-away record. Confirm both really are the same person / film first, and back up if needed.
:::

## Series only: seasons, episodes, files and season mapping

> **Season mapping**: for data sources where one season is one entry (e.g. Bangumi), it points local season N at a specific entry on that site, converting episode numbers with an offset when needed.

**Seasons and episodes**: 查看集（View episodes）on the season list switches the episode list below to that season. Above the episode list is a row of quick buttons: 全部季（All seasons）and `S1`, `S2`, and so on. Episodes show as `S{season}E{episode}`. Click a season button to filter. 本季集数（Episodes this season）shows filed / total; if the two differ, some episodes are not filed yet.

**Bind a file to one episode**, in the "playable files" column:

1. Click 添加文件（Add file）to open the 按路径添加文件（Add by path）dialog; the top tells you the target "season N, episode N".
2. Enter the **absolute file path** (required), e.g. `D:\Media\剧名\Season 1\S01E01.mkv`.
3. For multi-part files enter the part number: `CD1` → `1`, `CD2` → `2`.
4. Once bound, the file appears in the list marked 可用 / 不可用（available / unavailable）with its source.
5. 解绑（Unbind）only removes the link, not the file on disk.

:::tip[Where available / unavailable comes from]
The mark comes from the most recent check. Moving or renaming a file only turns it unavailable after a re-check; unbinding and re-binding both refresh the state.
:::

**Bind a season mapping**: in the 绑定季映射（Bind season mapping）form, enter the local season number, the data source and the source entry ID. That ID is a plain number like `400602`, or you can paste the entry link. For 绑定方式（Binding method）, choose `AUTO` (auto-discover) or `MANUAL` (hand-set). `MANUAL` rows are not overwritten by auto-discovery. 集号偏移（Episode offset）follows **source episode number = local episode number + offset**. Clicking 自动发现（Auto-discover）rediscovers mappings from the data source and reports how many were added or updated.

:::note[Auto-discover returned nothing]
The hint 自动发现未返回任何季映射（"auto-discover returned no season mappings"）usually means one of two things: the data source doesn't support linked entries, or `tv_season_auto_discover` in task config is off.
:::

This page only maintains **already-filed** series. The "pending series / merge / confirm boundaries" produced during scanning is handled under 刮削入库 → 剧集入库（Scrape & file → Series filing）in the task section.

## Actors only: aliases, works, favourites and subscriptions

**Aliases** are a multi-value box; press Enter to add each one. They record other spellings of the same actor for search and data-source comparison. Leading and trailing spaces are stripped on submit, and empty values are not written. **Aliases do not take part in "appeared in" matching: works are linked by name only.**

**Works**: clicking 详情（Details）on a row opens the actor detail drawer. Its right side is the works area, titled 出演影视（N）（"Appeared in (N)"）, where N is the number of matched films. The paged table shows cover, title, ID, release date, score and type. Each row's 详情 / 编辑（Details / Edit）jumps to that film's advanced edit page. The list filters the film library by **actor name**, so the actor name written on a film must match the actor library exactly. A different spelling means that film will not show up here.

**Favourites and subscriptions**: the actor list has no "favourites only" filter; the public actor list has a 收藏库（Favourites library）mode — different screens, no contradiction. Two places create them:

1. Result cards in 搜索演员（Search actors）: three icon buttons for import, favourite and subscribe, each filing the record first.
2. The 数据共享计划（Data sharing plan）confirm box when saving the actor edit page: tick 收藏（Favourite）or 订阅（Subscribe）to add the records.

Subscribing follows an actor, so subscription tasks can pick up new works later; pausing and cancelling belong to subscription management, not this page.

## Settings explained

| Setting | What to enter | If you leave it out or get it wrong |
| --- | --- | --- |
| Filters (six fields) | Title, ID, actor, category, tag, series | Nothing takes effect until you click 搜索（Search）; 重置（Reset）only clears the form |
| 来源（Source）dropdown | Pick a data source, or All | Switching re-queries immediately, no Search click needed |
| Multi-value inputs (category / tag / alias …) | Press Enter after each value | Without Enter it isn't added; aliases strip spaces and skip empty values |
| 识别码（ID, advanced edit） | Multi-value, add/remove/custom | A spelling that doesn't match filenames recognises the wrong film; subscriptions track by it |
| Score | Films 0–10 step 0.1; actors 0–10 | Values outside the range can't be entered |
| 绑定演员（Bind actors） | Rows of "name + role", role optional | Rows with an empty name aren't submitted |
| Import season number | Empty = all seasons, `0` = specials, `1`–`99` = just that season | Wrong value imports the wrong season; an existing site ID merges instead of creating new |
| 重新刮削（Re-scrape） | Data source, source entry ID, season (`0`–`99`) | Data merges into this series, no second show is created |
| Absolute file path | Required, e.g. `D:\Media\剧名\Season 1\S01E01.mkv` | Empty can't bind; a wrong path is marked unavailable |
| Part number | For multi-part files: `CD1` → `1`, `CD2` → `2` | Empty means multi-part files may not line up |
| Season mapping entry ID | Plain number (e.g. `400602`) or the entry link | Wrong value points at another entry and episode counts won't match |
| 绑定方式（Binding method） | `AUTO` (auto-discover) / `MANUAL` (hand-set) | `MANUAL` rows aren't overwritten by auto-discovery |
| 集号偏移（Episode offset） | Source episode number = local episode number + offset | A wrong offset shifts every episode number |
| Image ratios | Cover / portrait 2:3, background / thumbnail / stills 16:9, poster wall 3:4 | Wrong ratios get cropped; order is display order |
| Merge operations | Tick exactly two rows | Fewer or more both show a hint and can't proceed |
| 数据共享计划（Data sharing plan）confirm box | Whether to favourite, subscribe, join data sharing | Not ticking doesn't cancel existing states; ticking adds records |

## When something goes wrong

- **Can't find a record**: check you clicked 搜索（Search）after editing filters, whether the 来源（Source）dropdown filtered it out, and whether the ID spelling is right.
- **Some films missing from an actor's works**: works link by **name** only, so the actor name on the film must match the actor library exactly; aliases don't count.
- **Importing a series created a duplicate**: the same site ID normally merges into the existing series; if a duplicate really appears, use merge — and remember merging needs exactly two.
- **Season auto-discover returns nothing**: the data source doesn't support linked entries, or `tv_season_auto_discover` in task config is off.
- **A series file is marked unavailable**: the file was moved or renamed — run a re-check; unbinding or re-binding also refreshes the state.
- **Deleted a record by mistake**: deleting spares the video file, but metadata, favourites and subscriptions can't be recovered — you can only re-scrape or re-import, so back up first.
- **Edited fields didn't save**: both 编辑元数据（Edit metadata）and advanced edit need a save click; advanced edit also shows the 数据共享计划（Data sharing plan）confirm box first — don't miss that step.

Series, studios and tags are covered in [Series, studios and tags](./organize.md); comics and novels in [Comics and novels](./comic.md).

## Next

- [Comics and novels](./comic.md)
- [Series, studios and tags](./organize.md)
