---
title: Sharing, the Store, and Personal Pages
sidebar_label: Share & Profile
description: How share links are created and opened, password and expiry rules, the import request flow, every step of shopping from browsing to checkout, plus login entries, public profile themes, and profile settings — all on one page.
sidebar_position: 3
---

# Sharing, the Store, and Personal Pages

This page covers three things that involve other people: **sharing** (turn an entry into a public link that needs no login), **the store** (run a small shop inside your site), and **personal pages** (how others see you, and where you maintain your own profile).

> **Short code**: the random string at the end of a share link, e.g. `ABC123`. It is the only identifier of that share.

> **Passkey**: a login method that replaces passwords with device biometrics or device-bound keys. The option only shows up on the login page after the admin enables it in the backend.

> **Recovery key**: an emergency key generated at deployment. Use it to reset your password if you forget it. Keep it safe; losing it means going through the initialization flow in the deployment docs.

---

## Share Pages

A share link turns a movie, actor, series, comic, novel, or TV show into a public address with a short code. The recipient can open it without logging in. The page only displays the entry: the creator decides whether it can be imported, and the import itself happens inside the recipient's own system.

### Link Format

```
https://your-domain/share/short-code
```

| Item | Details |
| --- | --- |
| Route | `/share/:code`, where `code` is the short code generated at creation |
| Login | Not required; guests can visit directly |
| Layout | Public layout — no site top menu, never appears in any menu |
| Width | Content area max ~1040px, centered on desktop, single column on phones |

The short code is the only identifier, and the link **does not contain the access password**; if one is set, you must tell the recipient separately.

### Page Structure

| Area | Content |
| --- | --- |
| Top badges | "Shared link" badge, share-type badge (movie / series / actor / comic / novel / TV show, colored by type), and a "view only" badge when importing is disallowed |
| Title | The shared entry's title; wraps when long |
| Validity | "Permanent" if it never expires, otherwise "Valid until YYYY-MM-DD HH:mm" |
| Content | Entry details rendered by share type, see below |
| Footer | Fixed text "© AMMDS 提供技术支持" (technical support by AMMDS) |

The "view only" badge appears only when the creator has turned off "allow others to import"; no badge means the recipient can import directly.

### Access Password

When a password is set, the page shows the password panel instead of content:

1. The panel title is "This share requires an access password", with the shared entry's title as subtitle so you can confirm which share you opened.
2. Type the password into the "Enter access password" box, press Enter or click "Unlock" to submit.
3. An empty password triggers "Please enter the access password" on the spot — no request is sent.
4. A wrong password shows "Access password is incorrect, please try again" under the box; you can keep retrying.
5. Once verified, the page replaces the panel with the full returned content — no refresh needed.

Verification is valid only for the current page view; after a refresh you must re-enter it. The password is never written into the address bar or browser storage.

### Share Content Types

Each share belongs to exactly one type, and the page loads the matching display component. Blocks below appear only when data exists.

| Type | Displayed content |
| --- | --- |
| Movie | Header (poster, rating, tags, and metadata such as ID code / premiere / duration / studio / rating / language / resolution / file size / codec / subtitles), synopsis, cast, stills, parent series |
| Series | Header and metadata, series synopsis, work count, series list; "No works in this series yet" when empty |
| Actor | Header (avatar, aliases, gender, age, height, weight, birthday, nationality, blood type, measurements, debut date, agency, status), biography, photos |
| Comic | Header (author, series, category, type, season, page count, age rating, rating, language, publishing info, reading direction), synopsis, remarks, creators, characters, teams, locations, chapter list (pages per chapter) |
| Novel | Header (subtitle, genre, status, publisher, publish year, language, page count, chapter count, parent series, ISBN), content summary |
| TV show | Header (type, studio, year, premiere, rating, duration, status, zone), synopsis, cast, seasons & episodes (specials first, each season in episode number / title / air date columns), types and studios |

A novel share only carries the chapter count and **does not show a chapter list**; a comic share does include its chapter list. Share pages never offer downloads of video files or book text.

