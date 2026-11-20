---
title: How to read requests and responses
sidebar_label: API Conventions
description: The general rules for the open API in plain language - how the address is built, what the response looks like, how to read status codes, dates and multi-value fields.
sidebar_position: 1
---

# How to read requests and responses

Every open API endpoint follows the same set of rules. Reading this page first saves most of the parsing and guesswork later.

## First, the words

> **Request**: what your program sends to AMMDS - "this is what I want".

> **Response**: the bundle AMMDS sends back.

> **JSON**: the layout of that answer, made of field names and values, such as `{"code": 200, "data": true}`.

> **Header**: extra information sent alongside a request, outside the body, saying things like what the key is and what format the content is in.

> **Status code**: the `code` field in the answer, a number telling you whether the call worked and, if not, roughly why.

> **Pagination**: when there is too much data for one go, it is handed over a page at a time using a page number and a page size.

## The basics

| Item | Notes |
| --- | --- |
| Address | `http://<host>:<port>`, port defaults to `8080` |
| Character encoding | UTF-8 |
| Request and response format | `application/json` (file upload endpoints use `multipart/form-data`) |
| Authentication | Header `x-api-key` |

## What a response looks like

Success and failure come back in the same shape:

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": 1753958400000
}
```

| Field | Meaning |
| --- | --- |
| `code` | A number saying whether the call worked |
| `message` | A one-line explanation. On failure it says why, and you can show it to the user as-is |
| `data` | The actual payload, usually `null` on failure |
| `timestamp` | When the server answered, in milliseconds |

:::warning[Do not trust the HTTP status alone]
Apart from the comic reader protocol, a business failure usually **still arrives as a successful HTTP response**. The real result is the `code` inside. Success means `200 <= code < 300`.
:::

## Status codes

| `code` | Meaning | Common cause |
| --- | --- | --- |
| `200` | Worked | `data` holds what you asked for |
| `400` | What you sent is wrong | Validation failed, or a required field is missing |
| `401` | Not authorised | Key missing or invalid, or the open API is switched off |
| `403` | Refused | Not enough permission |
| `404` | Not found | The address or the object does not exist |
| `500` | Server error | Something failed inside; `message` carries a short reason |

:::note[A few endpoints report failure in data]
A handful (import, for one) return `code=500` with `data=false`, so the caller can read the result from a single field. Follow whatever the endpoint's own page says.
:::

## How dates are written

| Where | Format | Example |
| --- | --- | --- |
| Date and time in a response | `yyyy-MM-dd HH:mm:ss` (UTC+8) | `2025-10-16 20:30:00` |
| A date you send in a request | `yyyy-MM-dd` | `2025-10-16` |
| Timestamp | Milliseconds | `1753958400000` |

## Fields with several values

In film data, "ID numbers, covers, genres, tags, directors, studios" are all **multi-value fields**.

- **When reading**: you get a standard JSON array, such as `"actors": ["演员A", "演员B"]`.
- **When writing**: the quick import endpoint takes an array; the form upload endpoint (`multipart/form-data`) takes the array written as a string.

## Pagination

The film endpoints in the open API **do not paginate** - search results come back in one go.

The comic reader protocol paginates with `page` and `pageSize`, and page numbers start at `1`.

## Is it safe to call twice?

- **Search, detail, count, match**: read-only. Retry as often as you like.
- **Import**: duplicates are detected by unique ID number, so importing twice never creates two records.
- **Translate**: no side effects at all.

## How long to wait

| Endpoint type | Suggested timeout |
| --- | --- |
| Health check, count | 5 s |
| Detail, local match | 10 s |
| Multi-source search | 60 s or more (`waitTime` is adjustable) |
| Translate | 30 s |

## Headers

| Name | Value | Applies to |
| --- | --- | --- |
| `x-api-key` | Your key | `/api/v1/**` only |
| `Authorization` | `Bearer <authorisation code>` | `/api/mihon/**` only |
| `Content-Type` | `application/json` or `multipart/form-data` | As the endpoint requires |

> **User-Agent**: a line in the request saying which program is asking. You do not need to set it or change it.

## Settings

Everything you have to fill in for one call:

| Setting | What to fill in | If you leave it out or get it wrong |
| --- | --- | --- |
| Host and port | `http://<host>:<port>`, port defaults to `8080` | Wrong and nothing ever connects |
| `x-api-key` | The X-API-KEY key created in the system | Missing or wrong returns `code` `401` |
| `Content-Type` | `application/json` for a JSON body, `multipart/form-data` when uploading files | Wrong and the server may not understand your body |
| Multi-value fields | JSON array for quick import; the array as a string for form upload | Wrong format fails validation |
| Date parameters | Written as `yyyy-MM-dd` | Any other format fails validation |

## If something goes wrong

- **HTTP says success but the data is wrong**: do not go by the HTTP status. Look at `code` and `message` inside the response.
- **`code` is `400`**: check the required parameters against the endpoint's page, especially field names and types.
- **`code` is `401`**: confirm the open API switch is on, the key type is X-API-KEY, and the header is spelled `x-api-key`.
- **Times look off**: response times are UTC+8 and may differ from your local timezone by several hours. That is expected.
- **A field is empty**: sources provide different amounts of detail; what they cannot provide comes back empty. Not a fault.

## Next

- [Common endpoints at a glance](./reference.md)
