---
title: Small Tools That Improve Recognition
sidebar_label: Auxiliary Tools
description: "AMMDS's auxiliary tools — AMap, Cloud Storage, DeepSeek, FFmpeg, FlareSolverr, MeiliSearch, Translation and VibeVoice: what each solves and how to configure it."
sidebar_position: 7
---

# Small Tools That Improve Recognition

These don't supply film data and don't download anything, but they make everything else run more smoothly: better recognition, faster search, video conversion, automatic subtitles.

> **Transcoding**: converting a video to another format or quality so it plays on more devices.

> **Proxy**: connecting to another server first and letting that server reach the target site. Used when this machine can't get there directly.

> **Index**: a list built specially for searching. Content is organised first so searching is fast later.

> **Object storage**: online space that stores files as "bucket + name", like many cloud drives and enterprise storage services.

## Which one does what

| Tool | What it solves | Must you host it? | Default |
| --- | --- | --- | --- |
| AMap | Shows current city and weather on the dashboard | No, just a key (works without one too) | Off |
| Cloud Storage | Encrypted config backups; S3 can also hold images | Yes: WebDAV or S3 address and account | Off |
| DeepSeek | AI translation, recognition help, Telegram chat | Yes: address and key | Off |
| FFmpeg | Transcoding, format conversion, screenshots, covers, duration | No, downloaded automatically if missing | **On** |
| FlareSolverr | Gets past bot-check pages on some sites | Yes: you deploy it | Off |
| MeiliSearch | Makes the top search box find films, actors, comics | Yes: you deploy it | Off |
| Translation | Turns foreign titles and descriptions into Chinese | Some channels need keys; the built-in free one doesn't | Off |
| VibeVoice | Turns dialogue in video into subtitle files | Optional: host locally (needs model files) or use an external service | Off |

---

## AMap

Puts the current city and weather on the dashboard's weather card. It works out the city from your outgoing network, or you can pin one.

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means your key isn't used |
| Service address | Default `https://restapi.amap.com`; change it when using a proxy or mirror | Wrong means weather fails to load |
| API key | Apply at the AMap open platform; **choose "Web service" as the platform type** | Empty falls back to the built-in quota — weather still shows, but accuracy and quota depend on it |
| City code | A numeric city code, e.g. Beijing `110000`, Shanghai `310000` | Empty means locate by network; must be 3–6 digits or it counts as unset |

:::tip[Pinning a city is steadier]
Behind a proxy, a VPN or a NAT, network location may land on the data centre. Enter a city code and the weather always matches the city you care about.
:::

"Test connection" runs one health check against the address; it doesn't validate the key and doesn't return weather data.

---

## Cloud Storage

Cloud Storage is really two separate plugins, WebDAV and S3, that share the same idea: encrypted backup, then restore one module at a time.

| Ability | WebDAV | S3-compatible object storage |
| --- | --- | --- |
| Encrypted config backup | Yes | Yes |
| Restore config | Yes | Yes |
| Store images and other resources | **No** | Yes (needs a separate switch) |
| Encryption password | Separate | Separate, independent of WebDAV |

:::warning[What WebDAV is for]
WebDAV usually has limited quota and isn't meant for large numbers of images. Use S3 if you need resources stored remotely.
:::

### What gets backed up

The backup contains **configuration only** — film entries, images and metadata aren't included.

| Module | Contents |
| --- | --- |
| System config | Domain binding, system mode, disk monitoring, ad switches |
| Plugin config | Configuration for each integration |
| Theme and appearance | Theme, background, mourning mode, landing page |
| Personal and profile | Nickname, email, phone, public page theme (no avatar) |
| Interface keys | Open interface access keys and validity |
| Tasks and scan rules | Scan task definitions, run types, schedules |
| Subscription rules | Subscription keywords, matching rules, auto-download policy |
| Admin interface | Admin menus, tabs, theme colour |

The modules ticked by default are `system,plugin,user,secret,task,subscribe`.

