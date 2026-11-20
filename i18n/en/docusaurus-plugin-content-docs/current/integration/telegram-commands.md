---
title: Controlling AMMDS from Telegram
sidebar_label: Telegram Commands
description: Once the Telegram bot is connected, search for films, subscribe by ID, check libraries and downloads, run scans and log in to 115 from the chat window, with role-based permissions and confirmations for risky actions.
sidebar_position: 8
---

# Controlling AMMDS from Telegram

Besides notifications, Telegram works as a remote control: send commands from your phone or a group to search for films, subscribe by ID, check libraries and downloads, run scans and log in to 115.

This page covers connecting the bot, binding your account, the command list, which commands need an administrator, and how risky actions are confirmed.

## Connect the bot first

1. In Telegram, open `@BotFather`, create a bot and copy its **Bot Token**.
2. In the admin, open 集成应用 → 推送通知 → Telegram（Integrations → Push notifications → Telegram）, enter the token and switch 启用状态（Enabled）on.
3. In 系统配置 → 通知（System config → Notifications）, make sure 启用通知推送（Enable notifications）is on. This is the master switch: when it is off, incoming commands are not processed and the bot only receives, never replies.
4. **Do not register a webhook.** Commands rely on the system polling Telegram for updates; once a webhook is registered the polling stops and commands stop responding. A home network doesn't need a webhook anyway.

The server address defaults to the official API; change it only when using your own reverse proxy.

## Bind your account

On first use the system doesn't know who you are.

1. Message the bot privately and send `/whoami`.
2. It replies with your **Chat ID**, **From ID**, nickname and current role.
3. Put the From ID into 用户白名单（User whitelist）in the admin. The format is `FromID:ROLE`, several accounts separated by commas:

```text
123456789:OWNER,987654321:ADMIN,555555555:GUEST
```

4. Save, then send `/whoami` again — the role has changed.

Alternatively, skip the whitelist and put your private Chat ID into the `Chat ID` setting: in a private chat the Chat ID equals the From ID, so that account becomes OWNER. In groups, prefer the whitelist so every person gets an explicit role.

## Roles and permissions

From highest to lowest: OWNER, ADMIN, GUEST, NONE. A higher role can use everything the lower ones can.

| Role | What it can do |
| --- | --- |
| OWNER | Every command |
| ADMIN | Read-only commands plus scanning, scraping, restart, 115 deletion and downloader actions |
| GUEST | Search, subscribe, favourite, status, health summary and other read-only or everyday actions |
| NONE (unbound) | Only `/start` and `/whoami` |

## Commands

### Basics

| Command | What it does | Permission |
| --- | --- | --- |
| `/ammds` | Show bot info | GUEST |
| `/start` | Enable the bot and return a welcome message | Works when unbound |
| `/stop` | Disable the bot and stop handling commands | ADMIN, confirmed |
| `/help [command]` | Show help; with a command name it shows usage, required role and risk | GUEST |
| `/version` | Show the AMMDS version | GUEST |
| `/whoami` | Show your Chat ID, From ID and role | Works when unbound |

### Search and AI

| Command | What it does | Permission |
| --- | --- | --- |
| `/movie <keyword>` | Search film metadata | GUEST |
| `/actor <keyword>` | Search actor metadata | GUEST |
| `/search <keyword>` | Search the local media library | GUEST |
| `/resource <keyword>` | Search site resources | GUEST |
| `/magnet <keyword>` | Search magnet resources | GUEST |
| `/deepseek <text>` | Talk to DeepSeek; without text it starts a new session | GUEST |

`/deepseek` needs the DeepSeek plugin enabled, otherwise it answers 请先启用 DeepSeek 插件（enable the DeepSeek plugin first）. A session expires after 20 idle minutes; the next message starts a new one.

### Status and system

| Command | What it does | Permission |
| --- | --- | --- |
| `/status` | Version, uptime, task and download overview | GUEST |
| `/tasks` | Recent task list | GUEST |
| `/downloads` | Download queue overview | GUEST |
| `/system status` | Query system status | GUEST |
| `/system start` | Show a start hint | GUEST |
| `/system restart` | Restart AMMDS, with confirmation | ADMIN |
| `/system stop` | Stop AMMDS, with confirmation | ADMIN |
| `/restart` | Restart AMMDS, with confirmation | ADMIN |

### Subscriptions and favourites

