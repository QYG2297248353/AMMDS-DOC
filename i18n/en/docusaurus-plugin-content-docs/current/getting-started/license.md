---
title: Licence
sidebar_label: Licence
description: A collection of ready-to-use licence keys, plus where to activate them, how to read the status, and the seat and expiry rules. Keys are updated here by the maintainers — copy one and use it.
sidebar_position: 10
---

# Licence

This page collects a set of **ready-to-use licence keys**. Copy one and activate it in the user centre — the **watermark disappears right away and every feature keeps working**. Keys are refreshed by the maintainers from time to time. If one reports "activation quota full" or is unavailable, try the next one.

> **Licence**: the record showing this deployment is authorised. Without a valid licence the whole site shows a watermark, but signing in, system settings, site authentication and backups are all unaffected.
>
> **Key**: a string shaped like `AMMDS-XXXX-XXXX-XXXX-XXXX` — the credential that authorises this deployment.

If you only want to understand the watermark, trial or offline activation, see the [glossary](../glossary.md) and [FAQ: Licence and watermark](../faq.md#licence-and-watermark). For the full activate, refresh and deactivate flow, see [System maintenance: Licence and watermark](../backend/system/maintenance.md#4-licence-and-the-watermark).

## Available keys

Copy any complete key below (including the hyphens) and follow the steps in the next section to activate it.

{/* Maintainers: fill in real, working keys in the table below, one per row. Replace or delete the placeholder rows once real keys are added. */}

| Available key | Status | Notes |
| --- | --- | --- |
| `AMMDS-XXXX-XXXX-XXXX-XXXX` | Placeholder | Maintainer: enter a real key here |
| `AMMDS-XXXX-XXXX-XXXX-XXXX` | Placeholder | Maintainer: enter a real key here |
| `AMMDS-XXXX-XXXX-XXXX-XXXX` | Placeholder | Maintainer: enter a real key here |

:::note[One key, one deployment]
A key normally covers a single deployment. Once its seats are used up, further activations report "activation quota full". Before moving servers or reinstalling, **deactivate the online licence** on the old instance to free the seat, then use the key on the new one.
:::

## How to activate

Signed in as an **administrator**, follow these three steps. Other signed-in accounts can view the status and benefits but cannot activate.

1. Click the avatar in the top-right → **User centre**, then scroll to the **Licence** card at the bottom.
2. Click **Activate** (on an already-active instance, click **Replace licence** first to expand it) and paste the key.
3. Confirm. On success the watermark closes and the card shows the plan and expiry date.

For the full status fields, offline activation and trial rules, see [System maintenance: Licence and watermark](../backend/system/maintenance.md#4-licence-and-the-watermark). When the server cannot reach the licence service, use **offline activation**: follow the page to get an instance ID and a command, run it on another connected device, save the returned JSON to a file (up to 64 KiB) and upload it back.

## A few rules

| Item | Rule |
| --- | --- |
| Activation seats | One deployment takes one seat, regardless of the number of signed-in users; free an old device when seats run out |
| Replace licence | Replaces the current authorisation; if a trial is running, a successful activation ends it immediately |
| Online refresh | Forces one check; if the service is temporarily unavailable, the cached status is returned |
| Deactivate online licence | Local data is cleared only after the remote release is confirmed |
| Clear local authorisation only | Removes only the local key and token; does not release the remote seat or clear the trial record |
| Membership vs licence | Membership is a marker on the account; the licence authorises this deployment — they are independent |

Deactivating and clearing both require confirmation and cannot be undone. Plan names, prices and benefit scopes are as shown on the purchase and licence pages.

## If a key does not work

- **"Activation quota full"**: the seats for that key are taken — try the next one. If it is your own key, free an old device in the licence portal or deactivate the online licence on the old instance.
- **"Licence unavailable" / verification failed**: it may have expired, been revoked or suspended — try another key; check the key was copied in full with no extra spaces.
- **The watermark is still there**: it should close after a successful activation. If not, check the licence status and notice bar in the user centre, then follow [FAQ: Licence and watermark](../faq.md#licence-and-watermark). Features are unaffected, so you can keep using the site.
- **Cannot reach the licence service**: an activated instance keeps running on its cached valid credential for a further offline grace period; refresh once the network is back. When the grace period ends, only the watermark returns — features are unaffected.
- **Still stuck**: open an issue on GitHub with the version, timestamp and a log excerpt: https://github.com/QYG2297248353/AMMDS-Docker/issues/new

## Next

- [Environment variables](./settings.md)
- [System maintenance: Licence and watermark](../backend/system/maintenance.md#4-licence-and-the-watermark)
- [FAQ: Licence and watermark](../faq.md#licence-and-watermark)
- [Glossary](../glossary.md)
