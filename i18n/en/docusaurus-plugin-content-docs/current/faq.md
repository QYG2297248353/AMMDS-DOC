---
title: "Common questions: by symptom"
sidebar_label: FAQ
description: The questions people hit most often, sorted by what you see — won't install, won't open, uploads fail, scraping returns nothing, subscriptions stall, restore errors, watermark, each with the cause and the fix.
sidebar_position: 9
---

# Common questions: by symptom

This page is organised by what you see on screen. Find the entry closest to your symptom and follow it. Most problems are solved within a few minutes.

Before you ask anyone for help, have three things ready: the **version** (it's on the system check page), the **time it happened**, and the **matching log lines** (the log is the plain-text record of what the program did). With those, the cause is usually obvious at a glance.

## Three things to do first

1. Open **System check** in the avatar menu and run it once. Look for red or yellow items.
2. Check the run log for errors around that time. Log files live under `data/logs/` in the program directory.
3. Note the version on the System info card of the dashboard. That way you know you're reading the right docs.

## Won't install, page won't open

| Symptom | Likely cause | Try this |
| --- | --- | --- |
| Exits partway through startup with `inotify` in the log | The system ran out of file-watch slots. The app stops instead of letting folder monitoring fail quietly | Raise the system limit and restart. If you don't need folder monitoring, turn off the directory-monitor switch on the scan task |
| Page won't open after a first install | Dependencies such as FFmpeg are still downloading, so the service isn't ready yet. Or the port isn't mapped, or a firewall is blocking it | Wait a few minutes. Check whether the log keeps producing output. Check the port mapping matches the service port, allow the port in the firewall, then hard-refresh (`Ctrl` + `F5`) |
| Log says the CPU doesn't support `x86-64-v2` | The default image and some release packages need newer CPU instructions. Older machines can't run them | Use the `ol8` tagged image, or switch to a binary release built for older CPUs |
| The page looks wrong after an upgrade, buttons don't match the docs | Cached page files kept by the browser | Hard-refresh once (`Ctrl` + `F5`). Do the same for the docs site |
| Windows says the client lacks the required privilege | Not enough permission | Start the program as administrator |

:::note[About upload limits]
`Maximum upload size exceeded` means you hit the limit. Raise the single-file limit and the per-request limit together, and keep the request limit at or above the file limit. If a reverse proxy (a server that forwards outside requests to your box) sits in front, raise its body limit too. Restart afterwards. The details are in [Change the port or upload limit](./getting-started/settings.md).
:::

## Signing in and passwords

- **Forgot the admin password**: click **Forgot password** on the sign-in page and enter the recovery key. The key is at `data/secret/recovery.key` in the program directory. It is generated on first start.
- **Password changes keep being rejected**: the new password must be 6–22 characters, contain both upper and lower case, and include a digit or special character.
- **It signs you out after a password change**: that's expected. Sign in with the new password.
- **Can the username be changed?**: not from the app's pages. Pick it in the setup wizard or set `ADMIN_USER` at startup. Changing it later means recreating the instance.

> **Recovery key**: a key stored in a file that lets you reset your password if you forget it. It doesn't depend on the database. So on a reinstall, keep `data/secret/` as well: if you back up only `db/` and lose that folder, the password can never be recovered.

## Client and images

| Symptom | Cause and fix |
| --- | --- |
| The client can't find the server | Auto-discovery sends short broadcasts over UDP (a network protocol for this kind of broadcast). Docker must map both discovery ports separately, and the firewall must allow them. AP isolation, corporate Wi-Fi, mesh networks and VLANs drop broadcasts, so do the first discovery on a plain network. As a fallback, use "add server manually" in the client |
| Images broken on phone or client | Images always go through the server's own proxy. Older servers don't have it, so upgrade the server |
| Images broken when browsing the admin pages directly | The remote image host usually blocks hotlinking. The proxy already handles that, so if images still break after an upgrade, open an issue |

## Scraping

- **The scrape task says success but the data is empty**: the ID number wasn't recognised, the data source has no entry for it, or it sent back empty fields. An ID can go missing when it isn't in the filename or is written in an unusual style. Check the detected ID in the scan results first, then retry with a different enabled source.
- **Scraping always fails with a connection error**: wrong source address, the service isn't running, the token has expired, or the site blocked you. Run the connectivity test on the plugin page, then use system check to see whether it reports the source as failing or incomplete.
- **Scraping is slow and only handles part of a batch**: there is a per-batch item limit by design. Just run it again.

## Subscriptions and downloads

| Symptom | Cause and fix |
| --- | --- |
| A subscription stays "subscribing" and never downloads | Nothing matched, the subscription is paused, no downloader is available, or the search order has no enabled site. Check each one: the status says subscribing, the search order includes an enabled site, at least one downloader is enabled and reachable. Then search the ID by hand to confirm the resource exists |
| The matched title doesn't look like the ID | Site titles usually add quality, subtitle and volume prefixes. Matching uses the identifier, not the whole title. Judge by the identifier. If it is really wrong, adjust the subscription rules |
| Download finished but the library didn't update | The downloader's save folder isn't inside a scanned folder, or no scan ran. Make sure the download folder is inside a scanned folder. Then run a scan by hand |

## Network and proxy

- **Most domains unreachable in system check**: the server can't get out, or the route abroad is restricted. Try opening an overseas site from the host to see whether the network or the program is at fault. If you need a proxy, turn it on in **System config → Network** with protocol, host and port, save, then retest.
- **Time validation fails after enabling a proxy**: the check went through the proxy. Either the proxy's clock is too far off, or it blocks the validation domain. Make sure the default time-validation domains are still in the bypass list, and don't clear them.
- **A SOCKS proxy ignores the username and password**: SOCKS doesn't support a username and password. Those fields only work with HTTP. Use an HTTP proxy that supports login, or allow the source IP on the proxy.
- **Internal addresses (NAS, player) unreachable**: internal traffic is going through the proxy too. Add the private ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) or the specific host IP to the bypass list.