| Command | What it does | Permission |
| --- | --- | --- |
| `/subscribe <ID>` | Subscribe to a film by ID | GUEST |
| `/unsubscribe <ID>` | Unsubscribe, with confirmation | GUEST |
| `/subs [status] [page]` | Film subscription list; filter by status, with paging buttons | GUEST |
| `/tv [status]` | Series subscription list; filter by status | GUEST |
| `/favorite <ID>` | Add a film to favourites | GUEST |
| `/unfavorite <ID>` | Remove it from favourites | GUEST |

Status values for `/subs`: subscribing, paused, cancelled, downloading and finished.

### Tasks and health

| Command | What it does | Permission |
| --- | --- | --- |
| `/scan` | Run all scan tasks, with confirmation | ADMIN |
| `/scrape` | Run one scrape task, with confirmation | ADMIN |
| `/media_sync` | Sync media libraries; needs Jellyfin or Emby enabled | GUEST |
| `/library` | Library overview: local films, favourites, film and series subscriptions, plus Jellyfin / Emby counts and library lists | GUEST |
| `/check` | System health summary; acknowledges first, then pushes the result | GUEST |
| `/check full` | Full health check, slower, also pushed asynchronously | ADMIN |

### Media servers

| Command | What it does | Permission |
| --- | --- | --- |
| `/jellyfin <keyword> [page]` | Search the Jellyfin library | GUEST |
| `/emby <keyword> [page]` | Search the Emby library | GUEST |

If the matching plugin is not enabled, the command tells you to enable it first.

### 115 cloud drive

| Command | What it does | Permission |
| --- | --- | --- |
| `/115` | Show 115 authorisation and binding state | GUEST |
| `/115 <magnet link>` | Push to 115 cloud download | ADMIN |
| `/115_login` | Scan a QR code to log in; the code is sent to the current chat | ADMIN |
| `/115_quota` | Show cloud download quota | GUEST |
| `/115_tasks [page]` | Cloud download task list, with paging buttons | GUEST |
| `/115_search <keyword>` | Search files in 115 | GUEST |
| `/115_del <index>` | Delete an offline task, with confirmation | ADMIN |

### Downloader and RSS

| Command | What it does | Permission |
| --- | --- | --- |
| `/dl [page]` | Downloader task list | GUEST |
| `/dl pause <index>` | Pause a task, with confirmation | ADMIN |
| `/dl resume <index>` | Resume a task | ADMIN |
| `/dl del <index>` | Delete a task, with confirmation | ADMIN |
| `/magnet <magnet link>` | Push to the current default downloader | ADMIN |
| `/qb <magnet link>` | Push to qBittorrent | ADMIN |
| `/tr <magnet link>` | Push to Transmission | ADMIN |
| `/rss [keyword]` | Popular RSS subscription list, filterable by keyword | GUEST |

### Pushing magnets

Besides searching, a magnet link can be pushed straight to a downloader; these commands differ only in where it goes:

| Command | Goes to | Permission |
| --- | --- | --- |
| `/115 <magnet link>` | 115 cloud download | ADMIN |
| `/magnet <magnet link>` | The current default downloader | ADMIN |
| `/qb <magnet link>` | qBittorrent | ADMIN |
| `/tr <magnet link>` | Transmission | ADMIN |

`/115 <magnet link>` validates the link, then checks in order that the 115 plugin is enabled, licensed and bound, and finally looks at the remaining cloud download quota. **When the quota is 0 it refuses outright and submits nothing.** A successful reply only shows the task name (the `dn` name inside the magnet, or the first 8 characters of the hash when absent), the target "115 cloud download", the hash prefix and the remaining quota; failures explain themselves — quota exhausted, task already exists, authorisation expired, or creation failed.

With a magnet link, `/magnet` uses the current default downloader; with a keyword it still searches magnets. `/qb` and `/tr` pick qBittorrent and Transmission respectively; when no downloader is available the bot tells you to enable and configure one in the admin.

The rules:

- Only `magnet:?xt=urn:btih:` followed by 40 hex characters or 32 Base32 characters is accepted, and the whole link may not exceed 2048 characters
- The same infohash submitted again within 60 seconds is blocked, and the reply says it was just submitted
- These pushes are write actions, so only OWNER and ADMIN can run them; guests are refused

### Licence and trial

| Command | What it does | Permission |
| --- | --- | --- |
| `/license` | Show licence status: state, activation mode and plan, expiry and grace deadline, whether this instance is bound, whether the trial was used, plus next steps when unlicensed | GUEST |
| `/license <key>` | Activate a licence | ADMIN, confirmed |
| `/license <key> replace` | Replace an existing licence, releasing the seat held by the old instance | ADMIN, confirmed |

Without arguments `/license` is read-only and changes nothing. The reply includes:

