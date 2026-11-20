---
title: Messages, feeds, sharing and interop
sidebar_label: Info Center
description: "The four jobs of Information Centre: reading system messages, subscribing to outside feeds, sharing entries, and linking two AMMDS sites as friends."
sidebar_position: 1
---

# Messages, feeds, sharing and interop

**Information Centre** handles four things: messages the system leaves you, outside feeds, sharing entries with other people, and linking to another AMMDS site. The four parts are independent, so jump to the one you need.

## 1. Reading system messages

The messages page collects notifications produced while AMMDS runs. They cover background task results, site authentication status, share requests and import progress, plus official announcements.

> **Notification types**: there are three kinds. System notifications come from the app itself: subscription results, site authentication, organising progress and so on. Official notifications are announcements. Share notifications cover share requests and import results.

### Filtering and reading

There are two filters at the top: notification type (All / System / Official / Share) and read state (All / Read / Unread). Press **Search** after changing them. The list shows 10 per page, and you can change the page size.

Each message shows type, level, title, a summary, time and actions. There are four levels:

| Level | Colour | Meaning |
| --- | --- | --- |
| Info | Blue | General notice, nothing to do |
| Success | Green | The operation completed |
| Warning | Orange | Something may be wrong, but you can carry on |
| Error | Red | It failed or errored; needs attention |

### Marking read and deleting

- Click the tick button to mark a message read; after that the button is disabled so it isn't submitted twice.
- Click delete to remove the message; it won't come back.
- Only one message at a time — there is no "mark all read" or batch delete.

This page only manages in-app messages. To get notifications on your phone, configure a notification service under Integrations.

## 2. Subscribing to outside feeds

> **RSS**: an update list that many sites publish in a format programs can read. Give AMMDS the address and it fetches new articles regularly, so you can read them in the app.

The feeds module has six tabs:

| Tab | What it's for |
| --- | --- |
| Dashboard | Subscription and entry counts, category breakdown, 14-day trend, recent tasks |
| Subscriptions | Add, edit, fetch, archive and delete subscriptions |
| Offline cache | Cache usage and progress, clear the cache |
| Popular | Browse an online list of popular feeds and subscribe or unsubscribe in one click |
| Link preview | Resolve an address and look at the content before subscribing |
| Settings | Global defaults |

### Adding a subscription

1. In **Subscriptions** click add and fill in the fields below.
2. Save, then click **Fetch** on that row; it runs straight away and tells you how many entries were added.
3. To fetch everything, use **Fetch all** — it's a background task, so you can leave the page.

If you're not sure an address works, try **Link preview** first: paste the address, click **Resolve**, check the entry count, category, language and a few entries, then click **Subscribe**.

### Settings: what a subscription can hold

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| Enabled | Turn it off and the subscription stops being fetched | Enabled by default |
| Feed address | The RSS or Atom address | Nothing can be fetched |
| Name | The name shown in-app | Rows are hard to tell apart |
| Description | Optional note | Not shown |
| Content category | Article / Image / Video / Resource / Other | Falls under "Other", which isn't shown in the public tabs |
| Icon link | Optional small icon in lists | A default icon is used |
| Deep parse | After fetching, open each detail page to fill in the body and media | You only get the summary from the list |
| Offline cache | Save the body and images locally | If the source deletes or goes down, the content is gone |

"Integrated sources" brought in by site plugins can only have their name, description and icon changed — the address is read-only.

### Offline cache

> **Offline cache**: downloading article bodies, images and other media to your own disk. Useful when the source site is unstable or deletes old articles.

For each subscription, the cache page shows "total / cached / pending", the total cache size and that subscription's completion ratio. **Refresh cache** starts a background task. **Clear cache** deletes every cached file, so you have to cache again afterwards. Archived subscriptions are neither fetched nor cached.

### Popular feeds

The popular list comes from an online catalogue. It shows name, description, category, type and source domain. Each source carries one of three marks: synced online (just fetched), local cache (online unavailable, so the stored copy is used) and built-in fallback (first deployment with online unavailable). You can **Sync now**, or subscribe straight from the list. Unsubscribing also deletes the entries already fetched. The system also checks now and then whether those sources still respond, and marks the dead ones.

### Feed-wide settings

These are **defaults for new subscriptions**; changing them doesn't touch existing ones. A switch on an individual subscription wins over these.

| Setting | What it controls / how to fill it | If you leave or mis-set it |
| --- | --- | --- |
| Auto archive | Archive subscriptions older than the retention days, daily | Off by default; archiving is manual only |
| Auto archive retention days | A number, default 30 | 0 or less disables auto archiving |
| Default deep parse | Whether "deep parse" is ticked on new subscriptions | Unticked by default |
| Default offline cache | Whether "offline cache" is ticked on new subscriptions | Unticked by default |
| Max images per entry | A number, default 20 | Image-heavy entries are only partly cached |
| Max videos per entry | A number, default 0 | Video files aren't cached by default |
| Max entries per round | A number, default 200 | The rest wait for the next round |
| Cache request timeout (seconds) | A number, default 30 | Slow resources fail and need another run |
| Popular list cache duration (minutes) | A number, default 360 | Shorter means fresher but more frequent online fetches |
| Popular source availability check | Whether to check periodically that listed sources respond | On by default; turning it off may recommend dead addresses |
| Link preview timeout (seconds) | A number, default 20 | Slow sites fail to load |

