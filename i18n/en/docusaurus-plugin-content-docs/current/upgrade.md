---
title: Upgrade Notes
sidebar_label: Upgrade Guide
description: v1 and v2 data are not compatible, so you can't upgrade by simply overwriting your installation. This page explains why a forced upgrade isn't recommended, the export-and-import route that currently works, and why starting fresh is usually the better choice.
sidebar_position: 1.5
---

# Upgrade Notes

If you're using a 1.x version and planning to move to 2.x, stop and read this page before deciding what to do. **v1 and v2 data are not compatible** — swapping the program over won't bring your old data across, and doing it wrong can even make your old data look as though it has been "lost".

:::warning[Three things to remember first]
1. v1 and v2 are **not compatible** — you cannot upgrade by simply overwriting your installation.
2. A forced upgrade isn't recommended. Assess whether it's worth it first.
3. The currently working approach is to **export your data from v1 and import it into v2**; the less troublesome option is to **install a fresh copy of v2 and start from scratch**.
:::

## Why you can't upgrade directly

v2 redesigns how data is stored and how its internals work. v2 cannot read v1's database files, and the reverse is true too. This isn't a case of "just upgrade and it'll be compatible" — they are two separate, independent systems.

So none of the following approaches will **work**:

- Mounting v1's `db/` and `data/` directories into v2 as-is and starting it up.
- Overwriting v1's installation directory with v2's program files, hoping it will carry on using the old data.
- Repeatedly switching versions in the same data directory, trying to "get lucky".

The usual result is that v2 can't understand the old data, initialises a fresh empty set instead, or throws all sorts of errors. The film files themselves won't be lost (they're just ordinary files on your disk), but the data you spent time organising won't be readable.

## Two viable routes

| Route | Who it's for | What you'll roughly do |
| --- | --- | --- |
| Export → import | People who have already organised a large amount of data in v1 and have too many entries to want to scrape again | Export a backup package from v1, then import it back once v2 is installed |
| Start from scratch | People with little data, or who want to take the opportunity to reorganise while switching versions | Install a fresh copy of v2, run initial setup again, and let the program recognise and scrape everything anew |

### Route one: export and import

This is currently the only way to bring v1 data into v2. It takes three steps:

1. **Export from v1.** Go to v1's Backup and restore page and export films, actors, comics and novels each into their own backup package. If you need images, tick "export image files too". For details, see [Backup and restore](./backend/system/backup-restore.md).
2. **Install a fresh copy of v2.** Don't reuse v1's data directory — install normally by following [Choose an install method](./getting-started/overview.md), then complete the initial setup the first time you open it.
3. **Import into v2.** Go to v2's Backup and restore page and import the backup packages from step 1 one by one.

Before you import, note the following:

- The import only moves **data** (text and images). It does not move system configuration, plugin keys, or the downloader and media server connection settings — you'll need to configure those again in v2.
- Once the import is done, it's a good idea to run a scan and a scrape to fill in things that don't carry over, such as file information and task history.
- The v1 backup package format and v2's validation rules are defined on the [Backup and restore](./backend/system/backup-restore.md) page. If an import is rejected, use "Parse preview" first to see the specific reason.

### Route two: start from scratch (recommended)

To be honest, for most people this route is **less troublesome**:

- You don't have to worry about details like backup package formats, validation rules or image paths.
- v2's recognition and scraping are improved over v1, so running it fresh usually gives better results than moving old data across.
- You configure things the v2 way from the start, without having to learn v1 first and then v2.

The method is simple: install a fresh copy of v2, point it at your film directory, and let the program scan, recognise and scrape again. You don't touch the film files — you're moving the "program", not the "files".

Only go with route one if the amount of data in v1 is truly too large and re-scraping would be too costly.

## Whichever route you choose, back up first

Upgrading means changing versions, so before you do anything, make a complete copy of v1's `db/` and `data/` directories as a safety net. That way, if something goes wrong during the import, you can always fall back to the old environment and carry on — you won't be left with nothing on either side.

Keep the old instance installed **until everything is working properly in v2**, and before retiring it remember to deactivate the online licence under **Profile → Licence** to free up a slot for the new instance — see [Licence and watermark](./faq.md#licence-and-watermark).

## Non-Docker installs: handle the data directory before installing 2.0

With Docker, the data lives in the mounted directories, so switching images and recreating the container doesn't affect it. But **installers, binaries and NAS app packages are different**: the data directory sits right next to the program directory, so when you uninstall the old version and install the new one, the data directory may be wiped along with it. Before installing 2.0, it's a good idea to **clear out or back up** the data directory first:

- If you're taking the "export and import" route: make sure all backup packages are downloaded before touching the old environment.
- If you're taking the "start from scratch" route: even if you don't want the data, it's still a good idea to copy `db/` and `data/` as a safety net, so you're not left empty-handed if you change your mind.

Using the Windows installer as an example, the order is:

1. **Stop the service**: right-click the tray icon and stop AMMDS.
2. **Find the data directory**: right-click the tray icon and use "View logs" or the data directory entry to track down where the data directory is.
3. **Move the data directory**: copy the whole thing to a location outside the program directory (for example, another drive). This is the backup mentioned above.
4. **Uninstall the old version**: go through the system's uninstall process.
5. **Install the new version**: install 2.0 and go through initialisation as a fresh install.

Other installers (NAS app packages, etc.) work much the same way: **stop the service, move the data out, then uninstall**. Different uninstallers behave differently — some delete the data directory on their own, others ask whether you want to keep the data during uninstall. Either way, don't bet on the uninstaller's prompts; moving the data out manually in advance is the safest option.

## Next

- [Choose an install method](./getting-started/overview.md)
- [First launch: signing in and basic settings](./getting-started/first-login.md)
- [Backup and restore](./backend/system/backup-restore.md)
- [Common questions](./faq.md)
