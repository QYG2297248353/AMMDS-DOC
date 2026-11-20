---
title: Common endpoints at a glance
sidebar_label: Endpoint Reference
description: One table listing the commonly used open API endpoints - address, what it does, what parameters it needs and what it returns - plus request examples and field notes.
sidebar_position: 2
---

# Common endpoints at a glance

This page collects the commonly used open API endpoints into one table: address, purpose, parameters, and what comes back. Every address and parameter here exists in the current version.

For the general rules - response shape, status codes, date formats - see [How to read requests and responses](./conventions.md).

## First, the words

> **Endpoint / API**: a door AMMDS opens to the outside. One address is one endpoint.

> **Request**: what your program sends to AMMDS - "this is what I want".

> **Response**: the bundle AMMDS sends back.

> **JSON**: the layout of that answer, made of field names and values.

## The table

Prefix every address below with `http://<host>:<port>` and send the `x-api-key` header - except for the first row.

| Method | Address | What it does | Parameters | What it returns |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/health/check` | Is the service alive? | None, and no key needed | `data` is always `true` |
| POST | `/api/v1/movie/import` | Import a film, uploading images as files | Form fields, same meaning as quick import; multi-value fields as an array written as a string | `data` is `true` or `false` |
| POST | `/api/v1/movie/import/quick` | Quick import, images by URL | `uniqueid` and `originalTitle` required, the rest below | `data` is `true` or `false` |
| POST | `/api/v1/movie/import/from-source` | Import straight from a source using its own ID | `source` and `id` required, `provider` optional | `data` is the ID of the imported film |
| GET | `/api/v1/movie/{id}` | Full details of one film | `id` in the path is the film's primary key | Full record; "film not found" if it does not exist |
| GET | `/api/v1/movie/count` | How many films are in the library | None | `data` is a number, such as `1286` |
| POST | `/api/v1/movie/lookup` | Match a local film by ID number or file fingerprint | At least one of `number`, `pHash`, `osHash` | `data` is the film ID on a hit, `null` otherwise |
| POST | `/api/v1/movie/search` | Search several sources at once | `keyword` required, `waitTime` optional | `data` is a list of records |
| POST | `/api/v1/translate/language/identify` | Tell what language a piece of text is | `text` required | `data` holds a language code and name |
| POST | `/api/v1/translate/text` | Translate a piece of text | `text` and `target` required, `source` and `provider` optional | `data` holds the original, the translation and the engine used |

:::note[The comic endpoints are not in this table]
The comic reader uses a separate set of addresses starting with `/api/mihon`, with a different kind of key. That is covered in "Read your comics in a reader app".
:::

## Health check

No key needed. Use it to confirm the program is up.

```bash
curl -s http://127.0.0.1:8080/api/v1/health/check
```

```json
{
  "code": 200,
  "message": "success",
  "data": true,
  "timestamp": 1753958400000
}
```

It only proves the program is running; it does not check the database, disk or external services. A probe every 30 to 60 seconds is sensible.

## Quick import

`POST /api/v1/movie/import/quick`, with the header `Content-Type: application/json`.

| Field | Required | Notes |
| --- | --- | --- |
| `uniqueid` | Yes | ID number, used as the unique key; importing twice never creates two records |
| `originalTitle` | Yes | Original title |
| `numbers` | No | Other ways of writing the same ID number |
| `titleCn` | No | Chinese title |
| `plot` / `plotCn` | No | Synopsis / Chinese synopsis |
| `rating` | No | Rating, out of 10 |
| `premiered` | No | Release date, written `yyyy-MM-dd` |
| `runtime` | No | Length in minutes |
| `language` / `country` | No | Language / country |
| `mosaic` | No | Mosaic flag |
| `posterUrl` / `fanartUrl` / `thumbUrl` / `extrafanartUrl` | No | Cover / backdrop / thumbnail / stills URLs |
| `genres` / `tags` | No | Genres / tags |
| `studio` / `issueStudio` | No | Studio / distributor |
| `director` | No | Director |
| `favorite` / `subscribe` | No | Favourite / subscribed; both default to `false` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/import/quick \
  -H "x-api-key: <your key>" \
  -H "Content-Type: application/json" \
  -d '{
    "uniqueid": "ABC-123",
    "originalTitle": "示例标题",
    "titleCn": "示例标题（中文）",
    "plot": "简介",
    "rating": 8.5,
    "premiered": "2025-10-16",
    "runtime": 120,
    "posterUrl": ["https://example.com/poster.jpg"],
    "genres": ["剧情"],
    "tags": ["高清"],
    "studio": ["示例制作商"],
    "favorite": true
  }'
```

```json
{ "code": 200, "message": "success", "data": true, "timestamp": 1753958400000 }
```

When import fails, `code` is `500`, `message` is "导入失败" and `data` is `false`.

The form import at `/api/v1/movie/import` uses exactly the same field meanings, with two differences: images are uploaded as **files** rather than URLs, and multi-value fields are submitted as an array written as a string. Use it when you already have the images locally and do not want to rely on external links.

## Import from a source

`POST /api/v1/movie/import/from-source`.

| Field | Required | Notes |
| --- | --- | --- |
| `source` | Yes | The source; see the source table below |
| `id` | Yes | The film's ID within that source |
| `provider` | No | Category within the source, such as the provider ID for `metatube`, or one of `jav`, `scene` and `movie` for `theporndb` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/import/from-source \
  -H "x-api-key: <your key>" \
  -H "Content-Type: application/json" \
  -d '{"source":"metatube","id":"12345","provider":"jav"}'
