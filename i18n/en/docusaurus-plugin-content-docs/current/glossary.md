---
title: Words you might not know
sidebar_label: Glossary
description: Plain-language explanations of the terms used in AMMDS docs and screens, grouped by topic, with what happens if you fill them in wrong.
sidebar_position: 1
---

# Words you might not know

The AMMDS docs and screens use a lot of unfamiliar words. This page groups them into six topics and explains each one in plain language. It also says where you will run into the word. Where you have to fill something in, it explains what happens if you get it wrong.

Press `Ctrl` + `F` to search this page. If a word isn't here, try [Common questions](./faq.md), which is organised by the symptom you're seeing.

## 1. Installing and running

| Word | What it means | Where you'll see it |
| --- | --- | --- |
| Docker | A way of packing software with everything it needs. Install Docker once, pull a package, and it runs. You don't install the pieces one by one. If your device doesn't support Docker, pick another method. | Install method comparison, Install with Docker |
| Image | The packaged software file, like an installer disc. It looks like `qyg2297248353/ammds:latest`; the part after the colon is the version tag. **Wrong value**: a bad tag fetches a different or non-existent version, and the container won't start. | Pulling an image, upgrading |
| Container | The running copy made from an image. Deleting a container does not delete the directories you mounted out of it. | Start commands, volume list |
| Mount | Linking a real folder on your machine to a path inside the container, so the program can read and write there. Written as `host:container`. **Wrong value**: skip it or mistype it and the app can't find your files. Or your data lives inside the container and dies with it. | `-v` in Docker commands, volume list |
| Binary program | Also called an executable: a program file you run directly. It ends in `.exe` on Windows and has no extension on Linux. **Wrong value**: a package for another system gives a "cannot execute" error. Windows and Linux packages are not interchangeable. | Run it directly on Windows or Linux, upgrading |
| GraalVM Native Image | A tool that turns the program into one standalone file before it ships. The upside: no Java install, no JAR or WAR files, and it starts faster. You double-click it or start it from the command line. You don't need to understand how it works. Just remember "no Java install". | Install method comparison, troubleshooting |
| JAR / WAR | Two common packaging formats for Java programs. **AMMDS release packages don't include these files**, and no Java runtime is needed. The `java -jar` tutorials online are for building from source. They don't apply to installing AMMDS. | Old tutorials, developer docs |
| NAS | A network device built for storing files, such as FnOS or QNAP. It can run app packages, and it can run Docker. | Install on a NAS, directory planning |
| Environment variable | Settings handed to the program before it starts, such as the port or upload limit. In Docker it goes in the `environment` block of the config file. When running directly, it goes in front of the executable's start command. **Wrong value**: a misspelt name is ignored and the default applies. A bad value can make the page unreachable or uploads fail. Always restart after changing one. | Settings tables, start commands |
| Port | The number that tells services apart on one machine: the `8080` in `http://host:8080`. **Wrong value**: you must browse to the new port, and a port already taken by another program stops startup. | Access address, port mapping table |
| Path | Where a file or folder sits on disk, e.g. `/mnt/media` or `C:\AMMDS`. **Wrong value**: nothing gets scanned, or data is written somewhere else and looks like it vanished. | Media directory, data directories |
| Proxy | Sending the app's internet requests through another server first. Useful when overseas sites are unreliable. The types are HTTP or SOCKS. **Wrong value**: a bad address or port breaks most network access. Leave internal addresses out of the bypass list and your NAS or player becomes unreachable. SOCKS does not support a username and password. | System config → Network |

## 2. Files and folders

| Word | What it means | Where you'll see it |
| --- | --- | --- |
| Scan | Letting AMMDS walk through a directory you choose and work out which films are in it. | Scan tasks, the ten-minute walkthrough |
| Task | One recorded run of an operation, such as a scan or a scrape. Task history shows progress, result and failure reason. | Task pages, task log |
| Scheduled task | A task that runs by itself at a time you set, e.g. a daily scan. **Wrong value**: a wrong time doesn't error, it just runs at the wrong moment; turning off the master switch also blocks manually running scheduled tasks. | Scheduled tasks, scheduler switch |
| NFO | A small text file next to a film holding its information, so players can read it directly. | Scan organise mode, gap-filling |
| Cover | The small image in the list, the one you recognise a film by. | Film list, library |
| Poster | The large upright image — the one on a poster wall. | Detail page, poster wall |
| Still | Screenshots taken from the film; usually several per title. | Gallery on the detail page |

## 3. Film information

