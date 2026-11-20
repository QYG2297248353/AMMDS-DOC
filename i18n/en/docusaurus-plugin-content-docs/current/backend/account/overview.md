---
title: Profile, store and sign-in security
sidebar_label: Account Overview
description: Edit your avatar, details and public page and change your password; how to order in the official store; and how to hand your site credentials to AMMDS.
sidebar_position: 1
---

# Profile, store and sign-in security

This page covers three separate areas. The first is **your own account**: avatar, details, public page and password. The second is the **official store**. The third is **site authentication**, where you give AMMDS your login details for another site. Each part stands alone, so read only what you need.

## 1. Your profile

Click your avatar in the top right, then open **User Centre**. The page reads top to bottom: header area, page settings, user info and licence. Every change takes effect immediately, with no restart.

### Header area

| Element | How to change it |
| --- | --- |
| Avatar | Click the avatar and pick an image; it's replaced as soon as the upload finishes |
| Banner | Upload button at the top right; if a banner exists you can delete it and go back to the default background |
| Nickname | Shows your current nickname |
| Role tag | Admin or user |
| Licence tag | Matches the licence state (valid / invalid) |
| Member tag | Shown when the account has membership |
| Change password | Opens the password dialog |

With no banner uploaded, the built-in background is used.

### Page settings

This decides **what visitors see on your public page**:

| Area | What it does |
| --- | --- |
| Page background | Upload or delete; a placeholder shows when unset |
| Page banner | Upload or delete; separate from the header banner |
| Public page theme | Several theme cards — click to switch and save; each theme has its own page design and widget layout |

Background and banner apply to every theme on the public page. Each theme decides how to use and crop them.

### User info

The card shows your user ID, nickname, email, phone, role, state, registration time and last sign-in. Two buttons sit at the top right. **Edit info** opens the dialog. **Public page** opens your page in a new tab.

> **User ID**: the handle you chose. It is also your public page address, in the form `/u/your-id`. If you change it, old links stop working. Update anything you have already shared.

> **Masked**: only part of the value is shown. The middle is replaced with asterisks, so a phone number may show just the first and last digits.

### Settings: what you can edit

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| User ID | Required. Letters, digits, underscore and hyphen only, at least 4 characters, not all digits, and not a reserved name such as `admin`, `root` or `ammds` | You can't save, and the public page address won't open |
| Nickname | Required, up to 32 characters | You can't save |
| Email | Required, must look like an email | You can't save, and interop can't be enabled |
| Phone | Optional; the public page shows a masked number | Can be left empty |
| Public page fields | Multi-select: user ID, nickname, avatar, email, phone (masked), registration time, last sign-in, state | Until you configure it, everything except phone is shown; deselect all and the page shows nothing |

### Changing your password

Click **Change password** in the header and fill in three things: current password, new password, new password again.

Password rules (same for signing in, changing and resetting): **6–22 characters, with both upper and lower case, and at least one digit or symbol**. Both entries must match.

The password is encrypted before it is sent. When the change succeeds, the page tells you that you are about to be signed out. About 5 seconds later you are logged out and can sign in with the new password. Changing your password needs the old one. If you cannot sign in at all, use the recovery key under System Management instead.

Avatars, banners and backgrounds all take up space in the data directory. Your nickname, email and phone are also needed before interop (data sharing with other AMMDS sites) can be turned on.

## 2. Official store

> **Official store**: the shop built into AMMDS. Products, prices, stock, payment and shipping are all run by the official shop; this side only displays and places orders. Buying membership or services is the most direct way to support development.

### Buying something

1. **Browse**: open the product list. You can browse, search and view details without an account (cards marked "not for sale" can't be added to the cart).
2. **Add to cart**: pick the variant and quantity on the detail page and click **Add to cart** (this requires signing in). In the cart you can change quantities or remove items.
3. **Checkout**: click **Checkout**, fill in the blocks below, pick a payment method and submit.

The cart is checked out as a whole; there are no per-row ticks. Currency is fixed by the region you choose when you first add an item. To change it, abandon the cart and start again. You are asked to confirm, no order is created and nothing is charged. After submitting, you land on an order result page. Keep that link; it is safe to save.

### What checkout asks for

| Setting | What it controls / how to fill it | If you leave it |
| --- | --- | --- |
| Contact | Email required; phone, first and last name optional | Empty email blocks submission |
| Saved addresses | After signing in, pick a saved address and it fills the form | You type it every time |
| Shipping address | Address, city and country required; postcode and state optional | Missing required fields block submission |
| Shipping method | Click **Get shipping methods** to see what is available in your region and what it costs | You can submit without it; the list is fetched for you |
| Payment method | Pick one from the methods the store offers | You can't place the order |

### Orders

Orders and order details are viewed on the public site. In the admin area, the **Official Store** menu has four pages:

| Page | Purpose |
| --- | --- |
| Status | Shop info, product, category, cart and order counts, last sync time and connection state; sync can be triggered by hand |
| Orders | All orders across accounts with details; filterable by keyword and payment state |
| Carts | Each account's cart; remove items or clear |
| Saved addresses | Maintain your own shipping addresses and set a default |

Sync comes in four kinds: products (incremental), info, orders and a full reconciliation. All of them run in the background. The page shows progress, success and failure counts, and an error summary. You cannot start a second full reconciliation while one is running.

### Address fields

Add, edit, delete and set a default under **Official Store → Saved Addresses**. Fields: email, phone, first name, last name, country, state, city, postcode, street address. **Email, phone, country and city are required.** Checkout selects your default address and fills the form automatically.

## 3. Site authentication

> **Site authentication**: handing AMMDS your credentials for a site (user ID plus personal key) so it can read data with that account. It involves no real-name information.

> **Passkey**: the personal key a site gives you; it acts as your login credential for that site. Don't share screenshots of it, and don't reuse one key across sites.

Avatar menu → **Site Authentication**. Sites appear as cards, three per row; with none configured you'll see "no authentication sites".

### How to authenticate

1. Click **UID** on the card and enter your user ID on that site; submitting saves it.
2. Click **PassKey** and enter the key the site gave you; submitting saves it.
3. Make sure the switch on the card is enabled.
4. Click **Authenticate now**.

Different sites ask for different things. Most want a user ID plus a personal key; some want only the key. Three more conditions must hold: the site is enabled, the site supports authentication, and the credentials are saved. If anything is missing, the page tells you and sends nothing.

The request runs in the background, so you do not have to stay on the page. The list refreshes every 10 seconds and pauses when you switch tabs.

### Authentication states

| State | Meaning |
| --- | --- |
| Authenticated | The last attempt succeeded and is still within its validity window |
| Not authenticated | Never authenticated, failed, or the validity window has passed |

A successful authentication is valid for **6 hours**. After that it flips back to not authenticated, but the last attempt time and failure reason are kept to help diagnose problems. A built-in scheduled job re-authenticates from time to time, so normally you do not need to renew by hand. On success, the system records the username and email the site returned and sends a "site authentication succeeded" notification.

## If something goes wrong

- **"Site not enabled"**: flip the switch on the card and retry.
- **"Set UID and PassKey first"**: fill each one once; the button highlights once it's saved.
- **"This site doesn't support authentication"**: such sites can only be connected through a plugin — configure it under Integrations.
- **Failed with no clear reason**: usually the user ID and key don't match, or the site reset your key. Check both on the site.
- **Went back to not authenticated**: the 6-hour window expired and the scheduled job hasn't run. Click **Authenticate now** once.
- **The product list is empty**: the store hasn't synced yet; an admin can trigger a sync on the Status page.
- **Signed out after changing the password**: that's expected — sign in again with the new one.
