---
title: Backup and restore
sidebar_label: Backup & Restore
description: Export films, actors, comics and novels as a backup package and restore them elsewhere; also import via share links and keep a copy of your configuration off-site.
sidebar_position: 2
---

# Backup and restore

This page covers two different jobs. One is **moving your data**: export the entries you have organised, then restore them elsewhere. The other is **keeping a copy of your configuration off-site**. It only handles text and images, not your system settings or plugin keys.

> **Metadata**: the information describing an entry — title, actors, summary, cover, chapters. That's what goes into a backup package; the video files themselves don't.

## 1. Exporting data

Open **System Management → Backup and Restore → Export**. Four data cards, each deciding separately whether to package images too:

| Type | What's exported | Packaged as well if you tick "export images" |
| --- | --- | --- |
| Films | Film data, file info, linked actors, series, magnets, subtitles | Poster, backdrop, thumbnail, stills and high-resolution images |
| Actors | Actor data (measurements, tags, social accounts and so on) | Headshots and posters |
| Comics | Album data, chapters, chapter page records | Cover, back cover and every chapter page image |
| Novels | Novel data and chapter text | Cover and back cover |

Exporting runs in the background, so you can leave the page and download later from **Export records**. That list shows type, filename, state (exporting / done / failed), size and creation time, and lets you download or delete. While a type is exporting, its button stays in a loading state, so you cannot start a second one.

:::tip[Only local images are collected]
Only images stored in the local data directory, with the file actually present, go into the package. Remote links never do. After moving, the old paths still work if you kept the original data directory. Remote links depend on the original site still being reachable.
:::

## 2. What's in a backup package

A standard package is an archive whose root must contain `manifest.json` and `data.json`, with an optional images folder:

| File | Role |
| --- | --- |
| `manifest.json` | The manifest: format tag, version, type, entry count, image list |
| `data.json` | The data itself, one entry each |
| `images/` | Only present when you exported images; one folder per entry |

One package holds one type only. The entry count in the manifest must match the real count in `data.json`, otherwise import is refused.

## 3. Restoring data

1. Open **Import** and drag the archive (or a single `data.json`) into the upload area.
2. Pick an import strategy (see below).
3. Click **Parse preview** to see the entry count, image count, package size and file count.
4. Once validation passes, click **Start import**; the result shows how many succeeded, were skipped, updated or failed.

Parsing runs checks first. It looks for a missing manifest or data file, invalid entry paths, a wrong format tag, an unsupported version, a disallowed type, an entry count that does not match the manifest, and image paths outside the images folder or missing files. Any failure **blocks the import** and changes nothing at all.

A single failing entry doesn't stop the rest; reasons are recorded and up to 50 are shown in the details.

### Settings: the three strategies

| Strategy | Behaviour | When to use it |
| --- | --- | --- |
| Skip existing | Matching entries are skipped, nothing written or updated | You only want to fill gaps and don't want to damage what you have |
| Overwrite | Matching entries are overwritten; comics, novels and shows have their chapters rebuilt | You want the backup's version to replace what you have |
| Merge | Only missing fields are filled and lists are de-duplicated; nothing is deleted | You want to combine both sides |

What counts as the same entry? Films match if they share an ID number, and by title too under merge. Actors match if the name is identical. Comics prefer ISBN, then album name. Novels match by title or ISBN. Shows match by external site ID, in order.

## 4. Importing a share link

On the **Share import** tab:

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| Share link or short code | The public address you were given, or the short code at the end of it | Nothing to preview |
| Access password | Only if the owner set one | You're asked for a password and can't import |
| Import strategy | Skip existing / overwrite / merge | "Skip existing" by default |

Fill it in, click **Preview**, confirm the type, title and entry count, then click **Import**. If the owner has not allowed importing, you will see "this share doesn't allow importing". You can then submit a reason and wait, but your user ID, nickname and email must be filled in first.

Lower on the same page you can switch to **Link records** (result: success, no permission, invalid link, expired, failed) and **Request records** (target share, reason and state; pending ones can be cancelled). Deleting a record doesn't affect data already imported.

## 5. Keeping configuration off-site

The packages above **don't include system settings, plugin keys or subscription rules**. To keep a remote copy of your configuration, use the cloud drive or object storage service under **Integrations → Cloud Sync**:

- It backs up configuration-type data only, with no images or film entries, so the package is small.
- The package is encrypted; **if you lose the passphrase it can't be restored**. Keep it somewhere separate from the backup file.
- On restore you can choose merge, local-first or remote-first.
- The connection settings of those services themselves aren't restored, so you don't end up unable to reach the remote after restoring.
- Cloud drive handles configuration backup only; use object storage when you want to put images and similar assets remotely. The two are independent.

> **Passphrase**: a line of text you choose, used to encrypt and decrypt the backup. The system does not keep it for you. If you forget it, you simply make a new backup.

## Habits worth having

1. Export data per type, and tick "export images" only when you need them.
2. Back configuration up separately to the cloud, keeping the passphrase apart from the backup file.
3. Before restoring, run **Parse preview** on an instance of the same version and confirm it passes.
4. Do a full export before a major upgrade, then run a system check afterwards.

## If something goes wrong

- **Import refused**: usually an incomplete package or an entry count that doesn't match the manifest. Export again and don't edit files inside the package by hand.
- **Nothing changed after importing**: check whether you picked "skip existing"; use "overwrite" if you meant to replace.
- **Images didn't come back**: the package had no images (not ticked at export time) or they were remote links. Export again with images ticked.
- **An export record shows failed**: look at the task log for the reason; no disk space is the usual one.
- **Cloud configuration won't restore**: check that the passphrase is right and the remote file is not damaged. Connection settings are never restored and must be entered by hand.
- **Want to confirm the restore was clean**: run a full scan on [System check, logs, storage, licence and users](./maintenance.md).