```

```json
{ "code": 200, "message": "success", "data": "movie-uuid", "timestamp": 1753958400000 }
```

On failure `message` is "导入失败，请检查数据源和参数".

:::warning[The source must be enabled first]
This endpoint calls the matching plugin. If the source is not enabled in the plugin settings, or the plugin has no key of its own, the import fails outright.
:::

## Film detail and count

`GET /api/v1/movie/{id}` returns the full record for one film; `id` in the path is the film's primary key (a string). If it does not exist you get "film not found".

`GET /api/v1/movie/count` returns the total:

```json
{ "code": 200, "message": "success", "data": 1286, "timestamp": 1753958400000 }
```

`/count` is a fixed address and takes priority over `/{id}`, so it is never mistaken for a film ID.

## Local match

`POST /api/v1/movie/lookup` looks for a film already in the library, by ID number or file fingerprint.

| Field | Notes |
| --- | --- |
| `number` | ID number |
| `pHash` | Perceptual image hash |
| `osHash` | File OsHash |

Fill in at least one of the three, otherwise the call fails immediately. On a hit `data` is the film ID; otherwise it is `null`.

## Multi-source search

`POST /api/v1/movie/search`.

| Field | Required | Notes |
| --- | --- | --- |
| `keyword` | Yes | ID number or title words |
| `waitTime` | No | How many seconds to wait for the sources; default `60` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/search \
  -H "x-api-key: <your key>" \
  -H "Content-Type: application/json" \
  -d '{"keyword":"ABC-123","waitTime":30}'
```

`data` is a list of records. Common fields in each entry:

| Field | Notes |
| --- | --- |
| `source` / `provider` | Source and category; pass them straight to `import/from-source` |
| `id` | The film's ID within that source |
| `number` / `title` / `summary` | ID number, title, synopsis |
| `cover` / `thumb` / `previewImages` | Cover, thumbnail, stills |
| `actors` / `director` / `genres` / `tags` | Cast, director, genres, tags |
| `studio` / `label` / `series` | Studio, label, series |
| `score` / `runtime` / `release` / `mosaic` | Rating, length, release date, mosaic status |
| `extras` | Extra fields only this source provides |

:::note[Fields can be empty]
Sources provide different amounts of detail; what they cannot provide comes back empty. Do not treat empty as an error.
:::

## Translation

Identify a language:

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/translate/language/identify \
  -H "x-api-key: <your key>" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World"}'
```

```json
{
  "code": 200,
  "message": "success",
  "data": { "code": "en", "name": "英语" },
  "timestamp": 1753958400000
}
```

If the language cannot be determined, `code` is `unknown` and `name` is `unknown` as well.

Translate text:

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/translate/text \
  -H "x-api-key: <your key>" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World", "target": "zh"}'
```

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "originalText": "Hello World",
    "originalLanguage": "英语",
    "originalLanguageCode": "en",
    "translateText": "你好世界",
    "translateLanguage": "简体中文",
    "translateLanguageCode": "zh",
    "translateEngine": "百度翻译"
  },
  "timestamp": 1753958400000
}
```

| Field inside `data` | Notes |
| --- | --- |
| `originalText` | The original text |
| `originalLanguage` / `originalLanguageCode` | Source language name / code |
| `translateText` | The translation |
| `translateLanguage` / `translateLanguageCode` | Target language name / code |
| `translateEngine` | Which translation engine was actually used |

`text` and `target` are required. Leave `source` out and the source language is detected automatically; leave `provider` out and the engine is chosen from your system settings.

The `message` and language names come back in Chinese; they are the server's own wording.

## Source identifiers

What you can put in `source` depends on which plugins you have enabled:

| Value | Plugin |
| --- | --- |
| `metatube` | MetaTube |
| `theporndb` | ThePornDB |
| `stashbox` | ThePornDB (StashBox mode) |
| `fanzadmm` | FANZA DMM |
| `mteamdmm` | M-Team DMM |
| `tmdb` | TMDB |
| `tvdb` | TheTVDB |

Search results only contain sources that are **already enabled**. Disabled ones never appear.

## Language codes

| Code | Language |
| --- | --- |
| `zh` | Simplified Chinese |
| `zh-TW` | Traditional Chinese |
| `en` | English |
| `ja` | Japanese |
| `ko` | Korean |

Which languages actually work depends on your translation engine. If it cannot handle one, the call fails and `message` explains why.

## Settings

| Setting | What to fill in | If you leave it out or get it wrong |
| --- | --- | --- |
| `x-api-key` | The X-API-KEY key created in the system | Missing or wrong returns `code` `401` |
| `Content-Type` | `application/json` for quick import, `multipart/form-data` for form import | Wrong and the server may not understand your body |
| `uniqueid` / `originalTitle` | The two required fields for quick import | Missing either one and the import fails |
| `source` / `id` | Source name and its internal ID, for source import | A source that is not enabled, or a wrong ID, fails the import |
| `keyword` | The ID number or words to search for | Required; omitting it fails validation |
| `number` / `pHash` / `osHash` | Pick at least one for local match | Fill in none and the call fails immediately |
| `text` / `target` | The text to translate and the target language code | Missing either one fails validation |

## If something goes wrong

- **Search always returns nothing**: no source is enabled. Enable one in the plugin settings and test the connection.
- **Import returns `data` as `false`**: usually a required field is missing, or that ID number already exists. Check `uniqueid` and `originalTitle`.
- **Detail says "film not found"**: the ID is wrong, or the film was deleted. Confirm the ID with search or count first.
- **Local match is always `null`**: fingerprint matching relies on fingerprints recorded when the film was added. If none were recorded, use `number` instead.
- **Translation says the translator does not exist**: `provider` holds an ID that is not there. Leave it empty and let the system choose.

## Next

- [How to read requests and responses](./conventions.md)
