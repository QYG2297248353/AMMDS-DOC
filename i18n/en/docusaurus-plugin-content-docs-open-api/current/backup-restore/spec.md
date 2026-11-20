---
title: Backup package spec
sidebar_label: Backup package spec
description: The complete format spec for backup packages — zip layout, manifest.json and data.json fields, field tables for all five data types, image mapping, validation and import matching rules. For hand-written scripts or AI-generated packages.
sidebar_position: 2
---

# Backup package spec

This page is the **complete format spec** for backup packages, for anyone writing their own script or having AI turn crawled data into a package. To understand what is inside a package, see [Backup package structure](./overview.md); to have AI build one for you, go straight to [AI production guide](./ai-guide.md).

Only one layout is allowed. Packages built to this spec pass AMMDS "parse preview" as **validation passed** and import cleanly. Authoritative implementations and the template repo are linked at the end.

## 1. The ten rules

| # | Rule |
| --- | --- |
| 1 | The zip **root** must contain `manifest.json` and `data.json`; missing either rejects the whole package |
| 2 | `format` is always `ammds-backup`, `formatVersion` is always `1` |
| 3 | `type` is one of `movie` / `actor` / `comic` / `novel` / `tv` and must match the content structure |
| 4 | `count` must **exactly equal** the number of elements in the `data.json` array |
| 5 | Every file under `images/` must be registered in `manifest.imageFiles` as `{ref, path, sha256}` |
| 6 | `imageFiles[].path` must start with `images/` and match the zip entry name **character for character** |
| 7 | Image field values in `data.json` must be **exactly** the matching `imageFiles[].ref` (case-sensitive) |
| 8 | `http(s)://` external links are written **only** in `data.json`, **never** registered in `imageFiles` |
| 9 | Entry names cannot be empty, start with `/`, or contain `\`, `:` or a `..` path segment |
| 10 | Dates use `yyyy-MM-dd`; enums use codes only; **integer fields must be integers** (`120` is fine, `120.0` fails that item on import) |

## 2. Zip layout

```
ammds-backup-movie-20260911153000.zip
├── manifest.json              # required, root
├── data.json                  # required, root, JSON array
└── images/                    # optional: only when there are images to pack
    └── <item key>/            # one directory per item, key derived from a sanitized identifier
        ├── poster_0.jpg       # flat image field: <field>_<index>.<ext>
        ├── fanart_0.jpg
        └── pages/             # comics only: chapter page images
            ├── page00001.jpg
            └── page00002.jpg
