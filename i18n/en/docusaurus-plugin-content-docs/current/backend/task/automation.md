---
title: Scheduled runs, task history and retries
sidebar_label: Scheduled Tasks
description: Let scans, scraping and background jobs run on a schedule, understand the master switch and the timetable, find the records afterwards, and learn how to retry and clean up.
sidebar_position: 3
---

# Scheduled runs, task history and retries

Tired of clicking 立即扫描（Scan now）every time? This page shows how to let tasks run on a schedule. It also covers where the global master switch lives, how to write a timetable, where to read the records afterwards, and how to retry and clean up logs.

## Before you start

> **Scraping**: the app looks up a film's cover, description and cast on a data site and fills them in for you.

> **Metadata**: a film's cover, description, cast, tags and similar descriptive info.

> **ID number（番号 / 识别码）**: a film's identification code, usually in the filename. The app uses it to recognise the film.

> **NFO**: a small info file kept beside the video that players can read.

> **Cron**: a short string of numbers and symbols saying "when to run", such as a daily time or an interval in minutes.

> **Scheduled job**: one chore the app does on its own at a set time, like syncing play history, fetching charts or clearing temp files.

> **Scheduler**: the part of the app that starts each job when its time comes. You do not start them by hand.

> **Environment variable**: a switch value set in the system before the app starts. A normal install never needs it, and changing it usually needs a restart.

> **Concurrency**: several jobs running at the same time.

> **Log**: a running diary of "what happened when, and did it work" that you look back through when something breaks.

## Letting tasks run on a schedule

### Open the Scheduled Tasks page

Go to 系统管理 → 计划任务（System admin → Scheduled tasks）. The top shows the master switch state, how many jobs are running, an 自动刷新（Auto refresh）switch and a 刷新（Refresh）button. The job table is below.

| Field | Meaning |
| --- | --- |
| 任务名称（Job name） | Main line is the job name; the line below is an internal id `类名#方法名` for cross-checking |
| 执行周期（Period） | Plain-language period text; hover to see the raw Cron or fixed-rate expression |
| 运行状态（Run state） | Running / idle for executions triggered from this page, with the last manual result summary below |
| 上次执行（Last run） | Start time of the last manual run; failures add a red 失败（Failed）tag, and 从未执行（Never run）if never triggered here |
| 操作（Action） | 执行（Run）button; greyed out while running or when the master switch is off |

:::note[These two fields only record manual runs]
运行状态（Run state）and 上次执行（Last run）only cover executions **triggered from this page**. Automatically scheduled runs do not write back to them. To see how those went, use 系统管理 → 运行日志（System admin → Run logs）.
:::

:::note[When the period text looks odd]
The page only translates common patterns into words: "daily at a set time", "every N minutes", "every N hours", "every N days at a set time". A Cron it cannot recognise is shown as-is on purpose, so nothing is misread by guessing.
:::

### The master switch: off stops a whole batch of plans

The global master switch is controlled by the environment variable `AMMDS_SCHEDULER_ENABLE` (config item `ammds.scheduler.enable`) and is **on by default**.

- With it off, the top shows 计划任务已关闭（Scheduled tasks disabled）with an explanatory note.
- Manual 执行（Run）is refused by the backend and the button is greyed out.
- On startup the app skips registering 任务级 Cron（task-level Cron）and IYUU 自动辅种（IYUU auto-seeding）; those two plans no longer take effect.
- The app's built-in scheduled jobs aren't affected: the page still lists them and they still run on their own periods. To stop every background job completely, stop the whole instance or handle it at the deployment layer.

**Changing this switch needs an app restart to take effect.** How to change it is on the system config page in the settings section.

### Run once by hand

Clicking 执行（Run）on a row submits a single run and doesn't change the original schedule:

