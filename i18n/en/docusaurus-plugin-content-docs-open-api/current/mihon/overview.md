---
title: Read your comics in a reader app
sidebar_label: Comic Reader
description: "For everyday users - how to read the comics stored in AMMDS from a reader app such as Mihon or Tachiyomi: which app to install, what to fill in, and what each error means."
sidebar_position: 1
---

# Read your comics in a reader app

Once your comics are in AMMDS you do not have to sit at the computer to read them - you can browse them from a comic app on your phone. This page covers which app to install, what to type into it, and what you will see if something is wrong.

No code involved. It is two steps: get an authorisation code in AMMDS, then put the address and the code into the app.

## First, the words

> **Mihon**: a comic reader app for Android. Tachiyomi is its predecessor and works much the same way. Both are called "the reader" below.

> **Authorisation code**: a string of characters, like an access card you issue to that app. The app sends it along every time it fetches comics.

> **Authentication**: showing who you are before you walk in. For the reader that means putting the authorisation code into the request.

> **Endpoint / API**: a door AMMDS opens to the outside. The reader asks in a fixed format, AMMDS answers in a fixed format.

## Which app

| What you need to do | How |
| --- | --- |
| Install a reader | Install Mihon (or a Tachiyomi-style equivalent) on your phone |
| Let it reach AMMDS | Install the Mihon extension provided by AMMDS. If you use an alternative that supports custom servers, use whatever connection method it provides |

:::note[Two kinds of credential, not interchangeable]
The reader uses an **authorisation code**, which is not the same as the key described in "Get a key first" for the film library. A reader code only reads comics, and the library key only opens the library.
:::

## Step 1: get an authorisation code in AMMDS

1. Sign in to the AMMDS admin area and go to **System → Key Management**.
2. Choose to create a key.
3. Set the type to **Mihon Extension** (`secret_mihon`).
4. Copy the code straight after saving, and paste it into the reader.

This code only works on the endpoints whose addresses start with `/api/mihon`. It cannot be used anywhere else.

:::note[You can also sign in with a password]
The reader also supports signing in with your AMMDS username and password. The credential that comes back is valid for **2 hours**, after which you sign in again. For everyday use the authorisation code is easier, and it can be cancelled on its own.
:::

## Step 2: fill in the address in the app

1. Open the AMMDS extension's settings page in the reader.
2. Set the server address to `http://<your address>:8080`.
3. Paste the authorisation code from the previous step.
4. Save, then refresh the comic library once to confirm the list loads.

## Settings

| Setting | What to fill in | If you leave it out or get it wrong |
| --- | --- | --- |
| Server address | The machine AMMDS runs on, written as `http://<address>:<port>`. The port defaults to `8080` | Wrong and it never connects, so no list appears |
| Authorisation code | Created under System → Key Management; the type must be **Mihon Extension** | Wrong type, or a deleted code, and the app reports not authorised |
| Key type | Choose **Mihon Extension** (`secret_mihon`) when creating | Choose X-API-KEY and the reader is refused every time |
| Username and password (optional) | Your AMMDS account | Exchanges for a credential that lasts 2 hours, then you sign in again |

:::warning[Phone and computer must share a network]
When AMMDS runs on your home network, the phone has to be on the same Wi-Fi, and the address must be the computer's LAN address. `127.0.0.1` means the phone itself and will not work.
:::

## What you can do once it is connected

| Action in the app | What is fetched |
| --- | --- |
| Open the comic library | The comic list, one page at a time, sortable by update time, title or page count |
| Search | Matches on title, author, series, category and tags |
| Open a comic | Comic details - author, synopsis, page count, chapter count |
| Open chapters | The chapter list, numbered in ascending order so nothing is skipped |
| Turn pages | Each page's image |
| See the cover | The cover image. If the cover is an external URL, the app loads that URL directly |

## Errors and what they mean

| What you see | Usual cause | What to do |
| --- | --- | --- |
| Not authorised | The code is not a "Mihon Extension" one, or it has been deleted | Create a new Mihon Extension code |
| The list is empty | No albums in the comic library yet, or chapters were not imported | Import the comics in the AMMDS admin area first |
| Cover does not show | This comic's cover is an external URL, so the server has no local copy | Expected behaviour; the app loads the external link directly |
| Images will not open | The chapter page file is missing from the data directory | Check that the comic files in the AMMDS data directory are complete |
| Cannot connect / times out | Wrong address or port, or the phone is not on the same network as AMMDS | Open `http://<your address>:8080/api/mihon/health` in a browser first. If it loads, the address is right |

## If something goes wrong

- **Test the address on its own**: open `http://<your address>:8080/api/mihon/health` in the phone's browser. It needs no authorisation code. If it loads, the network and address are fine and the problem is the code.
- **Not authorised, again and again**: delete the old code and create a new one, making sure the type is "Mihon Extension", and copy it without dropping characters.
- **The list is empty but the library clearly has comics**: confirm the comics finished importing in the AMMDS admin area, chapters included.
- **You have to sign in again after a while**: you are using the username and password route, which lasts 2 hours. Switch to an authorisation code and you will not be asked again.
