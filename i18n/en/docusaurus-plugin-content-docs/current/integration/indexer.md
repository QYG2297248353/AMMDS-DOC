---
title: Where to Find Resources
sidebar_label: Indexers
description: "All of AMMDS's site resource connections — M-Team, NexusPHP (with KamePT), Rousi, FSM, Prowlarr and BitMagnet: what each is, whether you need an account, and how to fill in the settings."
sidebar_position: 3
---

# Where to Find Resources

For AMMDS to find films for you, you have to tell it *which sites to look on*. This page covers every site AMMDS can search: what the site is, whether you need an account, and how to fill in its settings.

> **Site resource**: a site AMMDS is allowed to search. Most are private sharing sites you need an invitation for; a few are search services you run yourself.

> **Private tracker (PT site)**: a sharing site that runs on upload volume. While you download you also upload to others, and the site records that; accounts left unused for a long time may be closed.

> **Torrent**: a small file — or a link — that records where the pieces of a download are and who has them. A downloader uses it to start downloading.

> **Magnet**: a line of text you can hand straight to a downloader. It does the same job as a torrent file without depending on any site to host it.

> **RSS**: a list a site publishes of its newest items in a fixed format, so other programs can read it on a schedule.

> **Authentication**: proving to the site that you own the account, usually with a secret string only you and the site know.

## Two things before you start

1. **You need your own site accounts.** AMMDS provides no accounts, invites or registration for any site; it only searches using the login details you supply.
2. **The search order has a default.** Subscriptions look at `M-Team,NexusPHP,Rousi,Prowlarr` in that order: the earlier a platform appears, the higher its results rank, and platforms not on the list come after the ones that did match. **Prowlarr is the one exception — it always sorts last.**

| Site / service | What it is | Account? | Main use |
| --- | --- | --- | --- |
| M-Team | General private tracker, invite only | Yes: passkey + access token | Subscription search and download, plus DMM film data |
| NexusPHP | A site platform — **one plugin, many sites** | Yes: one site token per site | Subscription search, user info sync, alerts |
| KamePT | A NexusPHP site with no plugin page of its own | Yes: site token; optional site authentication | Joins search once added through the NexusPHP plugin |
| Rousi | General private tracker, invite only | Yes: passkey (temporary code optional) | Subscription search, torrent detail lookup, download links |
| FSM | Site on its own framework | Yes: passkey + API token | Subscription search and download |
| Prowlarr | An indexer aggregator you host | Yes: Prowlarr's API key | One request covers every indexer behind it |
| BitMagnet | A torrent search service you host | No site account, but you must host it | Magnet search, file lists and directory trees |

---

## M-Team

M-Team does two jobs at once: it takes part in subscription search and produces download links, and its built-in DMM interface supplies film data.

| Item | Detail |
| --- | --- |
| Where | Integrations → Site resources → M-Team |
| Network | The site's web domain and its API domain differ; check both are reachable before switching it on |
| Credentials | Passkey: console → settings → main page, "key" section, send it to your email. Access token: console → settings → lab, create and copy it (shown once) |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no search, no data search, no account protection check |
| Service address | Default `https://api.m-team.io/api`; alternatives `https://api.m-team.cc/api` or `https://api2.m-team.cc/api` | Wrong means no connection |
| Passkey | Used to build torrent download links | Missing: **search works, downloads fail** |
| Access token | The key used to call the site; both search and film-data search depend on it | Missing means nothing is found |
| Temporary authorisation code | An extra code some site features ask for | Only if needed |
| Account protection notice | Off by default; periodically checks login state and notifies you | The site bans accounts that stay logged out too long |
| Metadata search | Off by default; on lets the DMM interface join online search and scraping | Off means the test tells you to enable it first |

:::warning[The two credentials are not interchangeable]
The access token is for **searching**; the passkey is for **building download links**. Filling in only one gives you either "found but can't download" or "can download but can't find".
:::

Two tests on the page: the connection test only checks reachability and validates nothing; the search test needs metadata search on and can search `DMM data`, `actress / label`, `collection` or `keyword`.