```

- With no images at all, **do not** create `images/`; write `includeImages: false` and `imageFiles: []`.
- Use UTF-8 for zip entry names; keep `imageFiles[].path` ASCII-only where possible to avoid cross-platform encoding issues.
- One package holds one `type`; movies and actors must not be mixed.

## 3. manifest.json fields

| Field | Type | Required | Value / notes |
| --- | --- | --- | --- |
| `format` | string | yes | Always `ammds-backup` |
| `formatVersion` | int | yes | Always `1`; higher than supported is rejected |
| `type` | string | yes | `movie` / `actor` / `comic` / `novel` / `tv` |
| `generatedAt` | string | advised | ISO-8601 with offset, e.g. `2026-09-11T15:30:00+08:00`; missing is only a warning |
| `appVersion` | string | advised | AMMDS version that produced the package; missing is only a warning |
| `includeImages` | boolean | yes | Whether images are packed; must agree with the presence of `images/` files |
| `count` | int | yes | Length of the `data.json` array, must match |
| `imageFiles` | array | yes | Image mapping array; `[]` if none |

Each `imageFiles[]` item:

| Field | Type | Notes |
| --- | --- | --- |
| `ref` | string | Image reference key, **character-for-character identical** to the value in `data.json`; local images conventionally start with `data` |
| `path` | string | Relative path inside the zip, must start with `images/` and actually exist |
| `sha256` | string | SHA-256 of the file bytes (64 lowercase hex chars); currently written but **not verified** on import, yet must be correct |

Example:

```json
{
  "format": "ammds-backup",
  "formatVersion": 1,
  "type": "movie",
  "generatedAt": "2026-09-11T15:30:00+08:00",
  "appVersion": "1.6.80",
  "includeImages": true,
  "count": 1,
  "imageFiles": [
    {
      "ref": "data/images/media/2026/09/ai-001-poster.jpg",
      "path": "images/AI-001/poster_0.jpg",
      "sha256": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
    }
  ]
}
```

## 4. data.json conventions

1. Top level is a **JSON array** `[ {...}, {...} ]`, one element per record.
2. Field names are **camelCase**, e.g. `originalTitle`, `imagePath`, `fullChapter`.
3. Omit fields you cannot obtain (or write `null`); never write placeholders like `"unknown"`, `"-"`, `"N/A"`.
4. Import **ignores unknown fields**; misspelled fields therefore mean data loss. Follow the tables exactly.
5. Numbers are strict: integer fields take integers (`runtime`, `pageCount`, `season`, `episode`, `sequence`, `sort`, `fileSizeByte`, `resolutionWidth`); ratings, height and weight take decimals (`8.5`).
6. Dates are `yyyy-MM-dd` strings; invalid formats are blanked out.
7. Enums take codes only (section 7); Chinese names fall back or blank out.
8. Array vs single value — the most common mistake:

| Field | Type | Shape |
| --- | --- | --- |
| `poster` | movie | array `["data/...jpg"]` |
| `poster` | actor | single string `"data/...jpg"` |
| `thumb` | actor | array |
| `cover` / `backCover` | comic / novel | single string |
| `posterHd` / `fanartHd` / `thumbHd` | movie / tv | single string |
| `poster` / `fanart` / `thumb` / `logo` / `banner` | tv show-level | array |
| `still` | tv episode-level | single string |

> Import accepts a single value where an array is expected, but always follow the table.

9. Do not write `id`, `createdTime`, `updatedTime`, `version`: they are ignored and the primary key is regenerated.

## 5. Fields for the five types

Markers: `S` string, `S[]` string array, `I` integer, `N` number, `B` boolean, `O[]` object array. `★` = required for matching/import; `·` = optional.

### 5.1 movie

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `uniqueid` | S[] | ★ | Identifier / code list, **primary matching key**, at least one (case-insensitive) |
| `originalTitle` | S | ★ | Original title; fallback for `merge` when IDs do not match |
| `titleCn` | S | · | Chinese title |
| `plot` / `plotCn` | S | · | Synopsis / Chinese synopsis |
| `tagline` / `outline` | S | · | Tagline / outline |
| `rating` | N | · | Rating (out of 10) |
| `premiered` | S | · | Release date `yyyy-MM-dd` |
| `runtime` | I | · | Runtime in minutes |
| `mpaa` / `language` / `country` | S | · | Rating / language / country |
| `mosaic` | S | · | Censored / uncensored marker |
| `genre` / `tag` / `studio` / `issueStudio` / `director` | S[] | · | Genre / tags / studio / publisher / director |
| `actors` | O[] | · | `[{"name":"Name","role":"Role"}]` |
| `sets` | O[] | · | `[{"name":"Series","overview":"Desc"}]` |
| `sourceLinks` / `platform` | O[] | · | `[{"platform":"Site","link":"https://..."}]` |
| `extend` | O[] | · | `[{"key":"k","value":"v"}]` |
| `magnet` | O[] | · | `[{"name":"n","link":"magnet:?...","size":123,"hash":"...","date":1754006400000}]`; `date` is a **millisecond epoch integer** |
| `subtitle` | O[] | · | `[{"sid":"..","name":"..","link":"..","language":"zh","extension":"srt","duration":0,"path":""}]` |
| `poster` / `fanart` / `thumb` / `extrafanart` | S[] | · | Cover / fanart / thumb / stills (arrays) |
| `posterHd` / `fanartHd` / `thumbHd` | S | · | HD images (single values) |
| `trailer` / `dataSource` | S | · | Trailer URL / data source code |
| `shared` | B | · | Shared flag |
| `pHash` / `osHash` / `filePath` | S[] | · | Hashes / paths |
| `resolutionWidth` / `resolutionHeight` / `fileSizeByte` | I | · | Resolution / size (usually omitted when crawling) |

### 5.2 actor

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `name` | S | ★ | Stage name, **matching key**, cannot be empty |
| `aliases` / `agency` / `tag` / `style` / `specialFeatures` | S[] | · | Aliases / agency / tags / style / features |
| `gender` | S | · | `male` / `female` / `shemale` |
| `heightCm` / `weightKg` | N | · | Height / weight |
| `birthDate` / `debutDate` | S | · | Birth / debut date `yyyy-MM-dd` |
| `nationality` / `bloodType` / `cupSize` | S | · | Nationality / blood type / cup size |
| `bustChestCm` / `waistCm` / `hipsCm` / `penisCm` | N | · | Body measurements |
| `score` | N | · | Rating (out of 10) |
| `socialLinks` | O[] | · | `[{"platform":"Twitter","link":"https://..."}]` |
| `retired` / `deceased` / `shared` | B | · | Retired / deceased / shared |
| `poster` | S | · | Portrait (single value) |
| `thumb` | S[] | · | Posters (array) |
| `bio` | S | · | Biography |
| `extend` / `platform` | O[] | · | Same as movie |
| `dataSource` | S | · | Data source code |

### 5.3 comic

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `title` | S | ★ | Album name, cannot be empty |
| `isbn` | S | · | ISBN, **preferred matching key** |
| `type` | S | · | `comic` (default) / `album` |
| `cover` / `backCover` | S | · | Cover / back cover (single values) |
| `description` / `notes` / `web` | S | · | Description / notes / link |
| `season` | I | · | Season, default `1` |
| `fullChapter` / `arrange` / `blackAndWhite` | B | · | Single-chapter mode / arranged / black-and-white |
| `publishDate` | S | · | Publication date `yyyy-MM-dd` |
| `publisher` / `imprint` / `series` / `genre` | S | · | Publishing info |
| `tags` / `characters` / `teams` / `locations` | S[] | · | Tags / characters / teams / locations |
| `language` | S | · | Default `zh` |
| `format` | S | · | `Digital` (default) / `Print` |
| `manga` | S | · | `Yes` (default) / `No` / `Unknown` / `YesAndRightToLeft` |
| `ageRating` | S | · | Age rating code, default `Adults Only 18+` |
| `communityRating` | N | · | Community rating 0.0–5.0 |
| `writer` `penciller` `inker` `colorist` `letterer` `coverArtist` `editor` `translator` | S | · | Credits |
| `chapters` | O[] | ★ | Chapter array, see below |

`chapters[]`: `title` (chapter name), `episode` (chapter number, I), `description`, `pages` (page array, O[]).
`chapters[].pages[]`: `imagePath` (image reference — `data/...` key when packed, `http(s)://` when linked), `sequence` (page order, I). Pages are rebuilt as 1..N in array order; pages with an empty `imagePath` are skipped.

