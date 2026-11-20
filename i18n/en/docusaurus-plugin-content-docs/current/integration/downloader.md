---
title: Download Resources Automatically
sidebar_label: Downloaders
description: Connect qBittorrent and Transmission to AMMDS to handle downloads, and use IYUU to cross-seed torrents you already have — with settings tables and who does what.
sidebar_position: 4
---

# Download Resources Automatically

Once a resource is found, something still has to download it. This page covers three things: qBittorrent doing the downloading, Transmission being registered as a downloader, and IYUU copying torrents you already have to other sites.

> **Downloader**: the program that actually downloads. AMMDS only finds the resource and hands the job over; the download itself belongs to the downloader.

> **Cross-seeding**: the same release exists on another site too. Adding your existing torrent to that site so you seed it there as well, which raises your upload total.

> **Seeding**: keeping the files after download and continuing to share them with others. Most private trackers record this as your contribution.

> **Port**: the number that tells services apart on one machine, written at the end of an address, like `8080`. Get it wrong and you reach a different service.

## Who does what

This matters — getting it wrong wastes your time:

| Ability | Who handles it |
| --- | --- |
| Automatic subscription download | **qBittorrent** |
| Automatic IYUU cross-seeding | **qBittorrent** |
| Registering a downloader and checking reachability | Both qBittorrent and Transmission |
| Plugin health checks in the system check | Both qBittorrent and Transmission |

In other words: **with only Transmission, subscription downloads will not run through it.** For automatic downloads you need qBittorrent.

---

## qBittorrent

qBittorrent is where the download chain ends. Subscriptions hand it torrents to write to disk, and IYUU cross-seeding lands there too.

| Item | Detail |
| --- | --- |
| Where | Integrations → Downloaders → qBittorrent |
| Transport | qBittorrent's web interface API |
| Authentication | Web interface username and password |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means every download endpoint replies "qBittorrent not enabled" |
| Service address | Default `http://127.0.0.1:8080`, with protocol; in a container use the host address or service name | `127.0.0.1` inside a container connects AMMDS to itself |
| RPC path | Default `/`; if the web UI sits under a sub-path like `/qbittorrent`, match it | Mismatch gives a 404 on login: "connection test passes, fetching info fails" |
| Username | Default `admin` | Wrong means app info can't be fetched |
| Password | Web interface password | Same |

:::warning[Match the reverse-proxy prefix]
If qBittorrent sits under a sub-path, "RPC path" must match, otherwise login 404s.
:::

### Buttons

| Button | Output |
| --- | --- |
| Test connection | Reachability probe on the service address |
| Get app info | Username, address, default save path, API version, app version, torrent count |

"Get app info" is the most direct way to verify credentials: if the default save path and torrent count come back, login worked and the API version is compatible.

### Save path and tags

| Item | Behaviour |
| --- | --- |
| Save path | The download directory from the subscription config wins; otherwise it falls back to qBittorrent's default save path |
| Category | A category can be passed when adding; subscription pushes set none by default |
| Tags | Subscription pushes add `AMMDS订阅` plus a source-site tag; torrents that should be paused afterwards also get `AMMDS暂停` |
| Whose path is it | The save path belongs to **the machine running the downloader**, not the AMMDS container |

:::tip[How to write the path]
If AMMDS and qBittorrent are in different containers, use the path as qBittorrent sees it (for example `/downloads`), not the pre-mount path inside AMMDS.
:::

### One full download chain

1. **Subscription search** finds a matching resource at the site.
2. **Hand it over**: AMMDS passes the torrent to qBittorrent together with the save path and a subscription tag.
3. **Watch it finish**: AMMDS looks the task up again by that tag. Finished completes the subscription and sends a notification; gone from the list counts as failed.
4. **Cross-seeding**: torrents added by IYUU also land in qBittorrent. Automatic cross-seeding currently works with qBittorrent only.

Day-to-day pause, start, delete and batch actions live under **Toolbox → Downloader → Task management**.

---

## Transmission

Transmission is a small, light download client. AMMDS can register it, check that it answers, and include it in the system check — but subscription downloads will not run through it.

| Item | Detail |
| --- | --- |
| Where | Integrations → Downloaders → Transmission |
| Interface path | Default `/transmission/rpc`, must match the downloader config |
| Authentication | Interface username and password, if authentication is enabled |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means it's left out of plugin health checks |
| Service address | Default `http://127.0.0.1:8080` — **change it to the real port** | Leaving it connects you to qBittorrent's port |
| RPC path | Default `/transmission/rpc`; change it if a reverse proxy rewrote the path | A mismatch means no data comes back |
| Username | Default `admin` | Wrong when authentication is on means no connection |
| Password | Interface authentication password | Same |