## Backup and restore

- **Import says the backup package failed validation**: the structure or the manifest is wrong. The manifest is the package's contents list. Things to check: a missing manifest or data file, an item count that doesn't match, a content type that isn't allowed, image paths outside the images folder. Use the parse preview to see which item is wrong. **One package may only hold one type**, so never combine types by hand.
- **Images missing after a restore**: you didn't tick "export image files too", so the package still holds the old machine's local paths or external links. Keeping the original `data` folder reuses them directly. Otherwise, export again with images, or scrape the missing items again.
- **I want to back up my configuration too**: backup and restore only handles film data, not system config or plugin keys. Use the cloud storage integration for config backups, and store the encryption passphrase separately.
- **My backup is huge — will import blow up memory?**: no. Uploads are written to a temporary file and read as needed, never loaded in one go. Just watch the task progress and keep enough free disk space.

## Logs and troubleshooting

- **The run log page is empty**: the log file is missing, it was just rotated (replaced by a fresh one), or the current lines can't be read (those aren't shown in the table). Read `data/logs/AMMDS.log` on the host, or use "export log" to get the raw text.
- **Exported logs are incomplete**: export drops the oldest content past a size limit, so the newest stays. Export a narrower time range in batches, or copy the whole `data/logs` folder from the host.
- **A task failed but the run log shows no error**: business failures are usually only written to the task log's execution details, not as an error-level run log. Open the task log, click **details** on that task, and read the failure reason and the last successful step.

## Licence and watermark

- **A watermark shows everywhere**: this deployment has no valid licence or trial. **The watermark only affects display; nothing is locked.** Sign in as admin and go to **Profile → Licence** to activate. Without internet, use offline activation: copy the instance identifier, complete the activation request on a device that is online, save the full response and upload it back.
- **The "start 7-day trial" button is greyed out**: you already have a full licence, or this data has used its trial. Each set of persistent data may only start one trial. Restarting, upgrading or reusing the same database doesn't reset it. Only wiping all deployment data and initialising a new database counts as new.
- **It says the activation slots are full**: the licence has run out of slots. Release an old device in the licence portal, or deactivate the online licence on the old instance first. One AMMDS deployment takes one slot regardless of user count.
- **I moved servers or restored a backup — how is the licence counted?**: the install identifier is stored with the database, so migrating or cloning is seen as the same instance. Deactivate on the old instance first, or release the slot in the portal.
- **What if the licence service is unreachable?**: an activated instance keeps running on its signed, unexpired token, then on an offline grace period. After that only the watermark returns; sign-in, configuration and backup keep working.

## If something goes wrong

- **No entry matches your symptom**: run **System check** from the avatar menu first. Yellow and red items can almost always be fixed on the matching config page.
- **Nothing changed after fixing it**: revert the setting, restart, confirm the problem is gone, then change one thing at a time.
- **Every online feature is broken**: suspect the network or proxy. The four entries in the network section above are the usual suspects.
- **Genuinely stuck**: bring the version, timestamp and log lines to GitHub: https://github.com/QYG2297248353/AMMDS-Docker/issues/new

## Next

- [What is AMMDS?](./intro.md)
- [Words you might not know](./glossary.md)
- [Change the port or upload limit](./getting-started/settings.md)
