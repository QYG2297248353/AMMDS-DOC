---
slug: why-self-hosted
title: "Why We Insist on Self-Hosting: Keeping Your Data in Your Own Hands"
authors: [ms]
tags: [studio, opensource]
date: 2023-08-12
---

This article is about the most fundamental commitment Mengsen Studio makes when building products: self-hosting. It's not a slogan, but a price we remain willing to pay after countless trade-offs.

{/* truncate */}

## One thing to think through: whose data is it

Every member of our team is a heavy self-hosting user. On our drives sit films, comics and novels accumulated over many years — from naming to categorization, every record carries the thought of the person who organized it. Handing this material to a cloud service for hosting may seem convenient, but it means accepting three things:

- Your watchlists, tags and viewing history become someone else's data;
- If the service ever shuts down, the results of years of organizing could become inaccessible overnight;
- If you want to switch tools, the exported data is often incomplete.

We don't want to turn users' material into anyone's asset. So from the very first line of code, AMMDS's positioning was clear: **a film library you keep on your own device**. The material stays on your machine, no cloud account is needed, and there's no remote switch that can decide the fate of your data for you.

## Self-hosting doesn't mean closed off

There's a misconception that self-hosting means refusing to connect to the internet. It isn't.

The program itself can run offline, but a few things — "automatically filling in metadata", "finding resources" and "push notifications" — do require accessing external websites. The trade-off we made is:

> Network access is off by default and enabled by you item by item; once enabled, the program only accesses the addresses you've set.

In other words, network access is a permission the user actively grants, not a right the product quietly takes. You can use it in a completely offline environment to organize local files, or enjoy the convenience of automatic scraping after enabling metadata sites — the decision always stays in your hands.

## The cost: what we gave up

Choosing self-hosting means giving up some of the convenience of "ready out of the box":

- **No official hosting**: you need to prepare a device yourself and understand which directory your data lives in.
- **First-time setup takes effort**: choosing an installation method, logging in and telling the program where your files are — these steps can't be skipped.
- **Upgrades are user-initiated**: the program won't quietly replace your data format in the background.

We know these barriers will discourage some users. But if the alternative is letting other users lose control of their data, we'd rather keep the barriers.

## A design principle that runs through everything

This choice later became a common guideline for all of AMMDS's features:

| Scenario | How we handle it |
| :--- | :--- |
| Storing material | All on the local machine, nothing uploaded |
| Accessing external websites | Off by default, enabled item by item |
| Media server sync | You configure the connection yourself |
| Backup and migration | Export as a standard backup package, take it with you anytime |

Many of the designs you see today — a local database, standard backup packages, exportable material fields — trace back to the judgment written in this post.

:::warning[Requirement]
This software is an offline product, and data is entered and maintained by the user. Please comply with the laws and regulations of your region, do not promote this product within China; when communication is needed, please use the abbreviation `AMMDS`.
:::

---

## Keep reading

- [The Story Behind the Studio: From Solo Developer to Mengsen Studio](/blog/behind-the-studio)
- [Three Lessons from the Open Source Community](/blog/lessons-from-open-source)
- [Project Overview: What AMMDS Can Do for You](/docs/intro)
