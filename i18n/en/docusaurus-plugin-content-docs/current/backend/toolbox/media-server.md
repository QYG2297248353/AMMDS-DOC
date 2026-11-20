---
title: "Media server: libraries and covers"
sidebar_label: Media Server Tools
description: In the toolbox library manager, see item counts and physical paths for Jellyfin and Emby libraries, refresh metadata and images, remove covers, generate a text or image cover, and browse into a library to change folder covers.
sidebar_position: 2
---

# Media server: libraries and covers

The media server page in the toolbox works directly on the player's libraries: see how much is in each one and where it lives on disk, refresh metadata and images, put a better cover on top, or step inside and tidy up level by level.

The entry is **工具箱 → 媒体服务器 → 库管理（Toolbox → Media server → Library management）**.

:::warning[Writing covers needs a working media server]
Changing covers, refreshing and removing covers all write to the player's library. Configure and enable Jellyfin or Emby in 集成应用（Integrations）first, or these actions cannot complete.
:::

## The top of the page

There is one 扫描所有媒体库（Scan all libraries）button at the top. It submits scan tasks for both Jellyfin and Emby at once, and is greyed out when neither plugin is enabled.

Below it the page is split into a Jellyfin block and an Emby block. Each block starts with its own counts:

| Count | Meaning |
| --- | --- |
| 电影（Movies） | Number of films |
| 剧集（Series） | Number of series |
| 单集（Episodes） | Number of episodes |
| 合集（Box sets） | Number of box sets |

If the counts can't be fetched, the whole line is hidden and the library cards below still work.

Each block also has four buttons at the top right: 补全演员信息（Complete actor info）, 同步媒体库（Sync library）, 同步播放记录（Sync play history）and 刷新（Refresh）. They fill in actor data, write local data into the player, pull play history and reload the library list. All of them run in the background and only report 任务已提交（task submitted）when clicked.

## Library cards

Each library gets a card, top to bottom:

| Part | Content |
| --- | --- |
| Cover | The library's main image in the player; a placeholder icon appears when it fails to load |
| Name | Library name, truncated when long — hover to see the full name |
| Type | Films, shows, music, box sets, books or other |
| Item count | Like "· 128 个条目"; shows `-` when the player returns none |
| Physical path | The disk folders behind the library; several paths are joined with semicolons and truncated when long |
| Actions | Four buttons, listed below |

| Button | What it does | Notes |
| --- | --- | --- |
| 进入媒体库（Open library） | Opens the library and browses its folders and items level by level | Same as clicking the cover or name |
| 更换封面（Change cover） | Opens the generated-cover dialog | See below |
| 立即扫描（Scan now） | Asks the player to scan this library | Only submits the task; nothing finishes on the spot |
| 更多（More） | Refresh metadata, refresh images, remove cover | See below |

### The three items under More

| Item | What it does | Notes |
| --- | --- | --- |
| 刷新元数据（Refresh metadata） | Asks the player to re-read this library's metadata | Runs in the background; existing covers are not overwritten |
| 刷新图片（Refresh images） | Asks the player to fetch images again | Also leaves existing covers alone |
| 移除封面（Remove cover） | Deletes the library's main image | Asks first; it removes the image on the player, not the video files |

## Changing a cover

Click 更换封面（Change cover）to open a dialog with two tabs: **文本封面（Text cover）** and **图像封面（Image cover）**. On the right of both tabs is a live 16:9, 1280×720 preview — whatever you change on the left shows up immediately. Click 替换封面（Replace cover）to write the image straight to the media server, replacing the old main image.

### Text cover

Generated purely from settings, with no need for items in the library. The simplest form is the library name on black, centred in white.

| Setting | How to fill it |
| --- | --- |
| 封面文案（Cover text） | Up to 60 characters; defaults to the library name when left empty |
| 副标题（Subtitle） | Optional, up to 60 characters, e.g. `Movies / TV Shows` |
| 底色（Background） | Colour picker for the background |
| 文字颜色（Text colour） | Colour picker for the text |
| 字号（Font size） | 24 to 140, step 2 |
| 对齐（Alignment） | Left, centre or right |
| 加粗（Bold） | Toggle |

