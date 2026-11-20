---
title: What the open platform can do
sidebar_label: Platform Overview
description: Plain-language overview of the three ways AMMDS opens your data to other programs - the open API, the comic reader protocol, and backup packages - and who needs each one.
sidebar_position: 1
---

# What the open platform can do

Once your library is tidy in AMMDS, the open platform is what lets **other programs read it** - a phone client, a comic reader app, a backup script you wrote yourself, a small counting tool.

This page only covers what the options are and who each one suits. Getting a key and making your first call are the next two pages.

## First, the words

> **Endpoint / API**: a door AMMDS opens to the outside. Another program asks in a fixed format, AMMDS answers in a fixed format. One address is one endpoint; a set of them is an API.

> **Request**: the question another program sends to AMMDS - "this is what I want".

> **Response**: what AMMDS sends back.

> **JSON**: the layout of that answer. It looks like `{"code": 200, "data": true}` - readable by people and by programs.

> **Authentication**: showing who you are before you walk in, to prove you are allowed to see the data.

## Who needs this

| What you want to do | Which option |
| --- | --- |
| Browse your film library from a phone client | Open API |
| Read the comics stored in AMMDS in a reader app | Comic reader |
| Back your data up to a file on a schedule | Backup package |
| Write a small tool that counts how many titles you have | Open API |
| Move data between two AMMDS installs | Backup package |

If you only want to watch and organise files, the Admin Features section is enough. Skip this part for now.

## The three options

| Option | Address | How you get in | Best for |
| --- | --- | --- | --- |
| Open API | `/api/v1/**` | Header `x-api-key` | Scripts, automation tools, third-party apps reading film data and calling translation |
| Comic reader | `/api/mihon/**` | Header `Authorization: Bearer <authorisation code>` | Reader apps such as Mihon and Tachiyomi |
| Backup package | No network address - just a file | No network needed | Exporting data to an archive and importing it somewhere else |

Two more things connect AMMDS to outside systems, but they are set up in the interface rather than here:

- **Push notifications**: AMMDS sends messages to an address you fill in, configured under Integrations.
- **Two AMMDS installs talking to each other**: adding each other as contacts and sharing searches, configured under Admin Features → Message Centre.

## What the open API exposes

| What it can do | Address |
| --- | --- |
| Check whether the service is alive (no key needed) | `/api/v1/health` |
| Import films, fetch details, count them, match local files, search several sources | `/api/v1/movie` |
| Tell what language a piece of text is, and translate it | `/api/v1/translate` |

:::note[A key is not a login]
The open API accepts a key only, not your browser login. Admin endpoints work the other way round: login only, no key. The two never cross over, so a key can never grant admin rights.
:::

## The built-in endpoint list

AMMDS ships with a list you can browse:

| Address | What is in it |
| --- | --- |
| `/swagger/swagger-ui.html` | A web page where you can try calls by clicking |
| `/swagger/swagger-api` | The same list in machine-readable form |

It covers the open API, the public site and client endpoints. Admin endpoints are not included.

## Settings

Three things to settle before you start:

| Setting | What to fill in | If you leave it out or get it wrong |
| --- | --- | --- |
| Instance address | The machine AMMDS runs on, written as `http://<address>:<port>`. The port defaults to `8080` | Wrong means nothing connects and every call hangs until it times out |
| Open API switch | Turn it on under System → System Config (config key `GLOBAL_OPEN_API`) | Off means you are refused even with a valid key |
| Key | Create one under System → Key Management, type X-API-KEY | No key, or the wrong type, and every call is rejected |

## If something goes wrong

- **Cannot connect**: open `http://<your address>:8080/api/v1/health/check` in a browser. If it loads, the address and port are right. If not, check that AMMDS is running and that the port has not been changed.
- **Permission refused every time**: confirm the open API switch is on under System → System Config, then check that the key type is X-API-KEY.
- **Works on this machine, not from another one**: use `127.0.0.1` on the same machine. From another machine you need the LAN address of the AMMDS machine, never `127.0.0.1`.
- **Not sure which endpoints your version has**: open the two Swagger addresses above. They list what really exists in the version you are running.

## Next

- [Get a key first](./api-key.md)
- [Your first call](./quickstart.md)
