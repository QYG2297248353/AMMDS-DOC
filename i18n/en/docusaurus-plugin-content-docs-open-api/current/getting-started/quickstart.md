---
title: Your first call
sidebar_label: First Call
description: Make one minimal call in a browser and one from the command line, and learn what every field in the answer means.
sidebar_position: 3
---

# Your first call

This page walks you through the whole loop: ask AMMDS for something, get the answer back, and understand each field in it. The examples are ready to copy - just swap in your own address and key.

Before you start, have the two things from [Get a key first](./api-key.md): the open API switch is on, and you hold an X-API-KEY key.

## First, the words

> **Request**: what your program sends to AMMDS - "this is what I want".

> **Response**: the bundle AMMDS sends back.

> **JSON**: the layout of that answer, made of field names and values, such as `{"code": 200, "data": true}`.

> **Status code**: the `code` field in the answer, a number that tells you outright whether the call worked.

## What you need

| Item | Notes |
| --- | --- |
| Instance address | The machine AMMDS runs on, for example `http://192.168.1.10:8080` |
| Key | Created under System → Key Management, type X-API-KEY |
| Open API switch | On, under System → System Config (config key `GLOBAL_OPEN_API`) |

The examples use `http://192.168.1.10:8080`. Replace it with your own address.

## Step 1: confirm the service is up, in a browser

The health check needs **no key**, so a browser can open it directly. Paste this into the address bar and press Enter:

`http://192.168.1.10:8080/api/v1/health/check`

The browser shows:

```json
{
  "code": 200,
  "message": "success",
  "data": true,
  "timestamp": 1753958400000
}
```

`data` being `true` means the service is running and the address is right.

:::note[What this does not check]
The health check only proves the program is alive. It says nothing about the database, the disk or external services - use System Check in the admin area for those.
:::

## Step 2: ask for the film count, with your key

This one needs a key, and a browser address bar cannot send one, so use the command line. One command - replace `<your key>`:

```bash
curl -s -H "x-api-key: <your key>" \
  http://192.168.1.10:8080/api/v1/movie/count
```

The answer:

```json
{ "code": 200, "message": "success", "data": 1286, "timestamp": 1753958400000 }
```

`data` holds `1286`, the number of films in the library. If `code` comes back as `401`, go back through [Get a key first](./api-key.md).

## Step 3: search for a film by its ID number

```bash
curl -s -X POST http://192.168.1.10:8080/api/v1/movie/search \
  -H "x-api-key: <your key>" \
  -H "Content-Type: application/json" \
  -d '{"keyword":"ABC-123","waitTime":30}'
```

`data` is a list; each entry is one record:

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "source": "metatube",
      "provider": "jav",
      "number": "ABC-123",
      "title": "示例标题",
      "summary": "示例简介",
      "cover": "https://example.com/cover.jpg",
      "actors": ["演员A"],
      "genres": ["类型A"],
      "score": 8.6,
      "runtime": 120,
      "release": "2025-10-16 00:00:00",
      "extras": {}
    }
  ],
  "timestamp": 1753958400000
}
```

### What the fields mean

| Field | Meaning |
| --- | --- |
| `code` | Whether the call worked. Anything from `200` to `299` counts as success |
| `message` | A one-line explanation. On failure it says why, and you can show it as-is |
| `data` | The actual payload. Usually `null` on failure |
| `timestamp` | When the server answered, in milliseconds |
| `source` / `provider` | Which source the record came from, and which category within it |
| `number` / `title` / `summary` | ID number, title, synopsis |
| `cover` | Cover image address |
| `actors` / `genres` | Cast and genres; the square brackets can hold several values |
| `score` / `runtime` / `release` | Rating (out of 10), length in minutes, release date |
| `extras` | Extra fields only this source provides |

:::note[Fields can be empty]
Sources provide different amounts of detail, and whatever they cannot provide comes back empty. That is not an error - do not treat it as one.
:::

## Step 4 (optional): save what you found into the library

Once you have `source` and `id`, you can import it directly:

```bash
curl -s -X POST http://192.168.1.10:8080/api/v1/movie/import/from-source \
  -H "x-api-key: <your key>" \
  -H "Content-Type: application/json" \
  -d '{"source":"metatube","id":"12345","provider":"jav"}'
```

The `data` in the answer is the ID of the film after import.

## Settings

| Setting | What to fill in | If you leave it out or get it wrong |
| --- | --- | --- |
| Instance address | `http://<address>:<port>`, port defaults to `8080` | Wrong means it never connects and hangs until timeout |
| `x-api-key` | The X-API-KEY key you created | Wrong or missing returns `code` `401` |
| `keyword` | The ID number or title words to look for | Required. Omit it and the call fails validation |
| `waitTime` | How many seconds to wait for the sources; a default applies if omitted | Too small on a slow connection and you get an answer before results arrive |
| `source` / `id` | The source and ID from the previous step | Wrong, or a source that is not enabled, and the import fails |
| `Content-Type` | `application/json` when sending a JSON body | Without it the server may not understand your body |

## If something goes wrong

- **The browser will not open the health check**: the address or port is wrong. Confirm AMMDS is running, and if you are on another machine do not use `127.0.0.1`.
- **`code` is `401`**: the open API switch is off, the key is not X-API-KEY, or the key was copied incompletely.
- **The search comes back empty**: most likely no data source is enabled. Enable one in the plugin settings and test the connection.
- **Import fails**: check that the `source` is enabled and the parameters are right. If the ID number already exists, importing again will not create a second record.

## Next

- [Get a key first](./api-key.md)
- [What the open platform can do](./overview.md)

For the general rules - pagination, date formats, status codes - see "How to read requests and responses".