- The state, along with activation mode, plan and a masked key
- Expiry time and days remaining; a perpetual licence shows as permanent
- Whether this instance is bound, and the seats it holds
- Whether the trial has been used and when it expires
- A diagnostic code while unlicensed

A few displays worth knowing:

- **Expired but inside the grace period**: an expiry warning and the grace deadline appear; it keeps working during grace, but renew soon
- **0–15 days left**: only within this window does it say the licence is about to expire
- **Unlicensed**: admins see "send `/license <key>` to activate, or use 系统设置 → 许可证（System settings → Licence）"; if the trial was never used it also mentions starting the 7-day trial there. Guests see a note to contact an administrator

Activation is limited to ADMIN and OWNER. After you send `/license <key>` nothing happens immediately — the bot replies with a confirmation card:

> About to activate licence: ABC123…7890
> Confirming takes 1 activation seat; the validity period comes from the licence service.

The key on the card keeps **the first 6 and last 4 characters**; keys shorter than 10 characters show only the tail, and the full key is never written to the log. Activation happens only after you tap the confirm button.

Failures explain themselves: invalid key format, licence expired or suspended/revoked, no activation seat left, licence service temporarily unavailable, or a previous activation still in progress. When a licence already exists it tells you to use `/license <key> replace` instead.

## How risky actions are confirmed

The following actions do not run immediately. The bot sends a message with a confirm button and a cancel button first:

- `/stop`, `/restart`, `/scan`, `/scrape`
- `/system restart`, `/system stop`
- `/115_del <index>`
- `/unsubscribe <ID>`
- `/dl pause`, `/dl del`
- `/license <key>`

Tap confirm to run it, cancel to drop it. The buttons are valid for **120 seconds**; after that, or if the confirmation was already used in another chat, send the command again. Your role is checked again when you tap, so insufficient permission means nothing runs.

## What an unbound user sees

An account that is neither whitelisted nor matching the configured Chat ID receives one fixed message:

> This account is not bound to AMMDS, so the command is unavailable. Send your Telegram ID to the administrator to get bound; `/whoami` shows your own ID.

Otherwise it can only use `/start` and `/whoami`; every other command is refused. To avoid spam from strangers, the same person sees this reminder at most once every 10 minutes.

Bound accounts without enough permission get a separate "permission denied" message and no internal data is exposed.

## Help and unknown commands follow your role

`/help` only lists the commands your role can use, grouped by category — admin commands are not laid out alongside them.

- Guests see commands such as `/jellyfin`, `/emby`, `/check`, `/system` and `/tasks`, but not admin ones like `/115_del` or `/dl pause`
- Asking for an admin command with `/help <command>` is refused outright
- An unknown command answers with "未识别该指令" (command not recognised) plus a short list of what your role can use, ending with a hint to send `/help` for the full list

So the same `/help` shows a different number of entries to an administrator and to a guest — that is expected.

## Keeping the command menu current

Click 注册指令（Register commands）on the Telegram settings page to publish the commands above to the bot's menu.

- If every command already exists, nothing is submitted and same-named commands you added by hand stay untouched
- If even one is missing, the whole set is submitted again, which overwrites same-named commands you customised

Click it again after adding or changing commands.

## Common questions

| Symptom | Explanation |
| --- | --- |
| Commands get no response | Check that both Enabled and Enable notifications are on; also check whether a webhook was registered — remove it to restore polling |
| It always says unbound | Run `/whoami`, put the From ID into the whitelist and save; then send the command again |
| An admin command says no permission | The role in the whitelist is GUEST; change it to ADMIN or OWNER |
| Tapping confirm does nothing | The 120 seconds elapsed or the confirmation was already used; send the command again |
| `/deepseek` asks for a plugin | Enable DeepSeek in Integrations first |
| `/library` shows no media server | Jellyfin / Emby is not enabled or not configured |
| `/license <key>` says no permission | Activation is limited to ADMIN and OWNER — ask an administrator |
| `/license` says a licence already exists | Replacing needs `replace`: `/license <key> replace`, which frees the old seat |
| `/license` shows a grace deadline | The licence has expired but is still in grace; renew soon, features are limited once grace ends |
| Pushing a magnet says no permission | Magnet pushes are limited to OWNER and ADMIN; guests can still search |
| `/115 <magnet link>` says the quota is insufficient | The remaining cloud download quota is 0, so nothing was submitted; retry once quota returns |
| A push says it was just submitted | The same infohash can only be submitted once per 60 seconds; wait a moment |
| The command menu is stale | Click 注册指令（Register commands）on the Telegram settings page |

## Next

- [Notifications and Telegram setup](./notification)
- [Syncing to your TV](./media-server)
