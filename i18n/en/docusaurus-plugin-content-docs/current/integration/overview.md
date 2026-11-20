---
title: Connect External Services in Three Steps
sidebar_label: Integrations
description: What Integrations are, what the six groups cover, the three-step flow for connecting any external service, and which ones are required or optional.
sidebar_position: 1
---

# Connect External Services in Three Steps

AMMDS doesn't make film data itself, and it doesn't download files itself. It uses other services for that. To get covers filled in, resources found, or messages sent to your phone, you connect those services one by one under **Integrations**.

Every service works the same way: **turn it on → fill in its details → test it**. The other pages in this section go through each one.

## First, what Integrations means

> **Integration**: a page in AMMDS that holds the details of one outside service. You type in its address and account details, and from then on AMMDS talks to it for you.

> **External service**: anything outside AMMDS — a website, or a program on another machine, such as a data site, a downloader or a player. You tell AMMDS where it is and how to sign in, and the two are linked.

> **Setting**: a box you type in, or a switch you turn on. Each service page has a table explaining its own settings.

## Six groups, one job each

The sidebar is split into six groups by purpose:

| Group | What it handles | Included |
| --- | --- | --- |
| Metadata | Covers, descriptions and cast for films, shows and actors | MetaTube, TMDB, TheTVDB, Bangumi, ThePornDB, TheJavDB, R18.dev, FANZA DMM, Madou |
| Site resources | Which sites to search | M-Team, NexusPHP, Rousi, FSM, Prowlarr, BitMagnet |
| Downloaders | What actually downloads | qBittorrent, Transmission, IYUU |
| Media servers | Which player to sync to | Jellyfin, Emby |
| Notifications | Who gets told when something finishes | Bark, Telegram, Webhook |
| Auxiliary tools | Small helpers that make recognition better | FFmpeg, Translation, DeepSeek, VibeVoice, MeiliSearch, FlareSolverr, AMap, Cloud Storage |

:::note[One more group]
The sidebar also has a cloud sync group, used to back up your configuration to network storage. It does not take part in filling in film data.
:::

## What you must set up, what you can skip

| What you want | Required | Optional for now |
| --- | --- | --- |
| Recognise films and fill in covers | At least one metadata source, plus one scrape run | More sources raise the hit rate, but one works |
| Find resources and download automatically | At least one site resource plus qBittorrent | Prowlarr and BitMagnet are fallbacks, add them later |
| A tidy poster wall on the TV | Jellyfin or Emby | Both is fine; play statistics are merged |
| Notifications on your phone | Any one channel, with the master notification switch on | Telegram also supports bot commands, not required |
| Files can be scanned and converted | FFmpeg (on by default) | Leave it alone if you never convert |
| The top search box finds things | MeiliSearch | List filters still work, but global search stays empty |

:::tip[Add them one at a time]
Don't switch everything on at once. Get one metadata source working first, then add the next — problems are much easier to locate that way.
:::

## Step by step

1. **Open** Integrations → unfold a group on the left → click the service you want.
2. **Turn "Enabled" on.** Details typed in while this switch is off do nothing.
3. **Fill in the details** → service address, key or token, username and password → click **Save** in the top-right corner. Nothing is stored until the success message appears.
4. **Turn on the extra switches.** Many services have smaller switches such as film search, show search, ranking collection or metadata search. Turn on the ones you need and save again.
5. **Test it.** Click the connection test to confirm the address answers, then run the search test to confirm data really comes back.

:::warning["Reachable" is not the same as "working"]
Most connection tests pass as soon as the other server answers at all — even with "no permission". So if the test passes but the search comes back empty, stop checking the network. Look at the key, the quota, the extra switches and the keyword instead.
:::

## Settings explained

Every configuration page is built from the same kinds of controls:

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn the switch on | Nothing else takes effect until this is on |
| Service address | The service's web address, including `http://` or `https://` | Empty or wrong means the connection test fails; using `127.0.0.1` inside a container points at the container itself |
| Key / token / API key | A long password the other service gives you; anyone holding it can act as you | Empty or wrong usually shows up as "connects but returns nothing", or a 401 / 403 refusal |
| Username / password | Login details for a downloader or media server | Wrong details show up as "connection test passes, fetching info fails" |
| Sub-switches (film search, show search, ranking collection, metadata search) | Turn on as needed | Off means the plugin skips that job, e.g. shows are never found |
| Request interval | Minimum milliseconds between two requests | Too small triggers rate limiting: frequent timeouts or 429 |
| Language | Which language you want back, e.g. `zh-CN` | A wrong code is not an error; you just get the original text instead of a translation |

Two more buttons sit in the top-right of the config card:

| Button | What it does |
| --- | --- |
| Refresh | Discards unsaved changes and re-reads the saved values |
| Save | Submits everything on the page; you only see "saved" if all of it succeeds |

:::note[Saving does not go back in time]
Saved settings apply to **future** tasks only. They do not re-fill data from scans or scrapes that already ran. After changing priority, language or image address, run a scrape again to see the new result.
:::

## Keep your keys safe

These are credentials. If they leak, someone else can spend your quota or act as you:

- MetaTube token and the keys for each translation service
- TMDB access token
- TheTVDB key and subscription PIN
- Bangumi access tokens
- ThePornDB key and Stash client key
- M-Team passkey, access token and temporary authorisation code
- Site tokens, passkeys and API tokens for each site
- Tokens for IYUU, Telegram and Bark

A few rules that matter:

- Credentials are stored in your own database and the config page shows the current values back to you. Restrict access to the admin account and the database, and keep backups safe.
- Do not expose the admin address directly to the public internet.
- **Never paste a plain-text key into a screenshot, an issue, a group chat or a log.** If you suspect a leak, revoke it at the site first, then generate a new one and paste it back.
- Switch off and clear the keys of anything you no longer use.
- After TMDB authorisation the page only returns the account ID and the last four characters of the token, never the full token; Bangumi tokens are written automatically by the callback, so there is nothing to copy by hand.

## If something goes wrong

- **Saved but nothing happens**: check that "Enabled" and the relevant sub-switches are all on and saved. Some items need two switches at once.
- **Connection test fails**: check the protocol and port in the address; if AMMDS runs in Docker, don't use `127.0.0.1`; then confirm the machine can reach the internet at all.
- **Test passes but search is empty**: usually an invalid key, an exhausted quota, a sub-switch that is off, or a keyword that isn't in a format this source recognises.
- **401 or 403**: the token expired or lacks permission. Generate a new one at the site.
- **429 or frequent timeouts**: you are being rate limited. Increase the request interval.
- **Images don't show**: the image address is blocked, or the site blocks hotlinking.

## Next

- [Where film data comes from](./metadata.md)
- [Where to find resources](./indexer.md)
- [Download resources automatically](./downloader.md)
- [Sync to the TV](./media-server.md)
- [Send notifications to your phone](./notification.md)
- [Small tools that improve recognition](./auxiliary.md)
