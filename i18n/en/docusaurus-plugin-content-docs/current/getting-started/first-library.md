---
title: Organise your first films in ten minutes
sidebar_label: First Media Import
description: From a fresh install to your first films with covers and descriptions — add a folder, scan, check the IDs, scrape, review the result, with what you should see and where to look if it stalls.
sidebar_position: 8
---

# Organise your first films in ten minutes

This is one continuous walkthrough. It starts at "just installed, nothing in it" and ends with your first batch of films showing covers and descriptions. Follow the steps in order. After each one you get **what you should see**, plus checkpoints for when it stalls.

Finish [First launch: sign in and basic setup](./first-login.md) first, and run a system check once.

## First, the essentials

You only need three things:

| What to prepare | Details |
| --- | --- |
| One folder with film files in it | Start small — ten or so — rather than throwing tens of thousands of files at it |
| An ID number visible in each filename | The ID is how the app recognises a film. If it's in the filename, recognition is accurate |
| A working data source | Filling in information means querying a data site. Configure one under Integrations and test the connection. Offline, this step isn't possible |

> **Scan**: letting AMMDS walk through a folder you choose and work out which films are in it.

> **Scraping**: a scraper looks up a film's cover, description, cast and tags on a data site, then fills them in.

> **ID number**: the film's identification code, usually part of the filename. If it can't be read, nothing gets filled in.

## Step 1: tell it where the files are

1. Open the scan task page and find where media folders are added.
2. Enter the path to your film folder. Docker users: enter the **path as seen inside the container**. That is why mounting the host path at the same container path is recommended.
3. Save.

### What you should see

The folder appears in the list and the app can read it. You should not see "path does not exist" or "permission denied" when saving.

### Checkpoints if it stalls

- Wrong path: one level too many or too few and nothing is readable. Copy the path out and compare it carefully.
- No permission: most common on a NAS. Grant it to AMMDS in the NAS shared folder permissions (see [Install on a NAS](./nas.md)).
- Path missing in Docker: check the folder is actually mounted into the container.

## Step 2: scan once so it knows your files

1. Create a new task on the scan task page and select the folder you just added.
2. Choose an organise mode. For the first run, use a mode that **only recognises and does not move files**, so you can see the result. If the folder is already tidy and you only want missing images and data files filled, use the gap-filling mode.
3. Run it and wait.

### What you should see

The task finishes, and entries appear with ID numbers that look correct.

### Checkpoints if it stalls

- Task reports failure: open that task in the task log — the failure reason and the last successful step are both there.
- The list is empty: the folder may hold no recognisable files, or formats outside the recognised set. Try one file you're sure about.
- It stalls halfway: huge libraries are simply slow. Check the task is still running, then check the log for errors.

## Step 3: check the IDs are right

1. Pick a few entries in the scan results and confirm the detected ID is the film you think it is.
2. For wrong ones, fix the filename first (ID at the start, consistent separators), then scan again.

### What you should see

Most IDs match. A few unrecognised entries are normal — don't expect perfection on the first pass.

### Checkpoints if it stalls

- Unusual ID format: if the filename has no recognisable ID, or uses a rare style, it won't be recognised. Rename to a common style and rescan.
- One film appears several times: caused by inconsistent filenames; settle on one style.

## Step 4: add covers and descriptions

1. Open the scrape task page and create a scrape task for the entries from your scan.
2. Choose which data source to use (if several are configured, tick just one for a first test).
3. Run it and wait. There's a per-batch item limit, so run it again for larger sets.

### What you should see

Entries start showing a cover, description, cast and tags; previously blank fields are filled in.

### Checkpoints if it stalls

- Task succeeds but data is empty: the ID wasn't recognised, or that source has no entry for it. Go back to step 3, or retry with another source.
- Always fails with a connection error: wrong source address or token, or the site blocked you. Run the connectivity test on the plugin page, then use system check to see whether the source is failing or incomplete.
- Partial failure is normal. Rerun the failures one by one.

## Step 5: look at the result

Open the media menu and look at the film list: a batch of films with covers and descriptions, neatly laid out. Open a detail page and you'll also see the poster, stills, cast and tags.

That's your first batch done. Things you can do next (no rush, come back any time):

| What you want | Where |
| --- | --- |
| Group by series, studio or tag | The organise pages under the media menu |
| Let it scan and fill automatically from now on | Turn on directory monitoring in the scan task, or add a scheduled scan |
| See a poster wall on the TV | Connect a media server under Integrations |
| Keep watching for new resources | Set it up on the subscription pages |

## Step 6: let it run by itself

1. Turn on **directory monitoring** in the scan task: changes trigger a scan automatically.
2. Or create a scheduled scan task, e.g. once a day.
3. Make sure the scheduled task master switch is on — with it off, even manual runs are rejected.

## Settings

| Setting | What to enter | If you skip or mistype it |
| --- | --- | --- |
| Media directory path | The folder holding your film files | Wrong path or no permission means nothing is scanned; in Docker use the container path |
| Organise mode | "Recognise only, don't move files" for the first run; gap-filling for an already tidy library | Modes that move or rename change where your files live — think before using them |
| Directory monitoring switch | Scan automatically when files change | Off means scheduled or manual scans only |
| Scheduled task time | How often to run | A wrong time doesn't error, it just runs at the wrong moment |
| Data source | Which site to query, plus its address and token | Not configured or wrong means no data; run the connectivity test first |
| Per-batch scrape limit | How many items per run | Default applies; larger sets are handled in batches, so run it again |

## If something goes wrong

- **Scan results are completely empty**: almost always the path or permission — go back to the step 1 checkpoints.
- **Scraping always fails**: check that the data site is reachable; the network items in system check show this directly.
- **Cover but no description (or the reverse)**: that source's entry is incomplete; fill it in from another source.
- **The task failed but the log shows no error**: open that task's **details** in the task log and read the failure reason and last successful step.
- **None of that fits**: look up your symptom in [Common questions](../faq.md), or bring the version, timestamp and log lines to GitHub: https://github.com/QYG2297248353/AMMDS-Docker/issues/new

## Next

- [First launch: sign in and basic setup](./first-login.md)
- [Change the port or upload limit](./settings.md)
- [Words you might not know](../glossary.md)
