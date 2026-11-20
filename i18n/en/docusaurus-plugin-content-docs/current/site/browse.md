---
title: Browse Films, Shows, Actors, Comics and Novels
sidebar_label: Browse
description: How to page through and filter the five public libraries, what each detail page shows, and how the comic and novel readers work, including progress saving.
sidebar_position: 2
---

# Browse Films, Shows, Actors, Comics and Novels

Films, shows, actors, comics and novels all share the same layout: a grid of cards on the left, filters on the right. This page covers what they have in common, then what each one shows and lets you do.

> **ID number**: the film's identification code, usually in the filename, e.g. `SSIS-001`. Shown on cards as a small purple tag.

> **Season / episode**: how shows are structured. A show has seasons, and each season has episodes.

> **Magnet**: a line of text you hand straight to a downloader — the same job as a torrent file.

## What the five libraries share

### List layout

| Area | Contents |
| --- | --- |
| Left | Card grid and paging |
| Right | Search, Chinese-first, mode, search history, popular tags, library description |

Six cards per row on a wide screen, dropping to 4, 3, 2 then 1 as the window narrows; below 1024px the filter column is hidden entirely (for comics and novels it moves above the list).

### Filter controls

| Control | What it does | If you leave it |
| --- | --- | --- |
| Search box | Type a keyword and press Enter or the search button | Empty shows everything |
| Chinese-first | Only affects the title shown: on shows the Chinese title, off shows the original | Doesn't change results, only the name you see |
| Mode | "All" or "Favourites"; re-searches immediately | Default is all |
| Search history | Up to 15 entries kept in the browser, click to reuse | Clicking the active keyword again cancels the search |
| Tags | Popular tags (up to 20); click to filter | Click again to clear; picking a tag clears the keyword |

