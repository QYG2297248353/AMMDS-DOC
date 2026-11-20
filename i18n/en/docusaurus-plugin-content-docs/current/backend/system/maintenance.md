---
title: System check, logs, storage, licence and users
sidebar_label: System Maintenance
description: Run a self-check, read the three kinds of log, see what's using your disk, deal with licensing and the watermark, secure the sign-in door, and review background jobs.
sidebar_position: 3
---

# System check, logs, storage, licence and users

This is the "look here first" page: run a self-check, then read logs and disk usage, and while you're at it handle licensing, account security and background jobs. Each section stands alone.

## 1. System check: run it first

> **System check**: a built-in diagnostic tool. It only reads settings and state — it changes nothing and fixes nothing.

Avatar menu → **System Check**. A read-only snapshot greets you: versions, OS, memory, free disk, server port, database, uptime, data directory, server time and time zone.

Click **Start scan**. It runs on the server; when it finishes the top shows how many items are normal, warning, error or not enabled, plus how long it took.

### What it checks

| Group | Focus |
| --- | --- |
| Basic info | Version, OS, memory, disk, system clock, internet connectivity |
| Software | Whether helper programs are ready, whether the proxy config is complete, whether each integration responds |
| System config | Server port, database connection, domain binding, notification channels, licence |
| Runtime | Error count in the logs, CPU and memory pressure, disk pressure |

Some thresholds:

- **Memory**: over 90% used, or less than 10% of system memory free, raises a warning.
- **Disk**: less than 1GB left in the data directory, or over 90% used, raises a warning.
- **System clock**: more than 5 minutes away from network time raises a warning; it affects licence checks, scheduled jobs and time-based decisions.
- **Network**: a batch of addresses is probed in parallel; all reachable is normal, some is a warning, none is an error.
- **Helper programs**: missing ones raise a warning saying what breaks (no video processing program, for example, affects video handling, screenshots, poster cropping and thumbnails).
- **Proxy**: off is recorded as "not enabled"; on but with an empty host or port, or a port outside 1–65535, is recorded as an error.
- **Integrations**: not enabled isn't a problem; enabled but missing required settings is a warning; an address that's filled in but unreachable is an error.

### Reading the results

| State | Meaning | Do something? |
| --- | --- | --- |
| Normal | As expected | No |
| Warning | Usable but risky; some features may be limited | Follow the hint |
| Error | Already broken or clearly misconfigured | Yes, must fix |
| Not enabled | The thing itself is switched off | No, unless you need it |

Some entries carry tags: **needs configuration** sends you to the right settings page; **needs restart** means the change only counts after a restart; **affected features** says what this problem touches.

## 2. Logs: three kinds, three jobs

**System Management → Log Audit** has three pages:

| Page | What it shows | Good for |
| --- | --- | --- |
| Sign-in log | Who signed in when; successes and failures both | Wrong passwords, disabled accounts, odd sources |
| Runtime log | What just happened on the server | Page errors, service exceptions |
| Task log | How far a background task got and why it failed | Scan, scrape, organise, sync, import/export failures |

### Sign-in log

Fields: username, source address, location, time, device info (OS / device / browser), state and reason. You can filter by keyword and state. It shows 10 per page, newest first. Failure reasons come from the checks, for example "user doesn't exist", "account disabled" or "wrong password". Successes read "signed in successfully".

### Runtime log

Fields: time, thread (the worker that wrote the entry), level, source, message. Four levels: error (red), warning (orange), info (blue), debug or normal. The page reads the most recent entries (300 by default) and refreshes every 8 seconds.

Top right you can export the last 1 / 7 / 30 days. The server joins the main log with the daily rolled files into one text file, trimming the oldest content if the total exceeds 100MB. Logs live in the data directory. The main file rolls by day, and errors are kept separately.

### Task log

The toolbar shows how many tasks are running. You can filter by task name, type and state, or turn on auto refresh. Columns: task, type, state, progress, done / total, elapsed. Click **Details** for the failure reason, start and end times, and the **execution detail**. That detail is a set of time-stamped lines with level and message, and it is the most direct material for finding out why something failed.

Available actions: details (any time), cancel (only while running, and only where supported), delete (anything not running), and clear finished (wipes all ended tasks; running ones stay).

### Suggested order

1. In the **task log**, find the failed run and read the first error line in the execution detail.
2. Note the time, then look at the same moment in the **runtime log** for context.
3. For service addresses, keys or network, confirm with **System Check**.
4. If it smells like a sign-in or permission problem, check the **sign-in log**.

## 3. Storage: what's using the space

Open **System Management → Storage** for four numbers: total disk, used disk, free disk, and data directory usage. The gap between the last two is usually your film files, the OS and other programs.

Statistics are collected in the background, once at startup and then every 5 minutes. The page refreshes every 30 seconds. The data directory is broken down by first-level folder, with size and file count, and images get a second-level breakdown too. Typical categories: images, cache, video processing program, subtitles, metadata service, keys, logs, temp. Unregistered folders fall under "other data".

