---
title: Send Notifications to Your Phone
sidebar_label: Notifications
description: Push AMMDS task messages out through Bark, Telegram or Webhook — settings tables, test buttons, and the three system-level switches every channel goes through.
sidebar_position: 6
---

# Send Notifications to Your Phone

You don't need to watch the admin area to know a scan finished, a subscription matched, or a film was filed. Connect a notification channel and AMMDS will tell you when it happens.

> **Push**: AMMDS sends a message to your phone or another program on its own; you don't have to go and look.

> **Webhook**: a way of saying "when something happens, send a message to this address". Anything that can receive network messages can catch AMMDS's notifications.

> **Bot**: an automated account registered inside a chat app. You send it commands and it does the work.

## Pick a channel first

| Channel | Good for | What you need | Special |
| --- | --- | --- | --- |
| Bark | iPhone users who want the simplest option | Install the Bark app and copy the device key | One key and you're receiving |
| Telegram | Anyone who wants to control AMMDS from their phone | Create a bot with `@BotFather`, get the bot token and chat ID | **The only channel with two-way control** — search, subscribe and run tasks by command |
| Webhook | Anyone routing messages into a self-hosted service or automation | An address that can receive network messages | Several callbacks at once, and the request is fully customisable |

:::warning[There are three master switches]
Configuring a channel is only the first step. Whether a message actually goes out also depends on the system-level switches (see below). If you get nothing at all, look there first.
:::

---

## Bark

Bark is a lightweight push tool for iOS — one device key and you're done.

| Item | Detail |
| --- | --- |
| Where | Integrations → Notifications → Bark |
| Target | iOS (Bark app) |
| Service | The official `api.day.app`, or a server you host |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means the push test replies "please enable the Bark plugin" and nothing goes out |
| Service address | Default `https://api.day.app`; use your own address if self-hosted | Address and key from different servers get rejected |
| Device key | The part after `api.day.app/` in the push address shown on the app's home screen | Empty or wrong: the push test fails |
| Notification icon | The AMMDS icon by default, or any image URL | An unreachable URL means no icon |
| Notification group | Default `AMMDS`; notifications in one group fold together | Cleared means no grouping |
| Markdown first | Off by default; on renders the body as Markdown | Older apps may show broken layout — turn it off if so |

### Buttons

| Button | What it checks |
| --- | --- |
| Test connection | Reachability only; doesn't validate the device key |
| Push test | Sends a real push using the test template, verifying key and server |

There is also a status check: it shows the server version, build info and how many devices are registered — handy for confirming your server is healthy.

:::tip[Self-hosted?]
With your own server, set "Service address" to it and use the key that server shows. Mismatched pairs are rejected.
:::

---

## Telegram

Telegram is the main channel and the only one with two-way control: besides receiving, it can act on your commands.

| Item | Detail |
| --- | --- |
| Where | Integrations → Notifications → Telegram |
| Message | Text plus image, with an optional spoiler blur |
| Two-way | Push notifications plus bot commands |
| Credentials | Search `@BotFather` in Telegram, create a bot, copy the token it gives you |

### Settings

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means every Telegram action answers "please enable the Telegram plugin" |
| Service address | Default `https://api.telegram.org`; can point at your own reverse proxy | Wrong means no connection |
| Bot token | The token issued by `@BotFather` | Empty means no chat ID and no messages |
| Chat ID | The ID of the chat, group or channel; private chats are positive numbers, groups and channels usually negative | Wrong shows up as "push test succeeds but nothing arrives"; in a group, add the bot first |
| Webhook URL | Where Telegram should send your commands; leave empty to register none | You must finish domain binding in the system config first, or the request is refused |
| Spoiler mode | Off by default; blurs images in messages | Off shows images directly |

### Buttons

| Button | What it does | Prerequisite |
| --- | --- | --- |
| Get chat ID | Reads the chat ID from the bot's most recent conversation | Bot token entered, and you've sent the bot a message |
| Register commands | Registers the command menu | Address and bot token entered |
| Register webhook | Registers the callback address with Telegram | **Domain binding** completed in the system config |
| Push test | Sends a message using the test template | Bot token and chat ID entered |
| Test connection | Probes reachability | None |

Registering commands is safe to repeat: when every command in the list already exists nothing is submitted; if even one is missing the whole set is sent again, which overwrites same-named commands you added yourself.

The full command list, permissions and confirmation rules are in [Controlling AMMDS from Telegram](./telegram-commands).

:::warning[Webhook needs public reachability]
Domain binding must be complete in the system config before registering a webhook, or the request is refused. On a home network, skip the webhook and use the default way of receiving commands.
:::

---

## Webhook

Webhook is the most general channel: it isn't tied to any app — anything that can receive network messages can catch AMMDS's notifications.