:::tip[Data ability doesn't affect downloading]
Metadata search only affects recognition and scraping. Turning it off does not break subscription downloads.
:::

---

## NexusPHP

NexusPHP is a widely used site platform. This plugin is **one plugin for many sites**: KamePT, the Rousi NexusPHP group, Kelu, NicePT, ilolicon and custom sites can all be added.

| Item | Detail |
| --- | --- |
| Where | Integrations → Site resources → NexusPHP |
| Site version | The page notes compatibility with NexusPHP 1.9.0+ (check the footer for `Powered by NexusPHP`). The app does not verify the site version; treat this as a reference only. Older sites may be incompatible and need checking on your own. |
| Site token | Created under the site's control panel → settings; needs at least: list torrents, view torrent details, view basic user info |

### Settings (plugin level)

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means the only thing still working is the site list |
| Search | Off by default; on lets sites join subscription search | Off means these sites are never searched |
| Sync user info | Off by default | Off means both single and full sync are rejected |
| Alert notification | Off by default; notifies on site errors and account risk | Off means no alerts |

### Adding a site

1. Click "Add site" to open the dialog.
2. "Site name" can be typed or picked from the official presets; picking one fills in the address and logo.
3. Enter the **site token** and leave "Enabled" on.
4. Click "Health check" to verify address and token, then click "Add".

| Field | Label | Required | If empty or wrong |
| --- | --- | --- | --- |
| `name` | Site name | Yes | Shown in results and alerts |
| `url` | Site address | Yes | Full home address including protocol; wrong fails the health check |
| `logo` | Site logo | No | Display only |
| `token` | Site token | Yes | Leave empty when editing to keep the existing token; insufficient permission logs "insufficient permission" |
| `enable` | Enabled | Yes | Disabled sites skip cross-seeding and user info sync |

The site card has three buttons: **Refresh** (load the list again), **Sync user info** (goes through every enabled site) and **Add site**. Syncing runs in the background, and the page says "task submitted" straight away.

:::warning[Presets still need a token]
Presets only fill in name, address and logo. You must generate the token at the site — it isn't in the preset and can't be filled in for you.
:::

The health check asks the site for its categories, its torrents and your account info. If the token lacks permission, the page says so clearly.

---

## KamePT

KamePT is a NexusPHP site with **no plugin page of its own**; its search comes from the NexusPHP plugin. There is also a separate site authentication path.

| Item | Detail |
| --- | --- |
| Site address | `https://kamept.com` |
| Search entry | Integrations → Site resources → NexusPHP; when adding a site pick **KamePT** in "Site name" and the address and logo fill in automatically |
| Authentication entry | Avatar menu → Site authentication, choose KamePT |

### Steps

1. Open the NexusPHP plugin, turn on **Enabled** and save.
2. Click "Add site" on the site card.
3. Pick **KamePT** as the site name.
4. Enter the **site token** (created under the site's control panel → settings → access token) and leave "Enabled" on.
5. Click "Health check", then "Add" once it passes.

### Site authentication (optional)

Authentication is a separate path from the plugin config:

1. Open the avatar menu in the top-right and go to **Site authentication**.
2. Pick **KamePT** from the site list.
3. Enter your site **UID** and **passkey** and submit.
4. Features that depend on the result only work once it passes; **you must repeat it after every service restart**.

:::note[How results are labelled]
KamePT results are labelled `NexusPHP`, which is already in the default subscription order, so there's nothing to add. Searching asks the site's main search first, then each category you configured; one failing category doesn't affect the others.
:::

---

## Rousi

Rousi has two addresses to fill in — one for its **RSS service**, one for its **search service** — because the two may sit on different domains.

| Item | Detail |
| --- | --- |
| Where | Integrations → Site resources → Rousi |
| Default domains | RSS `https://rousi.pro`, API `https://rousi.pro/api` |
| Credentials | Sign in → avatar → account settings → Passkey, then copy it in |

:::note[Different domains in the group]
Two Rousi entries are registered: `rousi.pro` and `rousi.zip` (announced as closing). The plugin points at `rousi.pro` by default; if you use the other domain, change both addresses to match.
:::

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no search, no download, no account protection check |
| RSS service address | Default `https://rousi.pro`; used for the RSS path and to complete relative cover URLs | Wrong means broken cover images |
| API service address | Default `https://rousi.pro/api`; the search endpoint is this plus `/v1/search` | Wrong means nothing is found |
| Passkey | The key the site gives you; used for searching and for building download links | Missing: search works, downloads fail |
| Temporary authorisation code | An extra code the site may ask for; leave empty if you weren't given one | Main search only needs the passkey; leave empty if unused |
| Account protection notice | Off by default; periodically checks login state and notifies you | The site bans accounts that stay logged out too long |

Two test buttons: **Test RSS connection** (checks the RSS address) and **Test API connection** (checks the API address that subscription search depends on). Both only probe reachability and don't validate the passkey.

---

## FSM

FSM is not a NexusPHP site, so it's set up only here, never under site authentication. Its search and RSS services sit on different domains: searching uses an API token, download links use a passkey.

| Item | Detail |
| --- | --- |
| Where | Integrations → Site resources → FSM |
| Credentials | Sign in and view your passkey and API token in account settings |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no search and no download |
| API service address | Default `https://fsm.name/api`; the search path is this plus `/Torrents/listTorrents` | Using the site home page won't connect |
| RSS service address | Default `https://api.fsm.name`, a different domain from the API | Filling only one disables the matching feature |
| Passkey | Used to obtain torrent download links | Missing: can search, download fails |
| API token | The key used for searching | Invalid means empty results |

:::warning[Each credential covers one half]
The API token decides whether you can search; the passkey decides whether you can download. Both must be right for the chain to work.
:::

Two test buttons: **Test RSS connection** and **Test API connection**. Both only check that the domain is reachable and validate nothing.

:::tip[Add FSM to the order if you want it first]
FSM isn't in the default order `M-Team,NexusPHP,Rousi,Prowlarr`. Unlisted platforms aren't prioritised, but they aren't excluded either — add `FSM` to the subscription search order if you want its results first.
:::

---

## Prowlarr

Prowlarr is a search hub you install yourself: it gathers many sites' searches behind one address, so AMMDS asks Prowlarr once and Prowlarr passes the question on to everything behind it.

| Item | Detail |
| --- | --- |
| Where | Integrations → Site resources → Prowlarr |
| Deployment | Self-hosted; AMMDS only needs to reach its address |
| Difference from direct sites | A direct plugin searches one site; one Prowlarr request covers every indexer configured in it |
| Credentials | Prowlarr UI → Settings → General → API Key |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no search |
| Service address | Prowlarr's address including protocol, e.g. `http://127.0.0.1:9696` | Empty means search returns nothing and the log says "indexer configuration incomplete" |
| API key | Prowlarr's API key (a long password Prowlarr shows you) | Wrong means it connects but search is always empty |

:::warning[Both are required]
Address and key are both mandatory. Neither being empty raises an error — search simply stays empty.
:::

The query only asks for the adult category. If you haven't configured any indexers in Prowlarr that support it, results will be empty. Prowlarr results come with direct links, so downloading doesn't need a second lookup.

:::tip[Best used as a fallback]
Let direct sites try first, then let Prowlarr cover everything behind it. It always sorts last, so direct sites keep priority.
:::

---

## BitMagnet

BitMagnet is an open-source torrent search service you host: it keeps discovering and classifying torrents on its own. Once connected you can search public torrents, not just the sites you configured.

| Item | Detail |
| --- | --- |
| Where | Integrations → Site resources → BitMagnet |
| Deployment | **Must be self-hosted**; AMMDS has no built-in crawler |
| Ports | At least web port `3333` and crawler port `3334` (TCP/UDP), plus a database |
| Role | Not part of the subscription search order; it serves magnet search |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means search and file queries reply "BitMagnet integration plugin not enabled" |
| Service address | Default `http://127.0.0.1:3333`; in a container don't use `127.0.0.1` — use the host address or service name, e.g. `http://bitmagnet:3333` | Using `127.0.0.1` connects AMMDS to itself |

:::warning[The container address trap]
With Docker, `127.0.0.1` is the container itself. Use the host address or the service name instead.
:::

Two buttons: **Test connection** (reachability only) and **Get app status** (returns "Basic info" and "Service status" tabs). Status shows whether the crawler, the database and TMDB are healthy.

:::tip[Check status before anything else]
When search is empty, click "Get app status" first. If the crawler shows a problem, it hasn't discovered torrents yet and the issue is on the BitMagnet side, not AMMDS.
:::

:::note[Not in the subscription order]
BitMagnet isn't in the subscription search order, so automatic subscription downloads never use it. It serves the magnet search page and suits keyword hunts for obscure material.
:::

## If something goes wrong

- **Saved but still nothing found**: check that "Enabled" is on and saved; for NexusPHP also check "Search" is on and the site itself is enabled.
- **Connection test fails**: check protocol and port; don't use `127.0.0.1` when AMMDS runs in a container; confirm the machine can reach the internet.
- **Found but won't download**: usually an empty or expired passkey — fetch a new one at the site.
- **"Configuration missing"**: address or token is empty; fill it in, save, and search again.
- **Health check fails or "insufficient permission"**: wrong address, a token copied only partly, or a token without the needed rights. Generate a new token at the site rather than retrying the same one.
- **FSM results never appear**: FSM isn't in the default order; add `FSM` to the subscription search order if you need it.
- **Account protection notices keep arriving**: sign in to the site in a browser once; you can also turn the notice off.

## Next

- [Download resources automatically](./downloader.md)
- [Where film data comes from](./metadata.md)
- [Connect External Services in Three Steps](./overview.md)