| Word | What it means | Where you'll see it |
| --- | --- | --- |
| Scraping | A scraper looks up a film's cover, description, cast and tags on a data site, then fills them in. Needs internet access. | Scrape tasks, the ten-minute walkthrough |
| ID number | The film's identification code, usually part of the filename. The app recognises films by it; if it can't read one, nothing gets filled in. | Scan results, scrape results |
| Library | The tidy, searchable list of films you end up with. | Media menu, public site |
| Cast | The performers attached to a film, brought back along with the rest of the data. | Detail page, cast list |
| Tag | A keyword on a film that makes filtering easier. | Detail page, organise pages |
| Series | Several films from the same series grouped together. | Film detail, organise pages |
| Studio | The producer or label — another way of grouping, like series and tags. | Film detail, organise pages |
| Data source | The site or service that supplies film information. Scraping looks things up here. **Wrong value**: a bad address or token means no connection and constant scrape failures. Run the connectivity test on the plugin page. | Integrations, plugin config |
| Reading progress | Which page you were on in a comic or novel, remembered so you can carry on from another device. | Comic and novel reader |

## 4. Finding and downloading

| Word | What it means | Where you'll see it |
| --- | --- | --- |
| Subscribe | You give AMMDS an ID number or a performer, and it keeps watching for matching resources. | Subscribe pages, automation tasks |
| Magnet | A link starting with `magnet:` that a downloader uses to find and fetch files. | Search results, downloads |
| Torrent | A small file describing the content; the downloader opens it to start. | Search results, downloader |
| Downloader | The program that actually downloads, e.g. qBittorrent or Transmission. **Wrong value**: a bad address or login means pushes go nowhere and subscriptions stay stuck. | Downloader config, subscribe settings |
| Cross-seeding | Seeding means sharing a downloaded file back to other users. Cross-seeding reuses files you already have on other sites, so sharing starts faster. | Cross-seeding tools, download pages |
| RSS | A regularly published "what's new" list from a site. Subscribe to it and new items appear automatically. | Message centre, subscribe settings |

## 5. Account and settings

| Word | What it means | Where you'll see it |
| --- | --- | --- |
| Token | A string that proves who you are when calling an external service. **Wrong value**: the service refuses the request, the connection test fails, and no data comes back. | Plugin config, integrations |
| API Key | The same idea as a token under a different name. Wrong value, same failure. | Plugin config, open platform |
| Key | A general word for a secret string that proves identity or encrypts data. AMMDS also has key management, which issues different key types for external apps. Pick the right type, or the other side keeps saying "unauthorised". | Key management, profile |
| Licence | The record showing this deployment is authorised. Not activated only means a watermark; nothing gets locked. A trial is available once per set of data. | Profile → Licence |
| Watermark | The mark shown while unlicensed. Display only; no feature is affected. | Every page |
| System check | A one-tap health check in the avatar menu: database, disk, ports, system time, dependencies, proxy and plugin config, listed by category. | Avatar menu, end of setup |
| Backup | Exporting your data to a file (optionally including images), or simply copying `db/` and `data/`. | System → Backup and restore |
| Restore | Loading a backup back in. **Wrong value**: a bad structure fails the built-in integrity check. One package may only hold one type of content. | System → Backup and restore |
| Log | The running record of what the program did, and your first clue when something breaks. Files live under `data/logs/`. | Run log, task log |

## 6. Talking to other programs

| Word | What it means | Where you'll see it |
| --- | --- | --- |
| Webhook | A URL that AMMDS posts a message to when something happens, used for phone push services. **Wrong value**: messages simply go nowhere, with no error on screen. | Notification config |
| Share link | A link to one film that you can send to someone else. | Share page, public site |
| Access code | The passcode needed to open a share link. **Wrong value**: the link won't open. | Share settings, visitor page |

## Look it up by what you're doing

| What you're doing | Words you'll hit |
| --- | --- |
| Choosing an install method | Docker, image, container, mount, binary program, GraalVM Native Image, NAS |
| Getting the app to know your files | Scan, path, task, NFO |
| Filling in information | Scraping, ID number, data source, cover, poster, still |
| Finding and filing resources | Subscribe, magnet, torrent, downloader, cross-seeding, RSS |
| Changing settings | Environment variable, port, proxy, token, API key, key |
| Troubleshooting | System check, log, backup, restore |

## If something goes wrong

- **A word isn't on this page**: check your version first (the System info card on the dashboard). Some names changed between versions.
- **It still doesn't work after following the explanation**: put the setting back, restart, confirm the problem is gone, then change one thing at a time.
- **You may have misunderstood a word**: go to [Common questions](./faq.md) and look up what you're seeing.
- **Still stuck**: note the version, the time it happened and the log lines, then open an issue: https://github.com/QYG2297248353/AMMDS-Docker/issues/new

## Next

- [What is AMMDS?](./intro.md)
- [Choose an install method](./getting-started/overview.md)
- [Common questions](./faq.md)