### Expired and Error States

The page shows a full notice panel instead of half-broken content:

| State | Title | Text |
| --- | --- | --- |
| Load failed or unknown short code | Share not found or failed to load | Could not fetch the share content; check the link or try later; panel offers "Reload" |
| Paused by creator | Share paused | The creator has paused this share; it is temporarily unavailable |
| Past validity | Share expired | This share link has passed its validity and is unavailable |
| No display component for the type | No previewable content | This share type is not supported for preview yet; try later |

While loading, a skeleton screen shows — no flash of an empty page. Deleted shares no longer have a short code and land on "Share not found or failed to load" too.

:::warning[Validity is controlled by the creator]
A share page cannot extend validity, change the password, or lift a pause. Ask the share's creator to adjust these in their backend share list.
:::

### Importing a Share Into Your Own Library

The share page has **no** import button. Importing happens in the recipient's backend; the public page only signals permission through the "view only" badge.

**When importing is allowed: import directly**

1. Open **System Management → Backup & Restore → Share Import** in the receiving system.
2. Enter the share link or short code, plus the access password if one is set.
3. Click "Preview Share" and confirm the title, type, and entry list.
4. Choose an import plan: skip existing, overwrite, or merge.
5. Click "Import Share"; the page reports success and failure counts, with at most the first 50 failure details.

**When importing is disallowed: request first**

1. Enter the link in "Share Import" and click "Preview Share" as well.
2. Because the share is "view only", the "Import Share" button is disabled and the page says "This share does not allow importing".
3. Click "Request Share" to open the dialog: the target share is read-only, and "Reason" is required, up to 200 characters.
4. After submitting, the share owner receives the request in **Information Management → Share → Inbox**.
5. The owner clicks "Approve" or "Reject"; only "pending" requests show these two actions.
6. The result is recorded in the owner's in-site notifications (system messages), and the status becomes "approved" or "rejected".

After importing, the recipient can find the result in "Link Records" on the same page; pending requests can also be canceled there.

:::note[Requesting and importing are two different things]
Approval only changes the request status and sends a notification — it does not move data into the recipient's system automatically. The actual import is still done by the recipient in "Share Import", and the import plan is chosen by the recipient.
:::

---

## The Store

Enter the store from the "Store" item in the top menu → browse the product list or a category → open a product → pick a spec and add it to the cart → sign in → check out. After that, "My Orders" is where you track progress, ask to cancel, or ask for a return.

### Entries and Pages

- "Store" appears in the top menu only after the backend enables it; when disabled, the menu item hides but the address still works. If the store is not open yet, the product list and store info pages both say "The store is not open yet, please come back later".
- Product list, category pages, and store info can be browsed anonymously; cart, checkout, order list, and order details require login and redirect to the login page otherwise.

| Page | Address | Login |
| --- | --- | --- |
| Product list | `/home/store` | Anonymous OK |
| Product category | `/home/store/category/{handle}` | Anonymous OK |
| Product detail | `/home/store/product/{handle}` | Anonymous OK; adding to cart needs login |
| Cart | `/home/store/cart` | Login required |
| Checkout | `/home/store/checkout` | Login required |
| Order result | `/home/store/order/{token}` | Login required |
| Order list | `/home/store/orders` | Login required |
| Order detail | `/home/store/orders/{orderId}` | Login required |
| Store info | `/home/store/info` | Anonymous OK |

### Product List

Responsive grid: 4 per row on desktop, 3 on tablet, 1 on phones, 12 per page.

| Element | Details |
| --- | --- |
| Cover | 1:1 square; shows a "failed to load" placeholder on error, and "unavailable" on the cover when not sellable |
| Title and amount | Title truncated to one line; subtitle hidden when empty. If specs have different amounts, a range shows; otherwise a single amount. Exact amount and currency follow the live page |
| Pagination | Paginator and total count when there is data; "No products yet" when the list is empty |

Click a card to open the product detail. The category page `/home/store/category/{handle}` reuses the same sidebar and cards, and additionally shows the category name, description, and subcategory tags; an empty description falls back to "All sellable products in this category".