:::warning[The default port must be changed]
Transmission usually runs on `9091`, but the default here is `8080` (the same as qBittorrent's). With both downloaders deployed, set Transmission's real port.
:::

The connection test only asks whether something answers at that address, and any answer counts as success. So a passing test means the address and port are right — it says nothing about the username and password.

:::note[How the system check uses it]
The system check reads this plugin's "Enabled" and "Service address": if enabled but the address is empty or unreachable, the plugin is flagged in the health check and the affected feature is listed as "torrent download push".
:::

---

## IYUU

IYUU matches your existing torrents against other sites and, when it finds the same release, adds it there so you seed it in more places.

| Item | Detail |
| --- | --- |
| Where | Integrations → Downloaders → IYUU |
| Token | Sign in at the IYUU site, go to your user centre and copy the account token |
| Division of labour | IYUU only **finds**; adding the torrent to a downloader is qBittorrent's job |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means cross-seeding and the push test both fail |
| API service address | Default `https://2025.iyuu.cn` | Wrong means no connection |
| Service address | Default `https://iyuu.cn`, used for page jumps and the console entry | Wrong only affects links |
| Key | Your IYUU account token | Empty means cross-seeding and pushing both fail; switching accounts means switching tokens |
| Hide image | **On** by default; on means the generated message has no image | Off adds images to push messages |

### Buttons

| Button | What it checks |
| --- | --- |
| Test connection | Reachability of the API address; does not validate the token |
| Push test | Sends a real message using the built-in template, verifying token and notification path |

### The cross-seed schedule

Under **Toolbox → Cross-seeding → Site management**, click "Cross-seed schedule":

| Field | Detail |
| --- | --- |
| Enabled | Whether automatic cross-seeding runs |
| Schedule | A timing expression; empty means no scheduled task, manual only |
| Client | Which downloader receives the torrents; **currently only qBittorrent works** |
| Notify | Whether to send a notification after cross-seeding |

The timing expression is validated before saving; invalid ones are rejected outright.

### How it runs

1. Triggered on schedule, or manually with "Cross-seed now".
2. A random delay of 30–300 seconds at start, so multiple instances don't hit IYUU at once.
3. Up to 100 "waiting to cross-seed" records per round, each queried against IYUU.
4. Adding follows each site's rules: sites needing authorisation get a torrent file fetched first; sites needing cookies get the site cookie; the rest take the torrent address directly.
5. Each site's result is written immediately as `not cross-seeded`, `waiting`, `done` or `failed`.

:::warning[The prerequisites live in your IYUU account]
Automatic cross-seeding requires that cross-seeding is on in your IYUU account and the client is set to qBittorrent. Those switches are at IYUU, not in AMMDS; without them nothing happens.
:::

### Sites and records

| Page | Use |
| --- | --- |
| Toolbox → Cross-seeding → Site management | Site cards, site parameters, **import sites** (JSON file), "Cross-seed now" |
| Toolbox → Cross-seeding → Cross-seed records | Task-level records: automatic / manual, result, count, time and reason |
| Toolbox → Cross-seeding → Cross-seed tasks | Torrent-level details: status, time, matched site torrent, failure reason |

Both lists can be cleared, and **clearing cannot be undone**.

## If something goes wrong

- **"Downloader not enabled"**: turn on that plugin's "Enabled" and save.
- **Connection test passes but fetching info fails**: wrong username or password, or "RPC path" doesn't match the real path.
- **Adding a torrent fails**: the save path doesn't exist on the machine running the downloader — use a path that downloader can see.
- **A subscription never completes**: don't edit the `AMMDS订阅` tag by hand, or the system can't find the task again.
- **Downloaded but never filed**: the scan directory and the save path don't match; check the scan task's directory.
- **"Cross-seed now" returns 0**: no "waiting" records, or cross-seeding isn't on in the IYUU account.
- **"Unsupported client"**: the client is set to Transmission — change it to qBittorrent.
- **Lots of "failed"**: the site needs a cookie, or the authorisation expired; update the site card and retry.
- **Push test doesn't arrive**: wrong token, or the system-level notification switch is off.

## Next

- [Where to find resources](./indexer.md)
- [Send notifications to your phone](./notification.md)
- [Connect External Services in Three Steps](./overview.md)