| Item | Detail |
| --- | --- |
| Where | Integrations → Notifications → Webhook |
| Features | Several callbacks at once, fully custom requests, retries on failure |
| Good for | Internal systems, automation pipelines, self-hosted message gateways |

### Settings (plugin level)

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enabled | Turn on | Off means all callbacks stop |
| Retry count | Default `3`; minimum 1 | Raising it helps when the target fails occasionally |
| Retry interval | Default `5` seconds; minimum 1 | Against strict rate limits, a longer interval beats more retries |

### Settings (per callback)

Click "Add" on the webhook management card. Several can exist at once, each enabled as needed.

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Service name | Shown in the list to tell callbacks apart | Required; empty makes them indistinguishable |
| Method | `POST`, `GET`, etc. | Required; mismatching the target gets you rejected |
| Webhook URL | The full address that receives notifications | Required; unreachable means failed pushes and retries |
| Description | A note about its purpose | Optional |
| Enabled | Off keeps the config but stops pushing | Off means nothing arrives |
| Headers | A JSON array, e.g. `[{"key":"Content-Type","value":"application/json"}]` | Invalid JSON arrays are ignored |
| Body | JSON, supporting notification variables | A mistake isn't an error, the target just gets the wrong content |
| Check type | `status code` or `response body`; empty means no check | A mismatched rule shows permanent failure |
| Check value | Expected status code, or a substring the body must contain | Same |

The list lets you enable, disable, edit and delete each callback, and run a push test on a single one.

### Variables you can use

These placeholders work in both headers and body, and are replaced with real values when the message is sent:

| Variable | Meaning |
| --- | --- |
| `{{sign}}` | Signature, for verifying where the notification came from |
| `{{title}}` | Notification title |
| `{{subTitle}}` | Notification subtitle |
| `{{logo}}` | Logo image URL |
| `{{image}}` | Content image URL |
| `{{message}}` | Message body |
| `{{time}}` | Push time |
| `{{type}}` | Event type |

Example body:

```json
{
  "event": "{{type}}",
  "title": "{{title}}",
  "text": "{{message}}",
  "timestamp": "{{time}}",
  "image": "{{image}}"
}
```

:::warning["Submitted" is not "received"]
A push test replying "push request submitted" only means the request went out, not that the target handled it. Check the target's logs, or set the check type to status code or response body so the system can judge for you.
:::

---

## Three system-level switches

Every push is checked against these first (**System config → Notifications**):

| Setting | What to enter | If empty or wrong |
| --- | --- | --- |
| Enable notifications | **On** by default; the master switch | Off silences every channel |
| Message types | A category allow-list, comma separated. Default `system,subscription,download,library,certification,vip,scrape,actor_scrape` | Categories not ticked are never sent |
| Night-time do not disturb | Off by default; on means no pushes from 22:00 to 08:00 | Notifications in that window are skipped as "no push needed" and **not queued for later** |

:::note[Being skipped isn't a failure]
During quiet hours, or for unticked categories, the system records "no push needed" in the log. It isn't an error and nothing is re-sent later.
:::

## What triggers a notification

All three channels share the same set of messages:

| Category | Trigger |
| --- | --- |
| System | Service start / stop, low disk space, account unused for a long time |
| Subscription | A subscription matched, a subscription failed |
| Download | Pushed to downloader, download finished |
| Library | Film filed |
| Certification | Site authentication result |
| Film scraping | Scrape succeeded |
| Actor scraping | Actor scrape succeeded |
| Test | Manual push test |

## If something goes wrong

- **Nothing at all arrives**: check "Enable notifications" in the system config, then whether you're inside the quiet-hours window, then whether the category is in the allow-list.
- **Push test fails**: for Bark, check the device key and that address and key come from the same server; for Telegram, check the bot token and chat ID; for Webhook, check the address is reachable.
- **Telegram says success but the phone shows nothing**: the chat ID belongs to another conversation, or the bot was removed from the group. Run "Get chat ID" again — send the bot a message first.
- **Getting the chat ID fails**: you haven't messaged the bot yet. Send it one and click again.
- **Registering the webhook is refused**: domain binding isn't done in the system config.
- **Webhook always reports failure**: the check type / value doesn't match the real response — use a status code of `200`, or clear the check.
- **Variables aren't replaced**: a typo. Compare against the variable table character by character, noting the double curly braces.
- **Duplicate notifications**: the target timed out and a retry fired. Shorten the target's processing time or reduce retries.
- **The command menu is stale**: some commands were registered before — delete them and register again.

## Next

- [Connect External Services in Three Steps](./overview.md)
- [Download resources automatically](./downloader.md)
- [Small tools that improve recognition](./auxiliary.md)
