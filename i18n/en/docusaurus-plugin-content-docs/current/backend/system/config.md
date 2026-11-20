---
title: Every system setting explained
sidebar_label: System Settings
description: "All settings in the seven sections of System Config: what they control, how to fill them, whether a restart is needed, and what happens if you leave them."
sidebar_position: 1
---

# Every system setting explained

System Config holds the site-wide settings. These cover the domain you are reached on, the site's name, whether traffic goes through a proxy, whether notifications are pushed, how the interface looks, how strict signing in is, and how long background requests wait. This page goes through all seven sections item by item.

## Before you start

Open **System Management → System Config**. Seven tabs sit across the top, and one section is visible at a time. Each section remembers what you typed, and refreshing the page returns you to the section you were on.

| Tab | What it controls |
| --- | --- |
| Basic | Domain binding, interop, open API, system mode, disk monitoring, ads |
| Appearance | Landing page, theme, background and colours, mourning mode |
| Notifications | Master switch, message types, do-not-disturb at night |
| Network | Proxy switch, protocol, host and port, credentials, bypass list |
| Admin | Admin request timeout (stored in your browser) |
| Security | Passkey, two-step verification, single sign-on |
| Site | Site info, registration numbers, footer links, search and sharing display |

Changes are saved straight away; there are no files to edit. Except for system mode, which needs a restart, everything takes effect as soon as you save.

## 1. Basic

### Binding a domain (three steps, in this order)

It shows "not bound" until you bind one, then "bound".

| Step | Button | What happens |
| --- | --- | --- |
| 1 | Test | Checks the domain already points at this server; nothing is written |
| 2 | Generate token | The system issues a token and tells you which TXT record to add (host: your domain, value: the token) |
| 3 | Verify and bind | The system checks the TXT record and only then writes the domain |

> **TXT record**: a text entry in your domain's DNS, often used to prove you control the domain. Add it wherever you bought the domain.

> **DNS**: the lookup service that turns a domain into a server address. After adding a record it usually takes a while to be visible everywhere.

:::warning[Open the site on the new domain first]
Before binding, open AMMDS using the domain you're about to bind. The page compares what you typed with the domain you're visiting (ignoring protocol, path, port and case) and refuses if they differ, because the record check can't succeed otherwise.
:::

### Settings: basic

| Setting | What it controls / how to fill it | Restart? | If you leave it |
| --- | --- | --- | --- |
| Domain binding | Which domain people use; follow the three steps above | No, written as soon as it verifies | You can only use `IP:port`; features that need a domain (passwordless sign-in, interop) can't be enabled |
| Interop | Whether to share data with other AMMDS sites. Requires a bound domain plus nickname, email and phone | No | Off by default. If a condition is missing the switch springs back and says why |
| Open API | Whether the API is open to the outside; when off, third-party programs are refused even with a key | No | Off by default |
| System mode | Three options: full (public site plus admin), admin only, API only | **Restart required** | Full mode by default |
| Service address | The address published for this instance, used by docs and discovery; it's overwritten with the current address on sign-in | No | The built-in address is used |
| Disk monitoring | When on, free space is checked periodically and you're notified when it runs low | No | Off by default, so you won't be warned |
| Show ads | Whether ads appear on pages | No | On by default; non-paying users are refused with "non-paying users can't disable this" |

## 2. Site

This section has two sub-tabs: **Basic** and **Search and sharing**.

### Site info and registration numbers

| Setting | What it controls / how to fill it | Restart? | If you leave it |
| --- | --- | --- | --- |
| Site name | The name in the public title and shared summaries | No | No site name in the page title |
| Subtitle | The small line under the name | No | Not shown |
| Site description | One line introducing the site | No | Shared summaries lose content |
| Company name | The entity name shown in places like the footer | No | Not shown |
| ICP number + lookup link | The registration number and where clicking it goes | No | Empty number means it isn't shown |
| Public security number + lookup link | Same, for the public security filing | No | Empty number means it isn't shown |
| Business licence number + lookup link | Same, for the business licence | No | Empty number means it isn't shown |
| Copyright text | The footer copyright line | The page offers no edit entry | Fixed text |
| Footer quick links | One "name + address" per line, reorderable, 20 at most | No | No quick links; rows with an empty name or address are dropped when saving |

### Search and sharing display

> **SEO**: settings that help search engines index you and display you nicely.

> **OG**: a block of tags social platforms read, deciding what title, image and summary appear when someone shares your link.

| Setting | What it controls / how to fill it | Restart? | If you leave it |
| --- | --- | --- | --- |
| Search title | The big title in search results | No | The site name is used instead |
| Search keywords | A comma-separated list of words | No | Search engines get no keywords |
| Search description | The paragraph under the title in results | No | The summary is empty |
| Share title | The card title when shared to social platforms | No | Falls back to the search title |
| Share description | The card's text | No | The card has no description |
| Share image | The card's image | No | The card has no image |
| Card style | Two options: small image or large image | No | The default style |
| Crawler rules | Four presets, or write your own | No | Crawlers aren't restricted |
| Canonical address | Tells search engines which address is the real one, avoiding duplicates | No | The current address is used |

Saving takes effect on public pages immediately. Page titles update the next time you open or refresh the page.

## 3. Network

> **Proxy**: the app connects to an intermediate server first, which then reaches the internet for it. Use it when a direct connection is awkward.

