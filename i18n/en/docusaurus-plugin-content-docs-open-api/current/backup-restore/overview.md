---
title: What's inside a backup package
sidebar_label: Backup Package
description: For anyone writing their own backup script or inspecting a backup's contents - how the package is built, how images are handled, how records are matched on import, and which packages are rejected.
sidebar_position: 1
---

# What's inside a backup package

AMMDS can export your film and actor data into a compressed archive (a backup package) and import that package again later. This page is for people who want to **write their own backup script** or **open a package and see what is in it**: what a valid package looks like, and where things tend to go wrong.

If you only want to back up and restore from the interface, "Backup and restore" under Admin Features is enough - you can skip this page.

## First, the words

> **Backup package**: a zip archive holding the exported data. Use it to move data between two AMMDS installs, or to archive it long-term.

> **JSON**: the layout of the data file inside the package, made of field names and values. Readable by people and by programs.

> **Manifest**: the file inside the package that records what the package is, how many entries it holds and where the images are. AMMDS reads it first on import.

> **Unique identifier**: a film's ID number. Import uses it to decide whether a record already exists.

## What goes into a package

| File | Required | Contents |
| --- | --- | --- |
| `manifest.json` | Yes | The manifest: format marker, version, data type, generation time, entry count, image mapping |
| `data.json` | Yes | The data itself - a JSON array, one element per film or actor |
| `images/` | No | Image directory. Only present when "also export image files" was ticked on export |

Both required files sit in the **root** of the archive.

:::warning[One data type per package]
A package holds **either** films **or** actors, never both. The type is written in the manifest's `type` field: `movie` for films, `actor` for actors.
:::

## What the manifest records

| Field | Notes |
| --- | --- |
| `format` | Format marker, always `ammds-backup` |
| `formatVersion` | Format version number, currently `1` |
| `type` | Data type: `movie` (films) or `actor` (actors) |
| `generatedAt` | When it was generated |
| `appVersion` | The AMMDS version that produced the package |
| `includeImages` | Whether the package contains image files |
| `count` | How many entries are in `data.json` |
| `imageFiles` | Image mapping list - each entry records "original path → path in package → file digest" |

When "also export image files" was not ticked, there is no `images/` directory, `includeImages` is `false`, and `imageFiles` is an empty list.

## How images are handled

Image fields in the package keep their **original reference**, in one of two forms:

| Form | What it looks like | Packed on export? | What import does |
| --- | --- | --- | --- |
| External URL | A full web address starting with `http` or `https` | **No** | Left exactly as it is, never rewritten |
| Local path | A relative local path starting with `data` | Only if the file really exists | Written to disk, then the field is rewritten to the new `data` path |

Both forms can appear in the same field.

It comes down to two sentences: external URLs are never touched, on export or import; local paths are only packed when the file exists, and get rewritten to a new path on import.

:::note[Images are de-duplicated on import]
When a package carries images, import de-duplicates by file content: identical files are stored once. Importing the same package repeatedly will not fill up the disk.
:::

## How import decides it is the same record

| Data type | What counts as the same record |
| --- | --- |
| Films (`movie`) | Overlapping identifiers. If any ID number on an existing record matches one on the incoming entry, it is the same record |
| Actors (`actor`) | The name must match exactly |

When a record already exists, the strategy you picked decides what happens:

| Strategy | Behaviour |
| --- | --- |
| Skip | Existing records are left alone; only new ones are added |
| Overwrite | Existing records are updated from the package; missing ones are created |

## Which packages are rejected outright

If any of the following is true, the whole import is refused and **no existing data is changed**:

- The manifest's `format` is not `ammds-backup`.
- The format version is higher than this build supports.
- `manifest.json` or `data.json` is missing.
- The archive contains suspicious file paths that try to escape the extraction directory.

## Settings

| Setting | What to fill in | If you leave it out or get it wrong |
| --- | --- | --- |
| `format` | Always `ammds-backup` | Anything else and the whole package is rejected |
| `formatVersion` | The current version, `1` | Higher than supported and it is rejected |
| `type` | Either `movie` or `actor` | Any other type, or mixing both, makes the package invalid |
| `data.json` | An array of records whose fields match the AMMDS entities | Missing file means rejection; wrong fields mean the import fails |
| Image references | Full URLs for external images, relative paths starting with `data` for local ones | A wrong path leaves the image missing after import |
| Conflict strategy | Pick "skip" or "overwrite" | Without one, behaviour on duplicates is undefined |

## If something goes wrong

- **The import is refused**: open `manifest.json` and check that `format` is `ammds-backup` and that `type` is `movie` or `actor`. Those two are wrong most often.
- **Images do not show after import**: external URLs are never processed, so check whether that address still opens. For local paths, confirm that "also export image files" was ticked on export.
- **The entry count is wrong after import**: films match by ID number and actors by exact name. A differently written ID number, or a name with an extra space, counts as a new record.
- **You want to check whether a package was tampered with**: compare the file digest recorded for each image in the manifest with the digest of the actual file in the package.

## The full specification

This page covers the essentials. The complete directory layout, the manifest and data field definitions, the image mapping rules and the import rules are in [Backup package spec](./spec.md) in the same folder; the source-repository document is also kept here: https://github.com/QYG2297248353/AMMDS-Docker

To have AI turn crawled data into a standard backup package, follow [AI production guide](./ai-guide.md): answer four questions, copy one prompt, then check the delivery. Template repository: https://github.com/QYG2297248353/AMMDS-BackupPackage.git