### Settings (WebDAV)

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no backups |
| Service address | With protocol, e.g. `https://dav.example.com` | Empty fails the connection test |
| Storage directory | Default `ammds-backup`; empty means the service root | Missing directories are created by the connection test |
| Username | Empty means anonymous | Empty when authentication is needed means no connection |
| Password | Login password; never echoed back as plain text | Same |
| Allow self-signed certificates | Off by default; on for self-hosted services | Off means self-signed certificates fail validation |
| Backup encryption | **On** by default, AES-256-GCM | Off means the backup is plain text |
| Encryption password | Used to derive the key | **Lose it and the backup can't be restored** |
| Restore policy | Default "merge"; also "local first" and "remote first" | A wrong choice gives you values you didn't want |
| Backup modules | Comma-separated codes, default `system,plugin,user,secret,task,subscribe` | Unticked modules aren't in the backup |
| Keep count | Default `5`; older backups are cleaned automatically, `0` means unlimited | Too small and old backups get deleted |

### Settings (S3)

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Both backup and resource storage depend on it |
| Endpoint | e.g. `https://s3.us-east-1.amazonaws.com` or your own MinIO address | Empty means no connection |
| Region | Default `us-east-1` | Mismatched with the service means signing fails |
| Bucket | Must already exist in the service | Missing means the connection test fails |
| Prefix | Default `ammds-backup`, the directory backups go under | A mismatch means the backup list is empty |
| Access key / secret key | The key pair; never echoed back as plain text | Wrong means signing fails |
| Path-style addressing | **On** by default; usually needed for MinIO and similar, off for major clouds | Mismatched means no connection |
| Allow self-signed certificates | Off by default | Turn on for self-hosted storage |
| Store resources on S3 | Off by default; on means newly uploaded images go to S3 with a local cache | Off means nothing moves; resources uploaded before turning it on aren't migrated |
| Public URL prefix | Empty means reading through this system; set it to build direct links, e.g. for a CDN | Wrong means images don't open |
| Local cache | **On** by default; resources read from S3 keep a local copy | Off means every read goes back to S3, using more traffic |
| Encryption / password / restore policy / modules / keep count | Same meaning as WebDAV; the password is separate | Same |

### How to back up and restore

1. Fill in connection, encryption and restore policy under configuration and save.
2. Tick the modules you want and click "Save modules".
3. Optionally add a note and click "Back up now".
4. The list refreshes, showing file name, creation time, size and whether it's encrypted.
5. To roll back, click "Restore", pick the policy, enter the encryption password and confirm.

| Restore policy | Behaviour |
| --- | --- |
| Merge | Fills in missing items and differing config only |
| Local first | Only adds config missing locally, keeps existing local values |
| Remote first | Backup contents overwrite existing local config |

:::warning[Lose the password and you lose the backup]
The password only derives the key locally; the server never stores it. Keep it somewhere separate. Also, restoring never overwrites WebDAV's or S3's own connection settings or password, so you can still back up afterwards.
:::

---

## DeepSeek

DeepSeek brings an AI text model into AMMDS for translation, recognition help and Telegram conversations.

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off hides the balance and model cards and every call counts as disabled |
| Service address | Default `https://api.deepseek.com`; point elsewhere for a relay or proxy | Empty prompts "please configure the connection address" and sends nothing |
| API key | The key from your DeepSeek account | Missing means balance, models and chat are all unavailable |
| Model | Default `deepseek-v4-pro`; type a name or click "Use" in the model list | Old names are mapped: `deepseek-chat` → `deepseek-v4-pro`, `deepseek-reasoner` → `deepseek-v4-flash` |
| Temperature | Default `0.7`; higher is more random, lower steadier | Rarely changed |
| Context length / output length | Defaults `1M` / `384K` — **shown for information only, never sent to the service** | Changing them changes nothing |

### What the page shows

| Block | Contents |
| --- | --- |
| App info | Name, logo, website, docs, version, description |
| Configuration | The settings above, plus "Refresh" and "Save" |
| Balance | Appears once enabled; total, gifted and topped-up balance by currency; green "account available" or red "insufficient balance" |
| Model list | Appears once enabled; model ID, owner and creation time; "Use" writes it back, the active one shows "in use" |
| Connection test | Health check against the current address |