> **CIDR**: shorthand for a range of addresses — one line can stand for every address in a network segment.

| Setting | What it controls / how to fill it | Restart? | If you leave it |
| --- | --- | --- | --- |
| Proxy switch | Whether to use a proxy | No; networking is rebuilt right after saving | Off by default, direct connection |
| Proxy protocol | Three options: HTTP, SOCKS4, SOCKS5 — ask whoever provides the proxy | No | Wrong protocol means no connection |
| Proxy host | The proxy server's address | No | Switch on with no host is reported as an error by System Check |
| Proxy port | A number from 1 to 65535 | No | Same as above; out-of-range ports are also reported |
| Proxy username | Fill in if the proxy requires a login | No | Proxies that need a login won't connect |
| Proxy password | Same as above | No | Same as above |
| Bypass list | Addresses that skip the proxy. Accepts domains, addresses, network segments and wildcards such as `*.cn`, or tick one of the three presets: local network, private addresses, specific domains | No | Already contains the loopback address, private ranges and a few domains used to check the system clock |

Host and port are only editable once the switch is on. Don't remove the time-checking domains from the bypass list — the clock check may fail without them.

:::tip[Proxy changes are hot-applied]
Saving proxy settings immediately rebuilds the networking component and restarts the built-in metadata service. You do not restart the whole app. To check reachability, use the network check in the Dashboard section, which probes each domain.
:::

## 4. Notifications

| Setting | What it controls / how to fill it | Restart? | If you leave it |
| --- | --- | --- | --- |
| Master switch | Whether notifications are pushed at all | No | Off by default, nothing is pushed; System Check reports "not enabled" |
| Message types | Tick which kinds to push: system, subscription, download, filing, authentication, membership, film scraping, actor scraping | No | Unticked types aren't pushed |
| Do-not-disturb | When on, nothing is pushed between 22:00 and 08:00 | No | Off by default, so night-time pushes happen |

Each push channel's own key is configured under Integrations. With the master switch on but no channel configured, System Check raises a warning.

## 5. Appearance

| Setting | What it controls / how to fill it | Restart? | If you leave it |
| --- | --- | --- | --- |
| Landing page first | Open the public landing page instead of the admin area | No | Admin area by default |
| Theme | The interface theme; click to switch | No | The default theme |
| Background and colours | Background image and main colour scheme | No | Default background and colours |
| Mourning mode | Set start and end times; pages turn monochrome for that period | No | Not enabled |

This section changes colours and backgrounds only — never the page layout.

## 6. Security

> **Passkey**: sign in with a fingerprint, your face or a device PIN instead of a password. It requires a domain, an encrypted connection and a browser that supports it.

> **Two-step verification**: besides your password, you enter a 6-digit code from your phone. A leaked password alone isn't enough to get in.

| Setting | What it controls / how to fill it | Restart? | If you leave it |
| --- | --- | --- | --- |
| Passwordless sign-in | Allows signing in with a fingerprint, face or device PIN | No | Off by default; the button is greyed out when conditions aren't met |
| Two-step verification | A four-step wizard once enabled: read the notes → scan the QR code (or type the setup code) → enter the 6-digit code → finish, and 8 one-time recovery codes are issued | No | Off by default, password only |
| Single sign-on | Third-party sign-in: copy the callback URL into the provider's allow-list, then create an app (name, icon, button text, client ID and secret, user mapping field) | No | No third-party buttons by default |

Two notes. Passwordless and third-party sign-in **do not** ask for the extra code; only password sign-in does. Deleting a third-party app disables that entry immediately.

## 7. Admin

| Setting | What it controls / how to fill it | Restart? | If you leave it |
| --- | --- | --- | --- |
| Resource search timeout | How many seconds to wait at most when searching; minimum 12 | No; affects the current browser only | The default is used; too small a value gives up before the search finishes |

It is stored in your browser, not on the server, so it does not follow you to another device.

## Settings you can't change on this page

These come from environment variables or startup options. They have no edit box on this page, and changing them needs a restart. They are: server port, listen address, maximum single upload size, maximum request size, database connection, log level, the scheduled-job master switch, directory monitoring, disk warning thresholds, and the rate limit for anonymous access to public pages (100 per minute by default).

| Change | How it takes effect |
| --- | --- |
| Proxy settings | Immediately; networking is rebuilt and the built-in metadata service restarted |
| Enabling or disabling a plugin, switching built-in service priority | The built-in metadata service restarts immediately |
| Site subscription settings | The matching subscription scheduler is rebuilt immediately |
| System mode | Restart required |
| Site info and search/sharing display | Immediate on endpoints; pages update after a refresh |
| Environment variables | Restart required (recreate the container for Docker) |

## If something goes wrong

- **Nothing changed after saving**: check whether it's one of the restart-required items (system mode, environment variables). Site info needs a page refresh.
- **The domain won't bind**: make sure you opened the site on that domain, and that the record is added and resolvable; run **Test → Generate token → Verify and bind** again.
- **Slower or broken with the proxy on**: check protocol, host and port, then add domestic sites to the bypass list.
- **No notifications at all**: check the master switch and message types, then confirm the channel key under Integrations.
- **The passwordless button won't click**: check you're on a domain over an encrypted connection, that the browser is recent enough, and that the master switch is on.
- **Not sure it took effect**: run a full scan on [System check, logs, storage, licence and users](./maintenance.md); anything wrong is listed there.
