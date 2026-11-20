---
slug: lessons-from-open-source
title: Three Lessons from the Open Source Community
authors: [ms]
tags: [studio, opensource]
date: 2023-09-20
---

Before founding Mengsen Studio, we spent many years in the open source community as individual developers. Looking back, those experiences of contributing and stumbling shaped the way we later built products more directly than any course could.

{/* truncate */}

## Lesson One: Become a user first, then an author

The first project we encountered was IYUUPlus — an open source automation tool widely used among PT enthusiasts. Our founder not only used it but also took part in developing the IYUUPlus-Windows version.

This experience brought a simple realization: **a good tool is one its author uses every day.** When you're both user and author, you don't need to research "user pain points", because you're stuck in them yourself.

When we later built AMMDS, we stuck to "eating our own dog food" — team members use it daily to manage their own media libraries. We've kept this habit to this day; it's the fastest way for us to find problems.

## Lesson Two: Compatibility matters more than perfection

The most common debate in the open source community is "how to do something the right way". But the real world never runs in just one way:

- Some sites use static pages, some render dynamically with JavaScript, some offer an API;
- The NFO formats of Kodi, Jellyfin and Emby have subtle differences;
- The same user may be using Windows, a NAS and a phone at the same time.

What we learned was: **don't force users to change their habits — make the product compatible with reality.** This directly shaped a later core design of AMMDS — the plugin architecture. The scraping engine, site adapters and data processing pipeline are all pluggable, so the community can contribute third-party plugins to support new sites without touching the core code.

## Lesson Three: Keep the complexity to ourselves

Whether a tool is good isn't something users judge by how elegant it is internally, but by how much effort they have to put in.

The projects in the open source community that people genuinely stay with long term often share one trait: they encapsulate the complex parts and expose simple, predictable interfaces to users. Conversely, projects that dump the configuration burden on users and pour all their internal concepts out at once — however powerful — are quickly abandoned.

This lesson led us to repeatedly subtract when building AMMDS: default settings should work for the most common scenarios, advanced options hide in secondary menus; the glossary page should read like a conversation, not like API documentation.

## From giving back to creating

What open source gave us was not just technology but a way of working: open, pragmatic and respectful of users' time.

```text
Use → Contribute → Understand pain points → Form a product idea → Give back to the community
```

AMMDS is the product of this cycle. It inherited a great deal from projects like IYUUPlus and NexusPHP, and as it grew it kept incorporating new open source components. Many of the capabilities you use today have community contributors behind them.

:::warning[Requirement]
This software is an offline product, and data is entered and maintained by the user. Please comply with the laws and regulations of your region, do not promote this product within China; when communication is needed, please use the abbreviation `AMMDS`.
:::

---

## Keep reading

- [The Story Behind the Studio: From Solo Developer to Mengsen Studio](/blog/behind-the-studio)
- [AMMDS: From Concept to Reality — The Birth of a Product](/blog/ammds-concept-to-reality)
- [Glossary](/docs/glossary)