:::warning[Deleting a subscription deletes its entries]
Deleting a subscription also deletes every entry fetched under it. This can't be undone.
:::

## 3. Sharing entries with others

A share link turns a film, actor, series, comic, novel or TV show into a public address. The other person can open it without logging in. They see the entry details, and they never get the media files.

### Creating a share

1. Click **New share** and pick the type.
2. Search for and select the entry.
3. Pick the validity: forever, or a specific expiry time.
4. Decide whether others may import it; if you turn that off they can only view, and importing needs your approval.
5. Optionally set an access password. Leaving it empty means no password.
6. Click **Create**. The result shows a QR code and the full link, already copied once.

> **Access password**: the usual "extraction code". Give the link and the password together — the password never appears in the link.

You can filter the list by type, or search by short code or title. Each row shows the type, title, short code and full link. It also shows whether there is a password, the validity period, the state, whether importing is allowed, and when it was created.

| State | When it happens | What they see |
| --- | --- | --- |
| Normal | Not expired, not paused | Can view; importing depends on your setting |
| Paused | You paused it | Told the share is paused |
| Expired | Past the expiry time | Told the share has expired |

You can resume a paused share any time. Deleting a share can't be undone, and the link stops working immediately.

### Handling import requests

When someone wants to import your share, the request lands in your **Inbox**. It shows which share, the applicant (nickname and account ID), email, reason, state and time. Only **Pending** requests can be approved or rejected.

The outcome becomes a share notification. **Approving only changes that one request.** Whether the share can be imported at all is still decided by what you chose when creating it.

## 4. Importing someone else's share

The import entry is at **System Management → Backup and Restore → Share Import**:

1. Paste the share link or short code.
2. If the owner set a password, enter it.
3. Click **Preview** to check the content, then **Import**.
4. Pick a strategy: skip existing (default), overwrite, or merge. None of them deletes any of your other local data.

If the owner hasn't allowed importing, you'll see "this share doesn't allow importing". You can submit a reason and wait for approval, but first fill in your user ID, nickname and email.

Below on the same page you can switch to **Link records** (filterable by keyword, type and result) and **Request records** (target share, reason and state; pending requests can be cancelled). Deleting a record doesn't affect data already imported.

## 5. Linking two AMMDS sites

> **Interop**: making two AMMDS deployments friends. Once linked, you can message each other, search the other library and import their comic or novel data locally. It uses a site token, so no passwords are exchanged.

> **Token**: a time-limited credential, like a temporary pass. When it expires, get a new one.

### Prerequisites

1. Both sides turn on **Interop** in System Config (it's off by default).
2. Each side can reach the other over the network. If you use a domain, encrypted (HTTPS) access is recommended.
3. You know the other site's address (with protocol, or `IP:port`).

With the switch off, friend requests and searches both fail.

### Adding a friend, sending and receiving requests

1. Click **Add friend** and enter the other site's address.
2. Click **Resolve**; AMMDS probes their interop service and fills in the friend ID and nickname.
3. Optionally enter a site name and note, then a reason (required), and click **Request**.
4. Once they approve in their inbox, the friendship is established. If it sits too long you can resend from **Sent requests**; if rejected, start a new request.

The friend list shows name, state (Online / Connecting / Long offline / Offline), address, note, and the actions renew, profile, message, edit and delete. Next to the address there's a **Check** button to refresh the state.

- **Renew**: swap in a new token, used after it expires or the other side resets.
- **Profile**: change the friend's nickname, site name and note; the address is read-only.
- **Edit**: change the note only.
- **Delete**: removes the friendship; messages and request records are kept.

### Friend search and messages

**Friend search** queries all friends at the same time and merges the results. The types are films, actors, comics and novels, and the keyword is required. Only comics and novels get an **Import** button; films and actors are view-only. Import fails with a message if names clash or the other side's details are missing.

Click **Message** on a friend row to open the chat. Messages are ordered by time, yours on the right and theirs on the left. Messages live only in each side's own database; no central server relays them.

Interop never copies the other side's media files; text and posters stay with their own site.

## If something goes wrong

- **A message is missing**: make sure the filter isn't stuck on "Unread" or a single type; clear filters and search again.
- **A feed fetches nothing**: use **Link preview** to check that the address still works. If it's dead, replace it or pick a similar one from Popular.
- **A share won't open**: it's probably expired or paused. Ask the owner to extend it or create a new one; if it asks for a password, ask them for it.
- **The import button does nothing**: the owner set it to view-only. Submit a request and wait.
- **Resolving their site fails**: check the address, confirm they enabled interop, and try opening their site in a browser.
- **A friend is long offline**: click **Check**, then try **Renew**; if that fails, look at their site and the network.