:::warning[Keyword and tag don't combine]
Entering a keyword clears the chosen tag, and picking a tag clears the keyword. They never stack into "must match both".
:::

### Paging and memory

- 20 items per page (16 for novels); the pager shows only the total, there's no page-size selector.
- Search terms, mode and Chinese-first are stored in the browser and restored on refresh.
- Films and shows write the page number into the address bar, so going back from a detail page returns you to that page.
- Visitors who aren't signed in get at most 30 per page with the page chosen at random, so a refresh may show something different — that's anti-scraping by design.

---

## Films

The list is open to anyone; **detail pages need sign-in** — a visitor is sent to sign-in and returned afterwards.

### On the card

- **Cover**: the HD cover if there is one; "image failed to load" otherwise.
- **Overlay tags**: release date, rating (out of 10), and a "playable" marker set in the admin area, each shown only when present.
- **Title**: controlled by Chinese-first. The film list has no fallback for a missing Chinese title, so the title can be blank.
- **ID number**: a small purple tag; there may be several.
- **Cast**: cyan tags, with an icon that switches on whether the role text contains "male / female", and a person-shaped question mark when it can't tell.

### Detail page

A large title plus the Chinese title (tagged "translation"), with the HD background image as the main picture.

| Field | Detail |
| --- | --- |
| ID number | Every ID, as tags |
| Release date | The original date text |
| Runtime | In minutes |
| Director / studio / distributor | Multi-value tags |
| Cast | Name tags; if the actor is in the actor library you can click through |

Three buttons on the right of the info area: **Subscribe**, **Favourite** and **Share**. Subscribe and favourite switch icon and colour with the current state; share asks you to sign in if you aren't.

Below that:

| Block | Contents |
| --- | --- |
| Rating | 5 stars scaled from 10, half stars supported, coloured by band (green at 8+, amber at 4+, red otherwise) |
| Magnet submit | Paste a magnet link and click submit; empty gives "please enter a magnet link" |
| Extra info | Three tabs: categories, tags, and a key/value table |
| Cast | Avatar, name and role, scrolling horizontally |
| Posters / backdrops / thumbs / stills | Image walls, HD first, clickable for fullscreen |
| Resource sharing | Magnet list: name, size, share date and actions |
| Comments | A front-end placeholder — see the note at the end |

:::warning[There's no player on the detail page]
Film details only show data, images and resources — **no player and no play button**. The "playable" marker on the card is just a record flag; it doesn't mean you can watch here. Use an external player.
:::

Each row in "Resource sharing" has three actions: **Push to download** (currently replies "coming soon"), **Copy magnet** and **Report** (currently "coming soon"). An empty magnet table says "no shared resources".

---

## Shows

Shows group series, anime and variety programmes as one entry, and the detail page expands every season and episode on a single page so you can see the structure.

### On the card

- **Cover**: portrait; "image failed to load" when missing or broken.
- **Overlay tags**: first-air year and rating.
- **Title**: controlled by Chinese-first.
- **Category**: the category name from the interface if there is one, otherwise a built-in mapping — anime, Japanese drama, Korean drama, Chinese drama, Western, documentary, variety, other.
- **Status**: `Continuing` shows "ongoing", `Ended` shows "ended".
- **Season / episode count**: like "3 seasons · 24 episodes".
- **Genres**: the first three, joined with " / ".

### Detail page

| Field | Detail |
| --- | --- |
| First aired | `-` when missing |
| Runtime | In minutes |
| Category | Chinese category name; unknown codes shown as-is |
| Data source | Source code, `-` when missing |
| Seasons / episodes | Declared totals first, then what's actually filed |
| Status | Ongoing / ended / raw value |
| Genres / studios | Multi-value tags |

The same **Subscribe, Favourite and Share** buttons. Rating works like films; the magnet box only submits a link and clears afterwards — **it doesn't display a magnet list**.

### Seasons and episodes

The season list renders every season at once as collapsible panels:

1. Panel title is the season name or "Season N"; season 0 or anything marked special shows as "Specials".
2. The right side shows "N episodes in this season".
3. Inside: season poster, first-air date and season description.
4. Episodes are a table of number, title, air date, runtime, rating and thumbnail; titles prefer the Chinese name and fall back to the original.
5. The first season with episodes is expanded by default; with no seasons it says "no season data yet".

:::warning[The episode table isn't a playlist]
It lists number, title, air date, runtime, rating and thumbnail only. Episodes carry no file information and the page has no player. File binding happens in the admin area.
:::

Image blocks include posters, backdrops, thumbnails, logo and banner. Shows have no "stills" field, so there's no stills block.

---

## Actors

The actor library links profiles to the works they appear in.

### On the card

- **Poster**: portrait; "image failed to load" when missing or broken.
- **Overlay tags**: debut date, height (cm), weight (kg).
- **Name**: controlled by Chinese-first.
- **Basic tags**: gender, age, nationality, retired, deceased, cup size and other measurements, shown only when present. The list only tells `female` ("female") apart from everything else ("male").

### Detail page

The name is the heading, with an "aliases: A / B" line below when aliases exist. The main card has the portrait on the left and details on the right:

| Field | Shown as |
| --- | --- |
| Gender | Male / female / shemale / unknown |
| Age | "N years old" |
| Retired / deceased | Orange / red tags |
| Height / weight | "N cm", "N kg" |
| Blood type / birthday / nationality | Tags |
| Measurements | "bust-waist-hip", with cup size appended |
| Debut date / agency | Date text and tag list |
| Rating | 5 stars plus a score out of 10 |
| Social links | Recognised by domain for common networks, generic icon otherwise |

The same **Subscribe, Favourite and Share** buttons appear here.

| Block | Contents |
| --- | --- |
| Extra info | Five tabs: biography, styles, traits, tags, and a key/value table |
| Posters | The gallery, previewable; "no posters yet" when empty |
| Works | The 20 most recent films, newest first; 10 per page in the browser, click a title for the film detail |
| News | Searched by the actor's name, up to 10 items |

:::tip[There are caps]
Works are capped at the 20 most recent and news at 10, with no "load more" on either. For more, search the film list or the news page.
:::

:::note["Recommended actors" is empty for now]
That card has no data source yet, so it always says "no recommended actors". It has a pointer cursor but no link — don't treat it as an entrance.
:::

---

## Comics

Comics work in three steps: cover list → detail with chapters → fullscreen reader.

### Cards and filters

Cards carry the cover, category (non-complete items with a season above 0 show "Season N", complete ones show "Complete"), title, author, series and up to 3 tags. The search box matches title, description, notes, author, artist, publication info and series.

### Detail page

The cover sits on the left. On the right you get a row of tags (category, Complete / Season N, age rating, and a page count that always shows "N pages", treating a missing value as 0). Below that comes a "label - value" table (author, series, publisher, printer, publication date, language, format, colour, reading direction, age rating, community rating, notes, link — empty rows are hidden). Then tags, characters, teams, locations and the description, and finally the rating.

Four buttons down the right side:

1. **Continue reading**: only when a progress record exists and its chapter is still in the chapter list.
2. **Read / Read from start**: "Read" with no progress, "Read from start" with progress; always opens chapter one.
3. **Favourite / Favourited**: asks you to sign in if you aren't.
4. **Share**: same.

Chapters are paged 20 at a time, each showing its title, "Chapter N · X pages" and an optional description; the chapter you're part-way through shows "read to page N"; with progress, a "Continue reading page N" shortcut appears at the top-right of the card.

### Reader

The reader is fullscreen: top bar, reading area, bottom bar and a persistent progress line. The top bar has back, title, chapter dropdown, previous/next chapter, page direction and fullscreen; the bottom bar has paging, page number entry, zoom, page navigation and settings.

- **Paging**: single or double page (double needs at least 720px of container width, otherwise it falls back to single). Clicking the left third goes back, the right third forward, the middle toggles the toolbars. Paging past the last page moves to the next chapter.
- **Scroll mode**: all images stacked vertically, syncing the page number against the top 35% of the viewport.
- **Zoom**: 0.5× to 5×, buttons step by 0.25, click the percentage to reset; double-click toggles between 1× and 2×.
- **Keys**: arrow keys page, space goes forward, PageUp / PageDown page, Home / End jump to first and last, `+` / `-` zoom, `0` resets, `F` fullscreens, `Esc` exits fullscreen or toggles the toolbars.

### Reader settings

In the "Settings" drawer at the bottom right:

| Setting | Choices | If you don't change it |
| --- | --- | --- |
| Read mode | Paged / scroll | Paged by default; scroll stacks images vertically |
| Image fit | Width / height / original | Wrong choice means images overflow or look tiny |
| Image spacing | 0–40px | Unchanged |
| Page direction | Left to right / right to left | Reversed direction swaps the click zones |
| Single / double page | Single / double | Too narrow forces single page |
| Background theme | Black / dark grey / beige / eye-care / white | Looks only |
| Preload | 0–10 pages | Higher is smoother but uses more data |
| Wheel zoom | On / off | Off means the wheel pages instead |
| Tap side zones to page | On / off | Off means taps only toggle the toolbars |
| Auto-hide toolbars on touch | On / off | On means a tap brings them back on mobile |

Settings live in the current browser only and **don't follow you to another device**; "Restore defaults" resets everything.

:::tip[Settings and progress are different things]
Progress is stored per account on the server, so you can resume on another device. Settings are stored in this browser.
:::

Progress is recorded as comic + chapter + page, saved about 800 ms after a page or chapter change, and immediately on chapter switch, back, page hide or leaving. If the server fails, the local copy is kept so you can still resume.

---

## Novels

Novels also work in three steps: list → detail with table of contents → reader.

### List

16 per page. Each card carries the cover, a blue type tag at the top-left, the title (Chinese-first prefers the Chinese name) and the author ("anonymous" when empty). Under them comes a line like "12 chapters · ongoing" (complete / ongoing / draft / to be continued / in progress).

### Detail page

| Block | Contents |
| --- | --- |
| Title area | Book name and "Author: xxx" |
| Tag row | Type, status, language and "N chapters"; missing ones hidden |
| Description list | Author, series, publisher, publication year, ISBN, chapter count, page count — only what has a value |
| Tags / synopsis | Small cyan tags and a long text |
| Rating | A score out of 10 as 5 hearts, with "N points" on the right |
| Quick actions | Continue reading (when progress exists), Read from start / Read (always chapter one), a "last read chapter N · title" hint, Favourite / Favourited, Share |
| Table of contents | "Number + title + word count" per row with a Read button; 20 per page; the last-read chapter carries an orange "last read" tag and the page opens there automatically |

Favouriting while signed out gives "operation failed, please make sure you are signed in"; share opens a dialog and produces a share link.

### Reader

Fullscreen, with the top and bottom bars hidden until you tap the middle, and auto-hiding after 4 seconds of inactivity.

| Position | Elements |
| --- | --- |
| Top | Back, book name, contents, fullscreen / exit, settings |
| Body | Chapter title, paragraphs, and "— end of chapter —" |
| Chapter end | "Next: title" clickable when there is one; "this is the last chapter" otherwise |
| Bottom | Previous chapter, previous page, status text, next page, next chapter |
| Status | Paged: "chapter x/y · page a/b · percent of book"; scroll: "chapter x/y · scroll percent · words in chapter" |

The contents drawer is titled "Contents · N chapters", highlights the current chapter and scrolls to it. Switching chapters doesn't blank the current text — only a thin progress bar at the top appears.

### Reader settings

Everything takes effect immediately and is stored in this browser, not synced to other devices.

| Setting | Choices | If you don't change it |
| --- | --- | --- |
| Read mode | Paged / scroll | Last choice is kept |
| Theme | White, beige, eye-care, dark | Colours only |
| Font size | A- / A+ step 2px, range 12–34px; the number in the middle resets to 18px | Last value kept |
| Line height | 1.4 / 1.6 / 1.8 / 2.0 / 2.4 | Last value kept |
| Font | System default, Song, Kai, Hei | Last value kept |
| Text width | Narrow / medium / wide (620 / 760 / 900px) | Last value kept |
| Page margin | Narrow / medium / wide, scaled down on narrow screens | Last value kept |
| Page animation | On / off | Off removes the sliding transition |
| First-line indent | On / off | Off means no indent |
| Tap sides to page | On / off | Off means taps only show / hide the bars |
| Wheel paging | On / off, paged mode only | Scroll mode always follows the scrollbar |
| Auto next chapter | On / off | Off only shows "end of chapter" |
| Show progress line | On / off | Off hides the book progress line |

Changing font size, line height, font, indent, text width or margin re-paginates, anchoring on the first paragraph of the current page.

### Controls

| Input | Effect |
| --- | --- |
| Tap the left ~third | Previous page; at the chapter start it goes to the end of the previous chapter |
| Tap the right ~third | Next page; at the chapter end it follows your auto-next setting |
| ← / → / Space / PageUp / PageDown | Previous / next page |
| ↑ / ↓ | Screen scroll in scroll mode; same as previous / next page in paged mode |
| Esc | Closes the bars, settings panel and contents |
| Swipe left / right | Pages when horizontal movement exceeds 40px and clearly beats vertical |

Selecting text suppresses paging, and taps on the bars, contents or settings overlay don't page either.

### Progress

| Situation | Behaviour |
| --- | --- |
| Signed in | Written to the server: chapter, chapter index, percent within chapter and page |
| Visitor | Browser cache only; lost on another device or after clearing |
| Saved | About 1.2 seconds after paging or scrolling stops; immediately on chapter switch, page hide or leaving |
| Reopening | Reads both server and local cache and takes the newer one |
| Same chapter | Restores your position; an explicit chapter in the address starts from its beginning |

:::tip[Enter from the detail page]
Opening the reader address without a book parameter shows "missing book parameter, please enter from the novel detail page". Use the contents or the Read / Continue button.
:::

---

## Things that aren't finished yet

Stated plainly so you don't think it's your fault:

- The **"Same series" card on films** always says "no films in this series" — nothing fills that block yet.
- **"Same series" on shows** is always empty — there's no show series model yet.
- **Comments** are a front-end placeholder: one default "AMMDS official / coming soon" entry, submissions only insert into the current page and vanish on refresh, and likes and replies aren't wired to the backend. Don't treat it as a community feature.
- Film **"Push to download"** and **"Report"** currently just say "coming soon".
- Film details don't show language, country, rating or series — check those in the admin media library.

## If something goes wrong

- **Clicking a card lands on sign-in**: details need sign-in; you'll be returned to that page afterwards.
- **Lists stay empty**: nothing scanned in yet, or your filters are too narrow (keyword and tag don't stack — check you haven't lost one).
- **The list changes on refresh**: as a visitor, page size is capped and the page is random — normal. Sign in for consistent paging.
- **Card titles are blank**: the film list has no fallback for a missing Chinese title; turn Chinese-first off to see the original.
- **"No details for this actor"**: that actor only exists in a film's cast mapping and hasn't entered the actor library.
- **Comic "Continue reading" disappeared**: the server has no progress for this account, or its chapter is no longer in the chapter list.
- **Progress followed you but settings didn't**: progress is per account on the server, settings live in the old browser. That's expected.
- **Novel reader says a parameter is missing**: enter from the detail page's contents or the Read / Continue button.

## Next

- [The Pages Visitors See](./overview.md)
- [Sharing, the store and profile pages](./share.md)