:::warning[Don't delete folders by hand]
The keys folder and the database folder hold credentials and all your data. Moving or deleting files while AMMDS is running can corrupt things — use the entries listed below to clean up.
:::

This page is read-only; cleanup lives elsewhere:

| What to clean | Where |
| --- | --- |
| Task log | Log Audit → Task Log → Clear finished |
| Exported backup packages | Backup and Restore → Export → Export records → Delete |
| Feed offline cache | Information Centre → Feeds → cache panel → Clear cache |
| Unwanted files and temp files | Toolbox → File browser → Delete |
| Resources downloaded by a service | The resource card on that service's page |

What happens when space runs out? The disk item in System Check warns below 1GB free or above 90% used. With disk monitoring on (System Config → Basic) you get a push when space is low. Scraping, downloading and transcoding all need temporary space, so they fail and write to the task log when the disk is full.

## 4. Licence and the watermark

> **Watermark**: translucent text layered over the pages. It shows site-wide when there's no valid licence, but **every feature keeps working** — sign-in, system config, site authentication and backup all carry on.

> **Key**: here, the licence string that acts as this deployment's proof of authorisation.

Avatar menu → **User Centre**; the **Licence** card at the bottom is this section. Every signed-in account can see the state and entitlements, but **only an admin can activate, refresh, trial, deactivate or clear**.

### Reading the state

The page shows authorisation state (valid / invalid), activation method, plan, validity period, key (masked), last successful check, trial state and this deployment's instance ID. The banner at the top explains which situation you're in:

| Banner | Meaning | What to do |
| --- | --- | --- |
| Trial running (time left) | Inside the 7-day trial; the watermark returns afterwards | Activate before it ends |
| Trial ended and can't repeat | One trial per set of data | Activate a licence |
| Can't reach the licence service, using the verified licence (offline grace until …) | Offline but still inside the grace period | Restore the network and refresh |
| Can't reach the licence service and past the grace period | Needs the network | Restore the network and refresh |
| Licence currently unusable | Expired, revoked, suspended or never activated | Check its state in the licence portal |
| Plan is missing the base entitlement | A plan configuration problem | Contact maintenance |

### Three ways to activate

| Method | How |
| --- | --- |
| Online | Enter a key of the form `AMMDS-XXXX-XXXX-XXXX-XXXX` and click **Activate**; the backend completes it and the watermark disappears |
| Offline | When the server can't reach the licence service: click **Offline activation** for the product ID, instance ID and a copyable command; run it on an internet-connected device and upload the returned JSON (up to 64 KiB) |
| 7-day trial | No key needed; click and the countdown starts, running even while stopped |

An activated instance hides the activation area until you click **Change licence** at the top right. Changing it replaces the current authorisation, and if a trial is running it ends as soon as activation succeeds.

### A few rules

| Action | Rule |
| --- | --- |
| Start the 7-day trial | Once per set of deployment data; greyed out if you already have a full licence or used it |
| Refresh online | Checks once; if the service is down it returns the cached state |
| Deactivate online licence | Local data is cleared only after the remote confirms the slot is released |
| Clear local licence only | Clears just this machine's key and token; the remote slot isn't released and the trial record stays |

Deactivating and clearing both ask for confirmation and cannot be undone. Membership is an account-level badge, while the licence covers the whole deployment. Plan names, prices and entitlements are whatever the purchase page and licence page show.

## 5. Users and sign-in security

AMMDS is a self-hosted, single-admin app: one deployment has one admin account, so the job is **guarding the only door**.

| Role | Meaning |
| --- | --- |
| Admin | The only account that can change the instance licence and run sensitive actions |
| User | Can sign in and use features, but not change instance-level authorisation |
| Guest | Visits public pages without signing in, subject to public endpoint rate limits |

The initial admin is created at first startup. If `ADMIN_USER` / `ADMIN_PASS` are provided, the account is seeded from those variables. Otherwise the setup wizard creates it. **Change the initial password as soon as you have deployed.**

### How signing in is checked

The password is encrypted before it is sent, so the plain text never leaves the browser. The username, password and account state are checked, plus the dynamic code if two-step verification is on. A sign-in stays valid for 120 minutes, and a refresh token lasts 30 days. Every attempt is written to the sign-in log, whether it succeeds or fails.

Password rules (same for signing in, changing and resetting): **6–22 characters, with both upper and lower case, and at least one digit or symbol**.

### Four steps for a security review

1. Open the **sign-in log**, filter by state "failed" to spot repeated attempts, and by address or location to check for unfamiliar sign-ins.
2. If something looks wrong, change the password first, then enable two-step verification or passwordless sign-in.
3. A disabled account simply fails to sign in, with the reason recorded.
4. If you forget the password, reset it with the recovery key below.

### Two-step verification

> **Two-step verification**: besides your password, you enter a 6-digit code from your phone. A leaked password alone isn't enough to get in.

Go to **System Config → Security → Two-step verification**.

1. Turn on the master switch.
2. Click **Enable** and follow four steps: read the notes → scan the QR code (or type the key) → enter the 6-digit code → finish.
3. On completion you're given **8 one-time recovery codes**, which you can copy or download; each works once.
4. Turning it off also needs verification: the current 6-digit code, or any unused recovery code.

When the recovery codes run out, turn it off and on again to get 8 new ones. If the codes never validate, set your device clock; they depend on time being in sync.

### Passwordless sign-in

Go to **System Config → Security → Passwordless**. Sign in with a fingerprint, your face or a device PIN. Three conditions must all hold:

| Condition | If it isn't met |
| --- | --- |
| Reached by domain (not address-plus-port, not local host) | You're told to bind a domain and use it |
| Reached over an encrypted connection (address starts with the secure protocol) | You're told the browser won't offer an authenticator |
| Browser supports this kind of authentication | You're told to use a newer browser |

Once they hold, click **Create**. The system calls up your device's authenticator (system biometrics, a phone and so on). The credential then appears in the list with its name (which you can rename), creation time and last used, plus rename and delete actions. Deleting means that device cannot sign in that way any more. Passwordless and third-party sign-in **do not** ask for the extra code.

### Single sign-on

Go to **System Config → Security → Single sign-on** to sign in with a third-party account.

1. Copy the callback URL shown and add it to the provider's allow-list.
2. Click **Create app** and fill in name, icon, button text, client ID and secret, and the user mapping field (the identity claim by default).
3. After saving you can bind your own third-party account, and unbind or disable the app at any time.
4. A matching button appears on the sign-in page.

The client secret is stored only in the local database and never shown back; deleting the app disables that entry immediately.

### Settings: security

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| Passwordless master switch | Whether fingerprint, face and similar can be used | Off by default |
| Two-step master switch | Whether sign-in needs the extra code | Off by default, password only |
| Guest rate limit | Anonymous visits to public pages per minute (100 by default) | Read directly by the system; no edit box on the page |

## 6. Keys and recovering your password

**System Management → Key Management** is about **API keys**: credentials for other programs.

| Column | Meaning |
| --- | --- |
| Name | The note you wrote when creating it, tagged "active" or "expired" |
| Key | Click the tag to copy the whole key |
| Type | Browser extension / API calls / comic reader |
| Expiry | Expires automatically at that point; the tag turns red |
| Action | Delete (needs confirmation, can't be undone) |

> **API key**: a string given to another program. Presenting it proves the call is allowed, without your account password.

When creating, fill in: name (required), type (required), expiry (leave empty for never; if set, it must be at least 10 minutes in the future).

:::warning[Types aren't interchangeable]
Each type works only for its own purpose: the API key is valid for the open API only and won't unlock admin endpoints; the comic reader key only serves that interface. Using the wrong one returns "unauthorised". The open API also needs the "open API" switch on in [Every system setting explained](./config.md).
:::

**Recovering the admin password** is a different road. It uses a one-time recovery key: a file in the data directory that exists only on disk, is never shown on a page and is never printed to the log. On the sign-in page, click **Forgot password**, then enter the recovery key and the new password. On success the file is destroyed, which makes it a one-time credential. If the file is not there, restarting the service generates a new one.

The new password follows the same strength rules. Common messages: "recovery key doesn't exist" means it was used or not generated yet; "wrong recovery key" means the content doesn't match; "password too simple" means it fails the rules; "admin account abnormal" means there isn't exactly one admin account.

For day-to-day changes use User Centre (which needs your current password) — that and "forgot password" are separate paths.

## 7. Background scheduled jobs

Open **System Management → Scheduled Jobs** to see every scheduled job built into the system: how often each runs, whether the last run succeeded, whether it's running now, and a button to run it once by hand.

The list shows the job name, with the module it belongs to underneath, and the schedule in plain words (hover for the raw expression). It also shows the run state, the last run time and a **Run** action. Clicking returns immediately and the job starts in the background. You cannot trigger the same job twice while it is running.

> **Cron**: one line saying when to run, such as "every day at 04:45" or "every 5 minutes". The page translates it into plain words, or shows the raw line when it can't.

This page keeps only each job's **most recent** run time and result — no history list. For the full story, filter the **task log** by type or state and click **Details** for the line-by-line detail.

:::warning[Turning the master switch off doesn't stop everything]
With the master switch off (an install-time environment variable, on by default), three things happen. The page says scheduled jobs are off and manual runs are refused. Jobs registered from settings, such as automatic cross-seeding, are no longer registered. But jobs hard-coded in the application still run. To stop a class of automatic behaviour completely, switch off the corresponding feature as well.
:::

## If something goes wrong

- **A pile of warnings after a scan**: fix the errors first, then the entries tagged "needs configuration", then click **Rescan** to confirm.
- **System clock is way off**: set the host clock and restart; also check the time-check domains are still in the proxy bypass list.
- **A job stays "running"**: check the task log to see if it's stuck at the same progress; cancel and rerun if needed.
- **Disk warning**: clean up through the entries in section 3; don't delete files in the data directory by hand.
- **The watermark never goes**: check the licence state and banner and follow it; nothing is blocked, so you can carry on using the app.
- **Can't sign in**: check the sign-in log for the reason; if it's the admin password, reset with the recovery key.