:::note[Concurrency and failures]
Each model has its own limit: `deepseek-v4-pro` up to 500 at once, `deepseek-v4-flash` up to 2500. If no slot is free, a request waits up to 30 seconds, then answers "concurrent requests full". A 429 (too many requests) counts as a failure, and the plugin doesn't retry.
:::

---

## FFmpeg

FFmpeg is the foundation for audio and video work: transcoding, screenshots, cover cropping, thumbnails, and reading duration and resolution. **Enabled by default.**

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | **On** by default | Off means you can't create new transcode / convert tasks (existing ones keep running) |
| Task count | Default `2`, range 1–5, counted per task type | Too high saturates the CPU |
| Transcode output mode | Default "suffix" (also "unified directory") | Choosing "unified" without a directory fails |
| Transcode unified directory | Used when the mode is "unified" | Same |
| Transcode suffix | Default `transcode`, appended to the filename | Rarely changed |
| Convert output mode | Default "same directory" (also "unified") | Same |
| Convert unified directory | Used when the mode is "unified" | Same |
| Default video codec | Default `libx264`, also `libx265` | Missing components give "encoder not found" |
| Default preset | Default `veryfast`, options from `ultrafast` to `veryslow` | Slower saves size but takes longer |
| Default quality (CRF) | Default `23`, suggested 18–28; lower is better quality and bigger files | Outside the range, size or quality changes noticeably |
| Queue waiting | **On** by default; excess tasks queue up | Off means excess tasks fail immediately |
| Task resume | **On** by default; resumes unfinished tasks after a restart | Off marks unfinished tasks failed, retry by hand |

### Components

- Installed under `data/ffmpeg`, chosen per operating system and CPU.
- Checked after startup; **if missing, it's downloaded in the background, retrying every minute**; 32-bit systems aren't supported.
- The download card shows file name, status, progress and path, and offers **download missing**, **refresh status** and **delete**.

:::note[If a download breaks]
Statuses include not started, downloading, done and failed. Delete the broken component and download again; it doesn't affect the other one.
:::

Transcoding lives under **Toolbox → Video transcoding**, conversion under **Toolbox → Format conversion**.

---

## FlareSolverr

Some sites send a "checking your browser" page before the real content, so a plain request only gets that page. FlareSolverr is a service that handles those pages; AMMDS can hand fetching over to it.

> **Bot-check page**: an in-between page a site uses to confirm you're a real browser and not a program.

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means requests go out the normal way |
| Service address | Default `http://127.0.0.1:8191`, pointing at a running FlareSolverr, with protocol and port | Empty prompts "please configure the connection address"; on another machine use its real address |
| Sync proxy config | **On** by default; passes the system network proxy settings to it | Inside a container `127.0.0.1` points at itself; turn sync off if that machine can reach the internet directly |
| Timeout | Default `60` seconds; raise to 90–120 if a site's second check is slow | Too high leaves failing requests holding connections |

