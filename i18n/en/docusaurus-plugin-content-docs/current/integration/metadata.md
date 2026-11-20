---
title: Where Film Data Comes From
sidebar_label: Metadata
description: All of AMMDS's film data sources in one place — what each one gives you, what to prepare, how to enable it, and how priority and re-filling work when several are on.
sidebar_position: 2
---

# Where Film Data Comes From

Covers, descriptions, cast lists and tags are not produced by AMMDS; they are fetched from outside data sites. This page puts every data source side by side: what each one gives you, what you need, how to switch it on, and which result wins when several are on.

> **Metadata source**: an outside site that supplies film data. AMMDS asks it using the ID number in the filename and gets back the cover, description, cast and so on.

> **Scraping**: AMMDS looking a film up on a data site and copying the result into its own library.

> **ID number**: the film's identification code, usually part of the filename, for example `SSIS-001`. AMMDS recognises films mainly by this.

## Start with one source

:::tip[You don't need them all]
Ten sources does not mean ten must be on. Pick one you can actually reach, get it working, then consider a second. More sources means a higher hit rate, but also more to configure and maintain.
:::

| Source | What it gives | What you need | Default |
| --- | --- | --- | --- |
| MetaTube | Title, description, release date, runtime, rating, cast, director, studio, label, series, genre, stills for ID-number films; actor profiles | Optional: the built-in local service, or a remote address plus token | Off |
| TMDB | Titles, descriptions, stills and crew for films, shows and actors | An access token (or use the authorise button); account ID optional | Off |
| TheTVDB | Season and episode structure for shows, films too | API key (required); subscription PIN for some keys | Off |
| Bangumi | Anime entry titles, descriptions, episodes, characters and voice actors, staff | No key needed to search; account features need authorisation | Off |
| ThePornDB | Film and actor data; can also use a self-hosted or public Stash-Box instance | API key; Stash clients need their own endpoint and key | Off |
| TheJavDB | Title, release info, cast, categories and sample images by ID number | No key, just a reachable address | Off |
| R18.dev | Online ID lookup, or import the official data pack for offline use | Online needs a reachable address; offline needs the data pack | Off |
| FANZA DMM | Film search and rankings (today's new releases, coming soon) | No account and no key | Off |
| Madou | Bulk sync of films and actors | Service address; a notice on the page says the service has stopped | Off |
| M-Team DMM | Film data through M-Team's DMM interface, importable directly | An M-Team access token (shared with the site resource page) | Off |

## The same three steps

Whatever you configure, the flow is the same — see [Connect External Services in Three Steps](./overview.md) for details:

1. Turn on **Enabled**, and turn on the smaller switches you need (film search, show search, etc.).
2. Fill in the address and keys, then click **Save**.
3. Click the **connection test** to confirm the address answers, then the **search test** to confirm data really comes back.

:::warning[Two switches, both of them]
Most sources have smaller switches such as film search, show search or metadata search. The master switch on its own will not make it search, and will not collect rankings.
:::

---

## MetaTube

MetaTube gathers many film and actor sites behind one address, so one setup covers a lot of ground, and it can translate titles and descriptions into Chinese as it goes. AMMDS can use the copy built into the program, or connect to a MetaTube service you run yourself.

| Item | Detail |
| --- | --- |
| Where | Integrations → Metadata → MetaTube |
| Built-in service | Used when "Prefer built-in service" is on and the local process is running; listens on port 18080 by default |
| Remote service | Used when that switch is off, or the local process isn't running |
| What it gives | Title, ID, release date, runtime, rating, cast, director, studio, label, series, genre, description, stills; actor birthday, nationality, height, measurements, blood type |
| What you need | Address and token in remote mode; in built-in mode the program is downloaded automatically if missing |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means it never takes part in scraping |
| Prefer built-in service | On by default; turn off to use a remote service | If the local process isn't running it falls back to the remote address, which may be a different instance |
| Remote service address | Default `https://metatube.lifebus.fun`; must start with `http(s)://` and must not end with `/` | Wrong format fails the connection test |
| Enable authentication | Only if the remote service has a TOKEN | On without a token means the remote service rejects requests |
| Token | Must match the remote service's TOKEN | Wrong token: connects fine, returns nothing |
| Priority | Order of data sources, earliest wins. Default: `Caribbeancom,AVBASE,Pcolle,DUGA,MYWIFE,1Pondo,JAV321,FC2,TOKYO-HOT,JavBus,Getchu,fc2hub,Gcolle,HeyDouga,FALENO,FANZA,H0930,DAHLIA,H4610,HEYZO,SOD,10musume,KIN8,ThePornDBScene,C0930,AVE,PACOPACOMAMA,MGS,ThePornDBMovie,JAVFREE,CaribbeancomPR,MURAMURA`, separated by commas | A site too far down the list may never be reached |
| Enable translation | Off by default; on means titles and descriptions get translated while scraping | Off leaves the original text |
| Translation service | Options `GoogleFree,Google,OpenAI,DeepL,Baidu,Microsoft`; the one you save is the one used, first time it's `GoogleFree` | Picking an engine that needs a key without entering one means no translation |
| Google / DeepL / OpenAI keys and URLs | Key required when that engine is chosen; leave the URL empty for the default | Missing key: translation fails, logged but filing still succeeds |
| OpenAI model / prompt | Model name and a custom translation prompt | Empty leaves it to the service |
| Baidu app ID / secret | Required when Baidu is chosen | Missing means no translation |

Buttons on the config card: **Start built-in service**, **Stop built-in service**, **Restart built-in service**, **Refresh**, **Save**. The download card handles the MetaTube program itself; if missing it is downloaded asynchronously after startup.

:::note[The connection test checks the remote address]
It tests "Remote service address", not the local process. To see whether the built-in service is ready, look at "Built-in app info"; if that fails, check the program was downloaded and click **Start built-in service**.
:::

---

## TMDB

TMDB (The Movie Database) is a general film and show database. Once connected it takes part in film, actor and show search.

| Item | Detail |
| --- | --- |
| Where | Integrations → Metadata → TMDB |
| What it gives | Film details, stills and crew; actor profiles; seasons and episodes |
| What you need | An access token from creating an app on the TMDB developer site, or use the authorise button |
| Page | Three cards: configuration, connection test, search |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no searching at all |
| Service address | Default `https://api.themoviedb.org`, rarely needs changing | Wrong address means no connection |
| Access token | TMDB API Read Access Token | Empty or wrong: key check returns 401 |
| Account ID | Used by "Get account info"; written automatically after authorising | Empty means account info fails |
| Film search | On by default | Off means TMDB skips film search |
| Show search | **Off** by default | Off means the backend always answers "no shows found" |
| Actor search | On by default | Off means TMDB skips actor search |
| Image base URL | Default `https://image.tmdb.org/t/p/`; leave empty and the backend fetches it | Blocked address means images don't load |
| Image size | Default `original`, appended to the base URL | Wrong size gives a 404 |
| Language | Default `zh-CN` | A wrong code isn't an error, you just don't get that translation |

### Buttons and search

| Button | What it does |
| --- | --- |
| Get authorisation | Opens the TMDB authorisation page; after agreeing it returns to a callback page and writes the token and account ID |
| Test connection | Checks whether the service is reachable |
| Verify key | Confirms the access token is valid |
| Get account info | Shows the avatar and account details; needs the account ID |

Search has three tabs: TMDB films (click a result for details and crew, then "Import" to file it), TMDB actors (Import writes to the actor library) and TMDB shows (use "Import preview" first, then "Import all seasons" or "Import this season"). Season number `0` means specials; the preview only builds a draft and writes nothing.

---

## TheTVDB

TheTVDB is mainly about season and episode structure, though the same page also handles films. Its current interface only answers to a key, so the key is mandatory.

| Item | Detail |
| --- | --- |
| Where | Integrations → Metadata → TheTVDB |
| What it gives | Show basics, characters and crew, season list, episode list; film poster, description, genre, studio, summary |
| What you need | API key (required); subscription PIN for "user-supported" keys |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means it never takes part in scraping |
| Service address | Default `https://api4.thetvdb.com`; with or without `/v4`, both work | Wrong address means no connection |
| API key | Required | Without it the plugin counts as unavailable |
| Subscription PIN | Only for "user-supported" keys, otherwise leave empty | Missing when required: login fails |
| Language | Three-letter code, default `zho` (Simplified Chinese); `eng` English, `jpn` Japanese | Wrong code isn't an error; you get the original text |
| Show search | Off by default; controls show search | Off means shows are never found (films have no separate switch) |
| Request interval | Default `1000` ms, shared by all requests to TheTVDB in this process | Too small triggers rate limiting |

To search, pick a type (show or film), type a keyword, set the first-air year and choose how many results you want (default 10, server cap 50), then click "Search". "View details" loads the extended data and "Import" files it. Leave the season number empty to import every season.

:::note[Reachability and key check are separate]
"Test connection" only proves the network can reach TheTVDB; an invalid key still fails to log in. Both must pass.
:::

---

## Bangumi

Bangumi (bgm.tv) is an anime database, strongest on episodes, characters, voice actors and staff.

| Item | Detail |
| --- | --- |
| Where | Integrations → Metadata → Bangumi |
| What it gives | Entry title, description, episodes, characters and voice actors, staff, related entries |
| What you need | No token for searching; account features need "Get authorisation" |
| Worth knowing | The app keys are built in, so you never see a client ID, secret, callback address or User-Agent |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no searching |
| Authorisation URL | Default `https://bgm.tv` | Wrong means the authorisation page won't open |
| API URL | Default `https://api.bgm.tv` | Wrong means search fails |
| Access token / refresh token | Written automatically after authorising | Without authorising, reachability may still pass but token verification fails |
| Refresh validity | Default `604800` seconds (7 days) | Rarely needs changing |
| Show search | Off by default; controls anime/show search | Off means anime is never found |
| Request interval | Default `1000` ms | Too small triggers rate limiting |
| Language | Default `zh-CN` | Affects the language of returned text |
| Token expiry | Absolute expiry time, `0` means unknown | Nothing to fill in |

You can search by keyword or use "Query by ID" with a Bangumi entry ID. Pick a season number at the bottom of the details (`0` for specials) and click "Import to show library"; "Mapping preview" shows the normalised result first.

:::warning[Changing account only overwrites]
There is no revoke or clear button. To switch accounts, click "Get authorisation" again and the new token overwrites the old one.
:::

---

## ThePornDB / StashBox

ThePornDB supplies film and actor data. Besides its official service it can use a Stash-Box server — one you host or a public one; both are set up on the same page.

| Item | Detail |
| --- | --- |
| Where | Integrations → Metadata → ThePornDB |
| What it gives | Film data (switchable between scene and movie) and actor data; the same from Stash clients |
| What you need | An API Token generated in your ThePornDB account; Stash clients need a name, endpoint (like `http://host:9999/graphql`) and key |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no searching |
| Service address | Default `https://api.theporndb.net` | Wrong means no connection |
| Key | The API Token from your ThePornDB user settings | Empty means "Get user info" fails |
| Perceptual hashing (matching images by what they look like) | Off by default; on needs the VideoHashes program | Without the program the feature is unavailable |
| Fuzzy matching | Off by default; on allows loose title matching | Off matches strictly |
| Ranking collection | Off by default; on collects the "recently updated" ranking | Only affects rankings, not search |

:::warning[Two different keys]
The key in the main config is only for the official API. Stash client keys are stored with the client and do nothing in the main config.
:::

Search has four tabs: ThePornDB films, ThePornDB actors, Stash films, Stash actors. Results can be filed with "Import film" or "Import actor". With no usable client you'll be told to check the Stash client configuration.

---

## TheJavDB

TheJavDB returns film data by ID number and works well as an extra source for numbered films. No key to apply for.

| Item | Detail |
| --- | --- |
| Where | Integrations → Metadata → TheJavDB |
| What it gives | Cover, ID, release date, runtime, category tags, studio, tags, series, director, cast, source link, description and sample images |
| What you need | A reachable address; point it elsewhere for a self-hosted or mirror service |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no searching |
| Service address | Default `https://api.thejavdb.net`, with `http(s)://` and no extra path | Wrong means no connection |
| Film search | Off by default; only on means it joins automatic scraping | Off still lets you search on the page, but not during scraping |

:::note[Page search and scraping are different paths]
The ID-number search on the page calls the source directly to check the address and data, and is not limited by the film search switch. To make it part of automatic scraping you must turn that switch on and save. There is no import button here; filing happens in the scrape task.
:::

---

## R18.dev

R18.dev has an online interface and also offers a data pack you can download for offline use.

| Item | Detail |
| --- | --- |
| Where | Integrations → Metadata → R18.dev |
| What it gives | Cover, ID, release date, runtime, actresses, actors, director, category, studio, tags, series, author, trailer, description, preview images |
| What you need | Online needs a reachable address; offline needs the official data pack imported (`.sql`, `.sql.gz` or `.sql.zip`) |
| Page | Configuration, data statistics, data import, ID search, connection test |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no searching |
| Service address | Default `https://r18.dev` | In pure offline mode an unreachable address doesn't affect local search |
| Film search | Off by default; only on means it joins automatic scraping | Off means it's never used automatically |
| Online search | Off by default; on means scraping tries the online API first, off means local library only | Off with no data imported means nothing is found |

To import the pack: click "Download page" or "Get latest data pack" → drag the file into the upload area or pick it → click "Start import" (you can cancel during upload) → you'll see "File uploaded, importing in the background...".

:::warning[Importing is heavy]
Decompressing and writing to the database uses a lot of CPU, disk and database connections. Do it in a quiet period and don't upload the same file twice.
:::

The statistics card shows row counts and the change since last import; "Refresh" recounts. ID search offers online or offline: online queries the API first then the local database; offline only searches locally and sends nothing outward.

---

## FANZA DMM

FANZA (DMM) provides film search and rankings. No account, no key.

| Item | Detail |
| --- | --- |
| Where | Integrations → Metadata → FANZA DMM |
| What it gives | Keyword / ID search, date search, aggregated online search, rankings (today's new releases and the next 3 days' coming soon) |
| What you need | Nothing. The address is fixed inside AMMDS (default `https://api.video.dmm.co.jp/graphql`) and cannot be changed on the page |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means it does nothing at all |
| Ranking collection | Off by default; only affects the ranking task | The master switch alone does not collect rankings |
| Film search | Off by default; only on means it joins film search and scraping | Off means nothing is searched |

:::note[Each switch has its own job]
The master switch decides whether the plugin is used at all; ranking collection is the ranking task; film search is keyword / ID search and scraping.
:::

Rankings run once per calendar day: a day already collected is not requested again, and "coming soon" only fills in missing dates. "Test connection" only checks whether `https://api.video.dmm.co.jp` is reachable — it validates nothing and doesn't prove the data endpoint works.

---

## Madou

Madou copies films and actors, page by page, from its own service into your library. There is no keyword search, only a bulk "sync".

:::warning[Service notice]
The top of the page shows a notice that the data source stopped serving from 3 April 2026. The configuration and sync buttons remain, but the API may no longer return data — decide for yourself whether to keep it enabled.
:::

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no collection |
| Service address | Default `https://api.modelmediaasia.com` | Wrong means no connection |
| Film collection | Off by default; required before "Sync films" | Off means the button is rejected telling you to enable it first |
| Actor collection | Off by default; required before "Sync actors" | Same |

The connection test card has three buttons: **Sync films** (pulls pages asynchronously and files by publish time), **Sync actors** (pulls actor data asynchronously) and **Test connection** (health check on the address currently in the form). Submitting returns "sync task submitted" immediately; the real work runs in the background. Clicking again while the same sync runs is rejected with "sync in progress, please don't repeat".

:::tip[Save before you test]
The connection test uses the address currently in the form. Save first, then test and sync, so you're not testing one address while running another.
:::

---

## M-Team DMM

M-Team's DMM data ability lives on the "Site resources → M-Team" page rather than under Metadata, but it takes part in film search and import all the same.

| Item | Detail |
| --- | --- |
| Where | Integrations → Site resources → M-Team (search test at the bottom) |
| What it gives | DMM film data (importable), actresses / labels, collections, keywords |
| What you need | An M-Team access token (shared with the site resource configuration) |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no search and no account protection check |
| Service address | Default `https://api.m-team.io/api` | Wrong means no connection |
| Passkey | Used to build download links | Missing: search works, downloads fail |
| Access token | Created under the site console's lab; shown only once | Empty means nothing is found |
| Temporary authorisation code | An extra code some site features ask for | Only if needed |
| Account protection notice | Off by default; periodically checks login state and notifies you | The site bans accounts that stay logged out too long |
| Metadata search | Off by default; only on does the DMM interface join search | Off means the test replies "please enable metadata search in the M-Team integration config" |

The search test offers four types: DMM data (ID or title keyword, importable), actress / label, collection, keyword. The result table shows cover, ID, title, ID number, info and the actions you can take, plus the hit count and how long the search took. Clicking a row opens the full details.

:::tip[When the import button appears]
The inline "Import" only shows when the type is DMM data and the row has an ID number. For other types, open the details and import by ID number from the torrent list.
:::

---

## Which result wins

- **Priority**: inside MetaTube, sources are tried in the order in "Priority". Between separate sources, scraping and recognition rules decide which result is used.
- **Sub-switches set the scope**: film search, show search and metadata search each decide whether that source joins that kind of search.
- **No automatic backfill**: changes to priority, language, image address or switches apply to **future** tasks only. To apply new settings to films already filed, run the scrape task again.
- **Translation is optional**: Chinese titles and descriptions are filled in by the translation channel; a failure is only logged and does not undo matched data.

> **Backfill**: applying new settings to films that were already processed. AMMDS won't do it on its own — you need to run a scrape again.

## Keep your keys safe

The TMDB access token, TheTVDB key and PIN, Bangumi tokens, ThePornDB and Stash keys, the MetaTube token, and M-Team's passkey and token are all credentials.

- Never paste a plain-text key into a screenshot, an issue, a group chat or a log.
- If you suspect a leak, revoke it at the site first, then generate a new one and paste it back.
- Switch off and clear the keys of sources you no longer use.

## If something goes wrong

- **Saved but it never scrapes**: check that "Enabled" and the film / show / metadata search switches are all on and saved.
- **Connection test fails**: check protocol and port; don't use `127.0.0.1` in a container; confirm the machine can reach the internet.
- **Test passes but search is empty**: check whether the key is valid, whether the quota ran out, whether the sub-switch is on, and whether the keyword is in a format this source recognises.
- **401 or 403**: token expired or lacking permission — generate a new one at the site.
- **429 or frequent timeouts**: rate limited; raise the request interval.
- **Images don't show**: the image address is blocked or the site blocks hotlinking.
- **One source is always empty**: check whether that service still exists (Madou's page carries a shutdown notice).

## Next

- [Where to find resources](./indexer.md)
- [Download resources automatically](./downloader.md)
- [Small tools that improve recognition](./auxiliary.md)
