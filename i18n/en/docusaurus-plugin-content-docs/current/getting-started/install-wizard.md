---
title: "Setup wizard: first-time configuration"
sidebar_label: Setup Wizard
description: The four-step wizard shown on the first launch of a fresh install — accept the terms, create the admin, fill in site details and complete your profile.
sidebar_position: 6
---

# Setup wizard: first-time configuration

The first time you open a freshly installed AMMDS, and no admin account exists yet, it takes you to the setup wizard at `/setup`. Complete the four steps, then sign in with the account you just created.

:::note[When the wizard appears]
The wizard appears only while setup is incomplete. Once setup is done, visiting `/setup` sends you back to the home page. Running it again needs an empty database.
:::

## Before you start

- Have an email address ready for your profile and avatar sync (the address is not verified)
- Decide on the admin username and password (rules below)
- The whole flow takes two or three minutes and you can go back with "Previous"

## Step 1: Accept the terms

The page has three tabs: Summary, Terms of Service and Privacy Policy. The summary explains in plain language what the program does, what setup writes and where data lives. Links on the page open the full texts.

Tick "I have read and agree" to enable "Next".

:::warning[Ticking is required]
Without ticking, "Next" reports that you must accept the terms and the flow does not continue.
:::

## Step 2: Create the admin

| Field | What to enter | Rules |
| --- | --- | --- |
| Username | The name you sign in with | 3–32 characters: letters, digits, underscore or hyphen only |
| Email | Contact address | Required, must be valid; used later for avatar sync |
| Password | Sign-in password | 6–22 characters, with both uppercase and lowercase letters plus a digit or special character |
| Confirm password | Repeat it | Must match exactly |

> If an admin was already created at startup via `ADMIN_USER` / `ADMIN_PASS`, this step shows as "Completed" — only the email is needed.

## Step 3: Site details

| Field | What to enter | If left empty |
| --- | --- | --- |
| Site name | Shown in the browser title and footer | Required |
| Landing page | "Admin first" or "Public site first" | Admin first; with the public site first, the root URL opens the public home page |
| ICP number | Optional, for Chinese hosting | Footer omits it when empty |

## Step 4: Complete your profile

This step decides how you appear on the public site.

| Field | Notes |
| --- | --- |
| Avatar | Fetched from Gravatar by email, with a letter avatar as the fallback. You can also upload your own: PNG, JPEG, GIF, WebP or BMP, up to 2 MB |
| User ID | 4–32 letters, digits, underscore or hyphen. Reserved words such as `admin`, `root` and `ammds` are rejected, and so are all-digit IDs |
| Nickname | Shown on the public site, up to 32 characters |
| Phone | Optional |
| Social links | Optional, up to 20; each URL must start with `https://` |

"Sync profile" fetches the avatar and nickname again by email. Anything you edited by hand is kept.

## After submitting

Click "Finish setup" — you are redirected to the sign-in page. Use the account from step 2.

:::tip[Keep the credentials safe]
The username cannot be changed from the app's pages afterwards. The password can be changed in your profile at any time. The recovery key is a separate mechanism: it is generated automatically on first startup and is unrelated to this password.
:::

## Troubleshooting

| Symptom | Cause and fix |
| --- | --- |
| Every URL redirects to `/setup` | Setup is incomplete. Finish the wizard |
| `/setup` redirects home | Setup is already done. Just sign in |
| "User ID already taken" | Pick another. Reserved words and all-digit IDs are rejected too |
| Social link rejected | Make sure it starts with `https://` |
| Avatar upload fails | Check the file is under 2 MB and in a supported format |
| Cannot sign in after setup | Use the username and password from step 2; if forgotten, reset with the recovery key |

## Next

- [First launch: sign in and basic setup](./first-login.md)