### Image cover

Uses the library's own item images as material to build a cover.

| Setting | How to fill it |
| --- | --- |
| 封面文案（Cover text） | Up to 60 characters; defaults to the library name when left empty |
| 副标题（Subtitle） | Optional, up to 60 characters, e.g. `本月热门` |
| 排版（Layout） | Grid collage, or hero image + title bar |
| 作品数量（Item count） | Grid collage only: 4, 6 or 9 images |
| 遮罩透明度（Overlay opacity） | 0 to 0.85, step 0.05; the higher it is, the clearer the text |
| 标题字号（Title font size） | 28 to 120, step 2 |
| 文字颜色（Text colour） | Colour picker for the text |
| 作品素材（Item material） | 换一批（Shuffle）draws a new random set from the library; next to it you see 已获取 N 张作品图（N item images loaded） |

替换封面（Replace cover）stays greyed out while material is loading or when not a single image was found.

If you don't want to click every time, turn on 自动换封面（Auto cover）per library and let it refresh when new items arrive — see the next section.

## Automatic cover refresh

The library card's action row has a clock icon; hover it to see 自动换封面（Auto cover）. Clicking it opens 自动换封面设置（Auto Cover Settings）. It is **off by default and only applies to the library whose switch you turn on**; other libraries are unaffected.

### What you can configure

