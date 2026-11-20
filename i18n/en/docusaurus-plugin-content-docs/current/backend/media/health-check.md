---
title: Library health check
sidebar_label: Library Health Check
description: Open the health check from your avatar menu to find subscription problems, broken playback progress, unusable storage folders and missing metadata, fix them by severity, and review past runs.
sidebar_position: 4
---

# Library health check

The health check rounds up everything that looks wrong in one place: a subscription that stopped, playback progress pointing at a deleted film, a storage folder that won't open, missing posters, and so on. It only inspects — it never changes data on its own. You choose which item to fix.

## Where to find it

Click your avatar in the top right and choose 片库体检（Library health check）.

:::note[Why it isn't in the media menu]
This is deliberate. The health check lives only in the avatar menu and is hidden from the 媒体管理（Media management）sidebar, so it doesn't mix with day-to-day library work. The direct address is `/admin/media/health`.
:::

## It is read-only

The top of the page says: the check itself is read-only and changes nothing; fixes are triggered by hand. That means:

- Opening the page, switching filters or clicking 开始体检（Start check）changes nothing
- Only clicking a fix button on a specific issue actually writes anything
- Destructive actions ask for confirmation first, and some are labelled irreversible

## What it finds

| Category | In plain words |
| --- | --- |
| 失效文件绑定（Broken file binding） | The database records a file, but it is gone from disk or marked unusable |
| 缺海报 / 背景图（Missing poster or backdrop） | The title exists, but there is no local poster or backdrop |
| 封面比例异常（Cover ratio anomaly） | A cover's dimensions don't follow the expected ratio |
| 重复文件（Duplicate file） | The same scan path, ID number or file is recorded more than once |
| 未匹配番号 / 元数据（Unmatched ID or metadata） | A file was scanned but hasn't been identified yet |
| 扫描残留 / 孤儿（Scan leftovers / orphans） | Leftover records from scanning, or metadata with no file behind it |
| 漫画页丢失（Missing comic page） | The chapter record exists, but its images were deleted or the disk is unavailable |
| 订阅异常（Subscription anomaly） | An RSS subscription is disabled or stale; a film subscription is paused or never matches |
| 播放进度异常（Playback progress anomaly） | Progress points at a deleted film or file, or an unusable file |
| 存储目录异常（Storage folder anomaly） | A data folder is missing or not writable |
| 元数据不完整（Incomplete metadata） | Core fields such as release date, runtime or overview are missing |

Under "scan leftovers / orphans" there is a kind called 元数据无文件（metadata without a file）. It may be a pure data record you meant to keep, so the system offers no delete action for it by default.

## Reading the severity

| Level | Meaning | What to do |
| --- | --- | --- |
| 严重（Critical） | Directly affects playback, scraping or data safety | Fix first |
| 警告（Warning） | Still works, but the state is wrong | Fix when you have time |
| 提示（Info） | Just untidy; doesn't affect use | Can be ignored |

## Filters and search

- **库类型（Library type）**: films, series, comics, subscriptions, system
- **严重度（Severity）**: critical, warning, info
- **Keyword**: searches title, path or ID number

Each row shows a cover, the item, key details, status and whatever actions are available. Rows with nothing to run show 只读（read-only）.

## What can be fixed in one click

| Button | What it actually does | Note |
| --- | --- | --- |
| 重新检测（Re-check） | Looks on disk again for the file and updates its usable state | Safe |
| 重新刮削（Re-scrape） | Submits a background scrape task to fetch metadata and images again | Not instant; wait for the task |
| 忽略（Ignore） | Marks it ignored so later scans stop reporting it | Safe |
| 清除标记（Clear tag） | Clears only the "cover ratio anomaly" tag; doesn't touch the cover file | Safe |
| 删除绑定（Delete binding） | Deletes the database binding record only, **not the file on disk** | Safe |
| 解除引用（Clear reference） | Releases a broken metadata reference; the item returns to unmatched | Safe |
| 合并重复（Merge duplicates） | Keeps the earliest record by the current rules and deletes or merges the rest | **Cannot be undone** |
| 立即抓取（Fetch now） | Fetches the latest content for that RSS subscription right away | Safe |
| 启用订阅（Enable subscription） | Turns a disabled RSS subscription back on so it resumes on schedule | Safe |
| 重新匹配（Match again） | Clears the match counter, restores the subscription and re-queues it | Safe |
| 删除进度（Delete progress） | Deletes playback progress pointing at a broken film or file | Doesn't affect the film or file |
| 存储管理（Storage management） | Jumps to storage management to inspect disks and folders | Just a jump |

## Batch fixes

1. Tick several issues.
2. The footer shows 已选 N 条（N selected）; click 批量修复（Fix selected）.
3. Only fix actions supported by every selected item are offered. When there is no common action, it says 所选条目没有共同可用的修复动作（the selected items have no common fix action）.
4. The dialog states how many rows are affected; confirm to run.

When it finishes you get 已处理 N 条（N handled）, or 成功 X 条，失败 Y 条（X succeeded, Y failed）.

## Past runs

- 开始体检（Start check）creates a new run; when it finishes, the summary and list refresh automatically
- 历史记录（History）shows start time, status, result, elapsed time and trigger
- Trigger is 手动（manual）or 定时（scheduled）; status is 运行中（running）, 已完成（completed）or 失败（failed）
- 查看（View）opens the category breakdown for that run

## Common questions

| Symptom | Explanation |
| --- | --- |
| A fix button does nothing | The row may be read-only, or you need to tick rows and use batch fix |
| The list didn't change after a fix | Re-check refreshes immediately; scrape and fetch are background tasks — wait for them |
| The file is still there after deleting a binding | Expected: deleting a binding only clears the database record |
| A storage folder problem can't be fixed here | These need manual work; follow the prompt to 存储管理（Storage management）and check mounts and permissions |

## Next

- [Films, series and actors](./library)
- [Series, studios and tags](./organize)