> `pageCount` and `episodeCount` are derived; do not write them (they are recalculated).

### 5.4 novel

| Field | Type | Req | Notes |
| --- | --- | --- | --- |
| `title` | S | ★ | Book title; empty items are skipped |
| `isbn` | S | · | Matching key together with title |
| `subtitle` / `author` / `genre` / `publisher` / `publishYear` / `series` | S | · | Bibliographic info |
| `tags` / `category` | S[] | · | Tags / categories |
| `rating` | N | · | Rating 0–10 |
| `description` | S | · | Synopsis |
| `language` | S | · | Default `zh` |
| `pageCount` | I | · | Page count |
| `cover` / `backCover` | S | · | Cover / back cover (single values) |
| `status` | S | · | Status code, default `continue` |
| `chapters` | O[] | ★ | `[{"title":"Chapter 1","content":"text","sort":1}]` |

Chapters with an empty `title` are skipped; `content` is plain text or an HTML fragment, use `\n` for line breaks, do not mix in `\r\n`.

### 5.5 tv

> One item = **one show**, not one episode. Seasons, episodes and episode files are nested arrays; file information must not be flat at the top level (a top-level `filePath` is ignored as unknown).

Show fields: `libraryType` fixed `"tv"` (★); `title` main title (★); `tmdbId` / `bgmId` / `tvdbId` / `imdbId` site IDs (primary matching key, strongly recommended); `originalTitle` / `titleCn` / `sortTitle` / `showTitle` titles; `tvMediaType` category code; `plot` / `plotCn` / `outline` / `tagline` synopsis; `status` only `Continuing` / `Ended`; `premiered` first-air `yyyy-MM-dd`; `year` (I); `runtime` (I); `rating` (N) / `votes` (I); `mpaa` / `language` / `country`; `genre` / `tag` / `studio` / `countries` / `director` / `credit` (S[]); `poster` / `fanart` / `thumb` / `logo` / `banner` (show-level images, S[]); `posterHd` / `fanartHd` / `thumbHd` (single values).

Nested arrays: `uniqueIds` (`{type, value}`), `actors` (`{name, role, order, thumb}`), `namedSeasons` (`{number, name}`), `seasonPlots` (`{number, plot}`), `seasons` (`{seasonNumber, name, overview, poster, airDate, episodeCount, dataSource, bgmSubjectId, tmdbSeasonId}` — `seasonNumber` is the business key, 0 means specials), `episodes` (`{seasonNumber, episodeNumber, title, titleCn, plot, airDate, runtime, rating, still, tmdbEpisodeId, ...}` — season + episode number form the business key), `episodeFiles` (`{seasonNumber, episodeNumber, filePath, fileName, partIndex, available, durationSeconds, resolution, width, height, fileSize, ...}` — `fileName` is required or that file is skipped), `seasonBindings` (`{seasonNumber, dataSource, sourceSubjectId, bindMode, episodeOffset, episodeCount}`).

> `lastCheckedAt`, `durationSeconds` and `fileSize` are integers; `durationSeconds` is in seconds, not milliseconds.

## 6. Image mapping

