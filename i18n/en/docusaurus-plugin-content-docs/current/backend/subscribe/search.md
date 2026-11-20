---
title: Finding resources and subscriptions
sidebar_label: Search & Subscribe
description: Search enabled sites and magnet indexes, filter the results and push them to your downloader; use subscriptions when you want to track an ID over time.
sidebar_position: 1
---

# Finding resources and subscriptions

This page covers two things. The first is **finding a resource once**. The second is **tracking an ID so new resources are downloaded automatically**. Use Site Search or Magnet Search for a one-off search. Use Subscription Management for long-term tracking. All three live under **Subscription Search**.

## First, the words

> **ID number**: the film's identification code, usually part of the filename. AMMDS recognises films by it.

> **Magnet link**: a line of text starting with `magnet:`. Your downloader uses it to find people sharing the file, without downloading a torrent file first.

> **Seeders / leechers**: how many people are sharing the file, and how many are downloading it. More seeders usually means a faster download.

> **Promotion**: a discount flag the site puts on a torrent, such as free download, 50% download or 2x upload. It only affects what counts towards your traffic.

> **API key**: a string the site gives you. Software presents it to prove "I am this account" without ever knowing your password.

## Finding something once

1. Open **Subscription Search → Site Search** (or **Magnet Search**).
2. Type an ID number, a title or an actor name and press Enter.
3. Wait for results. Site Search waits up to 60 seconds. A site that does not answer in time simply contributes nothing; the rest still show.
4. Narrow things down with the toolbar above the results: sort field (publish time, file size, seeders, leechers), sort direction, medium, video codec, audio codec, resolution, promotion.
5. To start over, click **Reset**: it clears every filter and returns sorting to "publish time / descending".

Search history is kept in your browser, up to 20 entries. When there are no results, recent words appear under the box; click one to run it again.

"N results found" counts what is left after filtering, not the total the sites returned.

## Download it or push it

| Button | What it does | When to use it |
| --- | --- | --- |
| Download torrent | Saves a torrent file named `[AMMDS]title.torrent` | You want to pick the download tool yourself |
| Push to download | Hands it straight to the enabled downloader, category `AMMDS` | You already use the downloader |

Magnet Search adds two more buttons: copy the magnet link, and open the title with whatever tool your computer has registered.

## Tracking an ID over time

1. Click **Subscribe** in a film's online search results, on a dashboard chart, or in the film editor.
2. AMMDS matches the film data by ID, then goes through the sites in order. The first hit is submitted automatically.
3. Watch the state in **Subscription Search → Subscription Management**. The list refreshes every 10 seconds.
4. To retry straight away, click **Search now** on the card in the **Subscribed** or **All** tab.
5. To stop tracking, click **Cancel subscription**; you can restore it later from the **Cancelled** tab.

One ID number (case-insensitive) only ever has one subscription, so clicking twice won't create a duplicate.

## How the two searches differ

| | Site Search | Magnet Search |
| --- | --- | --- |
| Data source | Sites and indexers you enabled | The magnet index service |
| Fields | Promotion, seeders, resolution and other site fields | Sources, file count, file list |
| Paging | Everything comes back at once, no paging | Server-side paging, 20 per page |
| Sorting | Re-sorted in the page | Sorted by the server; changing sort returns to page 1 |
| Download form | Torrent file or direct link | Magnet link |
| Prerequisite | At least one site index service enabled | Magnet index service enabled and reachable |

The two searches are independent. If one site times out or errors, only that site comes back empty. In Magnet Search the source filter applies to the current page only and does not change the total.

## The six subscription states

| Tab | Meaning | Buttons on the card |
| --- | --- | --- |
| All | No filtering by state | Search now, Cancel, Delete |
| Subscribed | Subscribed, waiting to match or for the next round | Search now, Cancel |
| Paused | Matching failed too many times, stopped automatically | Cancel |
| Cancelled | Cancelled by you, record kept | Restore, Delete |
| Downloading | Handed to the downloader | Delete |
| Finished | The downloader reports completion | Delete |

**Delete** really removes the record and cannot be undone. **Cancel** only pauses it, and it can be restored at any time.

A card shows the ID number, title (shown as "Identifying" until it matches), release date, subscription time and poster. Records without an ID number aren't drawn as cards.

## Why a subscription sits in "Subscribed" or turns "Paused"

- When the search succeeds but no site returns a download link, the state stays **Subscribed** and you get a "no resources yet" notification; the next round retries automatically.
- After 10 consecutive matching failures the subscription turns **Paused** automatically, so it stops hammering the sites for nothing.
- Unmatched subscriptions are handled in the background: first run 10 minutes after startup, then every 300 minutes.
- Records in **Subscribed** are processed every 20 minutes, at most 10 per round, newest first.

## Settings

Subscription-wide settings live in **Task Management → Task Config → Subscription Rules**:

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| Chinese subtitles first | Tick it if you prefer resources with Chinese subtitles | This version only stores the preference; it doesn't affect automatic download ordering |
| Search order | Comma-separated site keywords, default `M-Team,NexusPHP,Rousi,Prowlarr`; decides which site is tried first for an ID | The default order above is used; a wrong keyword means that site is always last |
| Download directory | Where downloaded files are saved | The downloader's default save path is used |

No restart is needed; the next subscription round picks up the new values. Aggregator sources are always placed last regardless of search order.

Magnet Search has no extra page settings — keyword and sorting are all you can set.

## If something goes wrong

- **No results at all**: check that the site or magnet index service is enabled and the account hasn't expired, then shorten the keyword or use the ID number.
- **Only some sites came back**: a single site timing out is normal degradation; try again later.
- **Results but can't download**: use **Push** first; if that fails too, check the downloader's address and account.
- **Card stuck on "Identifying"**: the ID didn't match any film data. Bind it manually in the library, then click **Search now**.
- **Subscription turned "Paused"**: 10 consecutive match failures. Fix the ID or the data, then restore it.
- **Push succeeded but no task appears**: check in the downloader itself, or see [Downloading and filing](./downloader.md) for how to read the task list.