1. The app queues this run and returns immediately, without waiting for it to finish.
2. If that job already has a run in progress, clicking again is refused with 任务正在执行中（"task is running"）.
3. The page marks the row as running at once and polls every 3 seconds. Polling stops automatically once everything finishes.
4. When done, 上次执行（Last run）updates and the result summary is written under the run state. On failure, the summary is the error class and message, truncated if very long.

The 自动刷新（Auto refresh）switch controls whether to poll while jobs are running; with it off you need to click 刷新（Refresh）to see the latest state.

### How to write Cron

The app uses six-field Cron in the order `秒 分 时 日 月 周` (second, minute, hour, day, month, weekday):

| Expression | Meaning |
| --- | --- |
| `0 0/20 * * * ?` | Every 20 minutes |
| `0 0/2 * * * ?` | Every 2 minutes |
| `0 0 9 * * ?` | Every day at 09:00 |
| `0 30 4 * * ?` | Every day at 04:30 |
| `0 10 */6 * * ?` | At minute 10 of every 6 hours |
| `0 0 3 1/13 * ?` | At 03:00 every 13 days |

Besides Cron, some jobs use `fixedRate` (a fixed interval) or `fixedDelay` (timed from when the last run ended). The page converts these to "every N minutes / hours" and marks the initial delay.

### What automatic jobs exist

The list is discovered automatically at startup, with no manual upkeep. Common groups:

| Group | Example jobs |
| --- | --- |
| Subscriptions and downloads | Batch download subscribed films (every 20 min), update subscription download progress (every 2 min), update unmatched subscription metadata (every 300 min) |
| Sites and accounts | Run PT site authentication, sync all PT site user data, check PT site account security |
| Media servers | Sync Jellyfin / Emby play history and library, fill in library actor data |
| Information centre | Update RSS articles, RSS offline cache, RSS auto-archive, refresh popular subscriptions, check popular subscription availability |
| Charts | Fetch ThePornDB recent updates, FANZA DMM daily chart and the next 3 days' chart |
| Maintenance | Clear scan leftovers, fix chapter numbering, clear file-browser temp files, perceptual hash calculation, disk capacity check, storage stats, licence check, MeiliSearch auto-indexing |
| Others | Series library sync, studio rule collection, official store sync, sync local resources to S3 |

The actual list on the page is the authoritative one. Any new built-in job appears automatically after a restart, with no page changes.

### Don't confuse the two mechanisms

The Scheduled Tasks page and the Cron in task config are separate things:

| Mechanism | Where it's configured | Appears on the Scheduled Tasks page? |
| --- | --- | --- |
| Built-in scheduled jobs | Ships with the app | Yes |
| Scan task Cron | Task config → Edit task → Schedule | No, registered separately by the scheduler |
| Auto-scrape interval | Task config → Scrape rules | No, self-schedules by interval and ignores the master switch |
| IYUU auto-seeding | Toolbox → PT seeding → Seeding plan | No, registered separately by the scheduler |

A scan task with folder watch on stops using Cron. With watch off and Cron filled in, the task is registered with the scheduler at startup or after a config change. Task-level Cron and IYUU auto-seeding obey the master switch; built-in jobs do not.

