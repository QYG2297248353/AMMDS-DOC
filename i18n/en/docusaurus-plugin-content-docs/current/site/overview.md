---
title: The Pages Visitors See
sidebar_label: Site Overview
description: The public site is the browsing entrance for visitors and signed-in users. This page explains which pages it has, what visitors can see versus users, and how the news section works.
sidebar_position: 1
---

# The Pages Visitors See

Opening your library to other people is what the **public site** is for. This page covers which pages it has, what visitors see compared with signed-in users, and how the news section is browsed and searched.

> **Public site**: the interface for visitors and browsers. Watching and browsing happen here.

> **Admin area**: the interface for administrators. Scanning files, filling in data and changing settings happen there.

> **Visitor**: someone who isn't signed in and is just looking around.

## Public site vs admin area

Both share the same accounts and data, but the entrances and jobs differ.

| | Public site | Admin area |
| --- | --- | --- |
| For | Visitors and signed-in browsers | Administrators and maintainers |
| Sign-in | Lists are open; detail pages and actions need sign-in | The whole area needs sign-in |
| What you do | Browse, search, favourite, subscribe, share, read | Scan, fill in data, edit, run tasks, change settings |
| Who maintains data | Not here | The only place data is edited |

## Pages at a glance

| Menu | Contents | Visible without signing in? |
| --- | --- | --- |
| Films | Film list and details | List yes, details need sign-in |
| Shows | Show list and details | List yes, details need sign-in |
| Actors | Actor list and details | List yes, details need sign-in |
| Comics | Comic list and reader | List yes, details need sign-in |
| Novels | Novel list and reader | List yes, details need sign-in |
| News | Items fetched by your subscriptions | List yes, details need sign-in |
| Store | The official store | Only appears once enabled in the admin area |

:::note[Where the home address goes]
The site's home address doesn't show content itself; it sends you wherever the admin chose. With the public site you land on the film list; with the admin area, a signed-in user lands on the dashboard and a visitor on the sign-in page. The default is the admin area.
:::

## What the pages look like

Every page shares one shell:

1. **Top bar**: site mark and top-level menu on the left; search, language, light/dark theme, fullscreen and sign-in on the right. On narrow screens the menu collapses and only the right-hand buttons stay.
2. **Content area**: list pages are two columns — a card grid on the left and filters on the right; detail pages are a single column. On narrow screens the filters move above the list.
3. **Footer**: quick links set in the admin area, registration details and the copyright line.

## Using the top search

Click the magnifier in the top bar:

1. Searching starts as you type, but the request only goes out about 300 ms after you stop typing.
2. It covers films, shows, actors, comics, novels and news — up to 8 of each, grouped by type.
3. Clicking a result jumps to that detail page.
4. With no hits you'll see "no matches (try the full name)".

:::tip[Check the index when nothing is found]
Top search relies on the MeiliSearch index (configured under auxiliary tools in Integrations). Without an index it stays empty.
:::

## Signing in

While signed out, the top-right shows a "Sign in" button. The sign-in page offers:

- Username and password, encrypted in the browser before being sent.
- A privacy policy checkbox you must tick.
- Two-step verification: after the password you enter a 6-digit code or a recovery code.
- "Forgot password": reset using the recovery key kept on the server.

