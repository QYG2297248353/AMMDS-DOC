---
title: Get a key first
sidebar_label: API Key
description: What an API key is, how to switch on the open API and create a key, how to send it with a request, and what to do if it is lost or leaks.
sidebar_position: 2
---

# Get a key first

Before another program can read your AMMDS data, it needs a **key**. This page explains what the key is, how to get one, how to look after it, and what to do if it goes missing.

Not sure you need one? Start with [What the open platform can do](./overview.md).

## First, the words

> **API key**: a string of characters, like the key to your front door. Anyone holding it can read your data within its permissions. AMMDS does not care who you are - only whether the string is correct.

> **Authentication**: showing who you are before you walk in. For the open API that means putting the key into the request.

> **Header**: a small bundle of extra information sent alongside a request, outside the body, used to say things like "here is my key" or "here is the format".

## Three steps to a key

### Step 1: switch the open API on

1. Sign in to the AMMDS admin area and go to **System → System Config**.
2. Find the open API switch (config key `GLOBAL_OPEN_API`) and turn it on.
3. Save.

:::warning[Both conditions are required]
The request must carry a valid `x-api-key` **and** the open API switch must be on. Miss either one and you are kept out.
:::

### Step 2: create the key

1. Go to **System → Key Management**.
2. Choose to create a key.
3. Give it a name you will recognise later, such as "backup script".
4. Set the type to **X-API-KEY** (`secret_x_api_key`).
5. **Copy the key straight away** after saving. Once the page is closed you cannot see it in full again.

:::note[Key types are separate]
Key Management also offers the types "AMMDS Assistant" and "Mihon Extension". A **Mihon** code only works on `/api/mihon` and cannot call `/api/v1`; every other type (including X-API-KEY and AMMDS Assistant) technically works on `/api/v1`. For the open API, **X-API-KEY** is still recommended — its purpose is clearest and it is the easiest to troubleshoot.
:::

### Step 3: send the key with the request

A complete call from the command line. Replace `<your key>` with the string you copied:

```bash
curl -H "x-api-key: <your key>" \
  "http://127.0.0.1:8080/api/v1/movie/count"
```

| Item | Value |
| --- | --- |
| Header name | `x-api-key` (lower case, hyphen in the middle) |
| Scope | `/api/v1/**` only |
| Addresses that need no key | `/api/v1/health/**` |

## Settings

| Setting | What to fill in | If you leave it out or get it wrong |
| --- | --- | --- |
| Open API switch | Confirm it is on under System → System Config, config key `GLOBAL_OPEN_API` (on by default) | Off means a perfectly good key still gets refused |
| Key name | Anything; the purpose is the most useful choice | No effect on use, just harder to tell keys apart later |
| Key type | **X-API-KEY** recommended | Mihon type cannot be used on `/api/v1`; other types work but are not recommended |
| Key value | The whole string you copied when creating it | A missing character or a stray space breaks authentication |
| Header name | Must be `x-api-key` | `api-key` or `X_API_KEY` is not recognised |

## If the key is lost or leaks

A key cannot be changed the way a password can. You cancel the old one and make a new one:

1. Go to **System → Key Management** and **delete** the key in question.
2. Create a new one and copy its value.
3. Update every place that used the old key - scripts, clients, tool settings.

:::warning[If it leaked, do this first]
Deleting the old key comes first. The moment it is deleted the old key stops working, so whoever has it can no longer use it. Treat the new one like a password: never paste it into chats, forums or a code repository.
:::

Day-to-day habits worth keeping:

- **One key per purpose**: one for the backup script, one for the phone client. Then you can cancel just the one that causes trouble.
- **Never in a web front end**: the key would show up in the browser's network panel, which is public. Keep it on the server or on your own machine.
- **Rotate now and then**: delete and recreate, and that counts as a rotation.
- **Keep it on the LAN**: exposing the open API to the public internet is best avoided. If you must, put another login layer in front of it.

## What being refused looks like

When authentication fails, AMMDS still answers - the `code` inside is just `401`:

```json
{
  "code": 401,
  "message": "您的登录已过期，请重新登录",
  "data": null,
  "timestamp": 1753958400000
}
```

The `message` text is what the server actually returns, in Chinese; it means the login has expired.

Work through these in order:

1. Is the open API switch on?
2. Is the header spelled `x-api-key` (lower case, hyphen)?
3. Is the key type X-API-KEY?
4. Has the key been deleted or recreated since?
5. Is the address really under `/api/v1`? (Sending the key to admin endpoints is refused, and that is deliberate.)

## If something goes wrong

- **`401` every time**: work through the five checks above. The two most common causes are the switch being off and the wrong key type.
- **Key copied incompletely**: delete it, make a new one, and do not drop the first or last character when copying.
- **Admin endpoints stop working once you send the key**: by design. A key only opens `/api/v1`, so a long-lived key cannot be used to slip past the login record.
- **Thinking of handing a key to a visitor**: do not. A key carries your own permissions, and it leaves no per-user login record, so you would have no way to trace anything back.

## Next

- [Your first call](./quickstart.md)
- [What the open platform can do](./overview.md)
