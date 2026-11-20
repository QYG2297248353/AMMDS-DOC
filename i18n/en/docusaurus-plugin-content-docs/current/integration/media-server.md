---
title: Sync to the TV
sidebar_label: Media Servers
description: Connect Jellyfin or Emby to AMMDS so your tidy covers, descriptions and cast reach your player — plus what syncs both ways and what never happens.
sidebar_position: 5
---

# Sync to the TV

AMMDS is not a player; it only organises data. To see a tidy poster wall on the TV, connect Jellyfin or Emby and let the finished data sync across.

> **Media server / player**: playback software that runs on your TV, box or computer, like Jellyfin or Emby. It plays the films and shows the poster wall.

> **API key**: a long password the player generates for AMMDS. Anyone holding it can read and write data in that player.

> **Binding**: creating the link between a film here and the same film in the player. Only bound items can sync between the two.

## Pick one first

Jellyfin and Emby come from the same codebase, so their settings and abilities are very similar. **Both can run at once** — play statistics are fetched per bound user and then merged. One is plenty, though.

| | Jellyfin | Emby |
| --- | --- | --- |
| Where | Integrations → Media servers → Jellyfin | Integrations → Media servers → Emby |
| Connection | The player's own interface, plus an API key | The player's own interface, plus an API key |
| Default address | `http://127.0.0.1:8096` | `http://127.0.0.1:8096` |
| Where to get the key | Console → API keys (under "Advanced" on some versions) | Settings → Advanced → API keys |
| Management | Toolbox → Media servers → Library / Films / Actors | Same |

## The same three steps

1. Generate an API key in the player (name it `AMMDS` so you can revoke just that one later).
2. Back on the AMMDS plugin page, fill in the address and key and **save**.
3. Refresh the page so the user list loads, pick the **bound user**, save again, then run the connection test.

:::tip[Give it its own key]
Don't reuse the key your admin account uses day to day. A separate one can be revoked on its own.
:::

---

## Jellyfin

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means every action answers "please enable the Jellyfin plugin first" |
| Service address | Default `http://127.0.0.1:8096`; in a container use the host address or service name | `127.0.0.1` inside a container connects AMMDS to itself |
| API key | Created in the Jellyfin console; required once enabled | Empty or invalid gives "please enter the correct plugin configuration" |
| Username | Login name, **optional** | Usually doesn't affect syncing |
| Password | Login password, **optional** | Same |
| Bound user | Which Jellyfin user play records belong to — **the user ID, not the username**; separate several with commas, preferably picked from the list | Typing a name such as `root` or `admin` shows an orange warning and the library list may come back empty; unbound: play record sync still runs but nothing is counted for that account |
| Auto-complete | Off by default; on lets a scheduled task fill in actor data in the background | Depends on your local actor library; actors you don't have locally can't be filled in |

### Binding order

1. Fill in the address and API key and **save**.
2. Refresh the page so the Jellyfin user list loads.
3. Pick the account in "Bound user" (admins carry a red tag, normal users a blue one) and save.

**What goes here is the user ID, not the username.** Picking from the list is safest. If you type a name such as `root` or `admin`, an orange warning appears below the field and the library list will most likely come back empty.

### What syncs

| Content | Direction | Detail |
| --- | --- | --- |
| Library items | Player → AMMDS | Pulls films, actors and other entries for binding and display |
| Library sync | Both ways | Writes local film metadata and covers to the player and creates the binding |
| Play records | Player → AMMDS | Fetched per bound user for play statistics |
| Actor completion | Both ways | Fills in actor data in the player, or writes actors scraped there into the local library |
| Images | AMMDS → player | Uploads the primary image for a library or item, replacing the existing one |
| Library scan | AMMDS → player | Triggers a scan of one library or all of them |

The matching actions are under **Toolbox → Media servers → Library management**: "Scan all libraries", "Complete actor info", "Sync library", "Sync play records", "Refresh".

---

## Emby

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means every action answers "please enable the Emby plugin first" |
| Service address | Default `http://127.0.0.1:8096`; in a container use the host address or service name | `127.0.0.1` connects AMMDS to itself |
| API key | Created in the Emby console; required once enabled | Empty or under-privileged means fetching the user list fails |
| Username | Login name, **optional** | Usually doesn't affect syncing |
| Password | Login password, **optional** | Same |
| Bound user | Which Emby user play records belong to — **the user ID, not the username**; separate several with commas, preferably picked from the list | Typing a name such as `root` or `admin` shows an orange warning and the library list may come back empty; unbound: syncing still runs but nothing is counted for that account |
| Auto-complete | Off by default; on lets a scheduled task fill in actor data in the background | Actors missing from your local library can't be filled in |

:::warning[The key needs library management rights]
The account that generates the key must have permission to manage the library, otherwise fetching the user list fails.
:::

### Binding order

1. Fill in the address and API key and save.
2. Refresh the page and wait for the Emby user list to load.
3. Pick the account in "Bound user" (admins red tag, normal users blue) and save.

**What goes here is the user ID, not the username.** Picking from the list is safest. If you type a name such as `root` or `admin`, an orange warning appears below the field and the library list will most likely come back empty.

### What syncs

| Content | Direction | Detail |
| --- | --- | --- |
| Library items | Player → AMMDS | Pulls films, actors and other entries |
| Library sync | Both ways | Writes local film metadata and covers and creates the binding |
| Play records | Player → AMMDS | Fetched per bound user for play statistics |
| Actor completion | Both ways | Fills in actor data, or writes actors scraped there into the local library |
| Images | AMMDS → player | Uploads the primary image for a library or item |
| Library scan | AMMDS → player | Triggers a scan of one library or all of them |

## Limits worth knowing

- **Everything runs in the background**: syncing and completion do their work behind the scenes, and the page says "syncing… check the log later" straight away; progress is only visible in the run log.
- **Binding writes**: binding a film or actor writes your local data and images back to the player on a best-effort basis; a failed write-back doesn't undo the binding.
- **No files are deleted**: syncing only writes metadata and images, never deleting media files on the player.
- **Unbinding only removes the link**: it deletes the local binding record and leaves the player's data alone.
- **Auto-complete has a prerequisite**: it depends on data or portraits already in your local actor library; anything missing locally can't be filled in.
- **Don't use 127.0.0.1**: inside a container that address is AMMDS itself.

## If something goes wrong

- **"Please enter the correct plugin configuration"**: wrong address, invalid API key, or the player isn't running. Run the connection test first.
- **"Please enable the plugin first"**: turn on the plugin's "Enabled" and save.
- **User list is empty**: the configuration wasn't saved yet. Save, then refresh the page.
- **The bound user was filled with a username**: `root` and `admin` are usernames, not user IDs. Pick from the list again, or enter the matching user ID and save — otherwise the library can't be read.
- **No play records**: no bound user, or that user hasn't watched anything lately. Bind a user and sync again.
- **Can't see sync progress**: it runs in the background — check the run log.
- **Covers didn't update**: write-back failed or the original image is locked. Check the lock state in the player and retry.
- **Emby shows no change after writing**: the player's cache hasn't refreshed — trigger a library scan or refresh metadata.

## Next

- [Where film data comes from](./metadata.md)
- [Connect External Services in Three Steps](./overview.md)