#### Filters and Sidebar

On desktop, the store sidebar sits on the right; on narrow screens, search and categories move above the list.

| Block | Content |
| --- | --- |
| Store navigation and currency | Four buttons: store home, my orders, store info, cart; below them the current settlement currency and region name — click to open the store info page and switch |
| Search | Press Enter or click the search button; the keyword goes into the `q` URL parameter, so the link can be shared directly |
| Categories | Tag cloud: "All" plus all levels of categories; clicking filters and returns to page 1 |
| Collections | Appears when collection data exists: "All collections" plus each collection tag |
| Cart | When logged out, shows "Log in to view your cart and place orders." with a login button; when logged in, the first 3 product rows with quantities and total, plus "View Cart" |
| Store | Store name, description, type (official), currency, support email, and a fixed store introduction |

### Product Detail

| Area | Content |
| --- | --- |
| Action row and main image | Back to store, cart, my orders, store info; carousel for multiple images (no autoplay), placeholder when empty |
| Sale status | "In stock" when sellable, "This product is currently unavailable" when not |
| Spec selection | Products with options render grouped buttons; products without options but with multiple specs list spec buttons directly; unsellable specs are grayed out |
| Quantity and attributes | Quantity input 1–99; attributes show product number, spec (all spec titles), and stock status ("Available (stock confirmed at checkout)" when sellable) |
| Action buttons | "Add to Cart" and "Buy Now", both disabled when unsellable |
| Product info and gallery | Name, subtitle, number, category, currency, sale status, and spec table (spec, SKU, amount, sale status); an empty rich-text intro shows "No introduction", followed by a fixed disclaimer |

> **SKU**: stock keeping unit — each spec of a product has its own number, and stock is deducted against it at checkout.

Clicking "Add to Cart" while logged out shows "Log in to view your cart and place orders." and redirects to the login page (returning to this product after login); when logged in it shows "Added to cart". "Buy Now" adds the item and goes straight to checkout. A missing or delisted product shows a full-page "Product does not exist or has been delisted" with "Back to Store".

### Cart

The cart is bound to the current account and settlement region; a different account or region gets a different cart.

| Element | Details |
| --- | --- |
| Product row | Cover, title, spec name, unit price, quantity (1–99, applied immediately), row total |
| Remove | A "Remove" button per row; success shows "Product removed"; an empty cart shows "Your cart is empty" and "Keep Shopping" |
| Order summary | Settlement currency, subtotal, shipping, tax, discount (negative), total; "Checkout" at the bottom |
| Promo code | Type into "Enter promo code" and click "Apply"; success shows "Promo code applied" |
| Abandon cart | Double confirmation "Abandon the current cart?"; clearing it shows "Cart abandoned" |

There is no per-row checkbox — everything in the cart is checked out together.

### Checkout

The checkout page has a form on the left and the order summary on the right; an empty cart shows only the empty-cart notice and "Keep Shopping".

