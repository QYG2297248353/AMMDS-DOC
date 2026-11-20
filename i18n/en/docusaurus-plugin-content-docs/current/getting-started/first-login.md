---
title: "First launch: sign in and basic setup"
sidebar_label: First Login
description: Sign in after setup, then change the password, store the recovery key, bind a domain, fill in site details, set a proxy if needed and finish with a system check.
sidebar_position: 7
---

# First launch: sign in and basic setup

Once setup is complete, sign in with your admin account. Then do a few essential things in order: change the initial password, put the recovery key somewhere safe, and, if you need them, bind a domain and fill in site details. Allow about ten minutes.

Doing these in order before you scan and scrape saves a lot of troubleshooting later.

## Where the account comes from

| Situation | Username and password |
| --- | --- |
| Fresh install without `ADMIN_USER` / `ADMIN_PASS` | The pair you entered in the setup wizard — see [Setup wizard](./install-wizard.md) |
| `ADMIN_USER` / `ADMIN_PASS` set at startup | The username and password from those variables |
| Upgrading from an older version | Your existing admin account; it is not reset |

:::note[Password rules]
6–22 characters, with both uppercase and lowercase letters plus a digit or a special character. The same rules apply when you change it later.
:::

## Sign in

1. Open `http://host:port` in a browser. The port depends on how you installed: the host port you mapped for Docker, the one you set at install on a NAS, or `8080` when running directly.
2. Sign in with the username and password you set during setup.
3. You land on the dashboard by default. If the landing page was previously set to the public site, you'll arrive at the public home page. Switch back to the admin area from the menu.

:::note[Sign in once using the address you'll keep using]
On a successful sign-in the system records the address you came from as the service address. The app uses it for docs, discovery and similar. So **sign in once with the address you'll use long term** before binding a domain.
:::

## Step 1: change the default password

1. Click your avatar at the top right and choose **Profile**.
2. Click **change password** at the top of the profile page.
3. Fill in **current password**, **new password** and **confirm password**.
4. Click **submit**. You'll be signed out; sign in again with the new password.

The new password must meet these rules:

| Rule | Details |
| --- | --- |
| Length | 6–22 characters |
| Composition | Both upper and lower case, plus a digit or special character |

## Step 2: keep the recovery key safe

The recovery key is generated on first start and stored at `data/secret/recovery.key` in the program directory. If you forget the admin password, click **forgot password** on the sign-in page and enter the key to reset it.

> **Recovery key**: a key stored in a file that lets you reset your password if you forget it. It doesn't depend on the database.

:::tip[Back it up now]
If you back up only `db/` and lose `data/secret/`, there's no way back into your account. Keep this file with your database backup, somewhere safe.
:::

## Step 3: bind a domain (optional)

To use a domain, point it at this host at your DNS provider first, then go to **System config → Basic config → Domain binding**:

1. Click **change** and enter the domain.
2. After saving, the label changes from unbound to bound.
3. Open **System check** and confirm the domain binding item passes. It really checks that the domain points here. If it fails, DNS may not have propagated yet, the port may be closed, or a reverse proxy (a server that forwards outside requests to your box) in between may not be forwarding properly.

Skip this if you only use the app internally. Keep using the IP address. Binding a domain isn't required for anything else.

## Step 4: fill in site details

Go to **System config → Site config → Basic config** and fill in the site name, subtitle, description and company name. These appear in the public page title, share summaries and footer. Filing numbers and their lookup links can be entered on the same page if you need them.

Other tabs under System config hold appearance, notifications and security settings. Leave anything you're unsure about at its default; you can come back any time.

## Step 5: configure the network (if needed)

If the server can't reach overseas sites reliably, go to **System config → Network**:

1. Turn on **enable proxy**.
2. Pick a protocol (HTTP / SOCKS4 / SOCKS5) and fill in host, port and credentials.
3. Keep the bypass list up to date, so internal addresses skip the proxy.
4. Save, then retest connectivity.

## Step 6: connect services and add directories

With the basics done, connect external services and add folders as you need them:

| Order | What to do |
| --- | --- |
| 1 | Configure data sources, downloaders, media servers and similar |
| 2 | Add your media directory and create a scan task |
| 3 | Scrape the scan results |
| 4 | Browse and organise your library |

How to do all of that is in [Organise your first films in ten minutes](./first-library.md).

## Step 7: run a system check

Click your avatar at the top right, choose **System check** and run it once. It checks the database, disk, ports, system time, dependencies (FFmpeg and others), proxy and plugin configuration, and lists problems by category.

:::tip[Treat system check as your acceptance list]
Yellow and red items after a first install can almost always be fixed on the matching config page. Get everything passing before you start bulk scanning and scraping.
:::

## Settings

| Setting | What to enter | If you skip or mistype it |
| --- | --- | --- |
| Username | Fixed as `ammds`, so there is nothing to enter | Any other value stops startup |
| Current password / new password / confirm | The old password, then a compliant new one (6–22 characters, upper and lower case, digit or special character) | Mismatched or non-compliant passwords are rejected; if you forgot the old one, reset with the recovery key |
| Domain binding | A domain already pointing at this host | Without it you can only use the IP; if DNS hasn't propagated, the system check item fails |
| Site name / subtitle / description / company | Text shown in the public title, share summaries and footer | Defaults are used; nothing breaks |
| Landing page | Whether you land in the admin area or the public site first | Choosing the public site means switching back from the menu after signing in |
| Enable proxy | The switch, plus HTTP / SOCKS4 / SOCKS5 | Leave it off unless you need it; a wrong address breaks most network access |
| Proxy host / port / credentials | The proxy address and port, with a username and password if required | Wrong values mean no connection; SOCKS doesn't accept a username and password, only HTTP does |
| Bypass list | Addresses that shouldn't use the proxy, e.g. internal ranges | Without it, internal services (NAS, player) go through the proxy and become unreachable |

These generally **don't need a restart** — saving is enough.

## If something goes wrong

- **Can't sign in**: check the username is `ammds`; after repeated failures or a forgotten password, reset it with the recovery key on the sign-in page.
- **Password changes keep failing**: check it against the rules above — length, both cases, and a digit or special character.
- **Can't find the recovery key**: look for `recovery.key` under `data/secret/` in the program directory. If the file is genuinely gone with no backup, you'll have to reinstall and organise again.
- **The domain is bound but not working**: check that DNS has propagated, the port is open, and any reverse proxy forwards properly. The domain binding item in system check gives you the result.
- **The page looks broken after signing in**: hard-refresh once (`Ctrl` + `F5`), especially after an upgrade.

## Next

- [Organise your first films in ten minutes](./first-library.md)
- [Change the port or upload limit](./settings.md)
- [Common questions](../faq.md)