:::warning[Don't give one task two triggers]
Filling in both Cron and folder watch on the same scan task is pointless; only one trigger is kept when saved. Use folder watch for "handle new files immediately" and Cron for "a full scan at fixed times". See [Scanning: let AMMDS find your files](./scan.md).
:::

## Where to read the records afterwards

### Three kinds of records

| Record | Location | What it records |
| --- | --- | --- |
| 扫描日志（Scan log） | Task management → Scan log | Every run of a scan task |
| 刮削日志（Scrape log） | Task management → Scrape log | Every batch of a scrape task |
| 任务日志（Task log） | System admin → Log audit → Task log | Background tasks such as file operations, backups, RSS, comic / novel organising |

### Scan log

Click 查询（Query）to refresh by the conditions, or 重置（Reset）to restore defaults. Entering from a task card's 记录（Records）button automatically filters by that task.

| Filter | Options |
| --- | --- |
| Task type | All / Film / Series |
| Task | Filter by task name, or All |
| Run type | Manual, scheduled, real-time watch, initialise |
| Task state | Created, scanning, watching, waiting, completed, cancelled, error |

| Column | Meaning |
| --- | --- |
| Task name | Which task this scan belongs to |
| Type | Run type, i.e. the trigger |
| Start time | When it started |
| Duration | Shown when available; 扫描中（Scanning）while running, 扫描中断（Interrupted）for other states with no duration |
| Task state | Green dot for completed, grey otherwise |
| Recognised media count | Video files found in this scan |
| Added media count | Files newly registered |
| Updated media count | Existing records re-bound to this scan |
| Action | 取消（Cancel）; only while "scanning" and the run type isn't real-time watch or initialise |

At the bottom you can page, change rows per page, adjust table density and show or hide columns. At the top, 清理日志（Clear logs）wipes every scan record and **cannot be undone**.

:::note[No per-file detail in the scan log]
The scan log only records batch-level info. For one file's ID, scrape state and steps, go to 任务管理 → 刮削入库（Task management → Scrape & file）; the per-media step timeline is in 查看步骤（View steps）.
:::

### Scrape log

| Filter | Options |
| --- | --- |
| Task type | All / Film / Series |
| Run type | Manual, scheduled and so on |
| Task state | Scraping, completed, waiting, cancelled, error |

| Column | Meaning |
| --- | --- |
| Task name | This batch's task name; multi-thread mode adds a thread suffix |
| Start time | When the batch started |
| Scrape result | Batch result summary |
| Duration | 刮削中（Scraping）while running, 刮削中断（Interrupted）for other states with no duration |
| Task state | Green for completed, orange otherwise |
| Scrape media count | How many media this batch planned to handle |
| Success / failure count | Successes and failures in this batch |
| Action | 取消（Cancel）; only while "scraping" and the run type isn't real-time scrape / initialise |

清理日志（Clear logs）removes only deletable historical records. Running tasks aren't cleared; cancel them first.

### System task log

File upload, download, copy, move and compression, backup import/export, RSS updates, comic / novel organising and similar operations are written here:

- Filter by keyword, task type and state.
- The list shows type, title, state, progress, message, start time and duration.
- 详情（Details）opens a drawer with state, progress, completed / total, message, error, start / end time and a line-by-line log, with `ERROR` and `WARN` highlighted.
- 取消（Cancel）appears only for running tasks that the app marks as cancellable.
- Running tasks cannot be deleted; finished ones can be deleted one by one or in bulk with 清理（Clear）.
- With 自动刷新（Auto refresh）on, the list refreshes every 5 seconds.

### State reference

| Chain | Possible states |
| --- | --- |
| Scan task | Created, scanning, watching, waiting, completed, cancelled, error, task deleted |
| Scrape task | Scraping, completed, waiting, cancelled, error, deleted |
| System task | Running, completed, failed, cancelled |

等待（Waiting）means the task exists but has not had a turn yet. 异常（Error）means an unhandled error came up mid-run, and you need the log and steps together to pin it down.

## How to retry after a failure

The record pages have **no "retry" button**; retries happen back on the relevant feature page:

| Situation | How to retry |
| --- | --- |
| Scan failed, or you want a rescan | Click 立即扫描（Scan now）again in task config; cancel a running scan first |
| One film failed scraping | Click 刮削整理（Scrape & organise）in 刮削入库（Scrape & file）; failed media re-enter the queue, see [Scraping: filling in film details](./scrape.md) |
| ID number recognised wrong | Click the ID tag in 刮削入库（Scrape & file）to fix it, then scrape again |
| No metadata match | Use 绑定（Bind）to attach a library record by hand, then scrape |
| Images or NFO missing | Use 查漏补缺（Gap fill）on the task to add only the side files |
| Subscription download failed | Click 立即搜索（Search now）in subscription management, or wait for the next automatic round |
| File operation failed | Read the error in the system task log, fix the path / permission and start again |

:::tip[Look at steps before logs]
When scraping fails, first use 刮削入库 → 查看步骤（Scrape & file → View steps）to find whether file check, ID recognition, source search, or image / NFO generation failed. Step errors are usually more specific than the batch log.
:::

## Before clearing logs

- Clearing logs **doesn't delete media records** and doesn't undo files already organised.
- Once the scan log is cleared, past batches can't be traced; export or take a screenshot first if you need the evidence.
- The scrape log only deletes deletable historical records; running tasks aren't cleared.
- The system task log's 清理（Clear）only removes finished tasks; running ones are kept.

## Settings explained

| Setting | What to enter | If you leave it out or get it wrong |
| --- | --- | --- |
| Global master switch `AMMDS_SCHEDULER_ENABLE` | On by default; change it in system config, then restart the app | Off shows 计划任务已关闭, greys out Run, and stops task-level Cron and IYUU auto-seeding from registering; built-in jobs still run |
| Scan task schedule (Cron) | Six-field expression `秒 分 时 日 月 周`, shown only when folder watch is off | Empty means manual runs only; wrong syntax or timezone means it never fires; also confirm the master switch is on |
| Folder watch | Either this or Cron | Filling both keeps only one; with watch on, no Cron scheduling |
| Auto-scrape interval | Separate switches and intervals for films / series; checks the queue every 3 minutes by default | Off means manual triggers only; too short an interval runs constantly; it ignores the master switch |
| Manual 执行（Run） | Click a row's Run button on the Scheduled Tasks page | Greyed out while running or with the master switch off; an already-running job shows 任务正在执行中 |
| Auto refresh (Scheduled Tasks page) | Whether to poll every 3 seconds while jobs run | Off means you must click 刷新（Refresh）to see the latest state |
| Auto refresh (system task log) | On or off; refreshes every 5 seconds when on | Off means the list won't update by itself |
| Scan / scrape log filters | Task type, task, run type, task state | Wrong conditions hide the records you want; 重置（Reset）restores defaults |
| Clear logs | Each log's 清理日志 / 清理 button | Irreversible: past batches can't be traced afterwards; running tasks aren't cleared |
| Save config / Refresh config (rule panels) | Click Save config to submit each change | Not saving means no effect; Refresh config discards unsaved changes |

## When something goes wrong

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| Page says 计划任务已关闭（Scheduled tasks disabled） | The master switch is off | Change `AMMDS_SCHEDULER_ENABLE` and restart |
| 执行（Run）button greyed out | A job is running, or the master switch is off | Wait for the current run, or check the master switch |
| 上次执行（Last run）shows failed | Upstream service down, expired credentials or network trouble | Read the result summary and 系统管理 → 运行日志（System admin → Run logs）, fix it, then run once by hand |
| Nothing fires at the set time | Wrong Cron, wrong timezone, or master switch off | Check the six-field expression and the app timezone |
| Scheduled Tasks list is empty | Startup discovery hasn't finished, or no jobs were found | Refresh the page; if still empty, check the startup log |
| Automatic runs happen but 上次执行 doesn't change | Those two fields only record manual runs | See automatic scheduling in 系统管理 → 运行日志（System admin → Run logs） |
| Can't find a single file in scan / scrape records | Logs only record whole batches | Go to 任务管理 → 刮削入库（Task management → Scrape & file）for the file and 查看步骤（View steps） |

- To make scans run on time, besides filling in Cron, confirm the global master switch is on; see [Scanning: let AMMDS find your files](./scan.md).
- For scrape triggers, the auto-scrape interval and gap fill, see [Scraping: filling in film details](./scrape.md).
- Screenshot or export before clearing logs — once cleared, they're gone.

## Next

- [Scanning: let AMMDS find your files](./scan.md)
- [Scraping: filling in film details](./scrape.md)