- Image fields keep their **original reference**: a full `http(s)://` URL is an external link; a relative path starting with `data` is a local image.
- Export packs in only `data` references whose files actually exist; a missing extension falls back to `.jpg`.
- In-package paths: flat fields `images/<safe key>/<field>_<index>.<ext>`, e.g. `images/AI-001/poster_0.jpg`; comic pages `images/<safe key>/pages/page00001.jpg`. Sanitizing replaces anything outside `[a-zA-Z0-9_-]` with `_`, and an empty key becomes `item_<index>`.
- Every packed image must be listed in `imageFiles`, with `ref` identical to the `data.json` value and `sha256` the SHA-256 of the file bytes.
- External links are neither packed nor rewritten; local images are written back to a new `data` path on import and deduplicated by content.

## 7. Dates and enums

- Dates: `yyyy-MM-dd` strings, e.g. `premiered`, `birthDate`, `debutDate`, `publishDate`, `airDate`. Note `movie.magnet[].date` and `episodeFiles[].lastCheckedAt` are **millisecond epoch integers**.
- Enums use codes only: `dataSource` uses `official` / `metatube` / `theporndb` / `stashbox` / `fanza_dmm` / `m_team_dmm` / `r18dev` / `thejavdb` / `plugin` / `user` / `local`; `gender` uses `male` / `female` / `shemale`; `bloodType` uses `A` / `B` / `AB` / `O` / `RH+` / `RH-`; comic `type` uses `comic` / `album`; `ageRating` uses its rating code (may contain spaces, written verbatim); novel `status` uses its status code; TV `dataSource` uses `tmdb_tv` / `bangumi` / `tvdb` / `local` / `plugin` / `user` (not shared with the movie domain); `tvMediaType` uses `anime` / `jp_drama` / `kr_drama` / `cn_drama` / `western_tv` / `documentary` / `variety` / `other`.
- Unrecognized enums fall back or blank out; the item still imports but data is lost.

## 8. Validation: what gets rejected

Any of the following rejects the entire import and **changes no existing data**:

- `format` is not `ammds-backup`.
- `formatVersion` is below 1 or above the supported version (currently 1).
- `type` is empty or not an allowed value; multiple types mixed in one package.
- `manifest.json` or `data.json` is missing.
- `count` does not match the actual number of items in `data.json`.
- `imageFiles[].ref` is empty; `path` is empty, invalid, does not start with `images/`, or is not present in the zip.
- An entry name is empty, starts with `/`, or contains `\`, `:` or a `..` path segment.
- `includeImages` is true but `imageFiles` is empty while `images/` files exist.

Warnings only: missing `generatedAt` / `appVersion`; a `ref` in `imageFiles` not used in `data.json`; duplicate `path`; unpacked images present in the package; unrecognized entries.

## 9. Matching and conflict strategies

| Type | How the same record is identified |
| --- | --- |
| movie | `uniqueid` intersection, with identifier normalization (full-width to half-width, lowercase, strip separators, recognize tmdb/tvdb/imdb/bgm/douban prefixes) |
| actor | `name` exactly; then whitespace-folded normalization, **without** merging `Iron Man` and `Ironman` |
| comic | `isbn` first if present, otherwise `title` case-insensitively |
| novel | `title` + `isbn` |
| tv | `tmdbId` → `bgmId` → `tvdbId` → `imdbId`; if all site IDs are missing, `merge` falls back to title |

| Strategy | Behavior |
| --- | --- |
| `skip` | Keep the existing record, add only new ones; matched items do not parse images or write |
| `overwrite` | Replace the whole matched record with the package version, create new ones |
| `merge` | Fill only empty scalars on matched records, union lists without duplicates; for movie, fall back to title when ID matching fails |

Unmatched items are always created; a failed item is counted and logged, **without aborting the whole package**. Imported files are named with a timestamp: `ammds-backup-<type>-<epoch millis>.zip`.

## 10. Authoritative implementation and template

- **Authoritative spec and reference implementation** (source repo `docs/Backup restore rules/`): https://github.com/QYG2297248353/AMMDS-Docker/tree/master/docs/备份恢复规则 — the zero-dependency generator `ammds_backup_pack.py` is in the same folder.
- **Template repository** (recommended starting point): https://github.com/QYG2297248353/AMMDS-BackupPackage.git — fill in 4 blanks and say one sentence; the template's `Rule/AI备份包生成规范.md` and scripts handle field mapping, packing and self-checks.

:::note[The source code is authoritative]
This page reflects the current implementation. The source repo's descriptive docs contain a few historical differences from the code (e.g. `extend` key names and some timestamp field types). When generating a package, trust this page's field tables and the template repo's `Rule/` rules.
:::

## Next

- [Backup package structure](./overview.md)
- [AI production guide](./ai-guide.md)
- [Backup and restore in the guide](/docs/backend/system/backup-restore)