| Block | Fields and behavior |
| --- | --- |
| Saved addresses | Only shown when logged in. A dropdown of saved addresses (only those compatible with the cart's region); selecting auto-fills the form. The default address is preselected on entry |
| Contact and address | Email (required, must contain `@`), phone, first name, last name; street address, city, country/region (all three required); postal code and state/province optional; country options limited to the cart's region |
| Shipping | Click "Get shipping methods" to first save the contact and address, then load available methods and costs; a notice shows when none are available |
| Payment | A radio list of payment methods returned by the store; redirect-based channels are marked "redirect required"; "No payment methods available in your region" when the list is empty |
| Order summary | Product rows, settlement currency, subtotal, shipping, tax, discount, total, plus "Place Order" and "Abandon Cart" |

On submit, checks run in order: empty email or missing `@` shows "Please enter a valid email"; missing street, city, or country shows "Please enter a complete shipping address"; no payment method selected shows "Please select a payment method"; items needing shipping with no shipping method show "No shipping methods available in your region".

Redirect-based payment methods leave the site for the payment page and return to checkout with `payReturn=1`; QR-code payments open a "Scan to Pay" window — click "I have completed payment" to continue confirming the order. On success the page jumps to the order result page; if an order ID is returned, it goes directly to the order detail.

Checkout marks each attempt, so clicking "Place Order" repeatedly never creates two orders. When "Order is being confirmed, please do not submit again" appears, do not keep retrying — check the result in the order list shortly after.

### Order Result

`/home/store/order/{token}` is the receipt page you land on after placing an order. Its address uses a random code rather than a guessable order number, and the page is set up so that code can't leak to other sites.

| Area | Content |
| --- | --- |
| Result | "Order placed", the order number, and three buttons: "Keep Shopping", "My Orders", "Order Details" |
| Order info and items | Placed-at time, order status, payment status, fulfillment status, contact email (masked), order amount; item details include cover, title, spec, quantity, and row amount |

A missing order or expired token shows "Order does not exist or the link has expired".

### Order List

Ten orders per page, with "Refresh" and "Keep Shopping" at the top.

| Element | Details |
| --- | --- |
| Order header | Order number, placed-at time, order status tag, payment status tag |
| Product rows | Cover, title, spec, quantity, row amount, with the order total at the bottom; "No orders yet" when empty |
| Actions | "Pay" when payable, otherwise "View Details"; "Cancel Order" when cancellable; "Return & Refund" when returnable |
| Cancel | Requires double confirmation; submitting shows "Cancellation request submitted, waiting for the seller" and the status becomes "cancellation requested" |

### Order Detail

| Area | Content |
| --- | --- |
| Notice bar and status | An info bar when the order carries a note, plus an extra notice when a cancellation request exists; then order status, payment status, fulfillment status tags and the placed-at time |
| Info table | Order number, contact email, placed-at time, order amount, payment status, fulfillment status |
| Fulfillment | With fulfillment records: status, carrier, ship/delivery times, and tracking number; without a number, "The seller has not filled in a tracking number yet"; an order whose items all skip shipping is additionally noted as virtual goods |
| Return records | Each record shows status, request time, product rows, reason, and notes |
| Actions | A cancel card when the order allows cancellation; a return form when returns are allowed — quantity, reason, per-row notes, and description; submitting shows "Return request submitted" |

Action blocks render only when the current order state allows them, so different orders show different blocks.

### Store Info

The store info page summarizes the store's public profile and settlement rules, and is also where you switch the settlement currency.

| Block | Content |
| --- | --- |
| Store profile | Name, description, type (official), support email, online-ordering status (open / not open) |
| Settlement currency | A radio list of regions, each showing currency code, region name, and symbol; switching takes effect immediately and amounts are re-fetched in the new region's currency |
| Payment | Payment method tags available in the current region, plus shipping methods and settlement notes |
| Regions and shipping scope | One row per region with currency and covered countries; the current region is marked "current"; "No regions available" when empty |
| After-sales | Fixed after-sales text with "View My Orders" and "Keep Shopping" |

:::note[Amounts and channels follow the page]
Product amounts, shipping, tax, discounts, and payment channels are all returned by the store side and change in real time. This page describes only the fields and actions, not specific amounts or channels.
:::

---

## Personal Pages

The site has two kinds of "person" page: the **public profile** anyone can visit, and the **personal center** you use after logging in. The public profile shows only the fields the user chose to make public. The personal center is where those fields, the avatar, the banner and the whole page theme are set.

### Login and Account Entries

#### Top Bar

When logged out, the top bar right side has only a "Log In" button, which opens the login page. After login it becomes an avatar dropdown:

| Menu item | Behavior |
| --- | --- |
| Personal Center | Opens `/admin/user/info` |
| Admin | Opens the backend dashboard |
| Show spoilers / Hide spoilers | Toggles spoiler content in lists and details |
| Log Out | Clears the session and returns to the login page |

The top bar also has language switching, light/dark toggle, fullscreen button, and quick search — these ignore login state.

#### Login Page

| Element | Details |
| --- | --- |
| Account / password | Placeholder text is "Admin account" / "Admin password". When an RSA public key is configured in the backend, the password is encrypted with it before submission; if no key is set or the key is invalid, it is submitted as plaintext. |
| Privacy policy & forgot password | The privacy policy must be checked to log in, otherwise "Please read and agree to the privacy policy first"; "Forgot password" opens a reset dialog using the recovery key |
| Other login methods | "Log in with Passkey" and "Unified login" appear only when the backend enables them; unified login opens an app-picker dialog and completes third-party auth in a new window |
| Two-factor | For accounts with 2FA enabled, after the password check you enter a 6-digit code or a recovery code |

> **RSA public-key encryption**: the password is encrypted before it is sent, so anything intercepted on the network cannot be turned back into the password directly.

:::warning[No self-registration]
The "Register account" button at the bottom of the login page is currently **disabled** — the frontend has no open registration. Accounts come from deployment-time initialization (default admin `ammds`); you cannot register a new one here.
:::

After a successful login, the page follows the `redirect` URL parameter back to where you were; without it, "open first" under System Configuration → Appearance → Landing Page decides between the frontend and the backend.

### Public Profile

#### Two Addresses

`/user/{userId}` is the standard form and `/u/{userId}` the short alias; both render the same page.

Both need no login and use the public layout (no site top menu); the footer is fixed as "Home | © AMMDS 提供技术支持". "Home" returns to the site homepage. The "Public Profile" button in the personal center opens `/u/{userId}`; changing the user ID invalidates the old address immediately.

#### Page Content

| Element | Details |
| --- | --- |
| Avatar and nickname | Default user icon when no avatar is set; "AMMDS User" when no nickname is set |
| Handle | Shown like `@userId` |
| Badges | Account status shows as a green badge when present, plus a fixed "AMMDS verified user" badge |
| Banner and background | Banner falls back to a theme gradient when unset; page background falls back to the system background |
| Basic info | Rendered from the fields the user made public; empty fields do not appear |
| Empty notice | "This user has no public information" when all public fields are empty |

While loading, a loading state shows; a missing user or closed profile shows "User does not exist or is not accessible" with a "Reload" button.

:::note[What others see is decided by the user]
Email, phone, registration time, last-login time, and account status are all optional public fields. Even when public, the phone number is masked. Uncheck every field and the public profile reduces to avatar, nickname, and theme.
:::

#### Profile Themes

Public profiles have 12 themes, each a distinct page structure and layout — not just a recolor:

| Theme | Description |
| --- | --- |
| Classic card | Centered banner card + two-column info grid; default theme |
| Minimal outline | Black-and-white Swiss typography, large left avatar + info table |
| Elegant ocean | Full-width wave header + floating stat blocks + horizontal info flow |
| Sunset orange | Narrow-left/wide-right split, film grain and warm gradient border |
| Midnight neon | Dark base with neon strokes, sticky sidebar + glowing info cards |
| Paper scroll | Magazine-format layout, drop cap + two-column body + footer colophon |
| Glassmorphism | Floating glass cards, staggered stacking + soft light spots |
| Art frame | Canvas-style asymmetric composition, tilted frames + numbered info plates |
| Fashion magazine | Large poster cover, full-bleed portrait + overlapping bottom title |
| Cyber terminal | Terminal-window interaction, typewriter line numbers + scanline monitor panel |
| Cherry blossom | Pink gradient ring avatar, falling petals + soft cards |
| Neo-brutalist | Saturated blocks with hard shadows, sticker-style tags + hard-edged cards |

The theme is saved on the account and applied for every visitor; an invalid theme value falls back to "Classic card". Background and banner images apply to all themes, each theme cropping them its own way.

### Personal Center

Open it from the avatar dropdown's "Personal Center". From top to bottom: the header identity area, homepage configuration, user info, and license blocks.

#### Header Identity Area

| Element | Action |
| --- | --- |
| Avatar | Click the avatar to pick an image; it is replaced immediately after upload |
| Banner | Upload button at the top-right; an existing banner can be removed to restore the default background |
| Nickname | Displays the current nickname |
| Role and license badges | Role shows admin or user; the license badge matches the license status (valid / invalid); a VIP badge appears when the account has a membership flag |
| Change password | Opens a dialog asking for the current and new passwords |

#### Homepage Configuration

This block decides what your public profile looks like to others:

| Area | Details |
| --- | --- |
| Homepage background | Upload or remove; "No background set" placeholder when unset |
| Homepage banner | Upload or remove; "No banner set" placeholder when unset |
| Public page theme | 12 theme cards with thumbnails and one-line design notes; click to switch and save |

Background and banner are two independent fields and do not affect the banner in the header identity area.

#### User Info

The info card shows user ID, nickname, email, phone, role, status, registration time, and last-login time, with two entries at the top right:

- **Edit Info**: opens the edit dialog.
- **Public Profile**: opens `/u/{userId}` in a new tab; unavailable without a user ID — the card then says "Not set (public profile is generated after editing)".

#### Edit Profile Settings

| Field | Rule | If empty or wrong |
| --- | --- | --- |
| User ID | Required; it is the segment in your public profile address | Old links break after a change |
| Nickname | Required, up to 32 characters | Cannot save when longer |
| Email | Required, must be a valid email format | Cannot save when malformed |
| Phone | Optional; the public profile only shows a masked number | Not filling it affects nothing |
| Public profile fields | Multi-select: user ID, nickname, avatar, email, phone (masked), registration time, last-login time, status | Unchecking all removes every field from the public profile |

One default rule: if **never configured**, all fields except the phone number are shown.

### Favorites and Reading Position

| Ability | Entry | Details |
| --- | --- | --- |
| Favorites & favorites library | The favorite button on detail pages; the "Mode" switch in the list sidebar | Novel details show "Favorite / Favorited"; when logged out it says "Operation failed, please make sure you are logged in"; switching to "Favorites" mode lists only favorited entries |
| Novel reading progress | "Continue reading" and the progress hint on novel details | When logged in, progress is stored on the server; guests use browser-local storage — see the browse page in this section |

:::note[No standalone watch-history page]
The frontend currently has no separate watch history, play history, or personal favorites list page. Favorites are managed through detail-page buttons and viewed via "Favorites" mode in each media list; reading position only offers resume entries for novels.
:::

---

## When Something Goes Wrong

**Sharing**

- **Link won't open, "Share not found or failed to load"**: the short code was mistyped, or the share was deleted; also check whether an expired/paused panel shows — it states the reason directly.
- **Password keeps failing**: "Access password is incorrect, please try again" appears under the box; confirm what the creator gave you is the access password, not some other code.
- **Password asked again after refresh**: verification is valid only for the current page view — by design.
- **Want to extend validity or lift a pause**: impossible from the share page; ask the creator to adjust it in their backend share list.

**Store**

- **No "Store" in the top menu**: the backend has not enabled the store; when enabled but not open, the page says "The store is not open yet, please come back later".
- **Adding to cart redirects to login**: cart, checkout, and orders all need login; you'll return to the same product afterwards.
- **"Order is being confirmed, please do not submit again"**: stop clicking; confirm the result in "My Orders" shortly after. Duplicate protection guarantees no double orders.
- **Amounts differ from before**: amounts, shipping, and tax are fetched live in the current settlement region's currency; check the store info page to see whether the region was switched.

**Account and profile**

- **"Register account" is not clickable**: the frontend has no open registration; accounts come from deployment initialization (default admin `ammds`).
- **Old profile link no longer works**: the user ID was changed; use the new address (from the "Public Profile" button in the personal center).
- **Forgot the password**: use "Forgot password" on the login page and reset with the recovery key.
- **Others say your profile "shows nothing"**: all public fields may be unchecked (leaving only avatar, nickname, and theme) — re-check them under "Edit Info".

## Next

- [The Page Visitors See](./overview.md)
- [Browsing Movies, Shows, Actors, Comics, and Novels](./browse.md)