| Setting | How to fill it in |
| --- | --- |
| 启用自动更换（Enable automatic replacement） | Switch, off by default, this library only |
| 封面类型（Cover type） | Text cover or image cover |
| 封面文案 / 副标题（Title / subtitle） | Up to 60 characters each; supports the placeholders `{library}` (library name), `{count}` (item count) and `{date}` (today's date) — write them with the braces, e.g. `{library} · {count} items` |
| Text cover | Background colour, text colour, font size 24–140, left / centre / right alignment, bold |
| Image cover | Layout (grid collage, or hero image with title bar), 4 / 6 / 9 images (grid only), overlay opacity 0–0.95, title font size 24–140, text colour |
| 最小更换间隔（Minimum interval） | 10–10080 minutes, default 720; the shortest gap between two automatic replacements for the same library |

Covers are rendered on the server at a fixed 1280×720, PNG. Each setting means the same as in the manual cover dialog; the ranges above are the ones that apply here.

### When it replaces the cover

The first check runs 25 minutes after startup, then every 30 minutes. Only libraries with the switch on take part; when none are enabled, no request reaches the media server.

For each enabled library, all three conditions must hold:

1. The item count has grown since the last recorded snapshot
2. The library's minimum interval has passed since the last run
3. The media server is reachable; image covers additionally need item artwork to work with

The first check after you enable it only records the current item count as a baseline — it does not replace the cover straight away. The conditions above kick in once new items arrive.

### When it leaves the cover alone

| Situation | What happens |
| --- | --- |
| The item count has not grown | Skipped; a decrease (deletions, moved files) also doesn't trigger a change, only a snapshot update |
| The minimum interval has not passed | Skipped until the next round |
| The new image is identical to the last one | Skipped, so caches aren't refreshed for nothing |
| You changed the cover by hand | Scheduled runs skip it and your cover stays; click 立即执行一次（Run once now）and confirm in the dialog to hand it back to automation |
| Not enough material, rendering failed, server unreachable | The old cover stays untouched and the reason is recorded |
| The library is empty or its count is unavailable | Nothing happens |

### Where to see the result

- Once enabled, the library card gains a line such as 自动换封面 · time · 成功/失败/跳过（Auto cover · time · succeeded/failed/skipped）; before the first run it shows 自动换封面 · 等待轮询（Auto cover · waiting for the next poll）.
- Open the settings with the clock button: 最近一次自动更换（Last Automatic Replacement）at the bottom shows the result tag, time and a short explanation, including failure reasons.
- More detail is in the backend log.

### Run once now

The button at the bottom of the settings dialog is 立即执行一次（Run once now）. It ignores the item count and the minimum interval and renders a cover immediately.

If, however, the cover currently on the server differs from the one automation last wrote (which means it was edited by hand), it does not overwrite it straight away. A confirmation dialog appears first:

> 检测到封面已被手动修改（A manually modified cover was detected）
> 继续将覆盖为自动生成封面，当前手动修改的封面会丢失。是否继续？（Continuing replaces it with the generated cover and your manual edit is lost. Continue?）

Choose 继续覆盖（Overwrite）to write the new cover; choose 取消（Cancel）to leave the cover untouched. Scheduled polling never overwrites a manual cover — only a manual run with this confirmation hands the library back to automation.

Use it to see the result right after configuring, too.

The library must be reachable; when the media server is down the run fails and the old cover stays.

:::warning[Writing back still needs the media server]
Automatic replacement, like the manual one, requires Jellyfin or Emby to be configured and enabled. When the server is unavailable it only records a failure; it never writes a broken cover.
:::

## Going into a library

Clicking 进入媒体库（Open library）replaces the list area with the browser. The top becomes 返回（Back）plus a breadcrumb showing the path from the library to the current folder; click an earlier level to jump back to it.

- **Search**: searches the current folder only; it does not drill down
- **Refresh**: reloads the current folder
- **Folders**: shown as cards with the name, type and "N 项"; each folder card has 更换封面（Change cover）at the bottom right
- **Items**: shown as a table with cover, name, type, year, runtime and actions; 24 rows per page with paging at the bottom
- **Back**: goes up one level, or back to the library list when already at the root
- When the folder is empty, it says 当前目录为空（this folder is empty）

Changing a folder or item cover uses the same generated-cover dialog, only the target becomes that folder or item. After a successful write the current folder reloads and the new image appears immediately.

## Requirements and limits

- **A configured, working Jellyfin or Emby is required**: cover write-back, refresh and removal all go through the player's API, so they cannot work when the plugin is missing or disabled.
- **No video is deleted**: refreshing and removing covers only touch metadata and images, never the video files.
- **Refresh is a background task**: results don't appear immediately; wait for the player to finish, then reload the page.
- **Material comes from library images**: the image cover takes item posters already in the player, so an empty library has nothing to work with.
- **Automatic cover refresh is off by default**: enable it per library; it only replaces the cover when the item count grows and the minimum interval has passed, and the first check only records a baseline.
- **Automation respects manual edits**: once it sees a cover changed by hand it stops overwriting; click 立即执行一次（Run once now）and confirm the dialog to take it back.

## Common questions

| Symptom | Explanation |
| --- | --- |
| A library card stays on the placeholder | The player returned no main image, or its address won't load; try 刷新图片（Refresh images）first |
| The item count shows `-` | The player returned no count — AMMDS didn't fail to count it |
| The physical path is empty | The library has no folders configured in the player, or the API returned none |
| 扫描所有媒体库（Scan all libraries）won't click | Neither Jellyfin nor Emby is enabled |
| 替换封面（Replace cover）is greyed out | The image cover has no material yet, or a submit is in progress |
| Auto cover is on but the cover never changes | The first check only records a baseline; after that a flat item count or an unelapsed interval skips the run — check the time and result on the card |
| Auto cover says the cover was modified by hand | You changed it in the player or with the manual dialog, so automation won't overwrite it; click 立即执行一次（Run once now）and confirm the dialog to take it back |
| Auto cover keeps failing | Check that the media server is reachable and that the library has item artwork; the reason appears under 最近一次自动更换（Last Automatic Replacement）and in the backend log |
| 换一批（Shuffle）changes nothing | The library has too few images, so the random draw returns the same set |
| The player still shows the old image | Its cache hasn't refreshed; trigger a library scan or refresh metadata |

## Next

- [Syncing to your TV](../../integration/media-server)
- [Toolbox: batch-processing files](./overview)