:::warning[There's no self registration]
The "Register" button on the sign-in page is disabled and the public site has no registration entry. Accounts come from the initial setup at deployment.
:::

Once signed in, the button becomes an avatar menu with **Profile**, **Admin area**, **Enable / disable spoilers** and **Sign out**.

## Visitor vs signed-in user

| Ability | Visitor | Signed in |
| --- | --- | --- |
| Browse lists | Yes | Yes |
| Open detail pages | Blocked — sent to sign-in, then returned to the page | Yes |
| Film / actor list size | Max 30 per page, page chosen at random by the server | Normal paging |
| Favourite / subscribe / share | Sign in first | Yes |
| Continue reading comics and novels | The reader requires sign-in | Saved per account, resumable |

:::note[What visitors see changes]
The film, actor and news lists are deliberately limited for visitors: the page number you ask for is ignored, a page is picked at random, and the list is cut to 30. So a refresh may show something different — that's anti-scraping by design, not broken data.
:::

## Appearance

- **Shared styling**: theme colour, background, corner rounding, animation and mourning mode come from the admin system config, so every visitor sees the same thing.
- **Local preferences**: light/dark theme, language and fullscreen are switched by the visitor in the top bar and only stored in their own browser.
- **Spoiler mode**: toggled in the avatar menu once signed in; content is then handled per the site configuration.

## News: what your subscriptions pulled in

The "News" menu opens a list of subscription entries. These come from sources configured in the admin area; the public site only displays them.

### List cards

Cards are laid out with wide covers — 4 per row on desktop, 3 on tablet, 1 on a phone.

| Element | Detail |
| --- | --- |
| Cover | Shows an "image failed to load" placeholder if missing or broken |
| Category tag | Top-left: article blue, image green, video orange, resource purple, others grey |
| Title | One line, truncated when long; `--` when empty |
| Summary | Up to two lines; `--` when empty |
| Source | Bottom-left, the subscription source name; `--` when empty |
| Published | Bottom-right |
| Quick actions | "Go to source" opens the original link in a new tab; entries with torrents, magnets or torrent files also show "View original" or "Download" |

An empty list says "no news yet". Clicking a card opens the detail in a **new tab** so your browsing isn't interrupted.

> **RSS**: a list a site publishes of its newest items in a fixed format, read on a schedule by other programs. That's how these news items arrive.

### Categories and search

The sidebar (which moves above the list on narrow screens) holds search, categories and search history.

- **Categories** are fixed at five: All, Article, Image, Video, Resource. Hovering shows "category · N items". Only categories that actually have entries appear.
- Clicking a category re-queries from page one; "All" applies no category filter.
- **Search** matches titles and summaries, and only runs when you press the button or Enter.
- **Search history** keeps up to 15 de-duplicated keywords, newest first; clicking one searches again, and **clicking the same one again cancels the search**.
- Category, keyword and page are stored in the browser, so a refresh restores your last state.

There is **no** filter by subscription source on this page; narrow things down with category plus keyword.

### Paging

20 items per page by default, switchable; changing the page size returns to page one. The pager only appears when there's at least one item. The totals a visitor sees don't reflect the real count (see above).

### Detail page

| Block | Contents |
| --- | --- |
| Top | "Back to list" button |
| Title area | Title, then category, source and published tags (missing ones are hidden) |
| Video | Appears when the entry has a video attachment; plays inline, with "Go to source" below |
| Gallery | Appears when the entry has image attachments; thumbnails enlarge on click |
| Body | Rendered as rich text |
| Resources | Attachments other than images and video, listed with address, type and size; "Download" opens in a new tab |
| Sidebar info | Source, published, category, author |
| Sidebar actions | "View original" opens the original link in a new tab; "Back to list" |

If the item doesn't exist or was deleted, the page says so. Blocks only appear when there's matching content, so different categories show different numbers of blocks.

:::tip[Play here or jump to the source]
The video block plays the address recorded on the attachment: if the admin area cached it offline that points at your local copy, otherwise at the source. If the player won't work or you want the original page, use "Go to source".
:::

All external links open in a new tab and don't expose the current page to the target site.

## How the run mode affects the public site

| Mode | What a visitor sees |
| --- | --- |
| Normal | Lists and search work; details and actions work once signed in |
| Backend only | Public addresses are rewritten to a "site closed" page |
| API only | Every page, admin included, goes to the "site closed" page |

:::note[A brief backend hiccup doesn't take the site down]
If the app fails to determine the run mode it doesn't block navigation — the public site still opens.
:::

## If something goes wrong

- **Clicking a detail does nothing and you land on sign-in**: details need sign-in; after signing in you return to that page automatically.
- **The search box finds nothing**: check whether MeiliSearch is configured and indexed (under auxiliary tools in Integrations).
- **Lists stay empty**: nothing has been scanned in yet, or your filters are too narrow.
- **A visitor sees something different every time**: that's by design; signing in restores normal paging.
- **News covers are broken or video won't play**: the attachment points at the source site and this machine can't reach it — use "Go to source", or let the admin area cache it offline.
- **News always says empty**: no subscription sources added yet, or nothing fetched.

## Next

- [Browse films, shows, actors, comics and novels](./browse.md)
- [Sharing, the store and profile pages](./share.md)