:::note[It's a separate service]
AMMDS doesn't download, host or start it. Run it yourself as a container or executable; the plugin only stores the address and calls it.
:::

### When to switch it on

| Situation | Worth it? |
| --- | --- |
| The target site shows "checking your browser" or similar | Yes |
| Plain static sites and open APIs | No — every request just takes an extra hop |
| Login or payment required, or the site blocked your address | No — it can't replace an account or permission |
| 401 / 403 with no check page | No — check the key and account first |

"Test connection" only checks that AMMDS can reach FlareSolverr; it doesn't prove the target site will pass its check.

---

## MeiliSearch

MeiliSearch is a search engine. Once it's set up, films, actors, comics, novels and news are written into a search list (an index) that both the public site and the top search box read from.

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means no indexing and no search; the public search endpoint returns empty |
| Service address | Default `http://192.168.10.24:7700` is an **example** — change it to your own, with protocol and port | Left as-is, it will never connect |
| API key | Auth key for indexing and search; rebuilding needs a **writable** key | Insufficient permission makes rebuilding fail |
| Auto index | **On** by default; periodically rebuilds every type | Off means manual rebuilds only, and new films never enter the index |

### Managing and rebuilding

Index management rebuilds by type, and each rebuild is **full**:

| Option | Contents |
| --- | --- |
| All | Rebuilds every type in turn (films, shows, actors, comics, novels, news) |
| Films | Film titles, ID numbers |
| Actors | Actor names, aliases |
| Comics | Comic titles, authors |
| Novels | Novel titles, authors, series |
| News | News entries |

After a rebuild the card shows how many documents each type took, e.g. `movie=1024, actor=356`. Rebuilding clears that type first and writes in batches, so search results for it may be briefly empty or incomplete.

:::tip[Rebuild once by hand to start]
After a fresh install or a big data change, run a manual "All" rebuild, then let auto indexing keep things fresh. With auto indexing on and the service reachable, the first full rebuild happens about 5 minutes after startup and hourly after that.
:::

The search test only reads the index and changes nothing. If a search finds nothing, check whether that type has been rebuilt.

---

## Translation

Translation turns scraped foreign titles, descriptions and tags into Chinese. There are two channels: AMMDS's built-in translation, or MetaTube.

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means requests reply "translation service not enabled" |
| AI first | Off by default; on tries AI translation first, then machine translation | Off uses the built-in order |
| Default method | Default `ammds` (built-in); the other option is `metatube` | Choosing `metatube` without enabling translation there gives no result |
| Title / description / tags / default prompts | Built-in English templates you can customise; variables `{source_lang}`, `{target_lang}`, `{content}` | A mistake isn't an error, it only affects quality |

:::note[It only translates into Simplified Chinese]
The scraping flow always translates foreign content into Simplified Chinese and detects the source language automatically — there's no target language setting here. Also, the "field translation" switch in the scrape config is off by default; turn it on to get translations.
:::

### Built-in providers

Built-in translation filters out unavailable providers, then tries them in priority order and returns the first success.

| Type | Provider | What to fill in |
| --- | --- | --- |
| Machine | DeepL | Address, endpoint, authorisation code |
| Machine | DeepLX | Address, endpoint, authorisation code |
| Machine | Google Free | Nothing |
| Machine | Microsoft Free | Nothing |
| Machine | Baidu | Address, endpoint, app ID, key |
| Machine | Niutrans | Address, endpoint, app ID, app key |
| Machine | Caiyun | Address, endpoint, token |
| Machine | Tencent | Address, region, project ID, SecretId, SecretKey |
| AI | OpenAI-compatible | Address, endpoint, key, model, temperature, prompt |
| AI | Gemini-compatible | Address, endpoint, key, model, temperature, prompt |
| AI | Anthropic-compatible | Address, endpoint, key, model, temperature, prompt |

Each provider is a card showing online / offline status and priority, with an enable switch, **test**, edit and delete.

:::tip[What "AI first" really does]
It isn't just reordering: routing puts every AI provider ahead of machine translation, and if all AI providers fail it still falls through to machine translation — no manual fallback needed.
:::

With `metatube`, requests go to MetaTube using the engine and keys maintained on its page (Google, OpenAI, DeepL, Baidu — whichever you pick needs its key).

### Translation test

| Field | Detail |
| --- | --- |
| Test content | Text to translate |
| Result | Read-only output |
| Content type | Currently "general" only |
| Method | Machine / AI / auto |
| Source and target language | Pick from the language table |

Supported codes: `auto` (source only, auto-detect), `zh`, `cht`, `en`, `ja`, `ko`, `ru`, `cs`. Languages a provider doesn't support are skipped.

---

## VibeVoice

VibeVoice turns dialogue in a video into a subtitle file (`.srt`). Host it locally or point at an existing service.

> **Speech recognition**: letting a program listen to what's said in a video and write it out as text.

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Mode | Default `local` (hosted here), also `remote` | Local hides address, key and model name |
| Enabled | Turn on | Off means no subtitle tasks; the toolbox page says so |
| Service address | Default `http://127.0.0.1:8000`; written automatically in local mode, enter it in remote mode | Wrong in remote mode fails the detection |
| API key | Optional; leave empty if the service has no auth | Empty when the service requires it means no connection |
| Model name | Default `vibevoice-asr`, must match what the service loaded | Mismatch fails recognition |
| Max concurrent tasks | Default `1`, range 1–5 | Local inference uses a lot of memory; keep it serial |
| Max threads per task | Default `4`, forwarded to the service as a hint | Rarely changed |
| Max minutes per segment | Default `3`, maximum 60 | Too long can crash local inference and lose the second half of the subtitles |
| Model repo | Default `microsoft/VibeVoice-ASR-BitNet`, used by the download area | Rarely changed |
| Model file name | Written automatically after download; empty means not downloaded | Empty means the model isn't ready |
| Launcher priority | Default `asr_infer` | See below |
| Subtitle location | Default `video_dir` (next to the video); also `unified` | "Unified" writes to `data/subtitles/vibevoice/` named by task ID |

| Launcher | How it works | Use |
| --- | --- | --- |
| `asr_infer` (recommended) | A separate process per audio segment, one inference each | Default; no resident memory, faster |
| `asr_stream_server` | A resident process serving streaming, about 2.5 GB resident | Only if you want to avoid reloading the model each segment |

### Setting up local mode

1. Choose "Local" as the mode.
2. Download the inference program under "Built-in service → launcher download" and wait for ready.
3. In "Model download", confirm the repo is the official one and click "Download model", waiting for both files (about 1.5 GB total).
4. Click "Start service"; the status shows "running" and the port.
5. Under "Service check", click "Check service" and confirm it's connected and the loaded model includes `vibevoice-asr`.

### Generating subtitles

Found under **Toolbox → Subtitle generation**; the page tells you to enable the plugin first if it's off.

1. Click "New subtitle task" and pick a single video or a directory.
2. Choose the recognition language (auto-detect by default); for bilingual output turn on "Bilingual subtitles" and pick the target language.
3. Submit; the task enters the queue showing video, duration, language, bilingual flag, status, progress and creation time.

| Status | Available actions |
| --- | --- |
| Running / queued / translating | Cancel |
| Failed / cancelled | Retry |
| Done | Details, view, edit, download, translate |

A finished task can also spawn a translation task from its subtitle, skipping recognition and producing a new file with a language suffix.

## If something goes wrong

- **Weather always fails to load**: the server can't reach `restapi.amap.com`; run the connection test and check outbound access and proxies.
- **Wrong city**: your outgoing network belongs to a data centre or proxy — enter a city code.
- **Backup list is empty**: wrong connection settings, or nothing under that directory / prefix. Run the connection test first.
- **Restore says the password is wrong**: it isn't the one used when backing up; if it's lost, recovery is impossible.
- **S3 won't connect though the address opens**: region, addressing style or signature mismatch; try path-style addressing for self-hosted storage.
- **DeepSeek balance or model list empty**: confirm the address with the connection test, then check the key; if the account can't list models, type the name by hand.
- **"Concurrent requests full"**: that model hit its limit — retry later or switch to `deepseek-v4-flash`.
- **"Encoder not found"**: the component is missing or broken — delete it in the download card and re-download.
- **Every transcode task fails**: queue waiting is off and concurrency is full — turn queue waiting on and retry.
- **FlareSolverr refuses connections or times out**: the service isn't running, the port is wrong, or a firewall blocks it; confirm port 8191 is listening.
- **Still failing with FlareSolverr on**: the site isn't showing a check page but requiring login, or it blocked you — check account, keys or your network exit.
- **MeiliSearch won't connect**: still the example address, the port isn't open, or the key lacks permission.
- **Search finds nothing**: that type hasn't been rebuilt yet — rebuild it and retry.
- **"Translation service not enabled"**: turn on the translation plugin; if there's still no Chinese after scraping, check "field translation" in the scrape config.
- **VibeVoice service check fails**: in local mode click "Start service" first; in remote mode check address and key.
- **Subtitles lose the second half**: segments were too long and inference broke — lower "max minutes per segment" or use `asr_infer`.

## Next

- [Where film data comes from](./metadata.md)
- [Send notifications to your phone](./notification.md)
- [Connect External Services in Three Steps](./overview.md)
