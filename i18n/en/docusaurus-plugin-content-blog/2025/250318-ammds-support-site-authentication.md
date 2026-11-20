---
slug: ammds-support-site-authentication
title: "Support for the First Batch of PT Site Authentication: M-Team, Rousi Pro and Kamept"
authors: [ms]
tags: [ammds, feature]
date: 2025-03-18
---

# Support for the First Batch of PT Site Authentication: M-Team, Rousi Pro and Kamept

AMMDS now officially supports the first batch of PT site authentication. Once authenticated, you can view these sites' popular rankings and search their resources directly in AMMDS, without having to keep switching back and forth to a separate web page.

{/* truncate */}

## The Three Sites

| Site | Common name | Notes |
| --- | --- | --- |
| M-Team | Mantou | The first PT site integrated with AMMDS |
| Rousi Pro | Rousi | A site built on the new architecture, supporting popular rankings and multi-dimensional search |
| Kamept | Turtle | An ecosystem resource site supporting rankings and resource search |

## What Authentication Does

> **Authentication**: lets the site confirm that "the account accessing it is your own". It's the same as logging into the website, except AMMDS does it on your behalf — after that, checking rankings and searching resources require no manual login.

Authentication information is stored only on your own server, and AMMDS uses it only to access site data you have authorized.

## How to Get Started

1. In the admin panel, open the site authentication entry under "Personal Information";
2. Follow the on-page instructions to complete authentication for the corresponding site;
3. After that, you can use that site's rankings and search directly in subscription search.

For detailed configuration instructions, see the documentation chapter "Integrated Apps → Where to Find Resources".

## What to Do If Something Goes Wrong

- Authentication failure message: first confirm in a browser that the site account itself can log in normally;
- Empty rankings or search results: the site itself may have access restrictions or be under maintenance — try again later;
- For other cases, feel free to report them in the community.

---

## Keep reading

- [Release AMMDS v1.0.24 — Site Authentication and Resource Search Open](../2025/250510-ammds-release-v1.0.24.md)
